import { RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";

import { CocaSection } from "@/components/CocaSection";
import { CountrySection } from "@/components/CountrySection";
import { GroupTabs } from "@/components/GroupTabs";
import { SearchFilters } from "@/components/SearchFilters";
import { SummaryStats } from "@/components/SummaryStats";
import { albumGroups, allStickers, cocaColaSection } from "@/data/albumCatalog";
import { useAlbumStore } from "@/store/useAlbumStore";
import {
  calculateAlbumStats,
  matchesFilter,
  matchesSearch,
  normalizeState,
  type FilterMode,
} from "@/utils/collection";

const GROUP_IDS = [...albumGroups.map((group) => group.id), "COCA"];

export default function Home() {
  const { collection, cycleSticker, updateQuantity, resetCollection } = useAlbumStore();
  const [activeGroup, setActiveGroup] = useState("A");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterMode>("all");
  const [openEditorId, setOpenEditorId] = useState<string | null>(null);

  const albumStats = useMemo(
    () => calculateAlbumStats(allStickers, collection),
    [collection],
  );

  const activeGroupData = useMemo(
    () => albumGroups.find((group) => group.id === activeGroup) ?? albumGroups[0],
    [activeGroup],
  );

  const filteredCountries = useMemo(() => {
    if (!activeGroupData || activeGroup === "COCA") {
      return [];
    }

    return activeGroupData.countries
      .map((country) => ({
        ...country,
        visibleStickers: country.stickers.filter((sticker) => {
          const currentState = normalizeState(collection[sticker.id]);

          return (
            matchesFilter(currentState.status, currentState.quantity, filter) &&
            matchesSearch(sticker, search)
          );
        }),
      }))
      .filter((country) => {
        if (!search.trim() && filter === "all") {
          return true;
        }

        return country.visibleStickers.length > 0;
      });
  }, [activeGroup, activeGroupData, collection, filter, search]);

  const filteredCoca = useMemo(
    () =>
      cocaColaSection.filter((sticker) => {
        const currentState = normalizeState(collection[sticker.id]);

        return (
          matchesFilter(currentState.status, currentState.quantity, filter) &&
          matchesSearch(sticker, search)
        );
      }),
    [collection, filter, search],
  );

  function handleToggleEditor(stickerId: string) {
    setOpenEditorId((currentId) => (currentId === stickerId ? null : stickerId));
  }

  function handleCycle(stickerId: string) {
    cycleSticker(stickerId);
    if (openEditorId === stickerId) {
      setOpenEditorId(null);
    }
  }

  function handleUpdateQuantity(stickerId: string, quantity: number) {
    updateQuantity(stickerId, quantity);

    if (quantity <= 0) {
      setOpenEditorId(null);
    }
  }

  function handleResetCollection() {
    const confirmed = window.confirm("Limpar todas as marcações do álbum?");

    if (confirmed) {
      resetCollection();
      setOpenEditorId(null);
    }
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16),_transparent_35%),linear-gradient(180deg,#020617_0%,#0f172a_38%,#111827_100%)] text-slate-100">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-8">
        <header className="rounded-[32px] border border-white/10 bg-slate-950/70 p-5 shadow-[0_28px_120px_rgba(15,23,42,0.55)] backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <p className="text-xs uppercase tracking-[0.35em] text-emerald-300/80">
                Controle do álbum
              </p>
              <h1 className="mt-3 font-semibold tracking-tight text-white text-3xl sm:text-4xl">
                Figurinhas da Copa 2026
              </h1>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 sm:text-base">
                Toque uma vez para marcar que você tem. Toque de novo para marcar que não
                tem. Dê toque duplo para abrir o ajuste de quantidade e registrar repetidas.
              </p>
            </div>

            <button
              type="button"
              onClick={handleResetCollection}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-rose-300/40 hover:bg-rose-500/10 hover:text-white"
            >
              <RotateCcw className="size-4" />
              Limpar marcações
            </button>
          </div>
        </header>

        <SummaryStats stats={albumStats} />

        <SearchFilters
          search={search}
          filter={filter}
          onSearchChange={setSearch}
          onFilterChange={setFilter}
        />

        <section className="sticky top-3 z-20 rounded-[28px] border border-white/10 bg-slate-950/75 p-3 backdrop-blur">
          <GroupTabs
            groups={GROUP_IDS}
            activeGroup={activeGroup}
            onChange={(groupId) => {
              setActiveGroup(groupId);
              setOpenEditorId(null);
            }}
          />
        </section>

        <section className="space-y-5 pb-10">
          {activeGroup === "COCA" ? (
            <CocaSection
              stickers={filteredCoca}
              collection={collection}
              openEditorId={openEditorId}
              onCycle={handleCycle}
              onToggleEditor={handleToggleEditor}
              onUpdateQuantity={handleUpdateQuantity}
            />
          ) : (
            filteredCountries.map((country) => (
              <CountrySection
                key={country.code}
                country={country}
                visibleStickers={country.visibleStickers}
                collection={collection}
                openEditorId={openEditorId}
                onCycle={handleCycle}
                onToggleEditor={handleToggleEditor}
                onUpdateQuantity={handleUpdateQuantity}
              />
            ))
          )}

          {activeGroup !== "COCA" && filteredCountries.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-white/10 bg-slate-950/50 px-6 py-10 text-center text-sm text-slate-400">
              Nenhuma figurinha desse grupo combina com a busca atual.
            </div>
          ) : null}

          {activeGroup === "COCA" && filteredCoca.length === 0 ? (
            <div className="rounded-[28px] border border-dashed border-white/10 bg-slate-950/50 px-6 py-10 text-center text-sm text-slate-400">
              Nenhum card Coca-Cola combina com a busca atual.
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}
