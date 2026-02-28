import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

const Themes = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

type Theme = (typeof Themes)[keyof typeof Themes];

interface ThemeProviderProps {
  children: ReactNode;
  defaultTheme?: Theme;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const THEME_STORAGE_KEY = 'stock-logs-theme';

const initialState: ThemeProviderState = { theme: Themes.SYSTEM, setTheme: () => null };

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

function ThemeProvider({ children, defaultTheme = Themes.SYSTEM }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem(THEME_STORAGE_KEY) as Theme) || defaultTheme;
    }
    return defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    // Create and append style to disable transitions
    const css = document.createElement('style');
    css.appendChild(
      document.createTextNode(
        `*, *::before, *::after {
          -webkit-transition: none !important;
          -moz-transition: none !important;
          -o-transition: none !important;
          -ms-transition: none !important;
          transition: none !important;
        }`,
      ),
    );
    document.head.appendChild(css);

    root.classList.remove(Themes.LIGHT, Themes.DARK);

    if (theme === Themes.SYSTEM) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? Themes.DARK : Themes.LIGHT;
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }

    // Force a reflow to ensure the theme change is applied without transitions
    (() => window.getComputedStyle(document.body).opacity)();

    // Remove the style block to re-enable transitions
    document.head.removeChild(css);
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
      }
      setTheme(newTheme);
    },
  };

  return <ThemeProviderContext.Provider value={value}>{children}</ThemeProviderContext.Provider>;
}

const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};

export { ThemeProvider, Themes, useTheme };
