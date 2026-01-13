import { type ComponentProps, type JSX } from 'react';

import type { FieldPath, FieldValues } from 'react-hook-form';
import { useWatch } from 'react-hook-form';

import { FormItem } from '@/components/ui/form/form-item';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { UseFormFieldReturn } from '@/hooks/use-form';
import { cn } from '@/lib/tw-utils';

import type { Option } from '@/types/ui';

interface FormTabsOption<V extends string = string> extends Option<V> {}

interface FormTabsContentProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TOption extends string = string,
> extends ComponentProps<typeof Tabs> {
  fieldState: UseFormFieldReturn<TFieldValues, TFieldName>;
  options: FormTabsOption<TOption>[];
  defaultValue?: TOption;
}

function FormTabsContent<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TOption extends string = string,
>({
  fieldState,
  options,
  defaultValue,
  ...props
}: FormTabsContentProps<TFieldValues, TFieldName, TOption>): JSX.Element {
  const { setValue, control, name, error, isFormDisabled } = fieldState;
  const value = useWatch({ control, name }) as TOption | undefined;
  const currentValue = value || defaultValue || options[0]?.value;

  return (
    <Tabs
      value={currentValue}
      onValueChange={(newValue) => {
        setValue(name, newValue as TFieldValues[TFieldName], { shouldValidate: true });
      }}
      className={cn('w-full', isFormDisabled && 'pointer-events-none opacity-50')}
      aria-invalid={!!error}
      {...props}>
      <TabsList className={cn('w-full', error && 'border-destructive border')} aria-invalid={!!error}>
        {options.map((option) => (
          <TabsTrigger
            key={option.value}
            value={option.value}
            className='flex-1'
            disabled={isFormDisabled}
            aria-disabled={isFormDisabled}>
            {option.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}

interface FormTabsProps<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TOption extends string = string,
> extends Omit<
  ComponentProps<typeof FormItem<TFieldValues, TFieldName>>,
  'type' | 'render' | 'inputProps' | 'placeholder'
> {
  options: FormTabsOption<TOption>[];
  defaultValue?: TOption;
}

function FormTabs<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TOption extends string = string,
>({ options, defaultValue, ...props }: FormTabsProps<TFieldValues, TFieldName, TOption>): JSX.Element {
  return (
    <FormItem<TFieldValues, TFieldName>
      render={(fieldState: UseFormFieldReturn<TFieldValues, TFieldName>) => (
        <FormTabsContent fieldState={fieldState} options={options} defaultValue={defaultValue} />
      )}
      {...props}
    />
  );
}

export { FormTabs, FormTabsContent, type FormTabsContentProps, type FormTabsOption, type FormTabsProps };
