import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

loadEnvFile();

const prisma = new PrismaClient();

const readingDates = [
  "2026-06-03T06:00:00-05:00",
  "2026-06-04T06:00:00-05:00",
  "2026-06-05T06:00:00-05:00",
  "2026-06-06T06:00:00-05:00",
  "2026-06-07T06:00:00-05:00",
  "2026-06-08T06:00:00-05:00",
  "2026-06-09T06:00:00-05:00",
];

const sensorReadings = {
  "sensor-papa-humedad-suelo": [36, 34, 31, 29, 27, 24, 22],
  "sensor-papa-temperatura": [12, 11, 10, 9, 8, 7, 6],
  "sensor-cebolla-humedad-suelo": [42, 41, 40, 40, 39, 39, 39],
  "sensor-cebolla-humedad-ambiente": [64, 66, 67, 70, 71, 72, 72],
  "sensor-arveja-temperatura": [9, 8, 7, 6, 5, 4, 3],
  "sensor-arveja-humedad-ambiente": [78, 81, 84, 87, 89, 91, 92],
};

async function main() {
  const organization = await prisma.organization.upsert({
    where: { id: "org-agronodo-demo" },
    update: {},
    create: {
      id: "org-agronodo-demo",
      name: "AgroNodo Demo",
      type: "STARTUP",
    },
  });

  await seedUser({
    id: "user-productor-demo",
    organizationId: organization.id,
    name: "Productor AgroNodo",
    email: "productor@agronodo.local",
    role: "PRODUCER",
  });

  await seedUser({
    id: "user-tecnico-demo",
    organizationId: organization.id,
    name: "Tecnico de Campo AgroNodo",
    email: "tecnico@agronodo.local",
    role: "FIELD_TECH",
  });

  await seedUser({
    id: "user-agronomo-demo",
    organizationId: organization.id,
    name: "Agronomo AgroNodo",
    email: "agronomo@agronodo.local",
    role: "AGRONOMIST",
  });

  await seedUser({
    id: "user-entidad-demo",
    organizationId: organization.id,
    name: "Entidad Territorial AgroNodo",
    email: "entidad@agronodo.local",
    role: "INSTITUTION",
  });

  await seedUser({
    id: "user-admin-demo",
    organizationId: organization.id,
    name: "Administrador AgroNodo",
    email: "admin@agronodo.local",
    role: "ADMIN",
  });

  await seedProducer({
    id: "producer-brayan",
    organizationId: organization.id,
    fullName: "Brayan Cristancho",
    documentNumber: "Demo-001",
    phone: "+57 300 000 0000",
    municipality: "Sogamoso",
    village: "Morca",
    notes: "Productor demo para validar AgroNodo MVP v1.",
  });

  await seedProducer({
    id: "producer-maria",
    organizationId: organization.id,
    fullName: "Maria Rodriguez",
    documentNumber: "Demo-002",
    phone: "+57 311 000 0000",
    municipality: "Tibasosa",
    village: "Patrocinio",
    notes: "Caso demo para asociacion campesina.",
  });

  await seedFarm({
    id: "farm-boyaca-demo",
    producerId: "producer-brayan",
    name: "Finca Demo Boyaca",
    municipality: "Sogamoso",
    village: "Morca",
    altitudeM: 2569,
    areaHa: 3.5,
  });

  await seedFarm({
    id: "farm-la-esperanza",
    producerId: "producer-maria",
    name: "La Esperanza",
    municipality: "Tibasosa",
    village: "Patrocinio",
    altitudeM: 2520,
    areaHa: 2.2,
  });

  await seedPlot({
    id: "plot-papa-criolla",
    farmId: "farm-boyaca-demo",
    name: "Lote Papa Criolla",
    crop: "Papa",
    areaHa: 1.2,
    plantedAt: "2026-04-15T00:00:00-05:00",
    status: "Atencion",
  });

  await seedPlot({
    id: "plot-cebolla-larga",
    farmId: "farm-boyaca-demo",
    name: "Lote Cebolla Larga",
    crop: "Cebolla",
    areaHa: 0.9,
    plantedAt: "2026-05-02T00:00:00-05:00",
    status: "Estable",
  });

  await seedPlot({
    id: "plot-arveja",
    farmId: "farm-la-esperanza",
    name: "Lote Arveja",
    crop: "Arveja",
    areaHa: 0.8,
    plantedAt: "2026-03-28T00:00:00-05:00",
    status: "Riesgo",
  });

  await seedSensor({
    id: "sensor-papa-humedad-suelo",
    plotId: "plot-papa-criolla",
    name: "Sensor virtual humedad suelo 01",
    type: "SOIL_MOISTURE",
    unit: "%",
    status: "ACTIVE",
    relativeLocation: "Centro del lote",
  });

  await seedSensor({
    id: "sensor-papa-temperatura",
    plotId: "plot-papa-criolla",
    name: "Sensor virtual temperatura ambiente 01",
    type: "AMBIENT_TEMPERATURE",
    unit: "C",
    status: "ACTIVE",
    relativeLocation: "Borde superior del lote",
  });

  await seedSensor({
    id: "sensor-cebolla-humedad-suelo",
    plotId: "plot-cebolla-larga",
    name: "Sensor virtual humedad suelo 02",
    type: "SOIL_MOISTURE",
    unit: "%",
    status: "ACTIVE",
    relativeLocation: "Zona de riego principal",
  });

  await seedSensor({
    id: "sensor-cebolla-humedad-ambiente",
    plotId: "plot-cebolla-larga",
    name: "Sensor virtual humedad ambiente 01",
    type: "AMBIENT_HUMIDITY",
    unit: "%",
    status: "MAINTENANCE",
    relativeLocation: "Entrada del lote",
  });

  await seedSensor({
    id: "sensor-arveja-temperatura",
    plotId: "plot-arveja",
    name: "Sensor virtual temperatura ambiente 02",
    type: "AMBIENT_TEMPERATURE",
    unit: "C",
    status: "ACTIVE",
    relativeLocation: "Parte baja del lote",
  });

  await seedSensor({
    id: "sensor-arveja-humedad-ambiente",
    plotId: "plot-arveja",
    name: "Sensor virtual humedad ambiente 02",
    type: "AMBIENT_HUMIDITY",
    unit: "%",
    status: "ACTIVE",
    relativeLocation: "Parte baja del lote",
  });

  await seedReadings();
  await seedAlerts();
  await seedFieldDecisions();

  console.log("AgroNodo seed completed.");
}

async function seedUser(data) {
  await prisma.user.upsert({
    where: { email: data.email },
    update: {
      name: data.name,
      role: data.role,
      organizationId: data.organizationId,
    },
    create: {
      ...data,
      passwordHash: await bcrypt.hash("agronodo-demo", 10),
    },
  });
}

async function seedProducer(data) {
  await prisma.producer.upsert({
    where: { id: data.id },
    update: data,
    create: {
      ...data,
      department: "Boyaca",
    },
  });
}

async function seedFarm(data) {
  await prisma.farm.upsert({
    where: { id: data.id },
    update: data,
    create: {
      ...data,
      department: "Boyaca",
    },
  });
}

async function seedPlot(data) {
  await prisma.plot.upsert({
    where: { id: data.id },
    update: {
      ...data,
      plantedAt: new Date(data.plantedAt),
    },
    create: {
      ...data,
      plantedAt: new Date(data.plantedAt),
    },
  });
}

async function seedSensor(data) {
  await prisma.sensor.upsert({
    where: { id: data.id },
    update: data,
    create: data,
  });
}

async function seedReadings() {
  for (const [sensorId, values] of Object.entries(sensorReadings)) {
    const sensor = await prisma.sensor.findUnique({
      where: { id: sensorId },
      select: { unit: true },
    });

    if (!sensor) {
      continue;
    }

    for (const [index, value] of values.entries()) {
      await prisma.reading.upsert({
        where: { id: `reading-${sensorId}-${index + 1}` },
        update: {
          value,
          unit: sensor.unit,
          origin: "SIMULATED",
          takenAt: new Date(readingDates[index]),
        },
        create: {
          id: `reading-${sensorId}-${index + 1}`,
          sensorId,
          value,
          unit: sensor.unit,
          origin: "SIMULATED",
          takenAt: new Date(readingDates[index]),
        },
      });
    }
  }
}

async function seedAlerts() {
  await prisma.alert.upsert({
    where: { id: "alert-sensor-papa-humedad-suelo" },
    update: {},
    create: {
      id: "alert-sensor-papa-humedad-suelo",
      plotId: "plot-papa-criolla",
      sensorId: "sensor-papa-humedad-suelo",
      type: "LOW_SOIL_MOISTURE",
      severity: "HIGH",
      status: "ACTIVE",
      message: "Humedad del suelo baja: 22 %.",
      detectedValue: 22,
      threshold: 25,
      createdAt: new Date("2026-06-09T06:00:00-05:00"),
    },
  });

  await prisma.alert.upsert({
    where: { id: "alert-sensor-arveja-temperatura" },
    update: {},
    create: {
      id: "alert-sensor-arveja-temperatura",
      plotId: "plot-arveja",
      sensorId: "sensor-arveja-temperatura",
      type: "FROST_RISK",
      severity: "CRITICAL",
      status: "ACTIVE",
      message: "Riesgo de helada: temperatura en 3 C.",
      detectedValue: 3,
      threshold: 4,
      createdAt: new Date("2026-06-09T06:00:00-05:00"),
    },
  });

  await prisma.alert.upsert({
    where: { id: "alert-sensor-arveja-humedad-ambiente" },
    update: {},
    create: {
      id: "alert-sensor-arveja-humedad-ambiente",
      plotId: "plot-arveja",
      sensorId: "sensor-arveja-humedad-ambiente",
      type: "HIGH_AMBIENT_HUMIDITY",
      severity: "MEDIUM",
      status: "ACTIVE",
      message: "Humedad ambiental alta: 92 %.",
      detectedValue: 92,
      threshold: 90,
      createdAt: new Date("2026-06-09T06:00:00-05:00"),
    },
  });
}

async function seedFieldDecisions() {
  await prisma.fieldDecision.upsert({
    where: { id: "decision-papa-riego-corto" },
    update: {
      status: "APPLIED",
      title: "Riego corto aplicado",
      actionTaken: "Se aplico riego corto solo en el sector con humedad mas baja.",
      reason: "La humedad manual confirmo suelo seco bajo 25%.",
      waterImpactM3: 1.6,
      decidedAt: new Date("2026-06-10T14:30:00-05:00"),
    },
    create: {
      id: "decision-papa-riego-corto",
      farmId: "farm-boyaca-demo",
      plotId: "plot-papa-criolla",
      alertId: "alert-sensor-papa-humedad-suelo",
      userId: "user-admin-demo",
      status: "APPLIED",
      title: "Riego corto aplicado",
      actionTaken: "Se aplico riego corto solo en el sector con humedad mas baja.",
      reason: "La humedad manual confirmo suelo seco bajo 25%.",
      waterImpactM3: 1.6,
      decidedAt: new Date("2026-06-10T14:30:00-05:00"),
    },
  });

  await prisma.fieldDecision.upsert({
    where: { id: "decision-arveja-helada" },
    update: {
      status: "APPLIED",
      title: "Revision por noche fria",
      actionTaken: "Se evito riego nocturno y se reviso el lote al amanecer.",
      reason: "Habia humedad ambiente alta con riesgo de frio.",
      decidedAt: new Date("2026-06-08T06:10:00-05:00"),
    },
    create: {
      id: "decision-arveja-helada",
      farmId: "farm-la-esperanza",
      plotId: "plot-arveja",
      alertId: "alert-sensor-arveja-humedad-ambiente",
      userId: "user-admin-demo",
      status: "APPLIED",
      title: "Revision por noche fria",
      actionTaken: "Se evito riego nocturno y se reviso el lote al amanecer.",
      reason: "Habia humedad ambiente alta con riesgo de frio.",
      decidedAt: new Date("2026-06-08T06:10:00-05:00"),
    },
  });
}

function loadEnvFile() {
  const envPath = resolve(process.cwd(), ".env");

  if (!existsSync(envPath)) {
    return;
  }

  const envFile = readFileSync(envPath, "utf8");

  for (const line of envFile.split(/\r?\n/)) {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);

    if (!match) {
      continue;
    }

    const key = match[1];
    let value = match[2] ?? "";
    value = value.replace(/^['"]|['"]$/g, "");

    if (!process.env[key]) {
      process.env[key] = value;
    }
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
