import chroma from 'chroma-js';
import { produce } from 'immer';
import { v4 } from 'uuid';
import { createStore } from 'zustand/vanilla';

interface WarehouseRoute {
  key: string;
  name: string;
  color: chroma.Color;
}

interface State {
  warehouseRoutes: WarehouseRoute[];
  activeRoute: WarehouseRoute['key'];

  onActiveWarehouseRouteChange?: (key: WarehouseRoute['key']) => void;
}

const initState: State = {
  warehouseRoutes: [],
  activeRoute: '',
};

interface Action {
  addRoute: () => void;
  removeRoute: (key: WarehouseRoute['key']) => void;

  selectRoute: (key?: WarehouseRoute['key']) => void;

  updateRoutes: (routes: WarehouseRoute[]) => void;
}

export type MapStore = State & Action;

export const vanillaStore = createStore<MapStore>((set, get) => ({
  ...initState,
  addRoute: () => {
    const { selectRoute, warehouseRoutes, updateRoutes } = get();

    const route = {
      key: v4(),
      name: '新路线',
      color: chroma.random(),
    };

    updateRoutes(
      produce(warehouseRoutes, (darft) => {
        if (!darft.find((r) => r.key === route.key)) {
          darft.push(route);
        }
      }),
    );

    selectRoute(route.key);
  },
  removeRoute: (key) => {
    const { selectRoute, warehouseRoutes, updateRoutes } = get();

    const nextRoutes = warehouseRoutes.filter((r) => r.key !== key);

    const nextRoute = nextRoutes[0]?.key;

    updateRoutes(nextRoutes);

    selectRoute(nextRoute);
  },
  selectRoute: (routeKey) => {
    set({ activeRoute: routeKey });
  },
  updateRoutes: (routes) => {
    // import isEqual from 'fast-deep-equal';
    // const { warehouseRoutes } = get();
    // if (isEqual(iconfontScripts, scripts)) return;
    set({ warehouseRoutes: routes });
  },
}));
