import { cva, type VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  "ring-offset-background focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive aria-invalid:border-destructive inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-[color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow] outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm',
        outline: 'border-input bg-background hover:border-primary hover:text-accent-foreground border shadow-xs',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-xs',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        'destructive-outline':
          'border-destructive bg-background text-destructive hover:bg-destructive hover:text-destructive-foreground hover:ring-destructive focus-visible:bg-destructive focus-visible:text-destructive-foreground focus-visible:ring-destructive border shadow-xs ring-2 ring-transparent ring-offset-2',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 shadow-xs',
      },
      size: {
        default: 'h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'h-8 gap-1.5 rounded-md px-3 text-xs has-[>svg]:px-2.5',
        lg: 'h-10 rounded-md px-6 has-[>svg]:px-4',
        icon: 'size-10',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
);

type ButtonVariantsProps = VariantProps<typeof buttonVariants>;

export { buttonVariants };
export type { ButtonVariantsProps };
