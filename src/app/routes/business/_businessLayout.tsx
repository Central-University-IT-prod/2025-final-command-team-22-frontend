import { Header } from "@/widgets/header/ui/Header";
import { INavItem } from "@/widgets/header";
import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { businessAuthOptions } from "@/shared/api/business/businessAuth/businessAuthApi";

export const Route = createFileRoute("/business/_businessLayout")({
  beforeLoad: async ({ context: { queryClient } }) => {
    try {
      await queryClient.ensureQueryData(businessAuthOptions());
    } catch {
      throw redirect({
        to: "/business/login",
      });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  const navItems: INavItem[] = [
    { name: "Программа лояльности", link: "/business/coin-program" },
    { name: "Панель управления", link: "/business/dashboard" },
    { name: "Сканер", link: "/business/scanner" },
    { name: "Параметры", link: "/business/settings" },
  ];

  return (
    <>
      <Header navItems={navItems} isBusinessHeader={true} />
      <main className="mt-16">
        <Outlet />
      </main>
    </>
  );
}
