// src/components/sections/Tech.tsx

import React from "react";

const neuralNets = [
  { name: "ChatGPT", url: "https://chat.openai.com/" }, { name: "grok", url: "https://x.ai/" }, { name: "DeepSeek", url: "https://www.deepseek.com/" }, { name: "Perplexity", url: "https://www.perplexity.ai/" }, { name: "Gemini", url: "https://gemini.google.com/" }, { name: "n8n.io", url: "https://n8n.io/" }, { name: "lovable.dev", url: "https://lovable.dev/" }, { name: "cursor.com", url: "https://www.cursor.com/" },
];

// Возвращаем прошлые заголовки, меняем последний "ДЕЛАЕМ", оставляем новый текст
const cards = [
  { title: "РАБОТАЕМ", text: "С финансами: кредитный скоринг, фрод-детекция, алготрейдинг и риск-менеджмент.", color: "white" },
  { title: "ДЕЛАЕМ", text: "Для ритейла и E-commerce: управляем ассортиментом, прогнозируем спрос, персонализируем предложения.", color: "purple" },
  { title: "НАЧИНАЕМ", text: "В здравоохранении: анализ медицинских изображений, помощь в диагностике и обработка записей.", color: "green" },
  { title: "ЗАПУСКАЕМ", text: "Для промышленности: предиктивное обслуживание (PdM), контроль качества и цифровые двойники.", color: "purple" },
  { title: "ГОТОВЫ", text: "К задачам в телекоме и маркетинге: прогнозируем отток, оптимизируем сети и рекламные кампании.", color: "green" },
  // Добавлен текст "ИИ-ассистенты" в последнюю карточку
  { title: "ИНТЕГРИРУЕМ", text: "Готовые AI-решения с различными сервисами: CRM, PowerBI, Telegram и другими, а также ИИ-ассистенты.", color: "white" },
];

export default function Tech() {
  // ... остальной код компонента без изменений
  return (
    <section className="bg-[#0B0B0B] text-white py-16 md:py-24 scroll-mt-[50px]"> {/* Добавлен scroll-mt-[50px] */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center gap-4 mb-8 md:flex-row md:justify-between md:items-start md:gap-0">
          <h2 className="text-5xl md:text-6xl font-extrabold text-[#DBFE01] text-center md:text-left">используем</h2>
          <p className="text-center text-gray-300 max-w-xs md:text-right">Все передовые нейросети<br /> для решения любых задач</p>
        </div>
        <div className="grid grid-cols-4 gap-2 mb-10 md:flex md:flex-wrap md:justify-start md:gap-3">
          {neuralNets.map((net, index) => (
            <a key={index} href={net.url} target="_blank" rel="noopener noreferrer" className="bg-white text-black px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium shadow hover:bg-gray-200 transition text-center">
              {net.name}
            </a>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cards.map((card, index) => (
            <div key={index} className={`rounded-3xl p-6 flex flex-col justify-between min-h-[300px] ${card.color === "purple" ? "bg-[#5940FE] text-white" : card.color === "green" ? "bg-[#DBFE01] text-black" : "bg-white text-black"}`}>
              <h3 className="text-xl font-bold">{card.title}</h3>
              <p className="text-base mt-2">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}