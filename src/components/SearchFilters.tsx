import type { FilterMode } from "@/utils/collection";

type SearchFiltersProps = {
  search: string;
  filter: FilterMode;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: FilterMode) => void;
};

const FILTERS: { id: FilterMode; label: string }[] = [
  { id: "all", label: "Todas" },
  { id: "owned", label: "Tenho" },
  { id: "missing", label: "Não tenho" },
  { id: "duplicates", label: "Repetidas" },
];

export function SearchFilters({
  search,
  filter,
  onSearchChange,
  onFilterChange,
}: SearchFiltersProps) {
  return (
    <section className="space-y-3 rounded-[28px] border border-white/10 bg-slate-900/70 p-4">
      <label className="block">
        <span className="mb-2 block text-xs uppercase tracking-[0.28em] text-slate-400">
          Buscar por código, país ou grupo
        </span>
        <input
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Ex.: BRA7, Brasil, Coca"
          className="w-full rounded-2xl border border-white/10 bg-slate-950/80 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400/50"
        />
      </label>

      <div className="flex flex-wrap gap-2">
        {FILTERS.map((item) => {
          const isActive = item.id === filter;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onFilterChange(item.id)}
              className={
                isActive
                  ? "rounded-full border border-sky-400/60 bg-sky-500/20 px-3 py-2 text-sm text-sky-100"
                  : "rounded-full border border-white/10 bg-slate-950/80 px-3 py-2 text-sm text-slate-300"
              }
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}
