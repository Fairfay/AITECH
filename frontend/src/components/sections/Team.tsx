// src/components/sections/Team.tsx

import React, { useState } from "react";
import "./Team.css";

import directorEyes from "../../assets/direktor-glaza.png";
import directorPhoto from "../../assets/direktor.png";
import denisEyes from "../../assets/denis-glaza.png";
import denisPhoto from "../../assets/denis.jpg";
import galinaEyes from "../../assets/woman-glaza.png"; // Renamed for clarity from womanEyes
import galinaPhoto from "../../assets/woman.jpg"; // Renamed for clarity from womanPhoto

const teamMembersData = [
    { id: 0, name: "Малхази", role: "Генеральный директор", description: "Отвечает за стратегию и развитие компании", eyes: directorEyes, photo: directorPhoto },
    { id: 1, name: "Денис", role: "Технический директор", description: "Руководит техническим развитием и архитектурой", eyes: denisEyes, photo: denisPhoto },
    { id: 2, name: "Галина", role: "Креативный дизайнер", description: "Создаёт визуальный стиль и UX/UI каждого продукта", eyes: galinaEyes, photo: galinaPhoto },
    // Добавленные закомментированные блоки
    /*
    { id: 3, name: "Имя 3", role: "Должность 3", description: "Описание 3", eyes: directorEyes, photo: directorPhoto },
    { id: 4, name: "Имя 4", role: "Должность 4", description: "Описание 4", eyes: denisEyes, photo: denisPhoto },
    { id: 5, name: "Имя 5", role: "Должность 5", description: "Описание 5", eyes: galinaEyes, photo: galinaPhoto },
    */
];

interface TeamMemberProps {
    member: typeof teamMembersData[0];
    index: number;
    isActive: boolean;
    onClick: (index: number) => void;
}

const TeamMemberCard: React.FC<TeamMemberProps> = ({ member, index, isActive, onClick }) => {
  const isOdd = index % 2 !== 0;

  return (
    <div
      className={`team-card-wrapper rounded-2xl border-2 transition-colors duration-300 cursor-pointer overflow-hidden
                  ${isActive ? 'border-[#c6ff00]' : 'border-gray-700'}
                  md:hover:border-[#c6ff00] // Added hover border for desktop
                 `}
      onClick={() => onClick(index)}
    >
      {/* --- Десктопная версия --- */}
      <div className="hidden md:block">
        {!isActive ? (
          // Свернутое состояние Десктоп: имя-глаза-должность
          <div className="p-3 flex items-center justify-between h-[92px] 
                          transition-all duration-300 ease-in-out
                          group-hover:bg-[#c6ff00] group-hover:text-black"> {/* Changed hover to group-hover */}
              <span className="font-unbounded text-2xl font-bold text-white group-hover:text-black pl-10">{member.name}</span>
              <div className="w-[500px] h-[60px] rounded-full overflow-hidden">
                  <img src={member.eyes} alt={`глаза ${member.name}`} className="w-full h-full object-cover"/>
              </div>
              <span className="font-unbounded text-2xl font-bold text-right pr-10 text-white group-hover:text-black">
                  {member.role.includes(' ') ? member.role.split(' ').map((word, i) => <React.Fragment key={i}>{word}{i === 0 && <br/>}</React.Fragment>) : member.role}
              </span>
          </div>
        ) : (
          // Развернутое состояние Десктоп: фото-текст
          <div className={`p-4 bg-[#c6ff00] text-black rounded-xl h-full flex flex-col justify-between transition-all duration-300 ease-in-out`}>
              <div className={`flex items-center gap-8 ${isOdd ? 'flex-row-reverse' : 'flex-row'}`}>
                  {/* Секция имени и должности */}
                  <div className={`flex-1 flex flex-col justify-center ${isOdd ? 'items-end text-right' : 'items-start text-left'}`}>
                      <p className="font-unbounded text-2xl font-bold">{member.name}</p>
                      <p className="font-unbounded text-xl mt-1">
                          {member.role.includes(' ') ? member.role.split(' ').map((word, i) => <React.Fragment key={i}>{word}{i === 0 && <br/>}</React.Fragment>) : member.role}
                      </p>
                  </div>
                  {/* Секция фото */}
                  <div className="flex-shrink-0 flex items-center justify-center">
                      <img src={member.photo} alt={member.name} className="w-40 h-40 object-cover rounded-[30px]"/>
                  </div>
              </div>
              {/* Секция описания под всем */}
              <p className={`mt-4 text-black font-bold text-base ${isOdd ? 'text-right' : 'text-left'}`}>
                  {member.description}
              </p>
          </div>
        )}
      </div>

      {/* --- Мобильная версия --- */}
      <div className="md:hidden">
        {!isActive ? ( // Use isActive for mobile as well
          // Свернутое состояние Мобильное: имя-глаза
          <div className="px-3 py-4 flex items-center justify-between h-[72px] transition-all duration-300 ease-in-out">
              <span className="font-unbounded text-2xl font-bold text-white">{member.name}</span>
              <div className="w-[140px] h-[50px] rounded-full overflow-hidden">
                  <img src={member.eyes} alt={`глаза ${member.name}`} className="w-full h-full object-cover"/>
              </div>
          </div>
        ) : (
          // Развернутое состояние Мобильное: имя-фото сверху, должность-описание снизу
          <div className="bg-[#c6ff00] text-black px-4 py-4 rounded-xl transition-all duration-300 ease-in-out">
              {/* Верхняя строка: Имя (слева) и Фото (справа) */}
              <div className="flex items-center justify-between gap-4 mb-3">
                  <span className="font-unbounded text-2xl font-bold flex-grow text-left">{member.name}</span>
                  <img src={member.photo} alt={member.name} className="w-28 h-28 object-cover rounded-[30px] flex-shrink-0"/>
              </div>
              {/* Должность под именем */}
              <div className="flex flex-col text-left mb-3">
                  <p className="font-unbounded text-lg">
                    {member.role.includes(' ') ? member.role.split(' ').map((word, i) => <React.Fragment key={i}>{word}{i === 0 && <br/>}</React.Fragment>) : member.role}
                  </p>
              </div>
              {/* Описание */}
              <p className="font-text font-bold text-base text-left">{member.description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

const Team: React.FC = () => {
  const [activeMemberIndex, setActiveMemberIndex] = useState<number | null>(null);

  const handleCardClick = (index: number) => {
    setActiveMemberIndex(activeMemberIndex === index ? null : index); // Toggle active state
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
               key={member.id} // Use member.id as key
               member={member}
               index={index}
               isActive={activeMemberIndex === index}
               onClick={handleCardClick}
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