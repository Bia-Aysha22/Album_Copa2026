import type { CountrySection as CountrySectionType, StickerDefinition, StickerState } from "@/data/albumCatalog";
import { StickerCard } from "@/components/StickerCard";
import { calculateAlbumStats } from "@/utils/collection";

type CountrySectionProps = {
  country: CountrySectionType;
  visibleStickers: StickerDefinition[];
  collection: Record<string, StickerState>;
  openEditorId: string | null;
  onCycle: (stickerId: string) => void;
  onToggleEditor: (stickerId: string) => void;
  onUpdateQuantity: (stickerId: string, quantity: number) => void;
};

export function CountrySection({
  country,
  visibleStickers,
  collection,
  openEditorId,
  onCycle,
  onToggleEditor,
  onUpdateQuantity,
}: CountrySectionProps) {
  const stats = calculateAlbumStats(country.stickers, collection);

  return (
    <section className="rounded-[30px] border border-white/10 bg-slate-900/70 p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-slate-400">{`Grupo ${country.groupId}`}</p>
          <h2 className="mt-2 text-xl font-semibold text-white">
            <span className="mr-2">{country.flag}</span>
            {country.namePtBr}
          </h2>
        </div>

        <div className="text-right text-sm text-slate-300">
          <p>{stats.owned} de 20 marcadas</p>
          <p className="text-xs text-slate-500">{stats.duplicates} repetidas</p>
        </div>
      </div>

      {visibleStickers.length === 0 ? (
        <div className="py-8 text-center text-sm text-slate-400">
          Nenhuma figurinha desse país combina com o filtro atual.
        </div>
      ) : (
        <div className="mt-4 grid gap-3 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {visibleStickers.map((sticker) => (
            <StickerCard
              key={sticker.id}
              sticker={sticker}
              state={collection[sticker.id]}
              isEditorOpen={openEditorId === sticker.id}
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
