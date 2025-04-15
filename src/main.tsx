import "./app/index.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { ThemeProvider } from "@/shared/components/ui/theme-provider";
import { routeTree } from "./app/routeTree.gen";
import { ErrorPage } from "./app/status-pages/ErrorPage";
import { NotFoundPage } from "./app/status-pages/NotFoundPage";
import { LazyMotion, domAnimation, domMax } from "motion/react";
import { PendingPage } from "./app/status-pages/PendingPage";

const queryClient = new QueryClient();

const router = createRouter({
  routeTree: routeTree,
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
  context: {
    queryClient,
  },
  defaultPendingComponent: PendingPage,
  defaultErrorComponent: ErrorPage,
  defaultNotFoundComponent: NotFoundPage,
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <LazyMotion features={domAnimation}>
      <LazyMotion features={domMax}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
          </QueryClientProvider>
        </ThemeProvider>
      </LazyMotion>
    </LazyMotion>
  </StrictMode>
);
