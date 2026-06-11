import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { authSessionCookieName, demoRoleCookieName } from "@/lib/auth-constants";

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete(demoRoleCookieName);
  cookieStore.delete(authSessionCookieName);

  redirect("/login");
}
