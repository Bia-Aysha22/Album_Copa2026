import { cn } from "@/lib/utils";

export type GroupTab = {
  id: string;
  label: string;
};

type GroupTabsProps = {
  tabs: GroupTab[];
  activeGroup: string;
  onChange: (groupId: string) => void;
};

export function GroupTabs({ tabs, activeGroup, onChange }: GroupTabsProps) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
      {tabs.map((tab) => {
        const isActive = tab.id === activeGroup;

        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onChange(tab.id)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition",
              isActive
                ? "border-emerald-400/60 bg-emerald-500/20 text-emerald-100 shadow-[0_8px_25px_rgba(16,185,129,0.15)]"
                : "border-white/10 bg-slate-900/60 text-slate-300 hover:border-slate-500 hover:text-white",
            )}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
