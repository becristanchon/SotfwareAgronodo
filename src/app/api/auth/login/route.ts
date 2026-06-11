import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authenticateUser, createSessionToken } from "@/lib/auth";
import { authSessionCookieName, demoRoleCookieName } from "@/lib/auth-constants";
import { isExperienceRole } from "@/lib/profile";

export async function POST(request: Request) {
  const formData = await request.formData();
  const email = String(formData.get("email") ?? "").trim().toLowerCase();
  const password = String(formData.get("password") ?? "");
  const role = formData.get("role");
  const cookieStore = await cookies();

  if (email && password) {
    const profile = await authenticateUser(email, password);

    if (!profile) {
      redirect("/login?error=credenciales");
    }

    const token = await createSessionToken(profile.id);

    cookieStore.set(authSessionCookieName, token, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
      secure: process.env.NODE_ENV === "production",
    });
    cookieStore.delete(demoRoleCookieName);

    redirect("/");
  }

  if (!isExperienceRole(role)) {
    redirect("/login");
  }

  cookieStore.set(demoRoleCookieName, role, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
    secure: process.env.NODE_ENV === "production",
  });
  cookieStore.delete(authSessionCookieName);

  redirect("/");
}
