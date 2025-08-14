// src/components/sections/Portfolio.tsx

import React from "react";
import { ArrowUpRight } from "lucide-react";

// Убедитесь, что пути к изображениям верны. Если нужно, замените их.
import retailImg1 from "@/assets/ретейл 1.jpg";
import retailImg2 from "@/assets/ретейл 2.jpg";
import medicineImg1 from "@/assets/медецина 1.jpg";
import medicineImg2 from "@/assets/медецина 2.jpg";
import brandImg1 from "@/assets/персональный 1.jpg";
import brandImg2 from "@/assets/персональный 2.jpg";


const cards = [
  {
    title: "ритейл",
    description: "Делаем цифровой аналог для магазина с интеграциями и вспомогательными системами.",
    align: "left", // 'left' или 'right' для выравнивания текста
    img1: retailImg1,
    img2: retailImg2,
    link: "https://www.cnews.ru/projects/2025/tsifrovizatsiya_retail_2025"
  },
  {
    title: "медицина",
    description: "AI для ранней диагностики и поддержки принятия решений.",
    align: "right", // Изменено для соответствия десктопному макету
    img1: medicineImg1,
    img2: medicineImg2,
    link: "https://tenchat.ru/media/2795161-ai-empower-early-detection"
  },
  {
    title: "персональный бренд",
    description: "Создаём цифровую упаковку и помогаем с продвижением.",
    align: "left", // Изменено для соответствия десктопному макету
    img1: brandImg1,
    img2: brandImg2,
    link: "https://tenchat.ru/korchashkin?utm_source=7608ade2-fc34-47da-8733-b9754168b044"
  }
];

// Отдельный компонент карточки для чистоты кода
function Card({ card }: { card: typeof cards[0] }) {
  return (
    <a
      href={card.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block space-y-4 w-full max-w-[488px] mx-auto"
    >
      {/* Блок с картинкой */}
      <div className="relative overflow-hidden rounded-3xl border border-gray-700 h-[400px]">
        {/* Стрелка */}
        <div className="absolute top-4 right-4 z-10 p-2 border border-white rounded-full bg-black/30 transition-colors duration-300 group-hover:bg-purple-600">
          <ArrowUpRight className="w-6 h-6 text-white" />
        </div>

        {/* Картинки с эффектом смены */}
        <div className="relative w-full h-full">
          <img
            src={card.img1}
            alt={card.title}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-100 group-hover:opacity-0"
          />
          <img
            src={card.img2}
            alt={card.title}
            className="absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out opacity-0 group-hover:opacity-100"
          />
        </div>
      </div>

      {/* Заголовок + описание */}
      <div
        className={`flex flex-col gap-1 ${
          card.align === "right" ? "md:text-right md:items-end" : "md:text-left md:items-start"
        } text-left items-start`} // По умолчанию слева для мобильных
      >
        <h3 className="text-2xl font-extrabold text-[#DBFE01] capitalize">{card.title}</h3>
        <p className="text-white leading-snug max-w-[300px]">
          {card.description}
        </p>
      </div>
    </a>
  );
}

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="py-16 md:py-24"
      // Уменьшен scrollMarginTop для лучшего позиционирования
      style={{ scrollMarginTop: "50px" }} 
    >
      <div className="container mx-auto px-4">
        {/* Заголовок и подзаголовок */}
        <div className="grid grid-cols-1 md:grid-cols-2 items-start gap-8 md:gap-4 text-center md:text-left">
           <h2 className="text-[#DBFE01] text-5xl md:text-6xl font-extrabold md:text-right order-1 md:order-2">
            портфолио
          </h2>
          <p className="text-white text-lg leading-snug max-w-md mx-auto md:mx-0 md:max-w-none order-2 md:order-1">
            Любимые кейсы из&nbsp;нескольких сфер.
            <br className="hidden md:block" /> Но&nbsp;вообще мы&nbsp;работали с&nbsp;разным:
            <br className="hidden md:block" /> от&nbsp;ритейла до&nbsp;медицины.
          </p>
        </div>

        {/* Карточки */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-10 items-start">
          {/* Левая колонка на десктопе */}
          <div className="flex flex-col gap-12 md:gap-10">
            <Card card={cards[0]} />
            <Card card={cards[1]} />
          </div>
          {/* Правая колонка на десктопе */}
          <div className="flex flex-col justify-center md:mt-[260px]">
            <Card card={cards[2]} />
          </div>
        </div>
      </div>
    </section>
  );
}