import { prisma } from "@/lib/prisma";
import { locales } from "@/lib/i18n";

export default async function AgentsPage({ params }: { params: { locale: string } }) {
  const locale = locales.includes(params.locale as any) ? params.locale : "sq";
  const agents = await prisma.user.findMany({ where: { role: "AGENT" }, take: 6 });

  return (
    <div className="container-shell py-10">
      <h1 className="text-3xl font-semibold text-slate-900">{locale === "sq" ? "Agjentët" : "Agents"}</h1>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {agents.map((agent) => (
          <div key={agent.id} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-card">
            <p className="text-lg font-semibold text-slate-900">{agent.name}</p>
            <p className="text-sm text-slate-500">{agent.email}</p>
            <p className="text-sm text-slate-500">{agent.phone ?? "+355 69 000 0000"}</p>
            <div className="mt-4 inline-flex items-center rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              Verified agent
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
