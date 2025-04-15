import { NotFoundPage } from "@/app/status-pages/NotFoundPage";
import { BusinessCard, PromoCard } from "@/entities/businessCard";
import { userCoinProgramOptions } from "@/shared/api/user/userCoinProgram/userCoinProgramApi";
import { userCoinProgramRewardsOptions } from "@/shared/api/user/userCoinProgramRewards/userCoinProgramRewardsApi";
import ReturnButton from "@/shared/components/ReturnButton";
import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Loader } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/user/_userLayout/$businessId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { businessId } = Route.useParams();
  const { data: businessCard } = useSuspenseQuery(userCoinProgramOptions(businessId));
  const { data: rewards, isLoading } = useQuery(
    userCoinProgramRewardsOptions({
      coinProgramParticipantId: businessCard.id,
      limit: 10,
      offset: 0,
    })
  );

  if (!businessCard) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex min-h-screen flex-col gap-4 bg-black md:p-6 lg:p-8 xl:p-10">
      <div className="pt-3 md:pt-0">
        <ReturnButton className="md:text-lg" />
      </div>
      <div className="rounded-t-[32px] bg-black md:mx-auto md:w-full md:max-w-[1200px] md:rounded-[32px]">
        <motion.div
          transition={{ duration: 0.3 }}
          className="relative z-40 flex flex-1 flex-col p-5 md:p-6 lg:p-8"
          layoutId={`business-cards-drawer`}
        >
          <BusinessCard
            id={businessCard.id}
            title={businessCard.name}
            description={businessCard.description}
            amount={businessCard.balance}
            color={businessCard.card_color}
            className="md:h-[160px] lg:h-[200px]"
          />
        </motion.div>
        <motion.div
          animate={{ y: 0 }}
          initial={{ y: 1000 }}
          transition={{ duration: 0.3 }}
          className="relative mx-4 grid min-h-[calc(100vh-300px)] auto-rows-min grid-cols-2 gap-2 rounded-t-[32px] bg-[#1C1C1C] p-5 md:mx-6 md:mb-6 md:min-h-[500px] md:grid-cols-3 md:gap-4 md:rounded-[32px] md:p-6 lg:grid-cols-4 lg:p-8 xl:grid-cols-5"
        >
          {rewards &&
            rewards.map((reward) => (
              <PromoCard
                id={reward.id}
                isInAvailable
                key={reward.id}
                name={reward.name}
                has={businessCard.balance}
                cost={reward.cost}
                image_url={reward.image_url}
                description={reward.description}
                userCoinProgramId={businessCard.id}
                className="bg-[#343434]"
              />
            ))}
          {isLoading && (
            <div className="col-span-full h-full w-full bg-white">
              <Loader className="h-full w-full animate-spin" />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
