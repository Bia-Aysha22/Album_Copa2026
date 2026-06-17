import { describe, expect, it } from "vitest";

import type { StickerDefinition, StickerState } from "@/data/albumCatalog";
import {
  calculateAlbumStats,
  getNextStickerState,
  matchesFilter,
  matchesSearch,
  setStickerQuantity,
} from "@/utils/collection";

const stickers: StickerDefinition[] = [
  {
    id: "BRA1",
    code: "BRA1",
    label: "Alisson",
    kind: "player",
    order: 1,
    countryCode: "BRA",
    countryName: "Brasil",
    countryFlag: "🇧🇷",
    groupId: "C",
    sectionId: "BRA",
  },
  {
    id: "BRA2",
    code: "BRA2",
    label: "Jogador 1",
    kind: "player",
    order: 2,
    countryCode: "BRA",
    countryName: "Brasil",
    countryFlag: "🇧🇷",
    groupId: "C",
    sectionId: "BRA",
  },
  {
    id: "COCA1",
    code: "COCA1",
    label: "Gabriel Magalhães",
    kind: "coca",
    order: 1,
    countryName: "Brasil",
    countryFlag: "🇧🇷",
    groupId: "COCA",
    sectionId: "COCA",
  },
];

describe("collection utilities", () => {
  it("cycles sticker states in the expected order", () => {
    const firstTap = getNextStickerState();
    const secondTap = getNextStickerState(firstTap);
    const thirdTap = getNextStickerState(secondTap);

    expect(firstTap).toEqual({ status: "owned", quantity: 1 });
    expect(secondTap).toEqual({ status: "missing", quantity: 0 });
    expect(thirdTap).toEqual({ status: "unset", quantity: 0 });
  });

  it("turns quantity into owned state and clears when zero", () => {
    expect(setStickerQuantity(3)).toEqual({ status: "owned", quantity: 3 });
    expect(setStickerQuantity(0)).toEqual({ status: "unset", quantity: 0 });
  });

  it("calculates totals, completion and duplicates", () => {
    const collection: Record<string, StickerState> = {
      BRA1: { status: "owned", quantity: 2 },
      BRA2: { status: "missing", quantity: 0 },
      COCA1: { status: "owned", quantity: 1 },
    };

    expect(calculateAlbumStats(stickers, collection)).toEqual({
      total: 3,
      owned: 2,
      missing: 1,
      duplicates: 1,
      completion: 66.7,
    });
  });

  it("matches filters and search terms correctly", () => {
    expect(matchesFilter("owned", 2, "duplicates")).toBe(true);
    expect(matchesFilter("missing", 0, "owned")).toBe(false);
    expect(matchesSearch(stickers[0], "BRA1")).toBe(true);
    expect(matchesSearch(stickers[2], "coca")).toBe(true);
    expect(matchesSearch(stickers[1], "Alemanha")).toBe(false);
  });
});
