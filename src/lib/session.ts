import { cookies } from "next/headers";
import {
  demoProfile,
  getDemoProfileByRole,
  isExperienceRole,
  type CurrentProfile,
} from "@/lib/profile";
import { getProfileFromSessionToken, verifySessionToken } from "@/lib/auth";
import { authSessionCookieName, demoRoleCookieName } from "@/lib/auth-constants";

export async function getCurrentProfile(): Promise<CurrentProfile> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(authSessionCookieName)?.value;

  if (sessionToken) {
    const profile = await getProfileFromSessionToken(sessionToken).catch(() => null);

    if (profile) {
      return profile;
    }
  }

  const role = cookieStore.get(demoRoleCookieName)?.value;

  if (isExperienceRole(role)) {
    return getDemoProfileByRole(role);
  }

  return demoProfile;
}

export async function getAuthenticatedUserId() {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(authSessionCookieName)?.value;

  if (!sessionToken) {
    return null;
  }

  const session = await verifySessionToken(sessionToken).catch(() => null);

  return session?.userId ?? null;
}
