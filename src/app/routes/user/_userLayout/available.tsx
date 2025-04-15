import ReturnButton from "@/shared/components/ReturnButton";
import { PromoCard } from "@/entities/businessCard";
import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { userCoinProgramAvailableRewardsOptions } from "@/shared/api/user/userCoinProgramAvailableRewards/userCoinProgramAvailableRewardsApi";
export const Route = createFileRoute("/user/_userLayout/available")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useSuspenseQuery(
    userCoinProgramAvailableRewardsOptions({
      limit: 50,
      offset: 0,
    })
  );

  const hasAvailableRewards = data.some((item) => item.rewards.length > 0);

  return (
    <div className="flex min-h-screen flex-col gap-4 bg-black md:p-6 lg:p-8 xl:p-10">
      <div className="pt-3 md:pt-0">
        <ReturnButton className="md:text-lg" />
      </div>
      <div className="rounded-t-[32px] bg-[#1C1C1C] md:mx-auto md:w-full md:max-w-[1200px] md:rounded-[32px]">
        <div className="relative mx-4 flex min-h-[calc(100vh)] flex-col gap-3 rounded-t-[32px] p-2 pt-5 md:mx-6 md:mb-6 md:min-h-[500px] md:grid-cols-3 md:gap-4 md:rounded-[32px] md:p-6 lg:grid-cols-4 lg:p-8 xl:grid-cols-5">
          {!hasAvailableRewards ? (
            <div className="flex h-full w-full items-center justify-center">
              <p className="text-xl text-gray-400">Увы, вам ни на что не хватает</p>
            </div>
          ) : (
            data.map((item) => (
              <div key={item.coin_program.id} className="">
                <p className="text-xl font-bold mb-4">{item.coin_program.name}</p>
                <div className="flex gap-3 overflow-x-auto">
                  {item.rewards.map((reward) => (
                    <PromoCard
                      className="max-w-[200px] flex-shrink-0"
                      id={reward.id}
                      isInAvailable
                      key={reward.id}
                      name={reward.name}
                      has={item.coin_program.balance}
                      cost={reward.cost}
                      image_url={reward.image_url}
                      userCoinProgramId={item.coin_program.id}
                      description={reward.description}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
