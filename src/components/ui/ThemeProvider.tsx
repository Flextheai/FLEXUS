'use client';

    import { createContext, useContext, useEffect, useState } from 'react';

    type Theme = 'light' | 'dark';

    const ThemeContext = createContext<{
      theme: Theme;
      toggleTheme: () => void;
    }>({
      theme: 'light',
      toggleTheme: () => {},
    });

    export function ThemeProvider({ children }: { children: React.ReactNode }) {
      const [theme, setTheme] = useState<Theme>('light');

      useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme;
        if (savedTheme) {
          setTheme(savedTheme);
          document.documentElement.className = savedTheme;
        }
      }, []);

      const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
        document.documentElement.className = newTheme;
      };

      return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
          {children}
        </ThemeContext.Provider>
      );
    }