// src/components/sections/Hero.tsx
// ... (импорты)
import { useOrder } from "@/context/OrderContext";
import { useIsMobile } from "@/hooks/use-mobile";
import bgImage from "../../assets/bg.svg";
import bgImageMobile from "../../assets/bg-mobile.svg";
import "./Hero.css";

const Hero = () => {
  const { open } = useOrder();
  const isMobile = useIsMobile();
  const background = isMobile ? bgImageMobile : bgImage;

  return (
    <section id="hero" className="relative h-screen min-h-[700px] pt-[80px] overflow-hidden bg-cover bg-center text-white scroll-mt-[20px]" style={{ backgroundImage: `url(${background})`, backgroundAttachment: isMobile ? "fixed" : "scroll" }}>
        
        <div className="absolute w-[85%] max-w-[300px] text-center text-base leading-tight 
          top-[33vh] left-1/2 -translate-x-1/2
          md:w-auto md-max-w-none md:text-left md:left-[15%] md:top-[426px] md:translate-x-0">
          <p>
            Мы знаем, что такое нейросети и как <br className="hidden md:block"/>
            их использовать для решения задач, <br className="hidden md:block"/>
            которые стоят перед бизнесом.
          </p>
        </div>

        <h1 className="absolute font-extrabold whitespace-nowrap text-white text-center tracking-wider text-[20vw] leading-[0.85] top-[58%] left-1/2 -translate-x-1/2 -translate-y-1/2 md:text-[12vw] md:leading-normal md:top-auto md:bottom-[-7vw]" style={{ textShadow: "0px 0px 8px rgba(0,0,0,0.5)", WebkitTextStroke: "1px black", paintOrder: "stroke fill" }}>
          {isMobile ? (<>ЭЙАЙ<br/>ТЕХ</>) : 'ЭЙАЙ ТЕХ'}
        </h1>
        
        <button
          onClick={open}
          className="absolute flex items-center justify-center rounded-full cursor-pointer bg-[#DBFE01] text-black font-bold text-lg px-8 py-4 w-auto transition-colors hover:bg-[#5940FE] hover:text-white bottom-[20vh] left-1/2 -translate-x-1/2 md:top-[calc(436px-10px)] md:right-[10%] md:left-auto md:bottom-auto md:translate-x-0 md:px-10"
        >
          Оставить заявку
        </button>

      {/* Родительский блок теперь с 'flex' для расположения дочерних элементов в ряд */}
      <div className="absolute bottom-0 left-0 w-full h-[100px] bg-[#DBFE01] overflow-hidden flex">
        {/* Первый (оригинальный) блок контента */}
        <div className="marquee-content uppercase">
          <span>сайты</span><span>чат-боты</span><span>ии-агенты</span><span>боты для трейдинга</span><span>комплексные решения с использованием нейросетей под ключ</span>
        </div>
        {/* Второй (дублирующий) блок контента для бесшовности */}
        <div className="marquee-content uppercase" aria-hidden="true">
          <span>сайты</span><span>чат-боты</span><span>ии-агенты</span><span>боты для трейдинга</span><span>комплексные решения с использованием нейросетей под ключ</span>
        </div>
      </div>
    </section>
  );
};

export default Hero;