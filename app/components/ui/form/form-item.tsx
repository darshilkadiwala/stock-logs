import type { HTMLInputTypeAttribute, JSX, ReactNode } from 'react';

import type { FieldPath, FieldValues, RegisterOptions, UseFormRegisterReturn } from 'react-hook-form';

import { FormDescription } from '@/components/ui/form/form-description';
import { FormMessage } from '@/components/ui/form/form-message';
import { Input, type InputProps } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormField, type UseFormFieldReturn } from '@/hooks/use-form';
import { cn } from '@/lib/tw-utils';

import type { WithClassName, WithRender } from '@/types/ui';

type FormItemProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = WithClassName &
  WithClassName<'labelClassName'> &
  WithRender<(props: UseFormFieldReturn<TFieldValues, TFieldName>) => ReactNode> & {
    name: TFieldName;
    label?: ReactNode;
    type?: HTMLInputTypeAttribute | 'switch';
    description?: string;
    rules?: RegisterOptions<TFieldValues, TFieldName> & { required?: boolean };
    placeholder?: InputProps['placeholder'];
    inputProps?: Omit<InputProps, 'placeholder' | 'type' | keyof UseFormRegisterReturn>;
  };

const FormItem = <
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  className,
  labelClassName,
  name,
  label,
  type,
  description,
  inputProps,
  placeholder,
  rules,
  render,
}: FormItemProps<TFieldValues, TFieldName>): JSX.Element => {
  const fieldState = useFormField<TFieldValues, TFieldName>(name);
  const { register, formDescriptionId, formMessageId, error, formItemId } = fieldState;

  const inputTypeNumberRules: RegisterOptions<TFieldValues, TFieldName> = {
    ...rules,
    setValueAs: (value: string) => parseFloat(value) || undefined,
  };

  return (
    <div className={cn('group space-y-1', className)}>
      {label ? (
        <Label htmlFor={formItemId} className={cn(labelClassName)}>
          {label} {rules?.required && <span className='text-destructive text-base font-medium'>*</span>}
        </Label>
      ) : null}
      {render ? (
        render(fieldState)
      ) : (
        <Input
          {...inputProps}
          {...register(name, type === 'number' ? inputTypeNumberRules : rules)}
          aria-describedby={formDescriptionId}
          aria-errormessage={formMessageId}
          aria-required={rules?.required}
          aria-invalid={!!error}
          placeholder={placeholder}
          id={formItemId}
          type={type}
          autoComplete='off'
        />
      )}
      <FormDescription id={formDescriptionId}>{description}</FormDescription>
      <FormMessage error={error} id={formMessageId} />
    </div>
  );
};
FormItem.displayName = 'FormItem';

export { FormItem };
export type { FormItemProps };
