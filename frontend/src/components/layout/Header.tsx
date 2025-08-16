// src/components/layout/Header.tsx
// ... (импорты как в прошлый раз)
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LogoTag } from "../ui/LogoTag";
import { useOrder } from "@/context/OrderContext";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
    // ... (логика как в прошлый раз)
  const { open: openOrderModal } = useOrder();
  const isMobile = useIsMobile();
  const [isSheetOpen, setSheetOpen] = useState(false);

  // ИЗМЕНЕНИЕ: Добавлена логика для центрирования при клике на "Контакты" в мобильной версии
  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id: string
  ) => {
    e.preventDefault();
    setSheetOpen(false);
    setTimeout(() => {
      const element = document.querySelector(id);
      if (element) {
        // Если это ссылка на секцию CTA в мобильной версии, скроллим к центру
        if (id === '#cta-section' && isMobile) {
          element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        } else {
          // Стандартное поведение для всех остальных ссылок
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 300);
  };
    
  if (isMobile) {
    return (
      <header className="fixed top-0 left-0 w-full z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border/50">
        <nav className="container mx-auto flex items-center justify-between py-2">
          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              {/* Применяем новый класс для увеличения иконки */}
              <Button variant="ghost" size="icon" aria-label="Открыть меню" className="burger-icon">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[min(85vw,320px)] bg-black border-r-gray-800 p-4">
              <button onClick={() => setSheetOpen(false)} className="absolute top-4 right-4 text-white" aria-label="Закрыть меню">
                  <X className="h-9 w-9" />
              </button>
              <SheetHeader>
                 <a href="#hero" onClick={(e) => handleScroll(e, "#hero")} className="self-start mb-12 mt-4"><LogoTag /></a>
              </SheetHeader>
              <div className="flex flex-col gap-6 text-xl font-medium">
                {/* Меняем местами О нас и Услуги */}
                <a href="#portfolio" onClick={(e) => handleScroll(e, "#portfolio")}>Портфолио</a>
                <a href="#services" onClick={(e) => handleScroll(e, "#services")}>Услуги</a>
                <a href="#team" onClick={(e) => handleScroll(e, "#team")}>О нас</a>
                <a href="#blog" onClick={(e) => handleScroll(e, "#blog")}>Блог</a>
                {/* ИЗМЕНЕНИЕ: Ссылка теперь ведет на #cta-section для запуска кастомного скролла */}
                <a href="#cta-section" onClick={(e) => handleScroll(e, "#cta-section")}>Контакты</a>
              </div>
            </SheetContent>
          </Sheet>
          <Button variant="cta" onClick={openOrderModal} className="font-bold text-base px-5 py-3 h-auto">Хочу проект</Button>
        </nav>
      </header>
    );
  }

  // Десктопная версия
  return (
    <header className="fixed top-0 left-0 w-full z-40 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-b border-border/50">
       <nav className="container mx-auto flex items-center justify-between py-4">
         {/* ... (код десктопного хедера без изменений) ... */}
          <div className="flex items-center gap-2">
            {/* Меняем местами О нас и Услуги */}
            <Button variant="pill" asChild><a href="#services" aria-label="Услуги" onClick={(e) => handleScroll(e, "#services")}>Услуги</a></Button>
            <Button variant="pill" asChild><a href="#team" aria-label="О нас" onClick={(e) => handleScroll(e, "#team")}>О нас</a></Button>
            <Button variant="pill" asChild><a href="#blog" aria-label="Блог" onClick={(e) => handleScroll(e, "#blog")}>Блог</a></Button>
          </div>
          <a href="#hero" onClick={(e) => handleScroll(e, "#hero")} className="ml-20 cursor-pointer"><LogoTag /></a>
          <div className="flex items-center gap-2">
            <Button variant="pill" asChild><a href="#portfolio" aria-label="Портфолио" onClick={(e) => handleScroll(e, "#portfolio")}>Портфолио</a></Button>
            {/* На десктопе ссылка "Контакты" по-прежнему ведет на футер */}
            <Button variant="pill" asChild><a href="#contacts" aria-label="Контакты" onClick={(e) => handleScroll(e, "#contacts")}>Контакты</a></Button>
            <Button variant="cta" onClick={openOrderModal}>Хочу проект</Button>
          </div>
       </nav>
    </header>
  );
};

export default Header;