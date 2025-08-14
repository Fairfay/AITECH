// src/components/modals/OrderModal.tsx

import { useOrder } from "@/context/OrderContext";
import Order from "@/pages/Order";

export default function OrderModal() {
  const { isOpen, close } = useOrder();

  if (!isOpen) return null;

  return (
    // Убираем центрирование и блюр, делаем фон просто черным для полноэкранного режима
    <div
      className="fixed inset-0 bg-black z-50 overflow-y-auto"
      onClick={close}
    >
      <div
        className="w-full min-h-full"
        onClick={(e) => e.stopPropagation()} // Блокируем клик внутри
      >
        <Order />
      </div>
    </div>
  );
}