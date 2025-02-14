/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as WaybilltrackingIndexImport } from './routes/waybill_tracking/index'
import { Route as OrdermgtIndexImport } from './routes/order_mgt/index'
import { Route as FinancialIndexImport } from './routes/financial/index'
import { Route as DashboardIndexImport } from './routes/dashboard/index'
import { Route as AddressbookIndexImport } from './routes/address_book/index'
import { Route as OrdermgtOrderlistImport } from './routes/order_mgt/order_list'
import { Route as OrdermgtOrdercreateImport } from './routes/order_mgt/order_create'

// Create/Update Routes

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const WaybilltrackingIndexRoute = WaybilltrackingIndexImport.update({
  id: '/waybill_tracking/',
  path: '/waybill_tracking/',
  getParentRoute: () => rootRoute,
} as any)

const OrdermgtIndexRoute = OrdermgtIndexImport.update({
  id: '/order_mgt/',
  path: '/order_mgt/',
  getParentRoute: () => rootRoute,
} as any)

const FinancialIndexRoute = FinancialIndexImport.update({
  id: '/financial/',
  path: '/financial/',
  getParentRoute: () => rootRoute,
} as any)

const DashboardIndexRoute = DashboardIndexImport.update({
  id: '/dashboard/',
  path: '/dashboard/',
  getParentRoute: () => rootRoute,
} as any)

const AddressbookIndexRoute = AddressbookIndexImport.update({
  id: '/address_book/',
  path: '/address_book/',
  getParentRoute: () => rootRoute,
} as any)

const OrdermgtOrderlistRoute = OrdermgtOrderlistImport.update({
  id: '/order_mgt/order_list',
  path: '/order_mgt/order_list',
  getParentRoute: () => rootRoute,
} as any)

const OrdermgtOrdercreateRoute = OrdermgtOrdercreateImport.update({
  id: '/order_mgt/order_create',
  path: '/order_mgt/order_create',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/order_mgt/order_create': {
      id: '/order_mgt/order_create'
      path: '/order_mgt/order_create'
      fullPath: '/order_mgt/order_create'
      preLoaderRoute: typeof OrdermgtOrdercreateImport
      parentRoute: typeof rootRoute
    }
    '/order_mgt/order_list': {
      id: '/order_mgt/order_list'
      path: '/order_mgt/order_list'
      fullPath: '/order_mgt/order_list'
      preLoaderRoute: typeof OrdermgtOrderlistImport
      parentRoute: typeof rootRoute
    }
    '/address_book/': {
      id: '/address_book/'
      path: '/address_book'
      fullPath: '/address_book'
      preLoaderRoute: typeof AddressbookIndexImport
      parentRoute: typeof rootRoute
    }
    '/dashboard/': {
      id: '/dashboard/'
      path: '/dashboard'
      fullPath: '/dashboard'
      preLoaderRoute: typeof DashboardIndexImport
      parentRoute: typeof rootRoute
    }
    '/financial/': {
      id: '/financial/'
      path: '/financial'
      fullPath: '/financial'
      preLoaderRoute: typeof FinancialIndexImport
      parentRoute: typeof rootRoute
    }
    '/order_mgt/': {
      id: '/order_mgt/'
      path: '/order_mgt'
      fullPath: '/order_mgt'
      preLoaderRoute: typeof OrdermgtIndexImport
      parentRoute: typeof rootRoute
    }
    '/waybill_tracking/': {
      id: '/waybill_tracking/'
      path: '/waybill_tracking'
      fullPath: '/waybill_tracking'
      preLoaderRoute: typeof WaybilltrackingIndexImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/order_mgt/order_create': typeof OrdermgtOrdercreateRoute
  '/order_mgt/order_list': typeof OrdermgtOrderlistRoute
  '/address_book': typeof AddressbookIndexRoute
  '/dashboard': typeof DashboardIndexRoute
  '/financial': typeof FinancialIndexRoute
  '/order_mgt': typeof OrdermgtIndexRoute
  '/waybill_tracking': typeof WaybilltrackingIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/order_mgt/order_create': typeof OrdermgtOrdercreateRoute
  '/order_mgt/order_list': typeof OrdermgtOrderlistRoute
  '/address_book': typeof AddressbookIndexRoute
  '/dashboard': typeof DashboardIndexRoute
  '/financial': typeof FinancialIndexRoute
  '/order_mgt': typeof OrdermgtIndexRoute
  '/waybill_tracking': typeof WaybilltrackingIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/order_mgt/order_create': typeof OrdermgtOrdercreateRoute
  '/order_mgt/order_list': typeof OrdermgtOrderlistRoute
  '/address_book/': typeof AddressbookIndexRoute
  '/dashboard/': typeof DashboardIndexRoute
  '/financial/': typeof FinancialIndexRoute
  '/order_mgt/': typeof OrdermgtIndexRoute
  '/waybill_tracking/': typeof WaybilltrackingIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/order_mgt/order_create'
    | '/order_mgt/order_list'
    | '/address_book'
    | '/dashboard'
    | '/financial'
    | '/order_mgt'
    | '/waybill_tracking'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/order_mgt/order_create'
    | '/order_mgt/order_list'
    | '/address_book'
    | '/dashboard'
    | '/financial'
    | '/order_mgt'
    | '/waybill_tracking'
  id:
    | '__root__'
    | '/'
    | '/order_mgt/order_create'
    | '/order_mgt/order_list'
    | '/address_book/'
    | '/dashboard/'
    | '/financial/'
    | '/order_mgt/'
    | '/waybill_tracking/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  OrdermgtOrdercreateRoute: typeof OrdermgtOrdercreateRoute
  OrdermgtOrderlistRoute: typeof OrdermgtOrderlistRoute
  AddressbookIndexRoute: typeof AddressbookIndexRoute
  DashboardIndexRoute: typeof DashboardIndexRoute
  FinancialIndexRoute: typeof FinancialIndexRoute
  OrdermgtIndexRoute: typeof OrdermgtIndexRoute
  WaybilltrackingIndexRoute: typeof WaybilltrackingIndexRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  OrdermgtOrdercreateRoute: OrdermgtOrdercreateRoute,
  OrdermgtOrderlistRoute: OrdermgtOrderlistRoute,
  AddressbookIndexRoute: AddressbookIndexRoute,
  DashboardIndexRoute: DashboardIndexRoute,
  FinancialIndexRoute: FinancialIndexRoute,
  OrdermgtIndexRoute: OrdermgtIndexRoute,
  WaybilltrackingIndexRoute: WaybilltrackingIndexRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/order_mgt/order_create",
        "/order_mgt/order_list",
        "/address_book/",
        "/dashboard/",
        "/financial/",
        "/order_mgt/",
        "/waybill_tracking/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/order_mgt/order_create": {
      "filePath": "order_mgt/order_create.tsx"
    },
    "/order_mgt/order_list": {
      "filePath": "order_mgt/order_list.tsx"
    },
    "/address_book/": {
      "filePath": "address_book/index.tsx"
    },
    "/dashboard/": {
      "filePath": "dashboard/index.tsx"
    },
    "/financial/": {
      "filePath": "financial/index.tsx"
    },
    "/order_mgt/": {
      "filePath": "order_mgt/index.tsx"
    },
    "/waybill_tracking/": {
      "filePath": "waybill_tracking/index.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
