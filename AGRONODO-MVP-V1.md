# AgroNodo MVP v1

## Decision CTO

AgroNodo MVP v1 is a software-first platform for intelligent agricultural water management with simulated data.

The goal is not to prove sensors. The goal is to prove that a producer, technician, association, or public entity can make better decisions about water, irrigation, risk, and productivity from structured data, history, recommendations, and alerts.

## Product Filter

Before building any module, answer:

Why does this module move AgroNodo closer to real users?

If the answer is not clear, the module does not enter MVP v1.

## Scope

Included:

- Authentication.
- Producers.
- Farms.
- Plots.
- Virtual sensors.
- Simulated readings.
- Alerts.
- Dashboard.
- Basic reports/history.
- Water efficiency indicators.
- Irrigation recommendations.

Excluded for now:

- Real ESP32 integration.
- LoRaWAN gateways.
- MQTT ingestion.
- Drone imagery.
- Predictive AI.
- Native mobile apps.
- Microservices.
- Kubernetes.

## Architecture

MVP v1 uses a modular monolith:

- Frontend: Next.js.
- Backend: Next.js route handlers.
- Database: PostgreSQL.
- ORM: Prisma.
- Authentication: JWT/session-based auth.
- Styling: CSS/Tailwind-ready structure.
- Deployment target: Render, Railway, or low-cost VPS.

This keeps development fast for one founder while preserving a clean path to future separation of services.

## Core Data Model

- User: platform operator or administrator.
- Organization: future support for associations, UMATAS, municipalities, and institutions.
- Producer: small agricultural producer.
- Farm: productive unit owned or managed by a producer.
- Plot: monitored area inside a farm.
- Sensor: virtual or physical data source.
- Reading: captured or simulated measurement.
- Alert: actionable condition detected from readings.

## Initial Agricultural Variables

- Soil moisture, measured as percentage.
- Ambient temperature, measured in Celsius.
- Ambient humidity, measured as percentage.

Future variables:

- Soil temperature.
- Rainfall.
- Solar radiation.
- NDVI.
- Wind speed.

## Initial Alert Rules

- Low soil moisture: below 25%.
- Frost risk: ambient temperature below 4 C.
- High ambient humidity: above 90%.

## Sprint Plan

### Sprint 0: Project Foundation

Objective: create the technical base.

Deliverables:

- Next.js project structure.
- Prisma schema.
- Environment template.
- MVP technical document.
- First static dashboard with simulated data.

### Sprint 1: Agricultural Registry

Objective: represent real productive context.

Deliverables:

- Producer CRUD.
- Farm CRUD.
- Plot CRUD.
- Basic validation.
- Seed data for Boyaca demo.

Current implementation:

- Producer, farm, and plot read views.
- Typed demo data.
- Read APIs for producers, farms, and plots.
- Dashboard connected to the agricultural registry.

### Sprint 2: Virtual Sensors

Objective: configure monitoring sources before real hardware exists.

Deliverables:

- Sensor CRUD.
- Sensor types.
- Sensor status.
- Plot-sensor assignment.

Current implementation:

- Typed virtual sensor data.
- Sensor status badges.
- Sensor read API.
- `/sensores` page.
- Dashboard and plot views connected to sensor counts.

### Sprint 3: Simulated Readings

Objective: make AgroNodo produce useful agricultural data.

Deliverables:

- Reading generator.
- Latest readings.
- Historical readings by date range.
- Realistic ranges by variable.

Current implementation:

- Deterministic simulated reading history.
- Reading API with optional sensor filter.
- `/historicos` page.
- 7-day trend visualization in sensor cards.
- Dashboard connected to total reading count.

### Sprint 4: Dashboard

Objective: show value quickly.

Deliverables:

- General dashboard.
- Farm detail.
- Plot detail.
- Charts for variables.
- Operational status indicators.

Current implementation:

- Executive dashboard as decision center.
- Prioritized recommended actions.
- Farm health summary.
- Dashboard API.
- Operational detail by farm and plot.

### Sprint 5: Alerts

Objective: turn data into decisions.

Deliverables:

- Threshold rules.
- Alert generation.
- Alert list.
- Acknowledge and resolve states.

Current implementation:

- Threshold rules over latest simulated readings.
- Active alert generation.
- Alert API with status and plot filters.
- `/alertas` page.
- Dashboard and plot views connected to generated alerts.

### Sprint 6: Demo

Objective: prepare external validation.

Deliverables:

- Public deploy.
- Demo data.
- Short usage guide.
- Pilot-ready workflow.

Current implementation:

- Printable pilot report.
- Report API.
- Executive summary.
- Farm health section.
- Priority alerts and recommended actions.

### Sprint 7: Persistence Foundation

Objective: prepare real persistence without breaking the working demo.

Deliverables:

- Docker Compose PostgreSQL.
- Prisma seed.
- Local database setup guide.
- Stable demo data in database shape.

Current implementation:

- `docker-compose.yml`.
- `prisma/seed.mjs`.
- `docs/SETUP-POSTGRES-LOCAL.md`.
- `docs/SPRINT-7-PERSISTENCIA-BASE.md`.

### Sprint 8: Data Access Layer

Objective: decouple APIs from direct demo data before switching to Prisma.

Deliverables:

- Data repository.
- Data source status.
- API metadata for current data mode.
- System status endpoint.

Current implementation:

- `src/lib/data-repository.ts`.
- `GET /api/system/status`.
- Main APIs return `meta` with data source status.

### Sprint 9: Prisma Adapter

Objective: prepare database reads behind the data repository.

Deliverables:

- Demo repository.
- Database repository.
- Prisma read methods for core entities.
- Database-mode dashboard/report placeholders.

Current implementation:

- `AGRONODO_DATA_SOURCE=demo` remains active.
- `AGRONODO_DATA_SOURCE=database` can route reads through Prisma once PostgreSQL is available.
- No UI rewrite required for the future switch.

### Sprint 10: CRUD Contracts

Objective: prepare validated writes for core agricultural entities.

Deliverables:

- Zod validation schemas.
- POST contracts for producers, farms, and plots.
- Read-only demo mode guard.
- Prisma create methods for database mode.

Current implementation:

- `POST /api/producers`.
- `POST /api/farms`.
- `POST /api/plots`.
- Demo mode returns `409 READ_ONLY_DEMO_MODE`.

### Sprint 11: CRUD Forms

Objective: validate data capture workflows in the UI.

Deliverables:

- Producer form.
- Farm form.
- Plot form.
- API response feedback.
- Demo read-only messaging.

Current implementation:

- `/productores` includes `ProducerForm`.
- `/fincas` includes `FarmForm`.
- `/lotes` includes `PlotForm`.
- Forms call real API contracts and surface demo-mode blocking.

### Sprint 12: Virtual Sensor CRUD

Objective: configure virtual sensors through the UI.

Deliverables:

- Sensor validation schema.
- `POST /api/sensors`.
- Sensor create method in repository.
- Sensor form in `/sensores`.

Current implementation:

- Sensor creation is ready for database mode.
- Demo mode returns `409 READ_ONLY_DEMO_MODE`.

### Sprint 13: Manual Readings

Objective: allow manual field measurements before real IoT hardware.

Deliverables:

- Reading validation schema.
- `POST /api/readings`.
- Reading create method in repository.
- Manual reading form in `/historicos`.

Current implementation:

- Manual readings are ready for database mode.
- Demo mode returns `409 READ_ONLY_DEMO_MODE`.

### Sprint 14: Alert Workflow

Objective: manage the lifecycle of alerts.

Deliverables:

- Alert status validation schema.
- `PATCH /api/alerts`.
- Alert update method in repository.
- Alert action buttons in `/alertas`.

Current implementation:

- Alerts can be marked as reviewed or resolved in database mode.
- Demo mode returns `409 READ_ONLY_DEMO_MODE`.

### Sprint 15: Demo Profile

Objective: introduce role-based profiles without full authentication.

Deliverables:

- Profile model helpers.
- Current profile repository method.
- `GET /api/me`.
- `/perfil` page.
- Role capability mapping.

Current implementation:

- Demo user is an `ADMIN`.
- Database mode reads the first user with organization.
- UI shows role, organization, data mode, and capabilities.

### Sprint 16: Product Realism

Objective: make core operational views feel like a real AgTech product.

Deliverables:

- Alert queue UI.
- Historical analytics UI.
- Sensor inventory table.
- Stronger operational language.

Current implementation:

- `/alertas` redesigned as an operational queue.
- `/historicos` redesigned as an analytics workspace.

### Sprint 17: Configurable Alert Rules

Objective: let users tune warning and critical thresholds with guardrails.

Deliverables:

- Alert rule model in demo data.
- Alert rule API.
- `/reglas` page.
- Slider-based threshold controls.

Current implementation:

- Three global rules: soil moisture, ambient temperature, ambient humidity.
- UI changes are local in demo mode.
- Persistence is deferred until PostgreSQL is active.

### Sprint 18: Farm Characterization

Objective: add identity and context to each farm.

Deliverables:

- Farm profile model in demo data.
- Farm profile cards.
- Farm detail page.
- Production context: water, soil, irrigation, challenges, notes.

Current implementation:

- `/fincas` now presents farm identity instead of flat cards.
- `/fincas/[farmId]` shows the farm profile.

### Sprint 19: Producer Characterization and Farm Progress

Objective: make AgroNodo feel more human and interactive.

Deliverables:

- Producer profile model in demo data.
- Producer profile cards.
- Producer detail page.
- Characterization hub.
- Farm progress stages.

Current implementation:

- `/productores` now presents human producer profiles.
- `/productores/[producerId]` shows producer characterization.
- `/caracterizacion` explains where context is registered.
- `/fincas/[farmId]` shows adoption progress for each farm.

### Sprint 20: Plot Characterization

Objective: make each plot feel like an agronomic decision unit.

Deliverables:

- Plot profile model in demo data.
- Plot profile cards.
- Plot detail page.
- Current decision and recommended action.
- Operational progress by plot.

Current implementation:

- `/lotes` now shows plot context, crop stage, dominant risk and progress.
- `/lotes/[plotId]` shows the plot profile and field decision.
- `/fincas/[farmId]` links each plot to its detail.
- `/caracterizacion` includes plot characterization as active.

### Sprint 21: Farm AgroNodo Status

Objective: make Farm the main incorporation and management center.

Deliverables:

- Farm AgroNodo status model in demo data.
- Seven BPM states.
- Scores for characterization, training, implementation, monitoring, data usage, and impact.
- Farm status dashboard.
- Criteria checklist and transformation history.

Current implementation:

- `/fincas` shows Estado AgroNodo and adoption score.
- `/fincas/[farmId]` is now an incorporation and management dashboard.
- The main progression is: Registrada, Diagnosticada, Planificada, Implementada, Operativa, Gestionada, Evaluada.
- Dimensions such as training, monitoring and impact are measured in parallel, not used as primary stages.

### Sprint 22: Water-First Product Pivot

Objective: reposition AgroNodo around intelligent water management.

Deliverables:

- Farm water profile model in demo data.
- Water efficiency score.
- Estimated weekly water use.
- Potential weekly water savings.
- Water-centered farm progression.
- Dashboard copy and metrics aligned to water.

Current implementation:

- The dashboard now prioritizes water use, potential savings, and water efficiency.
- `/fincas` presents farms through water efficiency and irrigation status.
- `/fincas/[farmId]` uses a water management cycle.
- `/caracterizacion` is now framed as water characterization.
- The water cycle separates estimated savings from verified water sustainability.

### Sprint 23: Producer-First UX

Objective: make AgroNodo understandable for rural producers in less than five minutes.

Deliverables:

- Producer-oriented navigation.
- Technical modules moved to advanced navigation.
- Dashboard reframed as daily answer.
- Alerts reframed as recommended actions.
- UX adoption plan.

Current implementation:

- Main navigation is now: Hoy, Agua, Mi finca, Que hacer, Avance.
- Advanced navigation contains producers, measurements, notices, devices, and reports.
- Home answers what to review today before showing metrics.
- Alert cards prioritize action language over technical alert language.

### Sprint 24: Progressive Multiuser Experience

Objective: allow the same AgroNodo data to be consumed at different levels of depth.

Deliverables:

- Product experience roles for producer, field technician, agronomist, territorial entity, and admin.
- Role-based navigation without duplicating modules.
- Temporary compatibility mapping from existing database roles.
- Profile page that explains AgroNodo experience layers.
- Decision to avoid new interaction libraries until the product language and role structure are stable.

Current implementation:

- `src/lib/profile.ts` is now the source of truth for experience roles, capabilities, and navigation.
- The app shell builds the menu from the active role.
- Demo mode starts in producer view.
- Database roles are mapped to product roles so the current Prisma schema remains compatible.
- `/perfil` shows the active view and the full progressive experience model.

### Sprint 25: Dashboard by Audience

Objective: make the home dashboard adapt its message and KPIs to the active user role.

Deliverables:

- Role-based home narrative.
- Role-based primary answer.
- Role-based KPI labels.
- Active view displayed in the dashboard context panel.
- Same data source reused across all roles.

Current implementation:

- `/` reads the active experience role from `demoProfile`.
- Producers see daily irrigation decisions.
- Field technicians see operational follow-up.
- Agronomists see diagnostic framing.
- Territorial entities see coverage and water impact.
- Admins see pilot health and system operation.

### Sprint 26: Demo Login and Differentiated Profiles

Objective: allow AgroNodo to be tested through different user profiles before implementing production authentication.

Deliverables:

- Demo login page.
- Role cookie for the active experience profile.
- Login and logout endpoints.
- Session helper for resolving the active profile.
- App shell, dashboard, profile page, and `/api/me` connected to the active profile.

Current implementation:

- `/login` lets users enter as producer, field technician, agronomist, territorial entity, or admin.
- `/api/auth/login` stores the selected role in a secure HTTP-only demo cookie.
- `/api/auth/logout` clears the demo session.
- The navigation and home dashboard now react to the selected profile.
- This is not yet production authentication; it is a product validation layer for the MVP.

### Sprint 27: Demo Route Permissions

Objective: make differentiated profiles affect real access, not only navigation.

Deliverables:

- Middleware-based route protection.
- Centralized access policy by experience role.
- Login required for protected routes.
- Limited-access redirect to profile page.
- Shared auth constant for the demo role cookie.

Current implementation:

- Users without an active profile are redirected to `/login`.
- Users who enter a route outside their profile are redirected to `/perfil?acceso=limitado`.
- Producers only see the practical product layer.
- Technicians, agronomists, entities, and admins receive progressively deeper access.
- `npm run build` now reports active middleware.

### Sprint 28: Action-Level Permissions

Objective: make role permissions affect concrete actions inside each page and API endpoint.

Deliverables:

- Capability helper.
- Restricted action component.
- API authorization helper.
- Conditional forms by capability.
- Protected creation and update endpoints.

Current implementation:

- Producers can consult and act on recommendations, but cannot create sensors, farms, lots, producers, or readings.
- Technical users can access operational forms according to their capabilities.
- API mutations return `403` when the active profile lacks permission.
- Middleware now lets `/api/*` pass so each endpoint can enforce its own action policy.
- UI and API share the same capability model.

### Sprint 29: Live Crop State

Objective: translate technical agricultural data into a simple visual crop state.

Deliverables:

- Live crop state rule engine.
- Crop visual component.
- Live crop state card.
- Dashboard integration.
- Plot detail integration with technical explanation.

Current implementation:

- `/` shows the live crop state for the priority plot.
- `/lotes/[plotId]` shows the full live crop state for each plot.
- Supported states: optimal, low moisture, water stress, excess water, frost risk, and no data.
- The component shows message, recommendation, confidence, primary variable, trend, and last reading.
- Technical detail is available outside the basic producer layer.

### Sprint 30: Live Crop State by Farm

Objective: make each farm show the live state of its plots.

Deliverables:

- Compact live crop state card.
- Farm list integration.
- Farm detail integration.
- Plot-level visual comparison inside the farm module.

Current implementation:

- `/fincas` shows each farm with a live crop state grid for its plots.
- `/fincas/[farmId]` replaces the technical plot list with live crop state cards.
- Each compact card links to the full plot detail.
- The farm module now gives a quick answer about which plot requires attention.

### Sprint 31: Farm Prioritization

Objective: help users know which plot of a farm should be reviewed first.

Deliverables:

- Farm live summary engine.
- Farm priority panel.
- Automatic urgent plot selection.
- Counts by live crop state.
- Direct link to the priority plot.

Current implementation:

- `/fincas` shows the main priority for each farm.
- `/fincas/[farmId]` shows the farm priority before the maturity cycle.
- Prioritization considers no data, frost risk, water stress, excess water, low moisture, and favorable state.
- The farm module now answers where to look first and what action to take.

### Sprint 32: Field Decision Log

Objective: close the loop between recommendation, field decision, and expected impact.

Deliverables:

- Demo field decision model.
- Decision timeline component.
- Interactive demo decision recorder.
- Alert recommendation integration.
- Plot and farm decision history.
- MVP plan review document.

Current implementation:

- Recommendations in `/alertas` now allow users to confirm a field decision in demo mode.
- `/lotes/[plotId]` shows the decision history for the plot.
- `/fincas/[farmId]` shows recent decisions for the farm.
- `docs/REVISION-PLAN-MVP.md` documents what is built, what is missing, and the next strategic sprints.
- The next major technical step is persisting `FieldDecision` in PostgreSQL.

### Sprint 33: CRUD Permissions Review

Objective: align CRUD actions with the correct user profiles.

Deliverables:

- CRUD permission matrix.
- Active profile action list.
- Field technician producer management permission.
- Producer report route access.
- Rule editing restricted to agronomist/admin.
- Profile page permission audit.

Current implementation:

- `src/lib/profile.ts` now defines `crudPermissionMatrix`.
- `/perfil` shows available actions and CRUD permissions by role.
- Field technicians can register producers, farms, plots, sensors and readings.
- Producers can access reports and attend recommendations.
- Rule cards are editable only for agronomist/admin; other allowed profiles can consult them.
- `npm run lint` and `npm run build` pass after the permission review.

### Sprint 34: API and Database Readiness Review

Objective: align CRUD permissions, APIs, validation, Prisma schema and seed data before syncing with PostgreSQL.

Deliverables:

- Persistent `FieldDecision` Prisma model.
- `FieldDecisionStatus` enum.
- Validation schema for field decisions.
- Repository support for demo and database modes.
- `/api/field-decisions` endpoint.
- Field decision recorder connected to the API contract.
- Seed data for field decisions.
- Prisma Client regenerated.

Current implementation:

- Field decisions can now be listed and created through the repository in database mode.
- `GET /api/field-decisions` supports filters by farm, plot and alert.
- `POST /api/field-decisions` is protected by `manage_alerts`.
- `prisma/seed.mjs` can create demo field decisions.
- `npx prisma validate`, `npx prisma generate`, `npm run lint` and `npm run build` pass.
- Pending DB step: run `npx prisma migrate dev --name add-field-decisions` when PostgreSQL is active.

### Sprint 35: Decision Logs Connected to Repository

Objective: make field decision timelines read from the data repository instead of demo-only helpers.

Deliverables:

- Plot decision timeline connected to `dataRepository.fieldDecisions`.
- Farm decision timeline connected to `dataRepository.fieldDecisions`.
- Timeline compatibility with Prisma-returned values.

Current implementation:

- `/lotes/[plotId]` lists decisions through the repository using `plotId`.
- `/fincas/[farmId]` lists decisions through the repository using `farmId`.
- Demo mode keeps showing simulated decisions.
- Database mode will read decisions from PostgreSQL through Prisma.
- `npm run lint` and `npm run build` pass.

### Sprint 36: Real Authentication Base

Objective: add real email/password authentication while keeping demo profile selection for MVP validation.

Deliverables:

- Authentication helper with bcrypt and JWT.
- Real session cookie.
- Demo role cookie preserved.
- Login route supporting real and demo modes.
- Logout clearing both session types.
- Session resolver prioritizing real user session.
- Login page with real credentials form and demo role selector.

Current implementation:

- `/login` supports `admin@agronodo.local` / `agronodo-demo` when the seeded database is active.
- `src/lib/auth.ts` validates password hashes and creates JWT sessions.
- `src/lib/session.ts` resolves the active profile from a real session first, then demo.
- Middleware accepts either a real session cookie or a demo role cookie.
- `npx prisma validate`, `npm run lint` and `npm run build` pass.
- Production deployments should define `AGRONODO_AUTH_SECRET`.

### Sprint 37: Field Decisions Linked to User

Objective: associate field decisions with the authenticated user in database mode.

Deliverables:

- Authenticated user id helper.
- Field decision API user attribution.
- Timeline support for Prisma user relation.
- Demo compatibility preserved.

Current implementation:

- `POST /api/field-decisions` derives `userId` from the real session JWT.
- Clients cannot spoof the responsible user.
- Timelines show `decision.user.name` in database mode and `decidedBy` in demo mode.
- `npx prisma validate`, `npm run lint` and `npm run build` pass.

### Sprint 38: Real Roles in Prisma

Objective: align database roles with AgroNodo's real experience roles.

Deliverables:

- Prisma `UserRole` updated to product roles.
- Compatibility mapping for old roles.
- Seed users for producer, field technician, agronomist, territorial entity and admin.
- Login copy updated with real seed users.
- Prisma Client regenerated.

Current implementation:

- `UserRole` now supports `PRODUCER`, `FIELD_TECH`, `AGRONOMIST`, `INSTITUTION` and `ADMIN`.
- `mapDatabaseRoleToExperienceRole` accepts new roles directly and still tolerates old role names during transition.
- `prisma/seed.mjs` creates one real user per role.
- `npx prisma validate`, `npx prisma generate`, `npm run lint` and `npm run build` pass.
- Pending DB migration: `npx prisma migrate dev --name align-user-roles`.

## MVP Success Criteria

AgroNodo MVP v1 is successful if a real producer, association, or institutional contact can understand:

- Which farm has water risk.
- Which plot needs irrigation review.
- Which variable is outside the expected range.
- What happened historically.
- What action should be reviewed next.
- How much water could potentially be saved.
