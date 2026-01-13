import type { ComponentProps, FormEvent, JSX, KeyboardEvent, ReactNode } from 'react';
import { useCallback, useEffect } from 'react';

import type { FieldValues, Path, SubmitHandler, UseFormProps } from 'react-hook-form';
import { FormProvider } from 'react-hook-form';
import type { ZodSchema } from 'zod/v3';

import { useZodForm } from '@/hooks/use-form';
import { cn } from '@/lib/tw-utils';

import type { WithClassName } from '@/types/ui';

type ServerErrors<T> = Partial<Record<keyof T, string>>;

interface FormProps<TFormValues extends FieldValues>
  extends Omit<ComponentProps<'form'>, 'onSubmit'>, WithClassName<'fieldSetClassName'> {
  onSubmit?: SubmitHandler<TFormValues>;
  children: ReactNode;
  useFormProps?: UseFormProps<TFormValues>;
  validationSchema?: ZodSchema<TFormValues>;
  serverError?: ServerErrors<TFormValues> | null;
  resetValues?: TFormValues | null;
  disabled?: boolean;
}

function Form<TFormValues extends FieldValues = FieldValues>({
  onSubmit,
  children,
  useFormProps,
  validationSchema,
  disabled,
  serverError,
  fieldSetClassName,
  ref,
  ...props
}: FormProps<TFormValues>): JSX.Element {
  const methods = useZodForm<TFormValues>(validationSchema, {
    reValidateMode: 'onChange',
    mode: 'onSubmit',
    disabled,
    ...useFormProps,
  });

  useEffect(() => {
    if (serverError) {
      Object.entries(serverError).forEach(([field, message]) => {
        methods.setError(field as Path<TFormValues>, { type: 'server', message });
      });
    }
  }, [serverError, methods]);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLFormElement>) => {
    const target = e.target as HTMLElement;
    if (e.key === 'Enter' && !['TEXTAREA'].includes(target.tagName)) {
      e.preventDefault();
    }
  }, []);

  const handleFormSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      e.stopPropagation();
      if (onSubmit) {
        void methods.handleSubmit(onSubmit)(e);
      }
    },
    [onSubmit, methods],
  );

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleFormSubmit} noValidate {...props} onKeyDown={handleKeyDown} ref={ref}>
        <fieldset
          disabled={methods.formState.isSubmitting}
          style={{ minInlineSize: 0 }}
          className={cn(fieldSetClassName)}>
          {children}
        </fieldset>
      </form>
    </FormProvider>
  );
}

export { Form, type FormProps };
