import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { AnimatePresence } from "motion/react";
import { userAuthOptions } from "@/shared/api/user/userAuth/userAuthApi";

export const Route = createFileRoute("/user/_userLayout")({
  beforeLoad: async ({ context: { queryClient } }) => {
    try {
      await queryClient.ensureQueryData(userAuthOptions());
    } catch {
      throw redirect({
        to: "/user/login",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <AnimatePresence mode="wait">
        <Outlet />
      </AnimatePresence>
    </>
  );
}
