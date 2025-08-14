// src/components/sections/Team.tsx

import React, { useState } from "react";
import "./Team.css";

import directorEyes from "../../assets/direktor-glaza.png";
import directorPhoto from "../../assets/direktor.png";
import denisEyes from "../../assets/denis-glaza.png";
import denisPhoto from "../../assets/denis.jpg";
import womanEyes from "../../assets/woman-glaza.png";
import womanPhoto from "../../assets/woman.jpg";

const teamMembers = [
    { name: "Малхази", role: "Генеральный директор", description: "Отвечает за стратегию и развитие компании", eyes: directorEyes, photo: directorPhoto },
    { name: "Денис", role: "Технический директор", description: "Руководит техническим развитием и архитектурой", eyes: denisEyes, photo: denisPhoto },
    { name: "Галина", role: "Креативный дизайнер", description: "Создаёт визуальный стиль и UX/UI каждого продукта", eyes: womanEyes, photo: womanPhoto },
];

const TeamMemberCard = ({ member }: { member: typeof teamMembers[0] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Обработчики для ПК: ховер для подсветки, клик для раскрытия/сворачивания
  const handleMouseEnter = () => {}; // Только для подсветки, расширение по клику
  const handleMouseLeave = () => {}; // Только для подсветки, расширение по клику
  const handleClick = () => setIsExpanded(prev => !prev);


  return (
    <div
      className="team-card-wrapper rounded-2xl transition-all duration-500 ease-in-out border-2 cursor-pointer overflow-hidden"
      onMouseEnter={handleMouseEnter} // Ховер только для подсветки
      onMouseLeave={handleMouseLeave} // Ховер только для подсветки
      onClick={handleClick} // Клик для раскрытия/сворачивания
      style={{ borderColor: isExpanded ? '#c6ff00' : 'rgb(55 65 81)' }} // Цвет границы по isExpanded
    >
      {/* --- Десктопная версия --- */}
      <div className={`hidden md:block relative transition-all duration-500 ease-in-out ${isExpanded ? 'h-[440px]' : 'h-[92px]'}`}>
        {/* Развернутый вид */}
        <div className={`absolute inset-0 transition-opacity duration-500 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
           <div className="flex items-center gap-8 p-4 bg-[#c6ff00] h-full rounded-xl">
              {/* Добавлен pl-8 для сохранения отступа */}
              <div className="flex-1 text-black text-left pl-8"> 
                  <p className="font-unbounded text-2xl font-bold">{member.name}</p>
                  <p className="font-unbounded text-xl mt-1">{member.role}</p>
                  <p className="mt-4 font-bold">{member.description}</p>
              </div>
              <img src={member.photo} alt={member.name} className="w-[400px] h-[400px] object-cover rounded-[30px]"/>
           </div>
        </div>
        {/* Свернутый вид */}
        <div className={`absolute inset-0 grid grid-cols-[1fr_auto_1fr] items-center gap-5 p-3 transition-opacity duration-500 ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>
            <span className="font-unbounded text-2xl font-bold text-white pl-10">{member.name}</span>
            <div className="w-[500px] h-[60px] rounded-full overflow-hidden">
                <img src={member.eyes} alt={`глаза ${member.name}`} className="w-full h-full object-cover"/>
            </div>
            <span className="font-unbounded text-2xl font-bold text-right pr-10 text-white">{member.role}</span>
        </div>
      </div>

      {/* --- Мобильная версия --- */}
      {/* Убрал общий p-3 и добавил padding к внутренним элементам для контроля отступа */}
      <div className={`md:hidden transition-colors duration-500 ${isExpanded ? 'bg-[#c6ff00]' : 'bg-transparent'}`}>
        {/* Вертикальное центрирование для свернутого вида */}
        <div className={`flex justify-between items-center px-3 py-4 transition-opacity h-[72px] ${isExpanded ? 'opacity-0' : 'opacity-100'}`}>
            <span className="font-unbounded text-2xl font-bold">{member.name}</span>
            <div className="w-[140px] h-[50px] rounded-full overflow-hidden">
                <img src={member.eyes} alt={`глаза ${member.name}`} className="w-full h-full object-cover"/>
            </div>
        </div>
        <div className={`content-wrapper ${isExpanded ? 'open' : ''}`}>
            {/* Добавлен py-4 для внутреннего отступа */}
            <div className="flex flex-col items-center px-3 py-4 text-black"> 
                <span className="font-unbounded text-2xl font-bold">{member.name}</span>
                <img src={member.photo} alt={member.name} className="w-40 h-40 object-cover rounded-[30px]"/>
                <div className="text-center">
                    <p className="font-unbounded font-bold">{member.role}</p>
                    <p>{member.description}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

const Team: React.FC = () => {
  return (
    <div id="team" className="py-16 md:py-24 scroll-mt-[80px]"> {/* Добавлен scroll-mt-[80px] */}
       <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h3 className="text-xl md:text-2xl text-center md:text-left">Знакомьтесь, наши герои!</h3>
            <h2 className="text-5xl md:text-7xl font-extrabold text-[#c6ff00] text-center md:text-right">команда</h2>
        </div>
        <div className="flex flex-col gap-4">
           {teamMembers.map((member, index) => <TeamMemberCard key={index} member={member} />)}
        </div>
        <div className="text-center mt-8">
            <a href="#" className="text-white underline text-lg hover:text-[#c6ff00] transition-colors">Вся команда здесь</a>
            {/* Placeholder для выпадающего списка команды. Потребуется дополнительная логика и компоненты (например, DropdownMenu). */}
            {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="text-white underline text-lg hover:text-[#c6ff00] transition-colors">Вся команда здесь</button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>Член команды 1</DropdownMenuItem>
                <DropdownMenuItem>Член команды 2</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu> */}
        </div>
       </div>
    </div>
  );
};

export default Team;