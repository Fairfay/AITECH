import React, { useState } from "react";
import "./Team.css";

import directorEyes from "../../assets/direktor-glaza.png";
import directorPhoto from "../../assets/direktor.png";
import denisEyes from "../../assets/denis-glaza.png";
import denisPhoto from "../../assets/denis.jpg";
import womanEyes from "../../assets/woman-glaza.png";
import womanPhoto from "../../assets/woman.jpg";

/* new teams */
import denisTPhoto from "../../assets/denis_t.jpg";
import denisTEyes from "../../assets/denis_t_glaza.jpg";
import PinusPhoto from "../../assets/pinus.png";
import PinusEyes from "../../assets/pinus_glaza.jpg";
import ArturPhoto from "../../assets/artur.jpg";
import ArturEyes from "../../assets/artur_glaza.jpg";
import NeilPhoto from "../../assets/neil.jpg";
import NeilEyes from "../../assets/neil_glaza.jpg";

const teamMembersData = [
    { name: "Малхази", role: "Генеральный директор", description: "Отвечает за стратегию и развитие компании", eyes: directorEyes, photo: directorPhoto },
    { name: "Денис", role: "Технический директор", description: "Руководит техническим развитием и архитектурой", eyes: denisEyes, photo: denisPhoto },
    { name: "Галина", role: "Креативный дизайнер", description: "Создаёт визуальный стиль и UX/UI каждого продукта", eyes: womanEyes, photo: womanPhoto },
    { name: "Денис", role: "Backend-разработчик", description: "Делает то, что не видят другие", eyes: denisTEyes, photo: denisTPhoto },
    { name: "Артур", role: "Backend-разработчик", description: "Разрабатывает ботов и занимается веб-разработкой", eyes: ArturEyes, photo: ArturPhoto },
    { name: "Нил", role: "Тимлид", description: "Руководитель команды разработчиков. Выстраивание технических процессов", eyes: NeilEyes, photo: NeilPhoto },
    { name: "Сергей", role: "Fullstack-разработчик", description: "Занимается ML, backend- и frontend-разработкой", eyes: PinusEyes, photo: PinusPhoto },
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
            <div className="flex-1 text-left pl-10">
              <span className="font-unbounded text-2xl font-bold">{member.name}</span>
            </div>
            <div className="w-[300px] h-[50px] rounded-full justify-center overflow-hidden flex-shrink-0">
              <img src={member.eyes} alt={`глаза ${member.name}`} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 text-right pr-10">
              <span className="font-unbounded text-2xl font-bold">
                {member.role.includes(' ') ? member.role.split(' ').map((word, i) => <React.Fragment key={i}>{word}{i === 0 && <br />}</React.Fragment>) : member.role}
              </span>
            </div>
          </div>
        ) : (
          // Развернутое состояние Десктоп
          <div className="p-8 text-black flex items-center justify-between min-h-[340px]">
            {/* Левая часть: Имя */}
            <div className="flex-1 text-left animate-content-in">
                <p className="font-unbounded text-3xl font-bold">{member.name}</p>
            </div>
            
            {/* Центральная часть: Фотография (увеличена) */}
            <div className="flex-shrink-0 mx-8">
              <img src={member.photo} alt={member.name} className="w-64 h-64 object-cover rounded-[40px] animate-content-in" />
            </div>

            {/* Правая часть: Должность и Описание */}
            <div className="flex-1 flex flex-col items-end text-right animate-content-in">
                <p className="font-unbounded text-3xl font-bold">{member.role}</p>
                <p className="mt-3 text-black font-bold text-lg max-w-sm" style={{ animationDelay: '100ms' }}>
                    {member.description}
                </p>
            </div>
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
  const [isShowingAll, setIsShowingAll] = useState(false);

  const handleToggle = (index: number) => {
    setOpenMemberIndex(prevIndex => (prevIndex === index ? null : index));
  };

  const handleShowAllToggle = () => {
    setIsShowingAll(prev => !prev);
  };
  
  const initiallyVisibleMembers = teamMembersData.slice(0, 3);
  const hiddenMembers = teamMembersData.slice(3);

  return (
    <div id="team" className="py-16 md:py-24 scroll-mt-[50px]">
       <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            <h3 className="text-xl md:text-2xl text-center md:text-left text-white">Знакомьтесь, наши герои!</h3>
            <h2 className="text-5xl md:text-7xl font-extrabold text-[#c6ff00] text-center md:text-right">команда</h2>
        </div>
        <div className="flex flex-col gap-4">
           {initiallyVisibleMembers.map((member, index) => (
             <TeamMemberCard 
               key={index} 
               member={member} 
               index={index} 
               isExpanded={openMemberIndex === index}
               onToggle={handleToggle}
             />
           ))}

            {/* Анимированный контейнер для остальных членов команды */}
            <div className={`grid transition-all duration-700 ease-in-out ${isShowingAll ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
              <div className="overflow-hidden">
                <div className="flex flex-col gap-4">
                  {hiddenMembers.map((member, index) => (
                    <TeamMemberCard
                      key={index + 3}
                      member={member}
                      index={index + 3}
                      isExpanded={openMemberIndex === index + 3}
                      onToggle={handleToggle}
                    />
                  ))}
                </div>
              </div>
            </div>
        </div>

        {/* Кнопка для отображения/скрытия */}
        {teamMembersData.length > 3 && (
          <div className="text-center mt-8">
              <button 
                onClick={handleShowAllToggle}
                className="bg-[#c6ff00] text-black font-unbounded font-bold py-3 px-8 rounded-xl text-lg transition-colors duration-300
                           hover:bg-[#514EFF] hover:text-white active:bg-[#514EFF] active:text-white"
              >
                {isShowingAll ? 'Скрыть команду' : 'Вся команда здесь'}
              </button>
          </div>
        )}
       </div>
    </div>
  );
};

export default Team;