// src/components/sections/Blog.tsx

import { ArrowUpRight } from "lucide-react";
import deepImg from "@/assets/deepseek.png";
import perplexityImg from "@/assets/perplexity.png";
import lovableImgClean from "@/assets/lovable.png";
import cursorImgClean from "@/assets/cursor.png";
import claudeImgClean from "@/assets/claude.png";
import deeplImg from "@/assets/deepl.jpg";

const posts = [
  // Удалена дата из объектов постов
  { title: "Perplexity — поиск ИИ-ответов", href: "https://www.perplexity.ai", tag: "ИИ", desc: "Поиск и ответы с использованием искусственного интеллекта", image: perplexityImg, big: true },
  { title: "DeepSeek — глубокий поиск", href: "https://deepseek.com", tag: "ИИ", desc: "Продвинутая аналитика и поиск по данным", image: deepImg },
  { title: "Lovable — no-code платформа", href: "https://lovable.dev", tag: "ИИ", desc: "Быстрое создание приложений без кода", image: lovableImgClean },
  { title: "Cursor — AI-редактор кода", href: "https://cursor.com", tag: "ИИ", desc: "Интеллектуальный редактор кода с поддержкой ИИ", image: cursorImgClean },
  { title: "Claude — длинный контекст", href: "https://claude.ai", tag: "ИИ", desc: "Модель для рассуждений и обработки длинных текстов", image: claudeImgClean },
  { title: "DeepL — переводчик ИИ", href: "https://deepl.com", tag: "ИИ", desc: "Мощный переводчик с искусственным интеллектом", image: deeplImg }
];

const Blog = () => (
  <section id="blog" className="py-16 md:py-24 scroll-mt-[50px]"> {/* Добавлен scroll-mt-[50px] */}
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 mb-8 text-center md:text-left">
        <h2 className="text-display text-5xl md:text-7xl font-extrabold text-[#c6ff00]">блог</h2>
        <aside className="max-w-md text-sm text-muted-foreground/90">
          Мы следим за тем, как развиваются технологии и куда стремится научный прогресс. Пробуем самые современные подходы и используем передовые нейросети.
        </aside>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[220px] gap-6">
        {posts.map((p, i) => (
          <a
            key={i}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`relative group overflow-hidden rounded-3xl border border-gray-600 ${p.big ? "md:col-span-2 md:row-span-2" : ""}`}
            style={{ backgroundImage: `url(${p.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
          >
            {/* Эффект при наведении для десктопа */}
            <div className="absolute inset-0 bg-[#5940FE] opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

            {/* Контент карточки */}
            <div className="absolute inset-0 p-4 z-20 flex flex-col bg-black/40">
              <div className="flex items-center gap-3 text-sm mb-2">
                <span className="px-3 py-1 rounded-full bg-black/50">{p.tag}</span>
                {/* Удалена строка с датой */}
                {/* <span className="text-white/80">{p.date}</span> */} 
                {/* Стрелка видна всегда, но анимируется при ховере */}
                <ArrowUpRight className="ml-auto text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
              <h3 className="text-lg font-extrabold leading-snug text-white">{p.title}</h3>
              {/* Описание видно только при ховере на десктопе, на мобильных скрыто */}
              <p className="text-sm text-white mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {p.desc}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  </section>
);

export default Blog;