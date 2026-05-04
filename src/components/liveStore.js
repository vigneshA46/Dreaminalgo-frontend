import { create } from "zustand";

export const useLiveStore = create((set) => ({
  liveData: {},

  updateStrategy: (incoming) =>
    set((state) => ({
      liveData: {
        ...state.liveData,
        [incoming.strategy_id]: incoming,
      },
    })),
}));