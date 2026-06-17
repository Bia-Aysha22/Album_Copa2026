import type { StickerDefinition, StickerState, StickerStatus } from "@/data/albumCatalog";

export type StickerStateMap = Record<string, StickerState>;

export type FilterMode = "all" | "owned" | "missing" | "duplicates";

export type AlbumStats = {
  total: number;
  owned: number;
  missing: number;
  duplicates: number;
  completion: number;
};

export function normalizeState(state?: StickerState): StickerState {
  return state ?? { status: "unset", quantity: 0 };
}

export function getNextStickerState(state?: StickerState): StickerState {
  const current = normalizeState(state);

  if (current.status === "unset") {
    return { status: "owned", quantity: Math.max(current.quantity, 1) };
  }

  if (current.status === "owned") {
    return { status: "missing", quantity: 0 };
  }

  return { status: "unset", quantity: 0 };
}

export function setStickerQuantity(quantity: number): StickerState {
  const normalizedQuantity = Math.max(0, quantity);

  if (normalizedQuantity === 0) {
    return { status: "unset", quantity: 0 };
  }

  return { status: "owned", quantity: normalizedQuantity };
}

export function calculateAlbumStats(
  stickers: StickerDefinition[],
  collection: StickerStateMap,
): AlbumStats {
  const totals = stickers.reduce(
    (acc, sticker) => {
      const state = normalizeState(collection[sticker.id]);

      if (state.status === "owned") {
        acc.owned += 1;
        acc.duplicates += Math.max(0, state.quantity - 1);
      }

      if (state.status === "missing") {
        acc.missing += 1;
      }

      return acc;
    },
    { owned: 0, missing: 0, duplicates: 0 },
  );

  return {
    total: stickers.length,
    owned: totals.owned,
    missing: totals.missing,
    duplicates: totals.duplicates,
    completion:
      stickers.length === 0
        ? 0
        : Number(((totals.owned / stickers.length) * 100).toFixed(totals.owned > 0 ? 1 : 0)),
  };
}

export function matchesFilter(
  status: StickerStatus,
  quantity: number,
  filter: FilterMode,
): boolean {
  if (filter === "all") {
    return true;
  }

  if (filter === "owned") {
    return status === "owned";
  }

  if (filter === "missing") {
    return status === "missing";
  }

  return quantity > 1;
}

export function matchesSearch(sticker: StickerDefinition, searchTerm: string): boolean {
  if (!searchTerm.trim()) {
    return true;
  }

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const haystack = [
    sticker.code,
    sticker.label,
    sticker.countryCode,
    sticker.countryName,
    sticker.groupId === "COCA"
      ? "coca cola"
      : sticker.groupId === "FWC"
        ? "fwc historica histórica"
        : `grupo ${sticker.groupId}`,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(normalizedSearch);
}
