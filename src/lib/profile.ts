export type ExperienceRole =
  | "PRODUCER"
  | "FIELD_TECH"
  | "AGRONOMIST"
  | "INSTITUTION"
  | "ADMIN";

export type ProfileCapability =
  | "view_daily_answers"
  | "view_operational_tracking"
  | "view_agronomic_analysis"
  | "view_territorial_impact"
  | "manage_producers"
  | "manage_farms"
  | "manage_plots"
  | "manage_sensors"
  | "record_readings"
  | "manage_alerts"
  | "manage_rules"
  | "view_reports";

export type NavigationItem = {
  href: string;
  label: string;
};

export type NavigationGroup = {
  label: string;
  items: NavigationItem[];
};

export type CurrentProfile = {
  id: string;
  name: string;
  email: string;
  role: ExperienceRole;
  organization: {
    id: string;
    name: string;
    type: string;
  };
  capabilities: ProfileCapability[];
};

export const roleLabels: Record<ExperienceRole, string> = {
  PRODUCER: "Productor",
  FIELD_TECH: "Tecnico de campo",
  AGRONOMIST: "Agronomo",
  INSTITUTION: "Entidad territorial",
  ADMIN: "Administrador AgroNodo",
};

export const roleDescriptions: Record<ExperienceRole, string> = {
  PRODUCER:
    "Recibe respuestas simples sobre riego, riesgo del cultivo, acciones del dia y avance de la finca.",
  FIELD_TECH:
    "Realiza seguimiento operativo de fincas, lotes, dispositivos, alertas y actividades de campo.",
  AGRONOMIST:
    "Analiza comportamiento hidrico, historicos, reglas, diagnosticos y decisiones tecnicas.",
  INSTITUTION:
    "Consulta cobertura, adopcion, ahorro hidrico e impacto territorial del programa.",
  ADMIN:
    "Administra la operacion completa de AgroNodo, usuarios, datos, reglas y reportes.",
};

export const capabilitiesByRole: Record<ExperienceRole, ProfileCapability[]> = {
  PRODUCER: ["view_daily_answers", "manage_alerts", "view_reports"],
  FIELD_TECH: [
    "view_daily_answers",
    "view_operational_tracking",
    "manage_producers",
    "manage_farms",
    "manage_plots",
    "manage_sensors",
    "record_readings",
    "manage_alerts",
    "view_reports",
  ],
  AGRONOMIST: [
    "view_daily_answers",
    "view_operational_tracking",
    "view_agronomic_analysis",
    "record_readings",
    "manage_alerts",
    "manage_rules",
    "view_reports",
  ],
  INSTITUTION: [
    "view_daily_answers",
    "view_territorial_impact",
    "manage_producers",
    "manage_farms",
    "view_reports",
  ],
  ADMIN: [
    "view_daily_answers",
    "view_operational_tracking",
    "view_agronomic_analysis",
    "view_territorial_impact",
    "manage_producers",
    "manage_farms",
    "manage_plots",
    "manage_sensors",
    "record_readings",
    "manage_alerts",
    "manage_rules",
    "view_reports",
  ],
};

export const capabilityLabels: Record<ProfileCapability, string> = {
  view_daily_answers: "Ver respuestas del dia",
  view_operational_tracking: "Ver seguimiento operativo",
  view_agronomic_analysis: "Ver analisis agronomico",
  view_territorial_impact: "Ver impacto territorial",
  manage_producers: "Gestionar productores",
  manage_farms: "Gestionar fincas",
  manage_plots: "Gestionar lotes",
  manage_sensors: "Gestionar dispositivos",
  record_readings: "Registrar mediciones",
  manage_alerts: "Atender recomendaciones",
  manage_rules: "Configurar reglas",
  view_reports: "Ver reportes",
};

export type CrudModuleKey =
  | "producers"
  | "farms"
  | "plots"
  | "sensors"
  | "readings"
  | "recommendations"
  | "rules"
  | "reports";

export type CrudPermission = {
  module: CrudModuleKey;
  label: string;
  description: string;
  read: ExperienceRole[];
  create: ExperienceRole[];
  update: ExperienceRole[];
  delete: ExperienceRole[];
};

export const crudPermissionMatrix: CrudPermission[] = [
  {
    module: "producers",
    label: "Productores",
    description: "Registro y caracterizacion humana del productor.",
    read: ["FIELD_TECH", "INSTITUTION", "ADMIN"],
    create: ["FIELD_TECH", "INSTITUTION", "ADMIN"],
    update: ["FIELD_TECH", "INSTITUTION", "ADMIN"],
    delete: ["ADMIN"],
  },
  {
    module: "farms",
    label: "Fincas",
    description: "Unidades productivas y gestion hidrica por finca.",
    read: ["PRODUCER", "FIELD_TECH", "AGRONOMIST", "INSTITUTION", "ADMIN"],
    create: ["FIELD_TECH", "INSTITUTION", "ADMIN"],
    update: ["FIELD_TECH", "INSTITUTION", "ADMIN"],
    delete: ["ADMIN"],
  },
  {
    module: "plots",
    label: "Lotes",
    description: "Zonas productivas, cultivos y estado vivo del cultivo.",
    read: ["PRODUCER", "FIELD_TECH", "AGRONOMIST", "INSTITUTION", "ADMIN"],
    create: ["FIELD_TECH", "ADMIN"],
    update: ["FIELD_TECH", "AGRONOMIST", "ADMIN"],
    delete: ["ADMIN"],
  },
  {
    module: "sensors",
    label: "Dispositivos",
    description: "Sensores virtuales y preparacion para hardware real.",
    read: ["FIELD_TECH", "AGRONOMIST", "ADMIN"],
    create: ["FIELD_TECH", "ADMIN"],
    update: ["FIELD_TECH", "ADMIN"],
    delete: ["ADMIN"],
  },
  {
    module: "readings",
    label: "Mediciones",
    description: "Lecturas manuales, simuladas o futuras lecturas IoT.",
    read: ["FIELD_TECH", "AGRONOMIST", "ADMIN"],
    create: ["FIELD_TECH", "AGRONOMIST", "ADMIN"],
    update: ["ADMIN"],
    delete: ["ADMIN"],
  },
  {
    module: "recommendations",
    label: "Recomendaciones",
    description: "Atencion de alertas y registro de decision de campo.",
    read: ["PRODUCER", "FIELD_TECH", "AGRONOMIST", "INSTITUTION", "ADMIN"],
    create: ["PRODUCER", "FIELD_TECH", "AGRONOMIST", "ADMIN"],
    update: ["PRODUCER", "FIELD_TECH", "AGRONOMIST", "ADMIN"],
    delete: ["ADMIN"],
  },
  {
    module: "rules",
    label: "Reglas",
    description: "Umbrales de alerta y criterios tecnicos de decision.",
    read: ["FIELD_TECH", "AGRONOMIST", "ADMIN"],
    create: ["AGRONOMIST", "ADMIN"],
    update: ["AGRONOMIST", "ADMIN"],
    delete: ["ADMIN"],
  },
  {
    module: "reports",
    label: "Reportes",
    description: "Reportes de piloto, adopcion e impacto hidrico.",
    read: ["PRODUCER", "FIELD_TECH", "AGRONOMIST", "INSTITUTION", "ADMIN"],
    create: ["FIELD_TECH", "AGRONOMIST", "INSTITUTION", "ADMIN"],
    update: ["ADMIN"],
    delete: ["ADMIN"],
  },
];

const commonSupport: NavigationGroup = {
  label: "Cuenta",
  items: [{ href: "/perfil", label: "Perfil" }],
};

export const navigationByRole: Record<ExperienceRole, NavigationGroup[]> = {
  PRODUCER: [
    {
      label: "Mi dia",
      items: [
        { href: "/", label: "Hoy" },
        { href: "/fincas", label: "Agua" },
        { href: "/alertas", label: "Que hacer" },
        { href: "/lotes", label: "Mi finca" },
        { href: "/caracterizacion", label: "Avance" },
      ],
    },
    commonSupport,
  ],
  FIELD_TECH: [
    {
      label: "Seguimiento",
      items: [
        { href: "/", label: "Hoy" },
        { href: "/fincas", label: "Fincas" },
        { href: "/lotes", label: "Lotes" },
        { href: "/alertas", label: "Que hacer" },
        { href: "/historicos", label: "Mediciones" },
      ],
    },
    {
      label: "Operacion",
      items: [
        { href: "/productores", label: "Productores" },
        { href: "/sensores", label: "Dispositivos" },
        { href: "/reglas", label: "Reglas" },
      ],
    },
    commonSupport,
  ],
  AGRONOMIST: [
    {
      label: "Analisis",
      items: [
        { href: "/", label: "Hoy" },
        { href: "/fincas", label: "Agua" },
        { href: "/historicos", label: "Historicos" },
        { href: "/reglas", label: "Reglas" },
        { href: "/reporte", label: "Reporte" },
      ],
    },
    {
      label: "Diagnostico",
      items: [
        { href: "/lotes", label: "Lotes" },
        { href: "/alertas", label: "Recomendaciones" },
        { href: "/sensores", label: "Dispositivos" },
      ],
    },
    commonSupport,
  ],
  INSTITUTION: [
    {
      label: "Impacto",
      items: [
        { href: "/", label: "Hoy" },
        { href: "/fincas", label: "Agua" },
        { href: "/caracterizacion", label: "Adopcion" },
        { href: "/reporte", label: "Reporte" },
        { href: "/productores", label: "Productores" },
      ],
    },
    {
      label: "Territorio",
      items: [
        { href: "/lotes", label: "Lotes" },
        { href: "/alertas", label: "Riesgos" },
      ],
    },
    commonSupport,
  ],
  ADMIN: [
    {
      label: "Gestion",
      items: [
        { href: "/", label: "Hoy" },
        { href: "/productores", label: "Productores" },
        { href: "/fincas", label: "Fincas" },
        { href: "/lotes", label: "Lotes" },
      ],
    },
    {
      label: "Operacion",
      items: [
        { href: "/alertas", label: "Recomendaciones" },
        { href: "/historicos", label: "Historicos" },
        { href: "/sensores", label: "Dispositivos" },
        { href: "/reglas", label: "Reglas" },
        { href: "/reporte", label: "Reporte" },
      ],
    },
    commonSupport,
  ],
};

export function getNavigationForRole(role: ExperienceRole) {
  return navigationByRole[role];
}

export function mapDatabaseRoleToExperienceRole(role: string): ExperienceRole {
  if (isExperienceRole(role)) {
    return role;
  }

  if (role === "TECHNICIAN") {
    return "FIELD_TECH";
  }

  if (role === "VIEWER") {
    return "PRODUCER";
  }

  return "ADMIN";
}

const demoOrganization = {
    id: "org-agronodo-demo",
    name: "AgroNodo Demo",
    type: "Piloto Boyaca",
};

export const demoProfilesByRole: Record<ExperienceRole, CurrentProfile> = {
  PRODUCER: {
    id: "user-productor-demo",
    name: "Brayan Estiven Cristancho",
    email: "productor.demo@agronodo.local",
    role: "PRODUCER",
    organization: demoOrganization,
    capabilities: capabilitiesByRole.PRODUCER,
  },
  FIELD_TECH: {
    id: "user-tecnico-demo",
    name: "Tecnico de Campo AgroNodo",
    email: "tecnico.demo@agronodo.local",
    role: "FIELD_TECH",
    organization: demoOrganization,
    capabilities: capabilitiesByRole.FIELD_TECH,
  },
  AGRONOMIST: {
    id: "user-agronomo-demo",
    name: "Agronomo AgroNodo",
    email: "agronomo.demo@agronodo.local",
    role: "AGRONOMIST",
    organization: demoOrganization,
    capabilities: capabilitiesByRole.AGRONOMIST,
  },
  INSTITUTION: {
    id: "user-entidad-demo",
    name: "Entidad Territorial Demo",
    email: "entidad.demo@agronodo.local",
    role: "INSTITUTION",
    organization: {
      ...demoOrganization,
      name: "Alcaldia Demo Boyaca",
      type: "Entidad territorial",
    },
    capabilities: capabilitiesByRole.INSTITUTION,
  },
  ADMIN: {
    id: "user-admin-demo",
    name: "Administrador AgroNodo",
    email: "admin@agronodo.local",
    role: "ADMIN",
    organization: demoOrganization,
    capabilities: capabilitiesByRole.ADMIN,
  },
};

export const demoProfile = demoProfilesByRole.PRODUCER;

export function isExperienceRole(role: unknown): role is ExperienceRole {
  return (
    role === "PRODUCER" ||
    role === "FIELD_TECH" ||
    role === "AGRONOMIST" ||
    role === "INSTITUTION" ||
    role === "ADMIN"
  );
}

export function getDemoProfileByRole(role: ExperienceRole) {
  return demoProfilesByRole[role];
}

export function hasCapability(
  profile: Pick<CurrentProfile, "capabilities">,
  capability: ProfileCapability,
) {
  return profile.capabilities.includes(capability);
}
