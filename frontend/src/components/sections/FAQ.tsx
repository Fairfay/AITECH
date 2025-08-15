// src/components/sections/FAQ.tsx

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import "./faq-animations.css";

const faqs = [
  {
    q: "Какая экспертиза у нашей компании?",
    a: "У нас есть техническая экспертиза в Core AI/ML: машинное обучение (ML), глубокое обучение (DL), обработка данных, математика и статистика, MLOps. Экспертиза в специализированных доменах AI: компьютерное зрение, обработка естественного языка (NLP), рекомендательные системы, предиктивная аналитика и голосовые технологии."
  },
  {
    q: "Кто наши клиенты?",
    a: "Мы работаем с компаниями разного масштаба: от стартапов до корпораций и государственных структур. Наши клиенты включают компании из сфер: Финансы, Ритейл и E-commerce, Здравоохранение и медицина, Промышленность и строительство, Телеком, Маркетинг и Реклама." // Добавлен текст
  },
  {
    q: "Как мне стать вашим клиентом или стратегическим партнёром?",
    a: "Оставьте заявку, и мы обсудим цели, задачи и подход к реализации."
  }
];

const FAQ = () => {
  return (
    <section id="faq" className="py-16 md:py-24 scroll-mt-[20px]"> {/* Добавлен scroll-mt-[50px] */}
      <div className="container mx-auto px-4">
        <h2 className="text-6xl md:text-8xl font-extrabold text-[#c6ff00] mb-12 text-center">
          FAQ
        </h2>

        {/* Убрал mx-auto и text-left, так как триггер и контент управляют своим выравниванием */}
        <Accordion type="single" collapsible className="space-y-4 max-w-5xl mx-auto">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border-none overflow-hidden rounded-3xl"
            >
              <AccordionTrigger
                className="
                  flex justify-between items-center text-left  /* Добавил text-left и items-center */
                  px-6 py-5 md:px-8
                  bg-white text-black font-medium text-base md:text-lg
                  transition-all duration-200 ease-in-out
                  hover:bg-[#c6ff00] no-underline /* убираем стандартное подчеркивание */
                  data-[state=open]:bg-[#c6ff00]
                "
              >
                {f.q}
              </AccordionTrigger>

              <AccordionContent
                className="
                  bg-white px-6 md:px-8 py-4
                  text-black text-base leading-relaxed text-left /* Добавил text-left */
                  overflow-hidden
                  transition-all duration-200 ease-in-out
                  data-[state=closed]:animate-slideUp
                  data-[state=open]:animate-slideDown
                "
              >
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQ;