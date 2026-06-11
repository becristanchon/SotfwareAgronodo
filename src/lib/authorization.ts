import { NextResponse } from "next/server";
import { hasCapability, type ProfileCapability } from "@/lib/profile";
import { getCurrentProfile } from "@/lib/session";

export async function requireCapability(capability: ProfileCapability) {
  const profile = await getCurrentProfile();

  if (hasCapability(profile, capability)) {
    return null;
  }

  return NextResponse.json(
    {
      error: "FORBIDDEN",
      message: "El perfil activo no tiene permiso para ejecutar esta accion.",
    },
    { status: 403 },
  );
}
