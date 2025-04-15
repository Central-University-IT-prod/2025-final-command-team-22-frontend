import { Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import * as motion from "motion/react-m";
import { Button } from "@/shared/components/ui/button";
import { Menu, X } from "lucide-react";
import { INavItem } from "../models/INavItem";
import { AnimatePresence } from "motion/react";
import { useUpdateUserAuth } from "@/shared/api/user/userAuth/userAuthApi";
import { useUpdateBusinessAuth } from "@/shared/api/business/businessAuth/businessAuthApi";
import { toast } from "sonner";
import { Separator } from "@/shared/components/ui/separator";

export function Header({
  navItems,
  toggleProfileMenu,
  isUserHeader = false,
  isBusinessHeader = false,
}: {
  navItems: INavItem[];
  toggleProfileMenu?: () => void;
  isUserHeader?: boolean;
  isBusinessHeader?: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);
  const profileButtonRef = useRef<HTMLButtonElement>(null);
  const profileContainerRef = useRef<HTMLDivElement>(null);
  const { logoutUserMutation: logoutUser } = useUpdateUserAuth();
  const { logoutBusinessMutation: logoutBusiness } = useUpdateBusinessAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Обработка наведения и ухода курсора для меню личного кабинета
  useEffect(() => {
    const handleMouseEnter = () => {
      setIsProfileMenuOpen(true);
    };

    const handleMouseLeave = (e: MouseEvent) => {
      // Проверяем, не перешел ли курсор с кнопки на меню или наоборот, или на контейнер между ними
      if (profileContainerRef.current && !profileContainerRef.current.contains(e.relatedTarget as Node)) {
        setIsProfileMenuOpen(false);
      }
    };

    const containerElement = profileContainerRef.current;

    if (containerElement) {
      containerElement.addEventListener("mouseenter", handleMouseEnter);
      containerElement.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (containerElement) {
        containerElement.removeEventListener("mouseenter", handleMouseEnter);
        containerElement.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  const handleConfirmLogout = async () => {
    try {
      if (isUserHeader) await logoutUser.mutateAsync();
      else await logoutBusiness.mutateAsync();
      toast.success("Вы успешно вышли из аккаунта", {
        action: {
          label: "Закрыть",
          onClick: () => toast.dismiss(),
        },
      });
    window.location.href = "/";
    } catch (err) {
      console.error(err);
      toast.error("Ошибка при выходе из аккаунта", {
        action: {
          label: "Закрыть",
          onClick: () => toast.dismiss(),
        },
      });
    } finally {
      setIsLogoutModalOpen(false);
    }
  };

  // Список ссылок для выпадающего меню личного кабинета
  const profileLinks = [
    { name: "Вход для бизнеса", link: "/business/login", iconUrl: "/icons/backpack.svg" },
    { name: "Вход для клиента", link: "/user/login", iconUrl: "/icons/avatar.svg" },
  ];

  return (
    <>
      <motion.nav
        className="fixed top-0 right-0 left-0 z-50 bg-black"
        initial={{ boxShadow: "none", opacity: 0, y: -20 }}
        animate={{ boxShadow: "var(--box-shadow)", opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between lg:justify-start">
            <div className="flex items-center">
              <motion.div
                className="flex items-center space-x-4"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={isUserHeader ? "/user" : isBusinessHeader ? "/business/coin-program" : "/"}
                  className="text-foreground flex items-center space-x-2 text-2xl font-bold"
                >
                  <div className="flex-none">
                    <img src="/tbank-logo.svg" alt="logo" className="w-20 sm:w-24" />
                  </div>
                </Link>
              </motion.div>
            </div>

            <nav className="hidden flex-1 justify-start space-x-8 md:ml-14 md:flex">
              {navItems.map((item) => (
                <Link
                  to={item.link}
                  key={item.name}
                  className="text-secondary-foreground hover:text-foreground text-nowrap transition-colors"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            {(isBusinessHeader || isUserHeader) && (
              <>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="mr-2 ml-auto flex items-center"
                >
                  <motion.button
                    onClick={() => setIsLogoutModalOpen(true)}
                    className="hover:bg-background/80 text-accent flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 transition-colors duration-300"
                  >
                    <span>Выйти</span>
                    <div className="text-accent flex w-5 items-center justify-center rounded-full">
                      <img src="/icons/logout.png" alt="logout" className="h-4 w-4" />
                    </div>
                  </motion.button>
                </motion.div>
              </>
            )}
            {toggleProfileMenu == null && !isUserHeader ? (
              <Button size="icon" variant="secondary" className="md:hidden" onClick={toggleMenu}>
                <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  {isOpen ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                  )}
                </motion.div>
              </Button>
            ) : !isUserHeader && !isBusinessHeader ? (
              <div className="relative" ref={profileContainerRef}>
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, type: "spring" }}
                  className="flex items-center"
                >
                  <motion.button
                    ref={profileButtonRef}
                    onClick={toggleProfileMenu}
                    className="hover:bg-background/80 text-accent flex items-center gap-2 rounded-lg px-4 py-2 transition-colors duration-300"
                  >
                    <span>Личный кабинет</span>
                    <div className="text-accent flex w-5 items-center justify-center rounded-full">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-accent"
                      >
                        <path d="M3 19a6 6 0 0 1 6-6h6a6 6 0 0 1 6 6v3H3v-3Z" fill="currentColor" />
                        <path
                          d="M16.223 2.952a2.454 2.454 0 0 1-2.177 1.32H11.59a2.455 2.455 0 0 0-2.454 2.455v3.88A4.5 4.5 0 0 0 16.5 7.137V4.273c0-.47-.1-.917-.278-1.32Z"
                          fill="currentColor"
                          fillOpacity="0.35"
                        />
                        <path
                          d="M16.223 2.952A3.274 3.274 0 0 0 13.227 1H7.5v6.136a4.49 4.49 0 0 0 1.636 3.472v-3.88a2.455 2.455 0 0 1 2.455-2.455h2.455c.946 0 1.767-.536 2.177-1.32Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                  </motion.button>
                </motion.div>

                {/* Невидимый элемент для соединения кнопки и меню */}
                <div className="absolute right-0 h-5 w-full" style={{ pointerEvents: "auto" }}></div>

                <AnimatePresence>
                  {isProfileMenuOpen && (
                    <motion.div
                      ref={profileMenuRef}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-5 w-60 rounded-md bg-black shadow-lg"
                    >
                      <div className="p-1">
                        {profileLinks.map((item, index) => (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05, duration: 0.2 }}
                            className="hover:bg-secondary/50 rounded-md"
                          >
                            <Link
                              to={item.link}
                              className="hover:bg-secondary/10 text-foreground flex items-center px-4 py-3 text-sm"
                            >
                              <img src={item.iconUrl} alt={item.name} className="mr-3 h-5 w-5" />
                              {item.name}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : null}
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0, transition: { duration: 0.2 } }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden"
            >
              <div className="flex flex-col gap-3 px-2 pt-2 pb-3 sm:px-3">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    onClick={toggleMenu}
                  >
                    <Link
                      to={item.link}
                      className={
                        "bg-secondary hover:bg-card-foreground hover:text-secondary block rounded-md px-3 py-2 text-base font-medium text-white transition-colors"
                      }
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {isUserHeader && <Separator />}
      </motion.nav>
      <AnimatePresence>
        {isLogoutModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black"
              onClick={() => setIsLogoutModalOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed top-1/2 left-1/2 z-50 w-[90%] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-black p-6 shadow-xl"
            >
              <h2 className="text-foreground mb-4 text-xl font-semibold">Подтверждение выхода</h2>
              <p className="text-secondary-foreground mb-6">Вы действительно хотите выйти из аккаунта? </p>
              <div className="flex justify-end gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setIsLogoutModalOpen(false)}
                  className="hover:bg-secondary/80"
                >
                  Отмена
                </Button>
                <Button onClick={handleConfirmLogout}>Выйти</Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
