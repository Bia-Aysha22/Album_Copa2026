import type { AlbumStats } from "@/utils/collection";

type SummaryStatsProps = {
  stats: AlbumStats;
};

export function SummaryStats({ stats }: SummaryStatsProps) {
  const cards = [
    { label: "Tenho", value: stats.owned, tone: "text-emerald-300" },
    { label: "Não tenho", value: stats.missing, tone: "text-rose-300" },
    { label: "Repetidas", value: stats.duplicates, tone: "text-amber-300" },
    { label: "Concluído", value: `${stats.completion}%`, tone: "text-sky-300" },
  ];

  return (
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <article
          key={card.label}
          className="rounded-3xl border border-white/10 bg-slate-900/80 p-4 shadow-[0_18px_60px_rgba(15,23,42,0.45)]"
        >
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{card.label}</p>
          <p className={`mt-3 text-3xl font-semibold ${card.tone}`}>{card.value}</p>
        </article>
      ))}
    </section>
  );
}
