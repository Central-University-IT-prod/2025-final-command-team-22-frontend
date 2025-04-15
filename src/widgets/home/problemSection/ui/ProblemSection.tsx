import * as m from "motion/react-m";

const ProblemSection = () => {
  return (
    <div className="mb-16 sm:mb-32">
      <m.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="mb-6 text-center sm:mb-16"
      >
        <h2 className="px-4 text-xl font-bold sm:text-4xl">Революция в лояльности клиентов</h2>
      </m.div>

      <div className="flex flex-col items-stretch justify-center gap-4 sm:gap-8 lg:flex-row">
        {/* Problem */}
        <m.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="group border-border/50 bg-card relative w-full overflow-hidden rounded-2xl border p-4 sm:p-8 lg:col-span-5 lg:max-w-[500px]"
        >
          <div className="bg-destructive/10 absolute top-0 right-0 h-32 w-32 rounded-full blur-3xl transition-all group-hover:scale-150"></div>
          <div className="relative flex h-full flex-col justify-between">
            <div>
              <div className="flex flex-row items-center gap-4">
                <div className="bg-destructive/10 text-destructive mb-4 inline-flex rounded-2xl p-2 sm:mb-6 sm:p-3">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>

                <h3 className="mb-4 text-xl font-bold sm:mb-6 sm:text-2xl">Текущие сложности</h3>
              </div>

              <div className="mb-4 space-y-3 sm:mb-6 sm:space-y-4">
                <div className="group/item flex items-start">
                  <div className="bg-destructive/10 text-destructive group-hover/item:bg-destructive/20 mt-1 mr-3 rounded-full p-1 transition-all duration-300 group-hover/item:scale-110">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div className="transition-all duration-300 group-hover/item:translate-x-2">
                    <p className="text-muted-foreground text-base">Сложная интеграция существующих решений</p>
                  </div>
                </div>
                <div className="group/item flex items-start">
                  <div className="bg-destructive/10 text-destructive group-hover/item:bg-destructive/20 mt-1 mr-3 rounded-full p-1 transition-all duration-300 group-hover/item:scale-110">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div className="transition-all duration-300 group-hover/item:translate-x-2">
                    <p className="text-muted-foreground text-base">Высокие затраты на разработку и поддержку</p>
                  </div>
                </div>
                <div className="group/item flex items-start">
                  <div className="bg-destructive/10 text-destructive group-hover/item:bg-destructive/20 mt-1 mr-3 rounded-full p-1 transition-all duration-300 group-hover/item:scale-110">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div className="transition-all duration-300 group-hover/item:translate-x-2">
                    <p className="text-muted-foreground text-base">
                      Неудобство для клиентов: множество карт и приложений
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-border/50 bg-card/50 mt-auto rounded-xl border p-4 sm:p-6">
              <p className="mb-1 text-2xl font-bold sm:mb-2 sm:text-3xl">60% клиентов</p>
              <p className="text-muted-foreground text-sm sm:text-base">
                отказываются от участия в программах лояльности из-за сложности использования
              </p>
            </div>
          </div>
        </m.div>

        {/* Solution */}
        <m.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="group border-border/50 bg-card relative w-full overflow-hidden rounded-2xl border p-4 sm:p-8 lg:col-span-5 lg:max-w-[500px]"
        >
          <div className="bg-primary/10 absolute top-0 right-0 h-32 w-32 rounded-full blur-3xl transition-all group-hover:scale-150"></div>
          <div className="relative flex h-full flex-col justify-between">
            <div>
              <div className="flex flex-row items-center gap-4">
                <div className="bg-primary/10 text-primary mb-4 inline-flex rounded-2xl p-2 sm:mb-6 sm:p-3">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>

                <h3 className="mb-4 text-xl font-bold sm:mb-6 sm:text-2xl">Наше решение</h3>
              </div>

              <div className="mb-4 space-y-3 sm:mb-6 sm:space-y-4">
                <m.div className="group/item flex items-start">
                  <div className="bg-primary/10 text-primary group-hover/item:bg-primary/20 mt-1 mr-4 flex items-center justify-center rounded-full p-1.5 transition-all duration-300 group-hover/item:scale-110">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <m.div whileHover={{ x: 8 }} transition={{ duration: 0.3 }}>
                    <p className="text-muted-foreground text-base">Быстрое подключение без сложных интеграций</p>
                  </m.div>
                </m.div>
                <m.div className="group/item flex items-start">
                  <div className="bg-primary/10 text-primary group-hover/item:bg-primary/20 mt-1 mr-4 flex items-center justify-center rounded-full p-1.5 transition-all duration-300 group-hover/item:scale-110">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <m.div whileHover={{ x: 8 }} transition={{ duration: 0.3 }}>
                    <p className="text-muted-foreground text-base">Автоматическое начисление бонусов при оплате</p>
                  </m.div>
                </m.div>
                <m.div className="group/item flex items-start">
                  <div className="bg-primary/10 text-primary group-hover/item:bg-primary/20 mt-1 mr-4 flex items-center justify-center rounded-full p-1.5 transition-all duration-300 group-hover/item:scale-110">
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <m.div whileHover={{ x: 8 }} transition={{ duration: 0.3 }}>
                    <p className="text-muted-foreground text-base">
                      Подробная аналитика и инструменты для роста бизнеса
                    </p>
                  </m.div>
                </m.div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <m.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="border-border/50 bg-card/50 hover:bg-card rounded-xl border p-3 sm:p-6"
              >
                <p className="mb-1 text-2xl font-bold sm:text-3xl">15 мин</p>
                <p className="text-muted-foreground text-xs sm:text-sm">на подключение бизнеса</p>
              </m.div>
              <m.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.3 }}
                className="border-border/50 bg-card/50 hover:bg-card rounded-xl border p-3 sm:p-6"
              >
                <p className="mb-1 text-2xl font-bold sm:text-3xl">40M+</p>
                <p className="text-muted-foreground text-xs sm:text-sm">клиентов Т-Банка</p>
              </m.div>
            </div>
          </div>
        </m.div>
      </div>
    </div>
  );
};

export default ProblemSection;
