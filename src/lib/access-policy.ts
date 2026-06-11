import type { ExperienceRole } from "@/lib/profile";

const allowedRoutesByRole: Record<ExperienceRole, string[]> = {
  PRODUCER: [
    "/",
    "/fincas",
    "/lotes",
    "/alertas",
    "/caracterizacion",
    "/reporte",
    "/perfil",
  ],
  FIELD_TECH: [
    "/",
    "/fincas",
    "/lotes",
    "/alertas",
    "/historicos",
    "/productores",
    "/sensores",
    "/reglas",
    "/perfil",
  ],
  AGRONOMIST: [
    "/",
    "/fincas",
    "/lotes",
    "/alertas",
    "/historicos",
    "/sensores",
    "/reglas",
    "/reporte",
    "/perfil",
  ],
  INSTITUTION: [
    "/",
    "/fincas",
    "/lotes",
    "/alertas",
    "/caracterizacion",
    "/productores",
    "/reporte",
    "/perfil",
  ],
  ADMIN: [
    "/",
    "/fincas",
    "/lotes",
    "/alertas",
    "/caracterizacion",
    "/historicos",
    "/productores",
    "/sensores",
    "/reglas",
    "/reporte",
    "/perfil",
  ],
};

export function canAccessPath(role: ExperienceRole, pathname: string) {
  const allowedRoutes = allowedRoutesByRole[role];

  return allowedRoutes.some((route) => {
    if (route === "/") {
      return pathname === "/";
    }

    return pathname === route || pathname.startsWith(`${route}/`);
  });
}
