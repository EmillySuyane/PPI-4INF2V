import styles from './ThemeToggle.module.css';
import { MoonIcon, SunIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

export function ThemeToggle() {
  const initial = localStorage.getItem("theme") || "light";
  const [theme, setTheme] = useState(initial);

  useEffect(() => {
    if (!theme) return;
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("theme", theme);
    } catch (e) {
      // ignore
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      onClick={toggleTheme}
      className={styles.toggleButton}
      aria-label="Toggle theme"
      title={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {theme === "light" ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}