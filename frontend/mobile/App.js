import './App.css';
import { useState } from 'react';

const models = [
  { id: 1, name: "ChatGPT", url: "https://chat.openai.com" },
  { id: 2, name: "Grok", url: "https://grok.x.ai" },
  { id: 3, name: "DeepSeek", url: "https://deepseek.com" },
  { id: 4, name: "Perplexity", url: "https://perplexity.ai" },
  { id: 5, name: "Gemini", url: "https://gemini.google.com" },
  { id: 6, name: "n8n.io", url: "https://n8n.io" },
  { id: 7, name: "lovable.dev", url: "https://lovable.dev" },
  { id: 8, name: "cursor.com", url: "https://cursor.com" }
];

const sections = [
  {
    id: 1,
    title: "РАБОТАЕМ",
    content: "со всеми компаниями и с каждым: b2b, b2g, b2c, b2b2c.",
    color: "#FFFFFF",
    color2: "#000000"
  },
  {
    id: 2,
    title: "ДЕЛАЕМ",
    content: "индивидуальный дизайн персонально для каждого.",
    color: "#5940FE",
    color2: "#FFFFFF"
  },
  {
    id: 3,
    title: "НАЧИНАЕМ",
    content: "разработку после согласованных целей и говорим с вами на одном, понятном каждому, языке.",
    color: "#DBFE01",
    color2: "#000000"
  },
  {
    id: 4,
    title: "ЗАПУСКАЕМ",
    content: "разработку с нуля, знаем технические особенности «чёрных ящиков» или простыми словами то, что находится внутри нейросетей!",
    color: "#5940FE",
    color2: "#FFFFFF"
  },
  {
    id: 5,
    title: "ГОТОВЫ",
    content: "принимать участие в комплексных решениях и современных проектах: computer vision, VR/AR, системы предиктивной аналитики и роботизации процессов.",
    color: "#DBFE01",
    color2: "#000000"
  },
  {
    id: 6,
    title: "ДЕЛАЕМ",
    content: "интеграцию с различными сервисами: CRM, СДЭК, PowerBI, Instagram, Telegram, Marketplaces, SAP, 1С, MES.",
    color: "#FFFFFF",
    color2: "#000000"
  }
];

const cases = [
  {
    id: 1,
    title: "РИТЕЙЛ",
    image: "",
    side: "left",
    content: "Делаем цифровой аналог для магазина с различными интеграциями и вспомогательными системами"
  },
  {
    id: 2,
    title: "ПЕРСОНАЛЬНЫЙ БРЕНД",
    image: "",
    side: "right",
    content: "Создаём цифровую упаковку и помогаем с продвижением"
  },
  {
    id: 3,
    title: "МЕДИЦИНА",
    image: "",
    side: "left",
    content: "Разработка и внедрение искусственного интеллекта для раннего выявления онкологических заболеваний"
  }
];

const faq = [
  {
    id: 1,
    question: "Какая экспертиза у нашей компании?",
    answer: "У нас есть техническая экспертиза с Core AI/ML: машинное обучение (ML), глубокое обучение (DL), обработка данных, математика и статистика, MLops.\n\nЭкспертиза в специализированных доменах AI: компьютерное зрение, обработка естественного языка (NLP), рекомендательные системы, предиктивная аналитика и голосовые технологии. Мы всегда в списке гостей на таких мероприятиях как ods.ai и DataFest, которые проводятся в разных городах нашей страны."
  },
  {
    id: 2,
    question: "Кто наши клиенты?",
    answer: "Финансы: Кредитный скоринг, фрод-детекция, алготрейдинг, риск-менеджмент.Ритейл и E-commerce: Управление ассортиментом, прогнозирование спроса, персонализация, оптимизация логистики. Здравоохранение и медицина: Анализ медицинских изображений, помощь в диагностике, разработка лекарств, обработка медицинских записей. Промышленность и строительство: Предиктивное обслуживание (PdM), контроль качества, оптимизация производства, цифровые двойники и цифровое зрение. Телеком: Прогнозирование оттока абонентов, оптимизация сетей, анализ клиентского опыта. Маркетинг и Реклама: Таргетирование, оптимизация кампаний, анализ эффективности каналов."
  },
  {
    id: 3,
    question: "Как мне стать вашим клиентом или стратегическим партнёром?",
    answer: "Стать нашим клиентом очень просто! Начните с того, что свяжитесь с нами через наш сайт или напрямую с нашей командой, чтобы назначить бесплатную первичную консультацию. Во время этой встречи мы обсудим цели вашего бизнеса, проблемы и области, в которых вам нужна поддержка."
  }
];

const teamMembers = [
  {
    id: 1,
    name: "МАЛХАЗИ",
    image: "/images/malhazi.jpg",
    position: "right"
  },
  {
    id: 2,
    name: "ДЕНИС",
    image: "/images/denis.jpg",
    position: "left"
  },
  {
    id: 3,
    name: "ГАЛИНА",
    image: "/images/galina.jpg",
    position: "right"
  }
];

const blogPosts = [
  {
    id: 1,
    category: "ии",
    date: "01.01.2025",
    title: "DeepL. Удобный и крутой AI-переводчик. Работает с VPN.",
    content: "DeepL — это инновационный AI-переводчик, который использует передовые нейросети для обеспечения высококачественного перевода текстов. Поддерживает работу через VPN для сохранения приватности."
  },
  {
    id: 2,
    category: "ml",
    date: "05.05.2025",
    title: "Новые тренды в машинном обучении",
    content: "Машинное обучение продолжает развиваться. Основные тренды включают в себя..."
  }
];

function scrollToElement() {
  const element = document.getElementById('scroll2'); 
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth', 
      block: 'start'     
    });
  }
}

function App() {
  const [activeFAQ, setActiveFAQ] = useState(null);
  return (
    <div className="app">



      <header className="header">
        <div className="menu"><strong>☰</strong></div>
        <button className="down" onClick={scrollToElement}><strong>Хочу проект</strong></button>
      </header>



      <div className="main">
        <div className="main-background">
          <div style={{width: '100%', height: '100%', position: 'relative', background: '#101010', overflow: 'hidden'}}>
          <div style={{width: 816, height: 0, left: 9, top: 812, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: 'top left', outline: '0.50px white solid', outlineOffset: '-0.25px'}}></div>
          <div style={{width: 340.44, height: 329.78, left: -71.25, top: -4.23, position: 'absolute', transform: 'rotate(49deg)', transformOrigin: 'top left', background: '#DBFE01', boxShadow: '50px 50px 50px ', filter: 'blur(25px)'}} />
          <div style={{width: 689, height: 0, left: 285.25, top: 791, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: 'top left', outline: '0.50px white solid', outlineOffset: '-0.25px'}}></div>
          <div style={{width: 509.88, height: 557.93, left: 351.55, top: 317, position: 'absolute', transform: 'rotate(67deg)', transformOrigin: 'top left', background: '#5940FE', boxShadow: '50px 50px 50px ', filter: 'blur(25px)'}} />
          <div style={{width: 599.20, height: 655.67, left: 'calc(100% - 599px)', top: 210.48, position: 'absolute', transform: 'rotate(58deg)', transformOrigin: 'top left', background: '#101010', boxShadow: '100px 100px 100px ', filter: 'blur(50px)'}} />
          <div style={{width: 799, height: 0, left: 'calc(100% - 799px)', top: 795.48, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: 'top left', outline: '0.50px white solid', outlineOffset: '-0.25px'}}></div>
          <div style={{width: 281, height: 0, left: 86.25, top: 277, position: 'absolute', transform: 'rotate(-90deg)', transformOrigin: 'top left', outline: '0.50px white solid', outlineOffset: '-0.25px'}}></div>
          <div style={{width: 375, height: 0, left: 0, top: 275, position: 'absolute', outline: '0.50px white solid', outlineOffset: '-0.25px'}}></div>
          <div style={{width: 375, height: 0, left: 0, top: 330, position: 'absolute', outline: '0.50px white solid', outlineOffset: '-0.25px'}}></div>
          <div style={{width: 375, height: 0, left: 0, top: 104, position: 'absolute', outline: '0.50px white solid', outlineOffset: '-0.25px'}}></div>
          <div style={{width: 158, height: 158, left: 285, top: 330, position: 'absolute', borderRadius: 9999, border: '0.50px white solid'}} />
          <div style={{width: 300.99, height: 329.36, left: 142.13, top: 544.38, position: 'absolute', transform: 'rotate(144deg)', transformOrigin: 'top left', background: '#101010', boxShadow: '100px 100px 100px ', filter: 'blur(50px)'}} />
          <div style={{width: 300.99, height: 329.36, left: 'calc(100% - 300px)', top: 544.38, position: 'absolute', transform: 'rotate(144deg)', transformOrigin: 'top left', background: '#101010', boxShadow: '100px 100px 100px ', filter: 'blur(50px)'}} />
          <div style={{width: 4, height: 4, left: 283.03, top: 272.48, position: 'absolute', background: 'white', borderRadius: 9999}} />
          <div style={{width: 4, height: 4, left: 283, top: 328, position: 'absolute', background: 'white', borderRadius: 9999}} />
          <div style={{width: 4, height: 4, left: 283, top: 102, position: 'absolute', background: 'white', borderRadius: 9999}} />
          <div style={{width: 4, height: 4, left: 7, top: 102, position: 'absolute', background: 'white', borderRadius: 9999}} />
          <div style={{width: 4, height: 4, left: 7, top: 273, position: 'absolute', background: 'white', borderRadius: 9999}} />
          <div style={{padding: 10, left: 74, top: 263, position: 'absolute', justifyContent: 'flex-start', alignItems: 'center', gap: 10, display: 'inline-flex'}}>
          <div style={{width: 4, height: 4, background: 'white', borderRadius: 9999}} />
          </div>
        </div>
      </div>
      <div className="main-content">
          <h1>ЭйАй Тех</h1>
          <p>Мы знаем, что такое нейросети и как их использовать для решения задач, которые стоят перед бизнесом.</p>
          <button className="main-button" onClick={scrollToElement}>Оставить заявку →</button>
        </div>
    </div>




      <div className="runline">
        <div className="runline-content">
          <div className="rltxt">Сайты</div>
          <div className="dot" />
          <div className="rltxt">Чат-боты</div>
          <div className="dot" />
          <div className="rltxt">ИИ-агенты</div>
          <div className="dot" />
          <div className="rltxt">боты для трейдинга</div>
          <div className="dot" />
          <div className="rltxt">комплексные решения с использованием нейросетей под ключ</div>
        </div>
      </div>



      <div className="centered"> 
        <h1 className="maint">ИСПОЛЬЗУЕМ</h1>
        <p className="para">все передовые нейросети для решения любых задач</p>
      </div>

      <div className="models"> 
        {models.map((model) => (<a key = {model.id} className="ainame" href={model.url}>{model.name}</a>))}
      </div>



      <div className="centered"> 
        {sections.map((section) => (
          <div key = {section.id} className="section" style={{ backgroundColor: section.color }}>
             <h2 className="section-title" style = {{color: section.color2}}>{section.title}</h2>
             <p className="section-content" style = {{color: section.color2}}>{section.content}</p>
          </div>
        ))}
      </div>



      <div className="centered"> 
        <h1 className="maint">ПОРТФОЛИО</h1>
        <p className="para">Любимые кейсы из нескольких сфер. Но вообще мы работали с разным: от ритейла до медицины</p>
        { cases.map((item) => (
            <div key={item.id} className="case">
              <img 
                src={item.image} 
                alt={item.title} 
                className="case-image" 
              />
              <h2 className="case-title" style={{textAlign: item.side}}>{item.title}</h2>
              <p className="case-content" style={{textAlign: item.side}}>{item.content}</p>
            </div>
        ))}
      </div>



      <div className="centered"> 
        <h1 className="maint">ЧТО МЫ ПРЕДЛАГАЕМ</h1>
        <div className="offer">
          <img src="/path/to/ai-knot.svg" alt="AI-решения" className="offer-image" />
          <div className="offer-content">
            <h2>Разработка AI-решений под ключ</h2>
            <p>текст текст текст текст текст текст текст текст</p>
            <button className="offer-button">Оставить заявку →</button>
          </div>
          <div className="arrow-container">
            <img src="/path/to/left-arrow.svg" alt="Стрелка влево" className="arrow" />
            <img src="/path/to/right-arrow.svg" alt="Стрелка вправо" className="arrow" />
          </div>
        </div>
      </div>



      <div className="centered"> 
        <h1 className="maint">КОМАНДА</h1>
        <p className="para">????</p>
        <hr className="sep"/>
        <div className="team-container">
          {teamMembers.map((member) => (
            <div key={member.id}>
              <div className="team-member" style={{flexDirection: member.position === "left" ? "row" : "row-reverse"}}>
                <div className="member-name">{member.name}</div>
                <img src={member.image} alt={member.name} className="avatar" />
              </div>
              <hr className="sep"/>
            </div>
          ))}
        </div>
        <a className="tlink">Вся команда здесь</a>
      </div>



      <div className="centered"> 
        <h1 className="maint">FAQ</h1>
        <div className="faq">
          {faq.map((item) => (
            <div key={item.id} className="faq-item">
              <button className="faq-question" onClick={() => setActiveFAQ(item.id === activeFAQ ? null : item.id)}>
                <span>{item.question}</span>
                <img src="/path/to/arrow-right.svg" alt="Стрелка" className="faq-arrow" />
              </button>
            <div className={`faq-answer ${activeFAQ === item.id ? 'open' : ''}`} dangerouslySetInnerHTML={{ __html: item.answer }}/>
          </div>
          ))}
        </div>
      </div>



      <div className="centered"> 
        <h1 className="maint">БЛОГ</h1>
        <p className="para2">Мы следим за тем, как развиваются технологии и куда стремится научный прогресс.</p>
          <div className="blog-container">
            {blogPosts.map((post) => (
            <div key={post.id} className="blog-post">
              <div className="post-header">
                <span className="category">{post.category}</span>
                <span className="date">{post.date}</span>
                <img src="/path/to/arrow-right.svg" alt="Стрелка" className="post-arrow" />
              </div>
              <h2 className="post-title">{post.title}</h2>
              <hr className="sep"/>
            </div>
            ))}
        </div>
      </div>



      <div className="contacts" id="scroll2">
        <div className="contact-info">
          <h2>ПОРА ВНЕДРЯТЬ ИИ В СВОЙ БИЗНЕС</h2>
          <p>+7 985-555-17-79</p>
          <div className="social-links">
            <a href="https://t.me/your_telegram_link" target="_blank" rel="noreferrer">
              <img src="/path/to/telegram-icon.svg" alt="Telegram" className="social-icon" />
            </a>
            <a href="https://wa.me/your_whatsapp_number" target="_blank" rel="noreferrer">
              <img src="/path/to/whatsapp-icon.svg" alt="WhatsApp" className="social-icon" />
            </a>
          </div>
        </div>
      </div>



      <div className="footer">
        <nav className="footer-nav">
          <ul>
            <li><a href="/services">Услуги</a></li>
            <li><a href="/about">О нас</a></li>
            <li><a href="/portfolio">Портфолио</a></li>
            <li><a href="/blog">Блог</a></li>
          </ul>
        </nav>
        <div className="copyright">
          <p style = {{fontSize: "25px", margin: "10px 0"}}>© 2025 ЭйАй Тех</p>
          <p><a href="/medical-ai">ИИ в медицине</a></p>
          <p><a href="/meshalkin-clinic">Клиника Мешалкина</a></p>
          <p style = {{margin: "10px 0"}}><a href="/privacy-policy">Политика конфиденциальности</a></p>
        </div>
      </div>



    </div>
  );
}

export default App;
