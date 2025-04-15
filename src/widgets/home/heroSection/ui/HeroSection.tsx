import * as m from "motion/react-m";
const HeroSection = () => {
  return (
    <div className="flex flex-col justify-evenly h-lvh md:mb-12 mb-16 pt-6 text-center sm:mb-32 sm:pt-12">
      <div>
      <m.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-4 text-2xl font-bold tracking-tight sm:mb-6 sm:text-5xl"
      >
        Т-Лояльность
      </m.h1>
      <m.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="mx-auto max-w-xl text-sm text-white sm:text-base"
      >
        Объединяем интересы миллионов клиентов и тысяч предпринимателей в единой экосистеме Т-Банка
      </m.p>
      </div>
      <m.img
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        src="/icons/3dCharts.png"
        alt="Problem & Solution"
        className="mx-auto w-[450px] sm:max-w-[80%]"
      />
    </div>
  );
};

export default HeroSection;
