import { createLazyFileRoute } from "@tanstack/react-router";
import { Header } from "@/widgets/header";
import { useState, useEffect } from "react";
import BenefitSection from "@/widgets/home/benefitSection";
import ProblemSection from "@/widgets/home/problemSection";
import HeroSection from "@/widgets/home/heroSection";
import * as m from "motion/react-m";

export const Route = createLazyFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [showScrollArrow, setShowScrollArrow] = useState(true);

  // Отслеживаем скролл страницы
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setShowScrollArrow(false);
      } else {
        setShowScrollArrow(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Функция для плавного скролла вниз при клике на стрелку
  const scrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <Header navItems={[]} toggleProfileMenu={() => setIsProfileMenuOpen(!isProfileMenuOpen)} />

      <div className="relative mb-16">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <HeroSection />
          <ProblemSection />
          <BenefitSection />
        </div>
        
        {showScrollArrow && (
          <m.div 
            className="fixed bottom-5 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
            exit={{ opacity: 0 }}
            onClick={scrollDown}
          >
            <svg 
              width="30" 
              height="30" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="text-white transition-colors"
            >
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </m.div>
        )}
      </div>
    </div>
  );
}
