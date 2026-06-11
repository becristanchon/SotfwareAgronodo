import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { getDataSourceStatus } from "@/lib/data-repository";
import { getNavigationForRole, roleLabels } from "@/lib/profile";
import { getCurrentProfile } from "@/lib/session";

export async function AppShell({ children }: { children: ReactNode }) {
  const dataSource = getDataSourceStatus();
  const profile = await getCurrentProfile();
  const navGroups = getNavigationForRole(profile.role);

  return (
    <main className="min-h-screen bg-[#f4f7f2] text-slate-950">
      <div className="mx-auto grid min-h-screen max-w-[1500px] lg:grid-cols-[280px_1fr]">
        <aside className="hidden border-r border-slate-200 bg-white px-5 py-5 lg:sticky lg:top-0 lg:block lg:h-screen">
          <div className="flex items-center gap-3">
            <Image
              alt="AgroNodo"
              className="h-12 w-12 rounded-lg object-contain"
              height={48}
              src="/agronodo-logo.png"
              width={48}
            />
            <div className="min-w-0">
              <p className="break-words text-lg font-semibold leading-tight">AgroNodo</p>
              <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
                Boyaca MVP
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-emerald-100 bg-emerald-50 p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-800">
              Piloto activo
            </p>
            <p className="mt-1 text-sm font-semibold text-slate-900">
              Gestion hidrica simulada
            </p>
            <p className="mt-1 text-xs text-slate-600">
              Vista {roleLabels[profile.role]} - Sogamoso y Tibasosa
            </p>
          </div>

          <nav className="mt-6 grid gap-5">
            {navGroups.map((group) => (
              <div key={group.label}>
                <p className="px-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  {group.label}
                </p>
                <div className="mt-2 grid gap-1">
                  {group.items.map((item) => (
                    <Link
                      className="rounded-md px-3 py-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-800"
                      href={item.href}
                      key={item.href}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </aside>

        <div className="min-w-0">
          <div className="border-b border-slate-200 bg-white px-4 py-3 lg:hidden">
            <div className="flex items-center justify-between gap-3">
              <Link className="flex min-w-0 items-center gap-3" href="/">
                <Image
                  alt="AgroNodo"
                  className="h-10 w-10 shrink-0 rounded-lg object-contain"
                  height={40}
                  src="/agronodo-logo.png"
                  width={40}
                />
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold leading-tight">
                    AgroNodo
                  </p>
                  <p className="truncate text-xs font-medium text-emerald-700">
                    {roleLabels[profile.role]}
                  </p>
                </div>
              </Link>
              <Link
                className="shrink-0 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-semibold text-slate-700"
                href="/login"
              >
                Perfil
              </Link>
            </div>

            <details className="mt-3 rounded-lg border border-slate-200 bg-slate-50">
              <summary className="cursor-pointer list-none px-4 py-3 text-sm font-semibold text-slate-800">
                Menu de trabajo
              </summary>
              <nav className="border-t border-slate-200 p-3">
                <div className="grid gap-3">
                  {navGroups.map((group) => (
                    <div key={group.label}>
                      <p className="px-1 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
                        {group.label}
                      </p>
                      <div className="mt-2 grid grid-cols-2 gap-2">
                        {group.items.map((item) => (
                          <Link
                            className="min-w-0 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium leading-tight text-slate-700"
                            href={item.href}
                            key={item.href}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </nav>
            </details>
          </div>

          <header className="border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur sm:px-6">
            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                  Inteligencia hidrica agricola
                </p>
                <h1 className="mt-1 max-w-3xl text-xl font-semibold leading-tight sm:text-2xl">
                  Plataforma de gestion inteligente del agua
                </h1>
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                <HeaderPill label="Vista" value={roleLabels[profile.role]} />
                <HeaderPill label="Datos" value={dataSource.mode} />
                <HeaderPill
                  label="Estado"
                  value={dataSource.ready ? "Operativo" : "Pendiente DB"}
                />
              </div>
              <div className="hidden flex-wrap gap-2 text-sm lg:flex">
                <Link
                  className="rounded-md border border-slate-200 bg-white px-3 py-2 font-semibold text-slate-700 hover:bg-emerald-50"
                  href="/login"
                >
                  Cambiar perfil
                </Link>
                <form action="/api/auth/logout" method="post">
                  <button className="rounded-md border border-slate-200 bg-white px-3 py-2 font-semibold text-slate-700 hover:bg-red-50">
                    Salir
                  </button>
                </form>
              </div>
            </div>
          </header>
          {children}
        </div>
      </div>
    </main>
  );
}

function HeaderPill({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 rounded-lg border border-slate-200 bg-slate-50 px-2 py-2 sm:px-4 sm:py-3">
      <p className="break-words text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-1 break-words text-xs font-semibold leading-tight text-slate-900 sm:text-sm">
        {value}
      </p>
    </div>
  );
}
