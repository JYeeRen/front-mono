import '@tanstack/react-router';
import { router } from '../router';

declare module '@tanstack/react-router' {

  interface Route {
    name?: string;
    permission?: string[];
  }

  interface Register {
    router: typeof router;
  }
}