// src/components/sections/Offerings.tsx

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useOrder } from "@/context/OrderContext";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import knotHero from "@/assets/knot-hero.png";
import knotSquare from "@/assets/knot-square.png";

const cards = [
  { title: "Разработка AI-решений", desc: "От идеи до продакшена: ML, NLP, CV и MLOps.", img: knotHero, extra: "Проектирование архитектуры, прототипы, метрики качества, запуск.", bgColor: "black" },
  { title: "Платформы и инструменты", desc: "Интеграции, пайплайны, аналитика и автоматизация.", img: knotSquare, extra: "CRM/BI интеграции, ETL, DataOps, мониторинг и алерты.", bgColor: "white" },
  { title: "Специализированные AI-услуги", desc: "Адаптация под домен и бизнес-процессы.", img: knotHero, extra: "Онтологии, доменные датасеты, безопасные развертывания.", bgColor: "black" },
  { title: "Исследования и разработка", desc: "Прототипирование новых моделей и подходов.", img: knotSquare, extra: "R&D эксперименты, бенчмарки, PoC → MVP.", bgColor: "white" }
];

function useTypewriter(text: string, speed = 30) {
  const [displayed, setDisplayed] = useState("");
  const intervalId = useRef<number | null>(null);

  useEffect(() => {
    setDisplayed("");
    if (intervalId.current) clearInterval(intervalId.current);

    let i = 0;
    intervalId.current = window.setInterval(() => {
      if (i < text.length) {
        setDisplayed(text.substring(0, i + 1));
        i++;
      } else if(intervalId.current) {
        clearInterval(intervalId.current);
      }
    }, speed);

    return () => {
      if (intervalId.current) clearInterval(intervalId.current);
    };
  }, [text, speed]);

  return displayed;
}

const Offerings = () => {
  const [active, setActive] = useState(0);
  const isMobile = useIsMobile();
  // Эффект печати используем только на десктопе
  const typedExtra = useTypewriter(isMobile ? "" : cards[active]?.extra || "");
  const { open } = useOrder();

  const renderCard = (c: typeof cards[0], i: number) => {
    const isSelected = active === i;
    const isBlackBg = c.bgColor === 'black';

    return (
      <article
        onClick={() => !isMobile && setActive(i)} // Клик для выбора активной карточки только на десктопе
        style={{ backgroundImage: `url(${c.img})`, backgroundSize: "cover", backgroundPosition: "top" }}
        className={`flex flex-col justify-end rounded-[30px] shadow-lg min-h-[460px] border-2 border-white 
                  ${!isMobile && 'cursor-pointer'}
                  ${isSelected && !isMobile ? "scale-105" : "scale-100"}
                  transition-all duration-300 overflow-hidden relative
                `}
      >
        <div
          className={`absolute bottom-0 left-0 w-full p-6 text-sm ${
            isBlackBg ? "bg-black/80 text-white" : "bg-white/80 text-black"
          }`}
        >
          <h3 className="text-xl font-extrabold mb-2">{c.title}</h3>
          <p className="opacity-80 mb-4 h-12">{c.desc}</p> {/* Задаем высоту, чтобы кнопка не прыгала */}

          {/* Доп. текст показываем только на десктопе и только для активной карточки */}
          {!isMobile && isSelected ? (
            <p className="h-12 mb-4">
              {typedExtra}
              <span className="animate-blink">|</span>
            </p>
          ) : (
            // На мобилке или для неактивных карточек оставляем пустое место, чтобы кнопка не прыгала
            <div className="h-12 mb-4" />
          )}

          <button
            onClick={(e) => { e.stopPropagation(); open(); }}
            className={`inline-block px-5 py-2 rounded-full font-bold transition-colors duration-300
              ${isBlackBg
                ? "bg-[#DBFE01] text-black hover:bg-[#5940FE] hover:text-white"
                : "bg-[#5940FE] text-white hover:bg-[#DBFE01] hover:text-black"
              }
            `}
          >
            Оставить заявку
          </button>
        </div>
      </article>
    );
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-[#0F0F0F] relative scroll-mt-[80px]"> {/* Добавлен scroll-mt-[80px] */}
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-12">
          <h2 className="text-4xl md:text-7xl font-extrabold text-[#DBFE01]">
            что мы предлагаем
          </h2>
          {!isMobile && (
            <div className="flex gap-3">
              <button onClick={() => setActive(prev => prev === 0 ? cards.length - 1 : prev - 1)} className="p-2 rounded-full bg-black text-white hover:bg-[#DBFE01] hover:text-black transition">
                <ChevronLeft size={24} />
              </button>
              <button onClick={() => setActive(prev => prev === cards.length - 1 ? 0 : prev + 1)} className="p-2 rounded-full bg-black text-white hover:bg-[#DBFE01] hover:text-black transition">
                <ChevronRight size={24} />
              </button>
            </div>
          )}
        </div>

        {isMobile ? (
          <Carousel opts={{ loop: true, align: "start" }} className="w-full">
            <CarouselContent className="-ml-4">
              {cards.map((c, i) => (
                <CarouselItem key={i} className="pl-4 basis-[90%] sm:basis-[60%]">
                  {renderCard(c, i)}
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2 bg-black/50 border-none text-white hover:bg-[#DBFE01] hover:text-black" />
            <CarouselNext className="right-2 bg-black/50 border-none text-white hover:bg-[#DBFE01] hover:text-black" />
          </Carousel>
        ) : (
          <div className="flex flex-wrap justify-center gap-6">
            {cards.map((c, i) => (
               <div key={i} className="w-full max-w-[300px]">
                 {renderCard(c, i)}
               </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Offerings;