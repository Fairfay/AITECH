// src/components/sections/CTA.tsx

// Импортируем новые SVG иконки
import TelegramIcon from "@/assets/svg/telegram.svg";
import WhatsappIcon from "@/assets/svg/whatsapp.svg";
// Удаляем импорты Lucide иконок, так как они больше не используются здесь

import { useOrder } from "@/context/OrderContext";

const CTA = () => {
  const { open } = useOrder();
  
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Жёлто-зелёный блок */}
      <section className="bg-[#d4ff00] py-16 text-center">
        <h2 className="text-4xl md:text-6xl font-extrabold text-black leading-tight px-4">
          пора{' '}
          {/* Текст "внедрять ии" теперь кнопка, открывающая модальное окно */}
          <button
            type="button"
            onClick={open}
            className="underline unbounded hover:text-[#5940FE] transition-colors"
          >
            внедрять ии
          </button>
          <br />
          в свой бизнес
        </h2>
        {/* Увеличиваем размер текста номера телефона */}
        <p className="mt-4 text-xl md:text-2xl text-black">+7 985-555-17-79</p> 
        <div className="flex justify-center gap-4 mt-4">
          <a
            href="https://t.me/ai_tech_llc"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            // Стили для кнопок соцсетей
            className="rounded-full p-4 transition-colors duration-300 bg-transparent hover:bg-[#5940FE] group"
          >
            {/* Используем новую иконку Telegram. size-8 для увеличения, group-hover:invert для белого цвета при наведении */}
            <img src={TelegramIcon} alt="Telegram" className="size-8 transition-colors duration-300 group-hover:invert" />
          </a>
          <a
            href="https://wa.me/79855551779"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            // Стили для кнопок соцсетей
            className="rounded-full p-4 transition-colors duration-300 bg-transparent hover:bg-[#5940FE] group"
          >
            {/* Используем новую иконку WhatsApp. size-8 для увеличения, group-hover:invert для белого цвета при наведении */}
            <img src={WhatsappIcon} alt="WhatsApp" className="size-8 transition-colors duration-300 group-hover:invert" />
          </a>
        </div>
      </section>

      {/* Адаптивный футер */}
      <footer id="contacts" className="bg-black text-white py-12">
        <div className="container mx-auto px-4">
            <div className="md:hidden flex flex-col items-start text-left gap-6 text-lg">
                <div className="flex flex-col gap-3">
                    <a href="#services" onClick={(e) => handleScroll(e, "#services")} className="hover:underline">Услуги</a>
                    <a href="#team" onClick={(e) => handleScroll(e, "#team")} className="hover:underline">О нас</a>
                    <a href="#portfolio" onClick={(e) => handleScroll(e, "#portfolio")} className="hover:underline">Портфолио</a>
                    <a href="#blog" onClick={(e) => handleScroll(e, "#blog")}>Блог</a>
                </div>
                <div className="flex flex-col gap-3">
                    <span className="text-xl font-bold">© 2025 ЭйАй Тех</span>
                    {/* Исправлен редирект на itm-ai.ru */}
                    <a href="https://itm-ai.ru" target="_blank" rel="noopener noreferrer" className="hover:underline">ИИ в медицине</a>
                    <a href="https://www.meshalkin.ru/" target="_blank" rel="noopener noreferrer" className="hover:underline">Клиника Мешалкина</a>
                </div>
                {/* Удален download атрибут, исправлен href */}
                <a href="/policy.pdf" target="_blank" rel="noopener noreferrer" className="hover:underline">
                    Политика конфиденциальности
                </a>
            </div>
            <div className="hidden md:grid md:grid-cols-3 md:gap-6 md:text-left items-start">
              <div className="flex flex-col gap-2">
                <a href="#hero" onClick={(e) => handleScroll(e, "#hero")} className="text-lg font-bold hover:underline">
                  © 2025 ЭйАй Тех
                </a>
                {/* Исправлен редирект на itm-ai.ru */}
                <a href="https://itm-ai.ru" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                  ИИ в медицине
                </a>
                 <a href="https://www.meshalkin.ru/" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                  Клиника Мешалкина
                </a>
              </div>
              <div className="flex flex-col gap-2 items-start md:items-center">
                <a href="#services" onClick={(e) => handleScroll(e, "#services")} className="hover:underline">Услуги</a>
                <a href="#team" onClick={(e) => handleScroll(e, "#team")} className="hover:underline">О нас</a>
                <a href="#portfolio" onClick={(e) => handleScroll(e, "#portfolio")}>Портфолио</a>
                <a href="#blog" onClick={(e) => handleScroll(e, "#blog")}>Блог</a>
              </div>
              <div className="w-full flex flex-col items-start md:items-end gap-4">
                 {/* Удален download атрибут, исправлен href */}
                 <a href="/policy.pdf" target="_blank" rel="noopener noreferrer" className="text-sm hover:underline">
                  Политика конфиденциальности
                </a>
                <button onClick={open} className="bg-[#d4ff00] hover:bg-[#5940FE] text-black font-bold px-6 py-3 rounded-full transition-colors w-auto">
                  Оставить заявку
                </button>
              </div>
            </div>
        </div>
      </footer>
    </>
  );
};

export default CTA;