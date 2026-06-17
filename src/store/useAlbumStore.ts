import { create } from "zustand";
import { persist } from "zustand/middleware";

import type { StickerState } from "@/data/albumCatalog";
import { getNextStickerState, setStickerQuantity, type StickerStateMap } from "@/utils/collection";

type AlbumStore = {
  collection: StickerStateMap;
  cycleSticker: (stickerId: string) => void;
  updateQuantity: (stickerId: string, quantity: number) => void;
  resetCollection: () => void;
};

function updateSticker(
  collection: StickerStateMap,
  stickerId: string,
  nextState: StickerState,
): StickerStateMap {
  if (nextState.status === "unset" && nextState.quantity === 0) {
    const nextCollection = { ...collection };
    delete nextCollection[stickerId];
    return nextCollection;
  }

  return {
    ...collection,
    [stickerId]: nextState,
  };
}

export const useAlbumStore = create<AlbumStore>()(
  persist(
    (set, get) => ({
      collection: {},
      cycleSticker: (stickerId) => {
        const current = get().collection[stickerId];
        const nextState = getNextStickerState(current);

        set((state) => ({
          collection: updateSticker(state.collection, stickerId, nextState),
        }));
      },
      updateQuantity: (stickerId, quantity) => {
        const nextState = setStickerQuantity(quantity);

        set((state) => ({
          collection: updateSticker(state.collection, stickerId, nextState),
        }));
      },
      resetCollection: () => set({ collection: {} }),
    }),
    {
      name: "album-copa-2026-collection",
      partialize: (state) => ({ collection: state.collection }),
    },
  ),
);
