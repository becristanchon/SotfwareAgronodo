-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PRODUCER', 'FIELD_TECH', 'AGRONOMIST', 'INSTITUTION', 'ADMIN');

-- CreateEnum
CREATE TYPE "SensorType" AS ENUM ('SOIL_MOISTURE', 'AMBIENT_TEMPERATURE', 'AMBIENT_HUMIDITY');

-- CreateEnum
CREATE TYPE "SensorStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'MAINTENANCE');

-- CreateEnum
CREATE TYPE "ReadingOrigin" AS ENUM ('SIMULATED', 'DEVICE', 'MANUAL');

-- CreateEnum
CREATE TYPE "AlertType" AS ENUM ('LOW_SOIL_MOISTURE', 'FROST_RISK', 'HIGH_AMBIENT_HUMIDITY');

-- CreateEnum
CREATE TYPE "AlertSeverity" AS ENUM ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL');

-- CreateEnum
CREATE TYPE "AlertStatus" AS ENUM ('ACTIVE', 'ACKNOWLEDGED', 'RESOLVED');

-- CreateEnum
CREATE TYPE "FieldDecisionStatus" AS ENUM ('APPLIED', 'DISCARDED', 'PENDING_REVIEW');

-- CreateTable
CREATE TABLE "Organization" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Organization_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "UserRole" NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Producer" (
    "id" TEXT NOT NULL,
    "organizationId" TEXT,
    "fullName" TEXT NOT NULL,
    "documentNumber" TEXT,
    "phone" TEXT,
    "department" TEXT NOT NULL DEFAULT 'Boyaca',
    "municipality" TEXT,
    "village" TEXT,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Producer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Farm" (
    "id" TEXT NOT NULL,
    "producerId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "department" TEXT NOT NULL DEFAULT 'Boyaca',
    "municipality" TEXT,
    "village" TEXT,
    "altitudeM" INTEGER,
    "latitude" DECIMAL(9,6),
    "longitude" DECIMAL(9,6),
    "areaHa" DECIMAL(10,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Farm_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Plot" (
    "id" TEXT NOT NULL,
    "farmId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "crop" TEXT NOT NULL,
    "areaHa" DECIMAL(10,2),
    "plantedAt" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'MONITORED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Plot_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sensor" (
    "id" TEXT NOT NULL,
    "plotId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "SensorType" NOT NULL,
    "unit" TEXT NOT NULL,
    "status" "SensorStatus" NOT NULL DEFAULT 'ACTIVE',
    "relativeLocation" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sensor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reading" (
    "id" TEXT NOT NULL,
    "sensorId" TEXT NOT NULL,
    "value" DECIMAL(10,2) NOT NULL,
    "unit" TEXT NOT NULL,
    "origin" "ReadingOrigin" NOT NULL DEFAULT 'SIMULATED',
    "takenAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Reading_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alert" (
    "id" TEXT NOT NULL,
    "plotId" TEXT NOT NULL,
    "sensorId" TEXT,
    "type" "AlertType" NOT NULL,
    "severity" "AlertSeverity" NOT NULL,
    "status" "AlertStatus" NOT NULL DEFAULT 'ACTIVE',
    "message" TEXT NOT NULL,
    "detectedValue" DECIMAL(10,2),
    "threshold" DECIMAL(10,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "acknowledgedAt" TIMESTAMP(3),
    "resolvedAt" TIMESTAMP(3),

    CONSTRAINT "Alert_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FieldDecision" (
    "id" TEXT NOT NULL,
    "farmId" TEXT NOT NULL,
    "plotId" TEXT NOT NULL,
    "alertId" TEXT,
    "userId" TEXT,
    "status" "FieldDecisionStatus" NOT NULL,
    "title" TEXT NOT NULL,
    "actionTaken" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "waterImpactM3" DECIMAL(10,2),
    "decidedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FieldDecision_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Reading_sensorId_takenAt_idx" ON "Reading"("sensorId", "takenAt");

-- CreateIndex
CREATE INDEX "Alert_plotId_status_createdAt_idx" ON "Alert"("plotId", "status", "createdAt");

-- CreateIndex
CREATE INDEX "FieldDecision_farmId_decidedAt_idx" ON "FieldDecision"("farmId", "decidedAt");

-- CreateIndex
CREATE INDEX "FieldDecision_plotId_decidedAt_idx" ON "FieldDecision"("plotId", "decidedAt");

-- CreateIndex
CREATE INDEX "FieldDecision_alertId_idx" ON "FieldDecision"("alertId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Producer" ADD CONSTRAINT "Producer_organizationId_fkey" FOREIGN KEY ("organizationId") REFERENCES "Organization"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Farm" ADD CONSTRAINT "Farm_producerId_fkey" FOREIGN KEY ("producerId") REFERENCES "Producer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Plot" ADD CONSTRAINT "Plot_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sensor" ADD CONSTRAINT "Sensor_plotId_fkey" FOREIGN KEY ("plotId") REFERENCES "Plot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Reading" ADD CONSTRAINT "Reading_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "Sensor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_plotId_fkey" FOREIGN KEY ("plotId") REFERENCES "Plot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alert" ADD CONSTRAINT "Alert_sensorId_fkey" FOREIGN KEY ("sensorId") REFERENCES "Sensor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldDecision" ADD CONSTRAINT "FieldDecision_farmId_fkey" FOREIGN KEY ("farmId") REFERENCES "Farm"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldDecision" ADD CONSTRAINT "FieldDecision_plotId_fkey" FOREIGN KEY ("plotId") REFERENCES "Plot"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldDecision" ADD CONSTRAINT "FieldDecision_alertId_fkey" FOREIGN KEY ("alertId") REFERENCES "Alert"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FieldDecision" ADD CONSTRAINT "FieldDecision_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
