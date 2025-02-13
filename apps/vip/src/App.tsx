import { Route, RouterProvider, createRouter } from '@tanstack/react-router';

import { routeTree } from './routeTree.gen';

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {

  interface Route {
    name?: string;
    permission?: string[];
  }

  interface Register {
    router: typeof router;
  }
}

function AppA() {

  console.log(router);
  console.log((router.routeTree.children as unknown as Array<Route>)?.map(r => r.options));

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default AppA;
