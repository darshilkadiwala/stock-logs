import { cva, type VariantProps } from 'class-variance-authority';

import { focusInput } from '@/lib/tw-utils';

const inputVariants = cva(
  [
    // base
    'peer ring-offset-background selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input placeholder:text-muted-foreground bg-background aria-invalid:border-destructive aria-invalid:ring-destructive/40 invalid:border-destructive invalid:ring-destructive/40 relative block h-9 w-full min-w-0 appearance-none rounded-md border px-3 py-1 text-base shadow-sm transition-[color,box-shadow] outline-none invalid:ring-2 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:ring-2 md:text-sm [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden',
    focusInput,
  ],
  {
    variants: {
      // for number input
      enableStepper: {
        false:
          '[appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none',
      },
      noRing: { true: 'ring-0! ring-offset-0!' },
      noPadding: { true: 'p-0!' },
      noBorder: { true: 'border-none!' },
      noOutline: { true: 'outline-none!' },
    },
    defaultVariants: { enableStepper: true, noRing: false, noPadding: false, noBorder: false, noOutline: false },
  },
);

type InputVariantProps = VariantProps<typeof inputVariants>;

export { inputVariants };
export type { InputVariantProps };
