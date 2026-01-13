import { zodResolver } from '@hookform/resolvers/zod';
import {
  useForm,
  useFormContext,
  type FieldPath,
  type FieldValues,
  type UseFormGetFieldState,
  type UseFormProps,
  type UseFormReturn,
} from 'react-hook-form';
import type { ZodSchema } from 'zod/v3';

/**
 * Generates unique ids for form items, descriptions, and error messages.
 *
 * @param id - The id of the form item.
 * @returns An object with the following properties:
 *  - id: The id of the form item.
 *  - formItemId: The id of the form item element.
 *  - formDescriptionId: The id of the form item description element.
 *  - formMessageId: The id of the form item error message element.
 */
export function generateFormItemId(id: string): {
  id: string;
  formItemId: string;
  formDescriptionId: string;
  formMessageId: string;
} {
  return {
    id,
    formItemId: `form-item-${id}`,
    formDescriptionId: `form-item-description-${id}`,
    formMessageId: `form-item-message-${id}`,
  };
}

// Generic hook for Zod Resolver based form
const useZodForm = <TFieldValues extends FieldValues = FieldValues>(
  schema?: ZodSchema<TFieldValues>,
  options?: UseFormProps<TFieldValues>,
): UseFormReturn<TFieldValues> => {
  return useForm<TFieldValues>({
    ...(schema && { resolver: zodResolver(schema as any) }),
    ...options,
  });
};

interface UseFormFieldReturn<
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>
  extends
    Pick<UseFormReturn<TFieldValues>, 'register' | 'control' | 'setError' | 'clearErrors' | 'setValue'>,
    ReturnType<UseFormGetFieldState<TFieldValues>>,
    ReturnType<typeof generateFormItemId> {
  name: TFieldName;
  isFormDisabled?: boolean;
}

const useFormField = <
  TFieldValues extends FieldValues = FieldValues,
  TFieldName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>(
  name: TFieldName,
): UseFormFieldReturn<TFieldValues, TFieldName> => {
  const { getFieldState, register, control, formState, setError, setValue, clearErrors } =
    useFormContext<TFieldValues>();
  const fieldState = getFieldState(name, formState);
  return {
    name,
    register,
    control,
    setError,
    clearErrors,
    setValue,
    isFormDisabled: formState.disabled || formState.isSubmitting,
    ...generateFormItemId(name),
    ...fieldState,
  };
};

export { useFormField, useZodForm };
export type { UseFormFieldReturn };
