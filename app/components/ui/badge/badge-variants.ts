import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden border border-transparent font-medium whitespace-nowrap transition-[colors,box-shadow] focus:outline-none [&>svg]:pointer-events-none',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a&]:hover:bg-primary/90',
        secondary: 'bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive:
          'bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 dark:bg-destructive/60 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40',
        outline: 'border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        ghost: '[a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
        link: 'text-muted-foreground/50 hover:text-primary/80 cursor-pointer border-none px-0.5 underline underline-offset-4',
      },
      size: {
        sm: 'text-2xs px-2 py-0.5 [&>svg]:size-2.5',
        md: 'px-2.5 py-0.5 text-xs [&>svg]:size-3',
        lg: 'px-3 py-1 text-sm [&>svg]:size-3.5',
      },
      shape: {
        pill: 'rounded-full',
        rounded: 'rounded',
        box: 'rounded-none',
      },
      disabled: { true: 'cursor-not-allowed! opacity-50' },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      shape: 'rounded',
    },
  },
);

type BadgeVariantsProps = VariantProps<typeof badgeVariants>;

export { badgeVariants };
export type { BadgeVariantsProps };
