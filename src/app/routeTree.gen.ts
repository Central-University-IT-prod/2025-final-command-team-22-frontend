/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as UserRegisterImport } from './routes/user/register'
import { Route as UserLoginImport } from './routes/user/login'
import { Route as UserUserLayoutImport } from './routes/user/_userLayout'
import { Route as BusinessRegisterImport } from './routes/business/register'
import { Route as BusinessLoginImport } from './routes/business/login'
import { Route as BusinessBusinessLayoutImport } from './routes/business/_businessLayout'
import { Route as UserUserLayoutIndexImport } from './routes/user/_userLayout/index'
import { Route as UserUserLayoutAvailableImport } from './routes/user/_userLayout/available'
import { Route as UserUserLayoutBusinessIdImport } from './routes/user/_userLayout/$businessId'
import { Route as BusinessBusinessLayoutSettingsImport } from './routes/business/_businessLayout/settings'
import { Route as BusinessBusinessLayoutScannerImport } from './routes/business/_businessLayout/scanner'
import { Route as BusinessBusinessLayoutDashboardImport } from './routes/business/_businessLayout/dashboard'
import { Route as BusinessBusinessLayoutCoinProgramImport } from './routes/business/_businessLayout/coin-program'

// Create Virtual Routes

const UserImport = createFileRoute('/user')()
const BusinessImport = createFileRoute('/business')()
const IndexLazyImport = createFileRoute('/')()

// Create/Update Routes

const UserRoute = UserImport.update({
  id: '/user',
  path: '/user',
  getParentRoute: () => rootRoute,
} as any)

const BusinessRoute = BusinessImport.update({
  id: '/business',
  path: '/business',
  getParentRoute: () => rootRoute,
} as any)

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const UserRegisterRoute = UserRegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => UserRoute,
} as any)

const UserLoginRoute = UserLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => UserRoute,
} as any)

const UserUserLayoutRoute = UserUserLayoutImport.update({
  id: '/_userLayout',
  getParentRoute: () => UserRoute,
} as any)

const BusinessRegisterRoute = BusinessRegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => BusinessRoute,
} as any)

const BusinessLoginRoute = BusinessLoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => BusinessRoute,
} as any)

const BusinessBusinessLayoutRoute = BusinessBusinessLayoutImport.update({
  id: '/_businessLayout',
  getParentRoute: () => BusinessRoute,
} as any)

const UserUserLayoutIndexRoute = UserUserLayoutIndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => UserUserLayoutRoute,
} as any)

const UserUserLayoutAvailableRoute = UserUserLayoutAvailableImport.update({
  id: '/available',
  path: '/available',
  getParentRoute: () => UserUserLayoutRoute,
} as any)

const UserUserLayoutBusinessIdRoute = UserUserLayoutBusinessIdImport.update({
  id: '/$businessId',
  path: '/$businessId',
  getParentRoute: () => UserUserLayoutRoute,
} as any)

const BusinessBusinessLayoutSettingsRoute =
  BusinessBusinessLayoutSettingsImport.update({
    id: '/settings',
    path: '/settings',
    getParentRoute: () => BusinessBusinessLayoutRoute,
  } as any)

const BusinessBusinessLayoutScannerRoute =
  BusinessBusinessLayoutScannerImport.update({
    id: '/scanner',
    path: '/scanner',
    getParentRoute: () => BusinessBusinessLayoutRoute,
  } as any)

const BusinessBusinessLayoutDashboardRoute =
  BusinessBusinessLayoutDashboardImport.update({
    id: '/dashboard',
    path: '/dashboard',
    getParentRoute: () => BusinessBusinessLayoutRoute,
  } as any)

const BusinessBusinessLayoutCoinProgramRoute =
  BusinessBusinessLayoutCoinProgramImport.update({
    id: '/coin-program',
    path: '/coin-program',
    getParentRoute: () => BusinessBusinessLayoutRoute,
  } as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/business': {
      id: '/business'
      path: '/business'
      fullPath: '/business'
      preLoaderRoute: typeof BusinessImport
      parentRoute: typeof rootRoute
    }
    '/business/_businessLayout': {
      id: '/business/_businessLayout'
      path: '/business'
      fullPath: '/business'
      preLoaderRoute: typeof BusinessBusinessLayoutImport
      parentRoute: typeof BusinessRoute
    }
    '/business/login': {
      id: '/business/login'
      path: '/login'
      fullPath: '/business/login'
      preLoaderRoute: typeof BusinessLoginImport
      parentRoute: typeof BusinessImport
    }
    '/business/register': {
      id: '/business/register'
      path: '/register'
      fullPath: '/business/register'
      preLoaderRoute: typeof BusinessRegisterImport
      parentRoute: typeof BusinessImport
    }
    '/user': {
      id: '/user'
      path: '/user'
      fullPath: '/user'
      preLoaderRoute: typeof UserImport
      parentRoute: typeof rootRoute
    }
    '/user/_userLayout': {
      id: '/user/_userLayout'
      path: '/user'
      fullPath: '/user'
      preLoaderRoute: typeof UserUserLayoutImport
      parentRoute: typeof UserRoute
    }
    '/user/login': {
      id: '/user/login'
      path: '/login'
      fullPath: '/user/login'
      preLoaderRoute: typeof UserLoginImport
      parentRoute: typeof UserImport
    }
    '/user/register': {
      id: '/user/register'
      path: '/register'
      fullPath: '/user/register'
      preLoaderRoute: typeof UserRegisterImport
      parentRoute: typeof UserImport
    }
    '/business/_businessLayout/coin-program': {
      id: '/business/_businessLayout/coin-program'
      path: '/coin-program'
      fullPath: '/business/coin-program'
      preLoaderRoute: typeof BusinessBusinessLayoutCoinProgramImport
      parentRoute: typeof BusinessBusinessLayoutImport
    }
    '/business/_businessLayout/dashboard': {
      id: '/business/_businessLayout/dashboard'
      path: '/dashboard'
      fullPath: '/business/dashboard'
      preLoaderRoute: typeof BusinessBusinessLayoutDashboardImport
      parentRoute: typeof BusinessBusinessLayoutImport
    }
    '/business/_businessLayout/scanner': {
      id: '/business/_businessLayout/scanner'
      path: '/scanner'
      fullPath: '/business/scanner'
      preLoaderRoute: typeof BusinessBusinessLayoutScannerImport
      parentRoute: typeof BusinessBusinessLayoutImport
    }
    '/business/_businessLayout/settings': {
      id: '/business/_businessLayout/settings'
      path: '/settings'
      fullPath: '/business/settings'
      preLoaderRoute: typeof BusinessBusinessLayoutSettingsImport
      parentRoute: typeof BusinessBusinessLayoutImport
    }
    '/user/_userLayout/$businessId': {
      id: '/user/_userLayout/$businessId'
      path: '/$businessId'
      fullPath: '/user/$businessId'
      preLoaderRoute: typeof UserUserLayoutBusinessIdImport
      parentRoute: typeof UserUserLayoutImport
    }
    '/user/_userLayout/available': {
      id: '/user/_userLayout/available'
      path: '/available'
      fullPath: '/user/available'
      preLoaderRoute: typeof UserUserLayoutAvailableImport
      parentRoute: typeof UserUserLayoutImport
    }
    '/user/_userLayout/': {
      id: '/user/_userLayout/'
      path: '/'
      fullPath: '/user/'
      preLoaderRoute: typeof UserUserLayoutIndexImport
      parentRoute: typeof UserUserLayoutImport
    }
  }
}

// Create and export the route tree

interface BusinessBusinessLayoutRouteChildren {
  BusinessBusinessLayoutCoinProgramRoute: typeof BusinessBusinessLayoutCoinProgramRoute
  BusinessBusinessLayoutDashboardRoute: typeof BusinessBusinessLayoutDashboardRoute
  BusinessBusinessLayoutScannerRoute: typeof BusinessBusinessLayoutScannerRoute
  BusinessBusinessLayoutSettingsRoute: typeof BusinessBusinessLayoutSettingsRoute
}

const BusinessBusinessLayoutRouteChildren: BusinessBusinessLayoutRouteChildren =
  {
    BusinessBusinessLayoutCoinProgramRoute:
      BusinessBusinessLayoutCoinProgramRoute,
    BusinessBusinessLayoutDashboardRoute: BusinessBusinessLayoutDashboardRoute,
    BusinessBusinessLayoutScannerRoute: BusinessBusinessLayoutScannerRoute,
    BusinessBusinessLayoutSettingsRoute: BusinessBusinessLayoutSettingsRoute,
  }

const BusinessBusinessLayoutRouteWithChildren =
  BusinessBusinessLayoutRoute._addFileChildren(
    BusinessBusinessLayoutRouteChildren,
  )

interface BusinessRouteChildren {
  BusinessBusinessLayoutRoute: typeof BusinessBusinessLayoutRouteWithChildren
  BusinessLoginRoute: typeof BusinessLoginRoute
  BusinessRegisterRoute: typeof BusinessRegisterRoute
}

const BusinessRouteChildren: BusinessRouteChildren = {
  BusinessBusinessLayoutRoute: BusinessBusinessLayoutRouteWithChildren,
  BusinessLoginRoute: BusinessLoginRoute,
  BusinessRegisterRoute: BusinessRegisterRoute,
}

const BusinessRouteWithChildren = BusinessRoute._addFileChildren(
  BusinessRouteChildren,
)

interface UserUserLayoutRouteChildren {
  UserUserLayoutBusinessIdRoute: typeof UserUserLayoutBusinessIdRoute
  UserUserLayoutAvailableRoute: typeof UserUserLayoutAvailableRoute
  UserUserLayoutIndexRoute: typeof UserUserLayoutIndexRoute
}

const UserUserLayoutRouteChildren: UserUserLayoutRouteChildren = {
  UserUserLayoutBusinessIdRoute: UserUserLayoutBusinessIdRoute,
  UserUserLayoutAvailableRoute: UserUserLayoutAvailableRoute,
  UserUserLayoutIndexRoute: UserUserLayoutIndexRoute,
}

const UserUserLayoutRouteWithChildren = UserUserLayoutRoute._addFileChildren(
  UserUserLayoutRouteChildren,
)

interface UserRouteChildren {
  UserUserLayoutRoute: typeof UserUserLayoutRouteWithChildren
  UserLoginRoute: typeof UserLoginRoute
  UserRegisterRoute: typeof UserRegisterRoute
}

const UserRouteChildren: UserRouteChildren = {
  UserUserLayoutRoute: UserUserLayoutRouteWithChildren,
  UserLoginRoute: UserLoginRoute,
  UserRegisterRoute: UserRegisterRoute,
}

const UserRouteWithChildren = UserRoute._addFileChildren(UserRouteChildren)

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/business': typeof BusinessBusinessLayoutRouteWithChildren
  '/business/login': typeof BusinessLoginRoute
  '/business/register': typeof BusinessRegisterRoute
  '/user': typeof UserUserLayoutRouteWithChildren
  '/user/login': typeof UserLoginRoute
  '/user/register': typeof UserRegisterRoute
  '/business/coin-program': typeof BusinessBusinessLayoutCoinProgramRoute
  '/business/dashboard': typeof BusinessBusinessLayoutDashboardRoute
  '/business/scanner': typeof BusinessBusinessLayoutScannerRoute
  '/business/settings': typeof BusinessBusinessLayoutSettingsRoute
  '/user/$businessId': typeof UserUserLayoutBusinessIdRoute
  '/user/available': typeof UserUserLayoutAvailableRoute
  '/user/': typeof UserUserLayoutIndexRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/business': typeof BusinessBusinessLayoutRouteWithChildren
  '/business/login': typeof BusinessLoginRoute
  '/business/register': typeof BusinessRegisterRoute
  '/user': typeof UserUserLayoutIndexRoute
  '/user/login': typeof UserLoginRoute
  '/user/register': typeof UserRegisterRoute
  '/business/coin-program': typeof BusinessBusinessLayoutCoinProgramRoute
  '/business/dashboard': typeof BusinessBusinessLayoutDashboardRoute
  '/business/scanner': typeof BusinessBusinessLayoutScannerRoute
  '/business/settings': typeof BusinessBusinessLayoutSettingsRoute
  '/user/$businessId': typeof UserUserLayoutBusinessIdRoute
  '/user/available': typeof UserUserLayoutAvailableRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/business': typeof BusinessRouteWithChildren
  '/business/_businessLayout': typeof BusinessBusinessLayoutRouteWithChildren
  '/business/login': typeof BusinessLoginRoute
  '/business/register': typeof BusinessRegisterRoute
  '/user': typeof UserRouteWithChildren
  '/user/_userLayout': typeof UserUserLayoutRouteWithChildren
  '/user/login': typeof UserLoginRoute
  '/user/register': typeof UserRegisterRoute
  '/business/_businessLayout/coin-program': typeof BusinessBusinessLayoutCoinProgramRoute
  '/business/_businessLayout/dashboard': typeof BusinessBusinessLayoutDashboardRoute
  '/business/_businessLayout/scanner': typeof BusinessBusinessLayoutScannerRoute
  '/business/_businessLayout/settings': typeof BusinessBusinessLayoutSettingsRoute
  '/user/_userLayout/$businessId': typeof UserUserLayoutBusinessIdRoute
  '/user/_userLayout/available': typeof UserUserLayoutAvailableRoute
  '/user/_userLayout/': typeof UserUserLayoutIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/business'
    | '/business/login'
    | '/business/register'
    | '/user'
    | '/user/login'
    | '/user/register'
    | '/business/coin-program'
    | '/business/dashboard'
    | '/business/scanner'
    | '/business/settings'
    | '/user/$businessId'
    | '/user/available'
    | '/user/'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/business'
    | '/business/login'
    | '/business/register'
    | '/user'
    | '/user/login'
    | '/user/register'
    | '/business/coin-program'
    | '/business/dashboard'
    | '/business/scanner'
    | '/business/settings'
    | '/user/$businessId'
    | '/user/available'
  id:
    | '__root__'
    | '/'
    | '/business'
    | '/business/_businessLayout'
    | '/business/login'
    | '/business/register'
    | '/user'
    | '/user/_userLayout'
    | '/user/login'
    | '/user/register'
    | '/business/_businessLayout/coin-program'
    | '/business/_businessLayout/dashboard'
    | '/business/_businessLayout/scanner'
    | '/business/_businessLayout/settings'
    | '/user/_userLayout/$businessId'
    | '/user/_userLayout/available'
    | '/user/_userLayout/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  BusinessRoute: typeof BusinessRouteWithChildren
  UserRoute: typeof UserRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  BusinessRoute: BusinessRouteWithChildren,
  UserRoute: UserRouteWithChildren,
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
        "/business",
        "/user"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/business": {
      "filePath": "business",
      "children": [
        "/business/_businessLayout",
        "/business/login",
        "/business/register"
      ]
    },
    "/business/_businessLayout": {
      "filePath": "business/_businessLayout.tsx",
      "parent": "/business",
      "children": [
        "/business/_businessLayout/coin-program",
        "/business/_businessLayout/dashboard",
        "/business/_businessLayout/scanner",
        "/business/_businessLayout/settings"
      ]
    },
    "/business/login": {
      "filePath": "business/login.tsx",
      "parent": "/business"
    },
    "/business/register": {
      "filePath": "business/register.tsx",
      "parent": "/business"
    },
    "/user": {
      "filePath": "user",
      "children": [
        "/user/_userLayout",
        "/user/login",
        "/user/register"
      ]
    },
    "/user/_userLayout": {
      "filePath": "user/_userLayout.tsx",
      "parent": "/user",
      "children": [
        "/user/_userLayout/$businessId",
        "/user/_userLayout/available",
        "/user/_userLayout/"
      ]
    },
    "/user/login": {
      "filePath": "user/login.tsx",
      "parent": "/user"
    },
    "/user/register": {
      "filePath": "user/register.tsx",
      "parent": "/user"
    },
    "/business/_businessLayout/coin-program": {
      "filePath": "business/_businessLayout/coin-program.tsx",
      "parent": "/business/_businessLayout"
    },
    "/business/_businessLayout/dashboard": {
      "filePath": "business/_businessLayout/dashboard.tsx",
      "parent": "/business/_businessLayout"
    },
    "/business/_businessLayout/scanner": {
      "filePath": "business/_businessLayout/scanner.tsx",
      "parent": "/business/_businessLayout"
    },
    "/business/_businessLayout/settings": {
      "filePath": "business/_businessLayout/settings.tsx",
      "parent": "/business/_businessLayout"
    },
    "/user/_userLayout/$businessId": {
      "filePath": "user/_userLayout/$businessId.tsx",
      "parent": "/user/_userLayout"
    },
    "/user/_userLayout/available": {
      "filePath": "user/_userLayout/available.tsx",
      "parent": "/user/_userLayout"
    },
    "/user/_userLayout/": {
      "filePath": "user/_userLayout/index.tsx",
      "parent": "/user/_userLayout"
    }
  }
}
ROUTE_MANIFEST_END */
