import bcrypt from "bcryptjs";
import { jwtVerify, SignJWT } from "jose";
import { prisma } from "@/lib/db";
import {
  capabilitiesByRole,
  mapDatabaseRoleToExperienceRole,
  type CurrentProfile,
} from "@/lib/profile";

const secret = new TextEncoder().encode(
  process.env.AGRONODO_AUTH_SECRET ?? "agronodo-dev-secret-change-me",
);

type SessionPayload = {
  userId: string;
};

export async function createSessionToken(userId: string) {
  return new SignJWT({ userId })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifySessionToken(token: string) {
  const { payload } = await jwtVerify(token, secret);
  const userId = payload.userId;

  if (typeof userId !== "string") {
    return null;
  }

  return { userId } satisfies SessionPayload;
}

export async function authenticateUser(email: string, password: string) {
  const user = await prisma.user.findUnique({
    where: { email },
    include: { organization: true },
  });

  if (!user) {
    return null;
  }

  const validPassword = await bcrypt.compare(password, user.passwordHash);

  if (!validPassword) {
    return null;
  }

  return mapUserToCurrentProfile(user);
}

export async function getProfileFromSessionToken(token: string) {
  const session = await verifySessionToken(token).catch(() => null);

  if (!session) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { id: session.userId },
    include: { organization: true },
  });

  return user ? mapUserToCurrentProfile(user) : null;
}

function mapUserToCurrentProfile(user: {
  id: string;
  name: string;
  email: string;
  role: string;
  organization: { id: string; name: string; type: string | null } | null;
}): CurrentProfile {
  const role = mapDatabaseRoleToExperienceRole(user.role);

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role,
    organization: user.organization
      ? {
          id: user.organization.id,
          name: user.organization.name,
          type: user.organization.type ?? "Organizacion",
        }
      : {
          id: "no-organization",
          name: "Sin organizacion",
          type: "Sin tipo",
        },
    capabilities: capabilitiesByRole[role],
  };
}
