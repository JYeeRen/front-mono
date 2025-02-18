import {
  RouterProvider as T_RouterProvider,
  createRouter,
} from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

export const router = createRouter({ routeTree });

export const RouterProvider = () => <T_RouterProvider router={router} />;
