import { Moon, Sun } from 'lucide-react';

import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/tw-utils';
import { Themes, useTheme } from '@/providers/theme-provider';

export function ThemeToggle({ className, ...props }: ButtonProps) {
  const { setTheme, theme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === Themes.DARK ? Themes.LIGHT : Themes.DARK);
  };

  const Icon = theme === Themes.DARK ? Moon : Sun;

  return (
    <Button
      onClick={toggleTheme}
      aria-label='Toggle theme'
      variant='ghost'
      size='icon'
      className={cn('size-7', className)}
      {...props}>
      <Icon />
    </Button>
  );
}
