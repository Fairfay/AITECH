import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-ambient">
      <div className="text-center">
        <h1 className="text-6xl font-extrabold mb-4">404</h1>
        <p className="text-lg text-muted-foreground mb-4">Страница не найдена</p>
        <a href="/" className="inline-flex items-center justify-center rounded-full bg-[hsl(var(--brand-lime))] text-[hsl(var(--sidebar-primary-foreground))] px-5 py-3 transition-colors hover:bg-[hsl(var(--brand-purple))]">На главную</a>
      </div>
    </div>
  );
};

export default NotFound;
