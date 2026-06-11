import {
  alertRulesConfig,
  alerts,
  farms,
  getDashboardSummary,
  getFarmHealth,
  getNextActions,
  getPilotReport,
  getSensorReadings,
  plots,
  producers,
  readings,
  sensors,
} from "@/lib/demo-data";
import { prisma } from "@/lib/db";
import { fieldDecisions } from "@/lib/field-decisions";
import {
  capabilitiesByRole,
  demoProfile,
  mapDatabaseRoleToExperienceRole,
} from "@/lib/profile";
import type {
  CreateFieldDecisionInput,
  CreateFarmInput,
  CreatePlotInput,
  CreateProducerInput,
  CreateReadingInput,
  CreateSensorInput,
  UpdateAlertStatusInput,
} from "@/lib/validation";

export type DataSourceMode = "demo" | "database";

type ListOptions = {
  plotId?: string;
  sensorId?: string;
  status?: string;
  farmId?: string;
  alertId?: string;
};

type DataRepository = {
  producers: {
    list: () => Promise<unknown[]>;
    create: (input: CreateProducerInput) => Promise<unknown>;
  };
  farms: {
    list: () => Promise<unknown[]>;
    create: (input: CreateFarmInput) => Promise<unknown>;
  };
  plots: {
    list: () => Promise<unknown[]>;
    create: (input: CreatePlotInput) => Promise<unknown>;
  };
  sensors: {
    list: () => Promise<unknown[]>;
    create: (input: CreateSensorInput) => Promise<unknown>;
  };
  readings: {
    list: (sensorId?: string) => Promise<unknown[]>;
    create: (input: CreateReadingInput) => Promise<unknown>;
  };
  alerts: {
    list: (options?: ListOptions) => Promise<unknown[]>;
    updateStatus: (input: UpdateAlertStatusInput) => Promise<unknown>;
  };
  fieldDecisions: {
    list: (options?: ListOptions) => Promise<unknown[]>;
    create: (input: CreateFieldDecisionInput) => Promise<unknown>;
  };
  alertRules: {
    list: () => Promise<unknown[]>;
  };
  dashboard: {
    get: () => Promise<unknown>;
  };
  report: {
    get: () => Promise<unknown>;
  };
  profile: {
    current: () => Promise<unknown>;
  };
};

export function getDataSourceMode(): DataSourceMode {
  return process.env.AGRONODO_DATA_SOURCE === "database" ? "database" : "demo";
}

export function getDataSourceStatus() {
  const mode = getDataSourceMode();

  return {
    mode,
    ready: mode === "demo",
    message:
      mode === "demo"
        ? "AgroNodo esta usando datos simulados tipados."
        : "AgroNodo esta configurado para leer desde PostgreSQL con Prisma. Requiere base de datos activa.",
  };
}

const demoRepository: DataRepository = {
  producers: {
    list: async () => producers,
    create: async () => {
      throw new Error("READ_ONLY_DEMO_MODE");
    },
  },
  farms: {
    list: async () => farms,
    create: async () => {
      throw new Error("READ_ONLY_DEMO_MODE");
    },
  },
  plots: {
    list: async () => plots,
    create: async () => {
      throw new Error("READ_ONLY_DEMO_MODE");
    },
  },
  sensors: {
    list: async () => sensors,
    create: async () => {
      throw new Error("READ_ONLY_DEMO_MODE");
    },
  },
  readings: {
    list: async (sensorId?: string) =>
      sensorId ? getSensorReadings(sensorId) : readings,
    create: async () => {
      throw new Error("READ_ONLY_DEMO_MODE");
    },
  },
  alerts: {
    list: async ({ plotId, status }: ListOptions = {}) => {
      if (plotId) {
        return alerts.filter((alert) => alert.plotId === plotId);
      }

      if (status === "ACTIVE") {
        return alerts.filter((alert) => alert.status === "ACTIVE");
      }

      return alerts;
    },
    updateStatus: async () => {
      throw new Error("READ_ONLY_DEMO_MODE");
    },
  },
  fieldDecisions: {
    list: async ({ farmId, plotId, alertId }: ListOptions = {}) =>
      fieldDecisions.filter((decision) => {
        if (farmId && decision.farmId !== farmId) {
          return false;
        }

        if (plotId && decision.plotId !== plotId) {
          return false;
        }

        if (alertId && decision.alertId !== alertId) {
          return false;
        }

        return true;
      }),
    create: async () => {
      throw new Error("READ_ONLY_DEMO_MODE");
    },
  },
  alertRules: {
    list: async () => alertRulesConfig,
  },
  dashboard: {
    get: async () => ({
      summary: getDashboardSummary(),
      nextActions: getNextActions(),
      farmHealth: getFarmHealth(),
    }),
  },
  report: {
    get: async () => getPilotReport(),
  },
  profile: {
    current: async () => demoProfile,
  },
};

const databaseRepository: DataRepository = {
  producers: {
    list: async () =>
      prisma.producer.findMany({
        orderBy: { createdAt: "asc" },
        include: { farms: true },
      }),
    create: async (input) => prisma.producer.create({ data: input }),
  },
  farms: {
    list: async () =>
      prisma.farm.findMany({
        orderBy: { createdAt: "asc" },
        include: { producer: true, plots: true },
      }),
    create: async (input) => prisma.farm.create({ data: input }),
  },
  plots: {
    list: async () =>
      prisma.plot.findMany({
        orderBy: { createdAt: "asc" },
        include: { farm: true, sensors: true, alerts: true },
      }),
    create: async (input) =>
      prisma.plot.create({
        data: {
          ...input,
          plantedAt: input.plantedAt ? new Date(input.plantedAt) : undefined,
        },
      }),
  },
  sensors: {
    list: async () =>
      prisma.sensor.findMany({
        orderBy: { createdAt: "asc" },
        include: { plot: true, readings: { orderBy: { takenAt: "asc" } } },
      }),
    create: async (input) => prisma.sensor.create({ data: input }),
  },
  readings: {
    list: async (sensorId?: string) =>
      prisma.reading.findMany({
        where: sensorId ? { sensorId } : undefined,
        orderBy: { takenAt: "asc" },
      }),
    create: async (input) =>
      prisma.reading.create({
        data: {
          ...input,
          takenAt: input.takenAt ? new Date(input.takenAt) : undefined,
        },
      }),
  },
  alerts: {
    list: async ({ plotId, status }: ListOptions = {}) =>
      prisma.alert.findMany({
        where: {
          ...(plotId ? { plotId } : {}),
          ...(status ? { status: status as "ACTIVE" | "ACKNOWLEDGED" | "RESOLVED" } : {}),
        },
        orderBy: [{ severity: "desc" }, { createdAt: "desc" }],
        include: { plot: true, sensor: true },
      }),
    updateStatus: async (input) =>
      prisma.alert.update({
        where: { id: input.alertId },
        data: {
          status: input.status,
          acknowledgedAt:
            input.status === "ACKNOWLEDGED" ? new Date() : undefined,
          resolvedAt: input.status === "RESOLVED" ? new Date() : undefined,
        },
      }),
  },
  fieldDecisions: {
    list: async ({ farmId, plotId, alertId }: ListOptions = {}) =>
      prisma.fieldDecision.findMany({
        where: {
          ...(farmId ? { farmId } : {}),
          ...(plotId ? { plotId } : {}),
          ...(alertId ? { alertId } : {}),
        },
        orderBy: { decidedAt: "desc" },
        include: { farm: true, plot: true, alert: true, user: true },
      }),
    create: async (input) =>
      prisma.fieldDecision.create({
        data: {
          ...input,
          decidedAt: input.decidedAt ? new Date(input.decidedAt) : undefined,
        },
      }),
  },
  alertRules: {
    list: async () => alertRulesConfig,
  },
  dashboard: {
    get: async () => {
      const [
        producersCount,
        farmsCount,
        plotsCount,
        activeSensors,
        readingsCount,
        activeAlerts,
        criticalAlerts,
      ] = await Promise.all([
        prisma.producer.count(),
        prisma.farm.count(),
        prisma.plot.count(),
        prisma.sensor.count({ where: { status: "ACTIVE" } }),
        prisma.reading.count(),
        prisma.alert.count({ where: { status: "ACTIVE" } }),
        prisma.alert.count({ where: { status: "ACTIVE", severity: "CRITICAL" } }),
      ]);

      return {
        summary: {
          producers: producersCount,
          farms: farmsCount,
          plots: plotsCount,
          sensors: activeSensors,
          activeSensors,
          readings: readingsCount,
          activeAlerts,
          criticalAlerts,
          riskyPlots: await prisma.plot.count({
            where: { alerts: { some: { status: "ACTIVE" } } },
          }),
        },
        nextActions: [],
        farmHealth: [],
      };
    },
  },
  report: {
    get: async () => {
      const dashboard = await databaseRepository.dashboard.get();

      return {
        generatedAt: new Date().toISOString(),
        title: "Reporte AgroNodo MVP v1",
        scope: "Reporte generado desde PostgreSQL",
        summary:
          typeof dashboard === "object" && dashboard && "summary" in dashboard
            ? dashboard.summary
            : dashboard,
        farmHealth: [],
        priorityAlerts: await databaseRepository.alerts.list({ status: "ACTIVE" }),
        nextActions: [],
      };
    },
  },
  profile: {
    current: async () => {
      const user = await prisma.user.findFirst({
        orderBy: { createdAt: "asc" },
        include: { organization: true },
      });

      if (!user) {
        return null;
      }

      const experienceRole = mapDatabaseRoleToExperienceRole(user.role);

      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: experienceRole,
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
        capabilities: capabilitiesByRole[experienceRole],
      };
    },
  },
};

export const dataRepository =
  getDataSourceMode() === "database" ? databaseRepository : demoRepository;
