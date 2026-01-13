import type { ComponentProps, JSX } from 'react';

import { Loader2Icon, SaveIcon } from 'lucide-react';
import { useFormContext, type FieldValues } from 'react-hook-form';

import { cn } from '@/lib/tw-utils';

import { Button } from '../button';

interface FormSaveFooterProps extends ComponentProps<'section'> {
  saveText?: string;
  submittingOrLoading?: boolean;
}

function FormSaveFooter({
  id = 'save-footer',
  className,
  children,
  saveText = 'Save',
  submittingOrLoading = false,
  ref,
  ...props
}: FormSaveFooterProps): JSX.Element {
  const { formState } = useFormContext<FieldValues>();
  const isFormSubmitting = formState.isLoading || formState.isSubmitting;
  const isLoading = isFormSubmitting || submittingOrLoading;
  const isDisabled = formState.disabled || isLoading;

  return (
    <section
      id={id}
      ref={ref}
      className={cn(
        'bg-background sticky right-0 bottom-0 left-0 z-10 -mx-4 -mb-8 flex items-center justify-end gap-4 border-t px-4 py-4 md:-mx-5 md:px-5 lg:-mx-6 lg:px-6',
        className,
      )}
      {...props}>
      {children}
      <Button type='submit' disabled={isDisabled} aria-disabled={isDisabled}>
        {isLoading ? <Loader2Icon className='animate-spin' /> : <SaveIcon />} {saveText}
      </Button>
    </section>
  );
}

FormSaveFooter.displayName = 'FormSaveFooter';

export { FormSaveFooter };
export type { FormSaveFooterProps };
