// src/components/sections/Team.tsx

import React, { useState } from "react";
import "./Team.css";

import directorEyes from "../../assets/direktor-glaza.png";
import directorPhoto from "../../assets/direktor.png";
import denisEyes from "../../assets/denis-glaza.png";
import denisPhoto from "../../assets/denis.jpg";
import womanEyes from "../../assets/woman-glaza.png";
import womanPhoto from "../../assets/woman.jpg";

const teamMembersData = [
    { name: "Малхази", role: "Генеральный директор", description: "Отвечает за стратегию и развитие компании", eyes: directorEyes, photo: directorPhoto },
    { name: "Денис", role: "Технический директор", description: "Руководит техническим развитием и архитектурой", eyes: denisEyes, photo: denisPhoto },
    { name: "Галина", role: "Креативный дизайнер", description: "Создаёт визуальный стиль и UX/UI каждого продукта", eyes: womanEyes, photo: womanPhoto },
];

interface TeamMemberProps {
    member: typeof teamMembersData[0];
    index: number;
    isExpanded: boolean;
    onToggle: (index: number) => void;
}

const TeamMemberCard: React.FC<TeamMemberProps> = ({ member, index, isExpanded, onToggle }) => {
  const handleClick = () => {
    onToggle(index);
  };

  // Оборачиваем оба состояния в один div для плавного перехода высоты и фона
  return (
    <div
      className={`rounded-2xl border-2 cursor-pointer overflow-hidden transition-all duration-500 ease-in-out
                  ${isExpanded ? 'border-[#c6ff00] bg-[#c6ff00]' : 'border-gray-700 bg-transparent'}`}
      onClick={handleClick}
    >
      {/* --- Десктопная версия --- */}
      <div className="hidden md:block">
        {!isExpanded ? (
          // Свернутое состояние Десктоп
          <div className="p-3 flex items-center justify-between h-[92px] transition-colors duration-300 hover:bg-[#c6ff0020]">
            <span className="font-unbounded text-2xl font-bold pl-10">{member.name}</span>
            <div className="w-[500px] h-[60px] rounded-full overflow-hidden">
              <img src={member.eyes} alt={`глаза ${member.name}`} className="w-full h-full object-cover" />
            </div>
            <span className="font-unbounded text-2xl font-bold text-right pr-10">
              {member.role.includes(' ') ? member.role.split(' ').map((word, i) => <React.Fragment key={i}>{word}{i === 0 && <br />}</React.Fragment>) : member.role}
            </span>
          </div>
        ) : (
          // Развернутое состояние Десктоп
          <div className="p-6 text-black flex items-center justify-between min-h-[240px]">
            <p className="font-unbounded text-2xl font-bold flex-1 text-left animate-content-in">{member.name}</p>
            <div className="flex-shrink-0 flex flex-col items-center gap-2 mx-4">
              {/* Анимация для фото */}
              <img src={member.photo} alt={member.name} className="w-40 h-40 object-cover rounded-[30px] animate-content-in" />
              {/* Анимация для описания */}
              <p className="mt-2 text-black font-bold text-base text-center max-w-[200px] animate-content-in" style={{ animationDelay: '100ms' }}>{member.description}</p>
            </div>
            <p className="font-unbounded text-2xl font-bold flex-1 text-right animate-content-in">{member.role}</p>
          </div>
        )}
      </div>

      {/* --- Мобильная версия --- */}
      <div className="md:hidden">
        {!isExpanded ? (
          // Свернутое состояние Мобильное
          <div className="px-3 py-4 flex items-center justify-between h-[72px]">
            <span className="font-unbounded text-2xl font-bold text-white">{member.name}</span>
            <div className="w-[140px] h-[50px] rounded-full overflow-hidden">
              <img src={member.eyes} alt={`глаза ${member.name}`} className="w-full h-full object-cover" />
            </div>
          </div>
        ) : (
          // Развернутое состояние Мобильное
          <div className="text-black p-4 flex flex-col gap-4 animate-content-in">
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-col text-left">
                <p className="font-unbounded text-2xl font-bold">{member.name}</p>
                <p className="font-unbounded text-lg mt-1">
                  {member.role.includes(' ') ? member.role.split(' ').map((word, i) => <React.Fragment key={i}>{word}{i === 0 && <br />}</React.Fragment>) : member.role}
                </p>
              </div>
              <img src={member.photo} alt={member.name} className="w-28 h-28 object-cover rounded-[30px] flex-shrink-0" />
            </div>
            <div className="text-left">
              <p className="font-text font-bold text-base">{member.description}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const Team: React.FC = () => {
  const [openMemberIndex, setOpenMemberIndex] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenMemberIndex(prevIndex => (prevIndex === index ? null : index));
  };

  return (
    <div id="team" className="py-16 md:py-24 scroll-mt-[50px]">
       <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h3 className="text-xl md:text-2xl text-center md:text-left text-white">Знакомьтесь, наши герои!</h3>
            <h2 className="text-5xl md:text-7xl font-extrabold text-[#c6ff00] text-center md:text-right">команда</h2>
        </div>
        <div className="flex flex-col gap-4">
           {teamMembersData.map((member, index) => (
             <TeamMemberCard 
               key={index} 
               member={member} 
               index={index} 
               isExpanded={openMemberIndex === index}
               onToggle={handleToggle}
             />
           ))}
        </div>
        <div className="text-center mt-8">
            <a href="#" className="text-white underline text-lg hover:text-[#c6ff00] transition-colors">Вся команда здесь</a>
        </div>
       </div>
    </div>
  );
};

export default Team;