import { createFileRoute, Link } from "@tanstack/react-router";
import { Greetings } from "@/entities/userPage/index";
import { DataCard } from "@/widgets/userPage/index";
import { Button } from "@/shared/components/ui/button";
import { ShowUserQrButton } from "@/widgets/showQrButton/index";
import { BusinessCard } from "@/entities/businessCard/index";
import { motion } from "motion/react";
import { useSuspenseQuery } from "@tanstack/react-query";
import { userAuthOptions } from "@/shared/api/user/userAuth/userAuthApi";
import { userCoinProgramsOptions } from "@/shared/api/user/userCoinPrograms/userCoinProgramsApi";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { Header } from "@/widgets/header/ui/Header";

export const Route = createFileRoute("/user/_userLayout/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: user } = useSuspenseQuery(userAuthOptions());
  const { data: cards } = useSuspenseQuery(userCoinProgramsOptions({ limit: 50, offset: 0 }));
  return (
    <div className="bg-black">
      <Header navItems={[]} isUserHeader={true} />
      <div className="mx-auto mt-16 flex min-h-screen max-w-[1440px] flex-col gap-4 md:flex-row md:p-6 lg:p-8 xl:p-10">
        <div className="flex flex-col gap-4 px-4 md:mt-0 md:w-1/2 md:px-6 md:pt-0 lg:w-2/5 xl:w-1/3">
          <Greetings name={user.name} className="md:text-lg lg:text-xl" />
          <div className="grid grid-cols-2 gap-4 py-2 md:gap-6">
            <DataCard
              title="Покупок совершено"
              value={user.statistics.user_qr_scanned_count}
              className="md:p-5 lg:p-6"
            />
            <DataCard title="Наград получено" value={user.statistics.coupons_bought} className="md:p-5 lg:p-6" />
          </div>
          <Link to="/user/available" className="w-full">
          <Button
            variant="secondary"
            className="h-[64px] rounded-[24px] text-xl w-full md:text-base lg:text-lg xl:h-[72px]"
            size="lg"
          >
            Доступные купоны
          </Button>
            </Link>
          <ShowUserQrButton className="h-[64px] rounded-[24px] text-xl md:text-base lg:text-lg xl:h-[72px]" />
        </div>
        <motion.div
          layoutId="business-cards-drawer"
          style={
            {
              "--business-cards-drawer-height": `${cards.length * 64 + 300}px`,
            } as React.CSSProperties
          }
          className="relative flex h-[var(--business-cards-drawer-height)] flex-col rounded-t-[32px] bg-[#1C1C1E] p-5 md:max-h-screen md:w-1/2 md:overflow-y-auto md:rounded-[32px] md:p-6 lg:w-3/5 xl:w-2/3"
        >
          <ScrollArea className="h-full">
            <div className="relative flex flex-col items-center md:items-stretch">
              {cards && cards.length > 0 ? (
                cards.map((card, index) => (
                  <Link
                    to={"/user/$businessId"}
                    params={{ businessId: card.id }}
                    key={card.id}
                    className={`absolute w-full md:static md:mb-4 lg:mb-6`}
                    style={{ top: `${index * 64}px` }}
                  >
                    <BusinessCard
                      id={card.id}
                      title={card.name}
                      amount={card.balance}
                      color={card.card_color}
                      amountPosition={"top"}
                      className="w-full shadow-lg md:h-[72px] lg:h-[80px]"
                    />
                  </Link>
                ))
              ) : (
                <div className="pt-[24px] text-center text-white">Увы, у вас пока нет ни одной карты</div>
              )}
            </div>
          </ScrollArea>
        </motion.div>
      </div>
    </div>
  );
}
