import { validateDialogRegistry } from '@/lib/dialog-registry';
import { useDialog } from '@/providers/dialog-provider';

/**
 * Development hook for debugging dialog registry
 * Only available in development mode
 *
 * @example
 * function MyComponent() {
 *   const debug = useDialogDebug();
 *   console.log(debug.registeredDialogs);
 *   debug.validate();
 * }
 */
export function useDialogDebug() {
  const dialog = useDialog();

  if (!import.meta.env.DEV) {
    return {
      registeredDialogs: [],
      validate: () => ({ registered: [], warnings: [] }),
      isRegistered: () => false,
      logRegistry: () => {},
    };
  }

  return {
    /**
     * Get all registered dialog IDs
     */
    registeredDialogs: dialog.getRegisteredIds(),
    /**
     * Validate the dialog registry and return warnings
     */
    validate: () => validateDialogRegistry(),
    /**
     * Check if a specific dialog is registered
     */
    isRegistered: (id: string) => dialog.isRegistered(id),
    /**
     * Log the current registry state to console
     */
    logRegistry: () => {
      const validation = validateDialogRegistry();
      console.group('🔍 Dialog Registry Debug Info');
      console.log('Registered dialogs:', validation.registered);
      if (validation.warnings.length > 0) {
        console.warn('Warnings:', validation.warnings);
      }
      console.groupEnd();
    },
  };
}
