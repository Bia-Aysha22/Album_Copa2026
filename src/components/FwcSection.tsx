import type { StickerDefinition, StickerState } from "@/data/albumCatalog";
import { StickerCard } from "@/components/StickerCard";
import { calculateAlbumStats } from "@/utils/collection";

type FwcSectionProps = {
  stickers: StickerDefinition[];
  collection: Record<string, StickerState>;
  openEditorId: string | null;
  onCycle: (stickerId: string) => void;
  onToggleEditor: (stickerId: string) => void;
  onUpdateQuantity: (stickerId: string, quantity: number) => void;
};

export function FwcSection({
  stickers,
  collection,
  openEditorId,
  onCycle,
  onToggleEditor,
  onUpdateQuantity,
}: FwcSectionProps) {
  const stats = calculateAlbumStats(stickers, collection);

  return (
    <section className="rounded-[30px] border border-white/10 bg-slate-900/70 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Seção histórica</p>
          <h2 className="mt-2 text-xl font-semibold text-white">FWC — Históricas</h2>
          <p className="mt-1 text-sm text-slate-400">
            Figurinhas históricas no formato horizontal, controladas à parte.
          </p>
        </div>

        <div className="text-right text-sm text-slate-300">
          <p>{stats.owned} de {stats.total} marcadas</p>
          <p className="text-xs text-slate-500">{stats.duplicates} repetidas</p>
        </div>
      </div>

      {stickers.length === 0 ? null : (
        <div className="mt-4 grid gap-3 grid-cols-1 sm:grid-cols-2 xl:grid-cols-3">
          {stickers.map((sticker) => (
            <StickerCard
              key={sticker.id}
              sticker={sticker}
              state={collection[sticker.id]}
              isEditorOpen={openEditorId === sticker.id}
              horizontal
              onCycle={onCycle}
              onToggleEditor={onToggleEditor}
              onUpdateQuantity={onUpdateQuantity}
            />
          ))}
        </div>
      )}
    </section>
  );
}
