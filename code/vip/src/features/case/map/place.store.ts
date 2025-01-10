import { createStore } from 'zustand/vanilla';

interface State {
  activeColor: string;
  placeColor: Map<string, string>;
}

interface Action {
  setPlaceColor: (placeId: string) => void;
  setActivceColor: (color: string) => void;
}

const vanillaStore = createStore<State & Action>((set, get) => ({
  activeColor: '#810FCB',
  placeColor: new Map(),

  setActivceColor: (color) => set({ activeColor: color }),

  setPlaceColor: (placeId) => {
    const { placeColor, activeColor } = get();
    const newPlaceColor = new Map(placeColor);
    if (placeColor.has(placeId)) {
      newPlaceColor.delete(placeId);
      set({ placeColor: newPlaceColor });
      return;
    }
    newPlaceColor.set(placeId, activeColor);
    set({ placeColor: newPlaceColor });
  }
}));

export default vanillaStore;
