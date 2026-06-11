import Image from "next/image";
import {
  demoProfilesByRole,
  roleDescriptions,
  roleLabels,
  type ExperienceRole,
} from "@/lib/profile";
import { getCurrentProfile } from "@/lib/session";

const loginRoles: ExperienceRole[] = [
  "PRODUCER",
  "FIELD_TECH",
  "AGRONOMIST",
  "INSTITUTION",
  "ADMIN",
];

export default async function LoginPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const activeProfile = await getCurrentProfile();
  const params = await searchParams;
  const loginError = params?.error === "credenciales";

  return (
    <main className="min-h-screen bg-[#f4f7f2] px-6 py-8 text-slate-950">
      <section className="mx-auto grid min-h-[calc(100vh-4rem)] max-w-6xl items-center gap-8 lg:grid-cols-[0.95fr_1.05fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image
              alt="AgroNodo"
              className="h-14 w-14 rounded-lg object-contain"
              height={56}
              src="/agronodo-logo.png"
              width={56}
            />
            <div>
              <p className="text-2xl font-semibold">AgroNodo</p>
              <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                Gestion inteligente del agua
              </p>
            </div>
          </div>

          <h1 className="mt-8 max-w-xl text-4xl font-semibold leading-tight">
            Ingresa segun el tipo de usuario que quieres validar
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600">
            Este login demo permite probar AgroNodo como productor, tecnico,
            agronomo, entidad o administrador sin depender todavia de una base
            de datos productiva.
          </p>

          <div className="mt-6 rounded-lg border border-emerald-100 bg-emerald-50 p-4">
            <p className="text-sm font-semibold text-emerald-900">
              Vista actual: {roleLabels[activeProfile.role]}
            </p>
            <p className="mt-1 text-sm text-emerald-950">
              {activeProfile.name} - {activeProfile.organization.name}
            </p>
          </div>

          <div className="mt-5 rounded-lg border border-slate-200 bg-white p-4">
            <p className="text-sm font-semibold text-slate-900">
              Acceso real con base de datos
            </p>
            <p className="mt-1 text-sm leading-6 text-slate-600">
              Usuarios seed: productor@, tecnico@, agronomo@, entidad@ o
              admin@agronodo.local. Contrasena: agronodo-demo.
            </p>
          </div>
        </div>

        <section className="grid gap-5">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Login real
            </p>
            <h2 className="mt-1 text-2xl font-semibold">Ingresar con usuario</h2>

            {loginError ? (
              <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-900">
                Credenciales invalidas. Revisa el correo y la contrasena.
              </div>
            ) : null}

            <form action="/api/auth/login" className="mt-5 grid gap-3" method="post">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">Correo</span>
                <input
                  className="rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500"
                  defaultValue="admin@agronodo.local"
                  name="email"
                  type="email"
                />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">
                  Contrasena
                </span>
                <input
                  className="rounded-md border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500"
                  defaultValue="agronodo-demo"
                  name="password"
                  type="password"
                />
              </label>
              <button className="rounded-md bg-emerald-800 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-900">
                Entrar con usuario real
              </button>
            </form>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
              Perfiles demo
            </p>
            <h2 className="mt-1 text-2xl font-semibold">Seleccionar experiencia</h2>

            <form action="/api/auth/login" className="mt-5 grid gap-3" method="post">
            {loginRoles.map((role) => {
              const profile = demoProfilesByRole[role];
              const active = activeProfile.role === role;

              return (
                <label
                  className={`grid cursor-pointer gap-2 rounded-lg border p-4 ${
                    active
                      ? "border-emerald-500 bg-emerald-50"
                      : "border-slate-200 bg-slate-50 hover:border-emerald-200"
                  }`}
                  key={role}
                >
                  <span className="flex items-start gap-3">
                    <input
                      className="mt-1 h-4 w-4 accent-emerald-700"
                      defaultChecked={active}
                      name="role"
                      type="radio"
                      value={role}
                    />
                    <span>
                      <span className="block text-base font-semibold text-slate-950">
                        {roleLabels[role]}
                      </span>
                      <span className="mt-1 block text-sm leading-6 text-slate-600">
                        {roleDescriptions[role]}
                      </span>
                      <span className="mt-2 block text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {profile.email}
                      </span>
                    </span>
                  </span>
                </label>
              );
            })}

            <button className="mt-3 rounded-md bg-slate-950 px-4 py-3 text-sm font-semibold text-white hover:bg-emerald-800">
              Entrar a AgroNodo
            </button>
            </form>
          </div>
        </section>
      </section>
    </main>
  );
}
