import { useState, MouseEvent } from "react";
import { Phone, Send, MessageCircle, X, Plus } from "lucide-react";
import axios from 'axios';
import { useOrder } from "@/context/OrderContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "@/hooks/use-toast";
import PolicyFile from "@/assets/policy.pdf"

const Order = () => {
    const { close } = useOrder();
    const isMobile = useIsMobile();
    const [loading, setLoading] = useState(false);
    const [agree, setAgree] = useState(false);
    const [selectedServices, setSelectedServices] = useState<number[]>([]);
    const [selectedContact, setSelectedContact] = useState<string>("phone");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("+7");
    const [desc, setDesc] = useState("");
    const [phoneError, setPhoneError] = useState(false);
    const apiUrl = import.meta.env.VITE_APP_API_URL;

    const services = ["Сайт", "Чат-боты", "ИИ-агенты", "Трейд-бот", "ИИ-по ТЗ", "Другое"];
    
    const toggleService = (index: number) => { setSelectedServices((prev) => prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]); };

    // НОВАЯ, ИСПРАВЛЕННАЯ ЛОГИКА ФОРМАТИРОВАНИЯ ТЕЛЕФОНА
    const formatPhoneNumber = (value: string) => {
        if (!value) return "+7";

        // Оставляем только цифры
        const digitsOnly = value.replace(/\D/g, '');
        
        // Если цифр нет (например, стерли все кроме "+"), возвращаем "+7"
        if (!digitsOnly) return "+7";

        // Берем цифры ПОСЛЕ первой "7"
        const userDigits = digitsOnly.startsWith('7') ? digitsOnly.substring(1) : digitsOnly;
        
        // Ограничиваем до 10 цифр
        const truncatedDigits = userDigits.slice(0, 10);
        let formatted = "+7";

        if (truncatedDigits.length > 0) {
            formatted += ` (${truncatedDigits.slice(0, 3)}`;
        }
        if (truncatedDigits.length >= 4) {
            formatted += `) ${truncatedDigits.slice(3, 6)}`;
        }
        if (truncatedDigits.length >= 7) {
            formatted += `-${truncatedDigits.slice(6, 8)}`;
        }
        if (truncatedDigits.length >= 9) {
            formatted += `-${truncatedDigits.slice(8, 10)}`;
        }

        return formatted;
    };

    const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        // Запрещаем стирать "+7"
        if (input.length < 2) {
            setPhone("+7");
            return;
        }
        const formatted = formatPhoneNumber(input);
        setPhone(formatted);
        
        const totalDigits = formatted.replace(/\D/g, '').length;
        // Ошибка, если цифр не 11 и поле не пустое (только "+7")
        setPhoneError(totalDigits > 1 && totalDigits < 11);
    };


    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);

      const actualPhoneNumber = phone.replace(/\D/g, "");
      if (actualPhoneNumber.length !== 11) {
          setPhoneError(true);
          toast({
              title: "Ошибка",
              description: "Пожалуйста, введите полный номер телефона (10 цифр после +7).",
              variant: "destructive",
          });
          setLoading(false);
          return;
      }

      if (!agree) {
          toast({
              title: "Ошибка",
              description: "Пожалуйста, согласитесь с политикой конфиденциальности.",
              variant: "destructive",
          });
          setLoading(false);
          return;
      }

      if (!apiUrl) {
        toast({
            title: "Ошибка конфигурации",
            description: "API URL не настроен. Обратитесь к администратору.",
            variant: "destructive",
        });
        setLoading(false);
        return;
      }

      axios.post(`${apiUrl}api/v1/leads/`, {
          name: name,
          phone: actualPhoneNumber,
          contact_method: selectedContact,
          services: selectedServices.map(index => services[index]),
          project_description: desc,
          privacy_policy_agreed: agree
        }).then(response => {
            if (response.status === 201) {
                toast({ title: "Успех!", description: "Ваша заявка отправлена." });
                close();
                setName("");
                setPhone("+7");
                setDesc("");
                setAgree(false);
                setSelectedServices([]);
                setSelectedContact("phone");
            }
        }).catch(error => {
            const status = error.response ? error.response.status : null;
            const errorMessage = error.response?.data?.message || error.message || "Неизвестная ошибка.";
            toast({ title: "Ошибка отправки", description: `Произошла ошибка: ${errorMessage} (Код: ${status || 'N/A'})`, variant: "destructive" });
        }).finally(() => {
            setLoading(false);
        });
    };

    // Закрытие по клику на фон
    const handleBackdropClick = (e: MouseEvent<HTMLElement>) => {
        if (e.target === e.currentTarget) {
            close();
        }
    };


  if (isMobile) {
    // Мобильная версия без изменений в логике, кроме исправления телефона
    return (
        <main className="bg-black text-white font-text min-h-screen p-4">
            <form onSubmit={onSubmit} className="flex flex-col h-full space-y-6">
                <div className="flex justify-between items-center">
                    <h1 className="text-[#DBFE01] text-3xl font-extrabold font-display">заказать<br/>проект</h1>
                    <button type="button" onClick={close} className="p-1" aria-label="Закрыть форму"><X className="size-8 text-gray-400" /></button>
                </div>
                <p>Выберите задачу и расскажите о своём проекте</p>

                <div className="grid grid-cols-2 gap-3">
                    {services.map((t, i) => (
                      <button key={i} type="button" onClick={() => toggleService(i)} className={`flex items-center justify-center gap-2 rounded-full px-4 py-2.5 text-sm border font-bold transition-colors duration-300 ${selectedServices.includes(i) ? "bg-[#5940FE] text-white border-[#5940FE]" : "bg-white text-black border-white"}`}>
                        <span>{t}</span> <Plus className="size-4" />
                      </button>
                    ))}
                </div>

                <Input required placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} className="bg-transparent border-0 border-b border-gray-500 rounded-none px-0 text-lg font-bold focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-b-[#DBFE01]" />
                
                <div>
                    <p className="mb-3 text-lg font-bold">Удобный способ связи</p>
                    <div className="flex flex-col items-start gap-4">
                        {[ { id: "phone", label: "Телефон", icon: <Phone className="mr-3 size-5" /> }, { id: "telegram", label: "Telegram", icon: <Send className="mr-3 size-5" /> }, { id: "whatsapp", label: "WhatsApp", icon: <MessageCircle className="mr-3 size-5" /> } ].map((contact) => (
                            <button key={contact.id} type="button" onClick={() => setSelectedContact(contact.id)} className={`flex items-center transition-colors text-lg ${selectedContact === contact.id ? "text-[#DBFE01] font-bold" : "text-white"}`}>
                                {contact.icon} {contact.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className={`flex items-center border-b focus-within:border-b-[#DBFE01] ${phoneError ? "border-red-500" : "border-gray-500"}`}>
                    <span className="text-lg font-bold pr-2">RU</span>
                    <Input 
                        required 
                        type="tel" 
                        placeholder="+7 (___) ___-__-__" 
                        value={phone}
                        onChange={handlePhoneChange} 
                        className="bg-transparent w-full py-2 text-lg font-bold focus:outline-none placeholder:text-gray-500 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                    />
                </div>

                <Textarea className="flex-grow min-h-24 resize-none bg-transparent border-0 border-b border-gray-500 rounded-none p-0 text-lg font-bold focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-b-[#DBFE01]" placeholder="Расскажите в двух словах про ваш проект" value={desc} onChange={(e) => setDesc(e.target.value)} />

                <div className="flex items-start gap-3">
                    <Checkbox id="agree-mobile" checked={agree} onCheckedChange={(v) => setAgree(Boolean(v))} className="w-6 h-6 mt-1 border-gray-400 data-[state=checked]:bg-[#DBFE01] data-[state=checked]:text-black"/>
                    <label htmlFor="agree-mobile" className="text-sm text-gray-400">я согласен с условиями <a download="policy.pdf" href={PolicyFile} target="_blank" rel="noopener noreferrer" className="underline text-[#DBFE01] font-bold">политики конфиденциальности</a></label>
                </div>

                <button type="submit" disabled={loading || phoneError || !agree} className="w-full bg-[#DBFE01] text-black rounded-full py-3.5 font-semibold text-lg transition-colors duration-300 hover:bg-lime-300 disabled:bg-gray-500">
                    {loading ? "Отправляем…" : "Отправить"}
                </button>
             </form>
        </main>
    );
  }
  
  // ИЗМЕНЕННАЯ ДЕСКТОПНАЯ ВЕРСТКА
  return (
    <main 
        className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto"
        onClick={handleBackdropClick} // Обработчик для закрытия
    >
        <form 
            onSubmit={onSubmit} 
            className="relative bg-black text-white p-8 max-w-lg w-full mx-auto rounded-3xl border border-gray-700"
            onClick={(e) => e.stopPropagation()} // Предотвращает закрытие при клике на саму форму
        >
          <button type="button" onClick={close} className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 transition-colors" aria-label="Закрыть форму">
            <X className="size-5 text-[#DBFE01]" />
          </button>
          <h1 className="text-center text-[#DBFE01] text-3xl font-extrabold mb-2">заказать проект</h1>
          <p className="text-center text-white mb-10">Выберите задачу и расскажите о своём проекте</p>
          <div className="grid grid-cols-3 gap-3 mb-6">
            {services.map((t, i) => (
              <button key={i} type="button" onClick={() => toggleService(i)} className={`flex items-center justify-between rounded-full px-4 py-2 text-sm border font-bold transition-colors duration-300 ${selectedServices.includes(i) ? "bg-[#5940FE] text-white border-[#5940FE]" : "bg-white text-black border-white"}`}>
                <span>{t}</span> <Plus className="size-4" />
              </button>
            ))}
          </div>
          <Input required placeholder="Ваше имя" value={name} onChange={(e) => setName(e.target.value)} className="bg-transparent border-b border-gray-500 mb-6" />
          <p className="mb-3">Удобный способ связи</p>
          <div className="flex gap-3 mb-6">
            {[ { id: "phone", label: "Телефон", icon: <Phone className="mr-2 size-4" /> }, { id: "telegram", label: "Telegram", icon: <Send className="mr-2 size-4" /> }, { id: "whatsapp", label: "WhatsApp", icon: <MessageCircle className="mr-2 size-4" /> } ].map((contact) => (
              <button key={contact.id} type="button" onClick={() => setSelectedContact(contact.id)} className={`flex items-center rounded-full px-4 py-2 border transition-colors duration-300 ${selectedContact === contact.id ? "bg-[#DBFE01] text-black border-[#DBFE01]" : "bg-transparent border-gray-500" }`}>
                {contact.icon} {contact.label}
              </button>
            ))}
          </div>
          <Input 
              required 
              type="tel" 
              placeholder="+7 (___) ___-__-__" 
              value={phone} 
              onChange={handlePhoneChange} 
              className={`bg-transparent border-b mb-6 ${phoneError ? "border-red-500" : "border-gray-500" }`} 
          />
          <p className="mb-3">Расскажите в двух словах про ваш проект</p>
          <Textarea className="min-h-32 resize-none bg-transparent border border-gray-500 mb-6" placeholder="Короткое описание" value={desc} onChange={(e) => setDesc(e.target.value)} />
          <div className="flex items-center gap-2 mb-6">
            <Checkbox id="agree-desktop" checked={agree} onCheckedChange={(v) => setAgree(Boolean(v))} />
            <label htmlFor="agree-desktop" className="text-sm">я согласен с условиями <a download="policy.pdf" href={PolicyFile} target="_blank" rel="noopener noreferrer" className="underline">политики конфиденциальности</a></label>
          </div>
          <button type="submit" disabled={loading || phoneError || !agree} className="w-full bg-[#DBFE01] text-black rounded-full py-3 font-semibold transition-colors duration-300 hover:bg-lime-300 disabled:bg-gray-500">
            {loading ? "Отправляем…" : "Отправить"}
          </button>
        </form>
      </main>
  )
};

export default Order;