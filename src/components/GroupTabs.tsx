import { cn } from "@/lib/utils";

type GroupTabsProps = {
  groups: string[];
  activeGroup: string;
  onChange: (groupId: string) => void;
};

export function GroupTabs({ groups, activeGroup, onChange }: GroupTabsProps) {
  return (
    <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
      {groups.map((groupId) => {
        const isActive = groupId === activeGroup;

        return (
          <button
            key={groupId}
            type="button"
            onClick={() => onChange(groupId)}
            className={cn(
              "shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition",
              isActive
                ? "border-emerald-400/60 bg-emerald-500/20 text-emerald-100 shadow-[0_8px_25px_rgba(16,185,129,0.15)]"
                : "border-white/10 bg-slate-900/60 text-slate-300 hover:border-slate-500 hover:text-white",
            )}
          >
            {groupId === "COCA"
              ? "Coca-Cola"
              : groupId === "FWC"
                ? "FWC"
                : `Grupo ${groupId}`}
          </button>
        );
      })}
    </div>
  );
}
