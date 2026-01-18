import { cva, type VariantProps } from 'class-variance-authority';

const switchVariants = cva(
  [
    // base
    'peer data-[state=unchecked]:bg-input focus-visible:border-ring focus-visible:ring-ring border border-transparent shadow-xs',
    'group bg-primary/20 ring-primary/90 relative isolate inline-flex shrink-0 cursor-pointer items-center rounded-full p-0.5 shadow-inner transition-all outline-none ring-inset focus-visible:ring-2',
    // checked
    'data-[state=checked]:bg-primary/90',
    // disabled
    'data-disabled:data-[state=checked]:bg-primary/70 data-disabled:ring-primary/70 disabled:opacity-50 data-disabled:cursor-not-allowed',
  ],
  {
    variants: { size: { default: 'h-5 w-9', small: 'h-4 w-7' } },
    defaultVariants: { size: 'default' },
  },
);

const switchThumbVariants = cva(
  [
    // 'bg-background dark:data-[state=unchecked]:bg-foreground dark:data-[state=checked]:bg-primary-foreground pointer-events-none block size-4 rounded-full ring-0 transition-transform data-[state=checked]:translate-x-[calc(100%-2px)] data-[state=unchecked]:translate-x-0',
    // base
    'pointer-events-none relative inline-block transform appearance-none rounded-full border-none shadow-xl ring-0 transition-all duration-150 ease-in-out outline-none focus:border-none focus:outline-transparent focus:outline-none',
    // background color
    'bg-foreground group-data-[state=checked]:bg-primary-foreground',
    // disabled
    'group-data-disabled:bg-accent/50 group-data-disabled:group-data-[state=checked]:bg-primary/70 group-data-disabled:shadow-none',
  ],
  {
    variants: {
      size: {
        default: 'size-4 data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
        small: 'size-3 data-[state=checked]:translate-x-3 data-[state=unchecked]:translate-x-0',
      },
    },
    defaultVariants: { size: 'default' },
  },
);

type SwitchVariantsProps = VariantProps<typeof switchVariants>;
type SwitchThumbVariantsProps = VariantProps<typeof switchThumbVariants>;

export { switchThumbVariants, switchVariants };
export type { SwitchThumbVariantsProps, SwitchVariantsProps };
