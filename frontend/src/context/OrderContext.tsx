import { createContext, useContext, useState, useRef } from "react";

type OrderContextType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const OrderContext = createContext<OrderContextType | null>(null);

export const useOrder = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used inside OrderProvider");
  return ctx;
};

export const OrderProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const scrollY = useRef(0);

  const open = () => {
    scrollY.current = window.scrollY;
    document.body.style.overflow = "hidden";
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
    document.body.style.overflow = "";
    window.scrollTo(0, scrollY.current);
  };

  return (
    <OrderContext.Provider value={{ isOpen, open, close }}>
      {children}
    </OrderContext.Provider>
  );
};
