import * as m from "motion/react-m";

const BenefitSection = () => {
  return (
    <div className="">
      <m.h2
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 px-4 text-center text-xl font-bold sm:mb-16 sm:text-4xl"
      >
        Преимущества платформы
      </m.h2>
      <div className="grid grid-cols-1 gap-4 sm:gap-8 lg:grid-cols-2">
        {/* Для бизнеса */}
        <m.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="group border-border/50 bg-card relative overflow-hidden rounded-2xl border p-4 backdrop-blur-sm sm:p-8"
        >
          <div className="bg-primary/10 absolute top-0 -right-20 h-40 w-40 rounded-full blur-3xl transition-all group-hover:scale-150"></div>
          <div className="relative">
            <div className="mb-4 flex items-center sm:mb-8">
              <div className="bg-primary text-primary-foreground mr-3 flex h-10 w-10 items-center justify-center rounded-xl sm:mr-4 sm:h-14 sm:w-14">
                <svg className="h-5 w-5 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold sm:text-3xl">Для бизнеса</h3>
            </div>
            <div className="grid gap-3 sm:gap-6">
              <m.div whileHover={{ x: 8 }} transition={{ duration: 0.3 }} className="group/item flex items-start">
                <div className="bg-primary/10 text-primary group-hover/item:bg-primary/20 mt-1 mr-3 flex items-center justify-center rounded-full p-1.5 transition-all duration-300 group-hover/item:scale-110 sm:mr-4">
                  <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-medium sm:text-lg">Быстрая интеграция</h4>
                  <p className="text-muted-foreground mt-0.5 text-sm sm:mt-1 sm:text-base">
                    Подключение за 15 минут без сложных технических работ
                  </p>
                </div>
              </m.div>
              <m.div whileHover={{ x: 8 }} transition={{ duration: 0.3 }} className="group/item flex items-start">
                <div className="bg-primary/10 text-primary group-hover/item:bg-primary/20 mt-1 mr-3 flex items-center justify-center rounded-full p-1.5 transition-all duration-300 group-hover/item:scale-110 sm:mr-4">
                  <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-medium sm:text-lg">Гибкая настройка</h4>
                  <p className="text-muted-foreground mt-0.5 text-sm sm:mt-1 sm:text-base">
                    Создавайте уникальные программы лояльности под ваш бизнес
                  </p>
                </div>
              </m.div>
              <m.div whileHover={{ x: 8 }} transition={{ duration: 0.3 }} className="group/item flex items-start">
                <div className="bg-primary/10 text-primary group-hover/item:bg-primary/20 mt-1 mr-3 flex items-center justify-center rounded-full p-1.5 transition-all duration-300 group-hover/item:scale-110 sm:mr-4">
                  <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-medium sm:text-lg">Аналитика и отчеты</h4>
                  <p className="text-muted-foreground mt-0.5 text-sm sm:mt-1 sm:text-base">
                    Детальная статистика по клиентам и транзакциям
                  </p>
                </div>
              </m.div>

              <m.div whileHover={{ x: 8 }} transition={{ duration: 0.3 }} className="group/item flex items-start">
                <div className="bg-primary/10 text-primary group-hover/item:bg-primary/20 mt-1 mr-3 flex items-center justify-center rounded-full p-1.5 transition-all duration-300 group-hover/item:scale-110 sm:mr-4">
                  <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-medium sm:text-lg">Готовая база клиентов</h4>
                  <p className="text-muted-foreground mt-0.5 text-sm sm:mt-1 sm:text-base">
                    Доступ к клиентской базе банка
                  </p>
                </div>
              </m.div>
              <m.div whileHover={{ x: 8 }} transition={{ duration: 0.3 }} className="group/item flex items-start">
                <div className="bg-primary/10 text-primary group-hover/item:bg-primary/20 mt-1 mr-3 flex items-center justify-center rounded-full p-1.5 transition-all duration-300 group-hover/item:scale-110 sm:mr-4">
                  <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-medium sm:text-lg">Не требует доп. оборудования</h4>
                  <p className="text-muted-foreground mt-0.5 text-sm sm:mt-1 sm:text-base">
                    Сканируйте QR-коды прямо с сайта
                  </p>
                </div>
              </m.div>
            </div>
          </div>
        </m.div>

        {/* Для клиентов */}
        <m.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="group border-border/50 bg-card relative overflow-hidden rounded-2xl border p-4 backdrop-blur-sm sm:p-8"
        >
          <div className="bg-accent/10 absolute top-0 right-0 h-32 w-32 rounded-full blur-3xl transition-all group-hover:scale-150"></div>
          <div className="relative">
            <div className="mb-4 flex items-center sm:mb-8">
              <div className="bg-accent text-accent-foreground mr-3 flex h-10 w-10 items-center justify-center rounded-xl sm:mr-4 sm:h-14 sm:w-14">
                <svg className="h-5 w-5 sm:h-7 sm:w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold sm:text-3xl">Для клиентов</h3>
            </div>
            <div className="grid gap-3 sm:gap-6">
              <m.div whileHover={{ x: 8 }} transition={{ duration: 0.3 }} className="group/item flex items-start">
                <div className="bg-accent/10 text-accent group-hover/item:bg-accent/20 mt-1 mr-3 flex items-center justify-center rounded-full p-1.5 transition-all duration-300 group-hover/item:scale-110 sm:mr-4">
                  <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-medium sm:text-lg">Единый сайт</h4>
                  <p className="text-muted-foreground mt-0.5 text-sm sm:mt-1 sm:text-base">
                    Все карты любимых магазинов в одном месте
                  </p>
                </div>
              </m.div>
              <m.div whileHover={{ x: 8 }} transition={{ duration: 0.3 }} className="group/item flex items-start">
                <div className="bg-accent/10 text-accent group-hover/item:bg-accent/20 mt-1 mr-3 flex items-center justify-center rounded-full p-1.5 transition-all duration-300 group-hover/item:scale-110 sm:mr-4">
                  <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-medium sm:text-lg">Автоматическое начисление</h4>
                  <p className="text-muted-foreground mt-0.5 text-sm sm:mt-1 sm:text-base">
                    Бонусы зачисляются сразу после покупки
                  </p>
                </div>
              </m.div>

              <m.div whileHover={{ x: 8 }} transition={{ duration: 0.3 }} className="group/item flex items-start">
                <div className="bg-accent/10 text-accent group-hover/item:bg-accent/20 mt-1 mr-3 flex items-center justify-center rounded-full p-1.5 transition-all duration-300 group-hover/item:scale-110 sm:mr-4">
                  <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-medium sm:text-lg">Мобильный доступ</h4>
                  <p className="text-muted-foreground mt-0.5 text-sm sm:mt-1 sm:text-base">
                    Управляйте своими бонусами через удобный адаптивный сайт
                  </p>
                </div>
              </m.div>
              <m.div whileHover={{ x: 8 }} transition={{ duration: 0.3 }} className="group/item flex items-start">
                <div className="bg-accent/10 text-accent group-hover/item:bg-accent/20 mt-1 mr-3 flex items-center justify-center rounded-full p-1.5 transition-all duration-300 group-hover/item:scale-110 sm:mr-4">
                  <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-medium sm:text-lg">Моментальное сканирование</h4>
                  <p className="text-muted-foreground mt-0.5 text-sm sm:mt-1 sm:text-base">
                    Быстрое сканирование QR-кодов для получения наград
                  </p>
                </div>
              </m.div>
              <m.div whileHover={{ x: 8 }} transition={{ duration: 0.3 }} className="group/item flex items-start">
                <div className="bg-accent/10 text-accent group-hover/item:bg-accent/20 mt-1 mr-3 flex items-center justify-center rounded-full p-1.5 transition-all duration-300 group-hover/item:scale-110 sm:mr-4">
                  <svg className="h-3 w-3 sm:h-4 sm:w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-base font-medium sm:text-lg">Широкий выбор вознаграждений</h4>
                  <p className="text-muted-foreground mt-0.5 text-sm sm:mt-1 sm:text-base">
                    Возможность обменять баллы на различные товары и услуги
                  </p>
                </div>
              </m.div>
            </div>
          </div>
        </m.div>
      </div>
    </div>
  );
};

export default BenefitSection;
