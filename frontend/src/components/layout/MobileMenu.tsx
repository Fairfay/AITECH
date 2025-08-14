// src/components/layout/MobileMenu.tsx
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useOrder } from "@/context/OrderContext";

const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { open: openOrder } = useOrder();

  const handleScroll = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false); // Закрываем меню после клика
  };
  
  const handleOrderClick = () => {
    openOrder();
    setIsOpen(false);
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <Button
        variant="ghost"
        size="icon"
        className="md:hidden w-10 h-10" // Увеличиваем кликабельную область
        onClick={() => setIsOpen(true)}
        aria-label="Открыть меню"
      >
        <Menu className="w-6 h-6" /> {/* Иконка побольше */}
      </Button>
      <SheetContent side="left" className="bg-black text-white border-l-gray-800 w-[80vw] p-6">
        <SheetHeader>
          <SheetTitle className="text-left text-2xl font-bold text-[#d4ff00]">Меню</SheetTitle>
           <button
             onClick={() => setIsOpen(false)}
             className="absolute top-5 right-5 p-1 rounded-full text-white/70 hover:text-white hover:bg-white/10"
             aria-label="Закрыть меню"
           >
             <X size={24}/>
           </button>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-8 text-lg">
          <a onClick={() => handleScroll('#about')} className="cursor-pointer">О нас</a>
          <a onClick={() => handleScroll('#portfolio')} className="cursor-pointer">Портфолио</a>
          <a onClick={() => handleScroll('#services')} className="cursor-pointer">Услуги</a>
          <a onClick={() => handleScroll('#blog')} className="cursor-pointer">Блог</a>
          <a onClick={() => handleScroll('#contacts')} className="cursor-pointer">Контакты</a>
        </nav>
        <Button variant="cta" size="lg" className="w-full mt-10 font-bold text-base" onClick={handleOrderClick}>
            Хочу проект
        </Button>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;