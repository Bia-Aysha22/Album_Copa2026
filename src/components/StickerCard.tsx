import { Minus, Plus, Sticker } from "lucide-react";

import type { StickerDefinition, StickerState } from "@/data/albumCatalog";
import { useTapAction } from "@/hooks/useTapAction";
import { cn } from "@/lib/utils";
import { normalizeState } from "@/utils/collection";

type StickerCardProps = {
  sticker: StickerDefinition;
  state?: StickerState;
  isEditorOpen: boolean;
  horizontal?: boolean;
  onCycle: (stickerId: string) => void;
  onToggleEditor: (stickerId: string) => void;
  onUpdateQuantity: (stickerId: string, quantity: number) => void;
};

const toneMap = {
  unset: "border-white/10 bg-slate-950/80 text-slate-200",
  owned: "border-emerald-400/40 bg-emerald-500/15 text-emerald-50",
  missing: "border-rose-400/40 bg-rose-500/15 text-rose-50",
};

export function StickerCard({
  sticker,
  state,
  isEditorOpen,
  horizontal = false,
  onCycle,
  onToggleEditor,
  onUpdateQuantity,
}: StickerCardProps) {
  const currentState = normalizeState(state);
  const { handleClick, handleDoubleClick } = useTapAction(
    () => onCycle(sticker.id),
    () => onToggleEditor(sticker.id),
  );

  const statusLabel =
    currentState.status === "owned"
      ? "Tenho"
      : currentState.status === "missing"
        ? "Não tenho"
        : "Sem marcação";

  function renderEditor() {
    return (
      <div className="absolute inset-x-2 top-[calc(100%+0.5rem)] z-10 rounded-3xl border border-emerald-400/30 bg-slate-950/95 p-3 shadow-[0_22px_60px_rgba(2,6,23,0.65)] backdrop-blur">
        <div className="flex items-center justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Quantidade</p>
          <button
            type="button"
            onClick={() => onToggleEditor(sticker.id)}
            className="text-xs text-slate-400 transition hover:text-white"
          >
            Fechar
          </button>
        </div>

        <div className="mt-3 flex items-center justify-between rounded-2xl border border-white/10 bg-slate-900/90 px-3 py-2">
          <button
            type="button"
            onClick={() => onUpdateQuantity(sticker.id, currentState.quantity - 1)}
            className="rounded-full border border-white/10 bg-slate-800 p-2 text-white transition hover:border-rose-300/40 hover:text-rose-200"
            aria-label={`Diminuir quantidade de ${sticker.code}`}
          >
            <Minus className="size-4" />
          </button>

          <div className="text-center">
            <p className="text-2xl font-semibold text-white">{currentState.quantity}</p>
            <p className="text-xs text-slate-400">
              {currentState.quantity > 1 ? "Você tem repetidas" : "0 limpa a marcação"}
            </p>
          </div>

          <button
            type="button"
            onClick={() => onUpdateQuantity(sticker.id, currentState.quantity + 1)}
            className="rounded-full border border-white/10 bg-slate-800 p-2 text-white transition hover:border-emerald-300/40 hover:text-emerald-200"
            aria-label={`Aumentar quantidade de ${sticker.code}`}
          >
            <Plus className="size-4" />
          </button>
        </div>
      </div>
    );
  }

  if (horizontal) {
    return (
      <article className="relative">
        <button
          type="button"
          onClick={handleClick}
          onDoubleClick={handleDoubleClick}
          className={cn(
            "flex min-h-20 w-full items-center gap-3 rounded-3xl border p-3 text-left transition duration-200 hover:-translate-y-0.5",
            toneMap[currentState.status],
          )}
        >
          <span className="shrink-0 rounded-full border border-white/10 bg-black/20 px-2 py-1 text-[11px] font-semibold tracking-[0.18em] text-white/80">
            {sticker.code}
          </span>

          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold leading-tight">{sticker.label}</p>
            {sticker.countryName ? (
              <p className="truncate text-xs text-white/60">
                {sticker.countryFlag ? `${sticker.countryFlag} ` : ""}
                {sticker.countryName}
              </p>
            ) : null}
          </div>

          <div className="flex shrink-0 flex-col items-end gap-1 text-right text-xs text-white/65">
            <span>{statusLabel}</span>
            <span>{currentState.quantity > 1 ? `${currentState.quantity}x` : "1 / 2 toques"}</span>
          </div>

          <Sticker className="size-4 shrink-0 text-white/50" />
        </button>

        {isEditorOpen ? renderEditor() : null}
      </article>
    );
  }

  return (
    <article className="relative">
      <button
        type="button"
        onClick={handleClick}
        onDoubleClick={handleDoubleClick}
        className={cn(
          "flex min-h-28 w-full flex-col rounded-3xl border p-3 text-left transition duration-200 hover:-translate-y-0.5",
          toneMap[currentState.status],
        )}
      >
        <div className="flex items-start justify-between gap-2">
          <span className="rounded-full border border-white/10 bg-black/20 px-2 py-1 text-[11px] font-semibold tracking-[0.18em] text-white/80">
            {sticker.code}
          </span>
          <Sticker className="size-4 shrink-0 text-white/50" />
        </div>

        <div className="mt-3 space-y-1">
          <p className="text-sm font-semibold leading-tight">{sticker.label}</p>
          {sticker.countryName ? (
            <p className="text-xs text-white/60">
              {sticker.countryFlag ? `${sticker.countryFlag} ` : ""}
              {sticker.countryName}
            </p>
          ) : null}
        </div>

        <div className="mt-auto flex items-center justify-between pt-3 text-xs text-white/65">
          <span>{statusLabel}</span>
          <span>{currentState.quantity > 1 ? `${currentState.quantity}x` : "1 toque / 2 toques"}</span>
        </div>
      </button>

      {isEditorOpen ? renderEditor() : null}
    </article>
  );
}
