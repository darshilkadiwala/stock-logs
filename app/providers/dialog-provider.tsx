import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from 'react';

import { getRegisteredDialogIds, isDialogRegistered, validateDialogRegistry } from '@/lib/dialog-registry';

import type { DialogId, DialogOptions } from '@/types/ui';

interface DialogState {
  id: DialogId;
  data?: any;
  options?: DialogOptions;
}

/**
 * Dialog manager context value
 */
interface DialogContextValue {
  /**
   * Open a dialog by ID
   */
  open: (id: DialogId, data?: any, options?: DialogOptions) => void;
  /**
   * Close a dialog by ID
   */
  close: (id: DialogId) => void;
  /**
   * Close all dialogs
   */
  closeAll: () => void;
  /**
   * Check if a dialog is open
   */
  isOpen: (id: DialogId) => boolean;
  /**
   * Get data for a dialog
   */
  getData: (id: DialogId) => any;
  /**
   * Check if a dialog is registered
   */
  isRegistered: (id: DialogId) => boolean;
  /**
   * Get all registered dialog IDs
   */
  getRegisteredIds: () => DialogId[];
}

const DialogContext = createContext<DialogContextValue | null>(null);

interface DialogProviderProps {
  children: ReactNode;
}

/**
 * Dialog Provider - Manages dialog state globally
 * Wrap your app with this provider to enable dialog management
 */
export function DialogProvider({ children }: DialogProviderProps) {
  const [dialogs, setDialogs] = useState<Map<DialogId, DialogState>>(new Map());

  // Validate registry in development mode on mount
  useEffect(() => {
    if (import.meta.env.DEV) {
      const validation = validateDialogRegistry();
      if (validation.warnings.length > 0) {
        console.group('🔍 Dialog Registry Validation');
        validation.warnings.forEach((warning) => console.warn(warning));
        console.log('Registered dialogs:', validation.registered);
        console.groupEnd();
      }
    }
  }, []);

  const open = useCallback((id: DialogId, data?: any, options?: DialogOptions) => {
    // Validate that the dialog is registered
    if (!isDialogRegistered(id)) {
      const registeredIds = getRegisteredDialogIds();
      const errorMessage = `Dialog "${id}" is not registered. Make sure the dialog component calls registerDialog() with id "${id}".`;
      console.group('❌ Dialog Not Registered');
      console.error(`${errorMessage}`);
      console.log('📋 Available dialogs:', registeredIds);
      console.log(
        '💡 Tip: Check that your dialog file uses .dialog.tsx extension, calls registerDialog(), and is in app/components/dialogs/',
      );
      console.groupEnd();

      if (import.meta.env.DEV) {
        // In development, throw an error to help catch issues early
        throw new Error(errorMessage);
      }
      return; // In production, silently fail to prevent app crashes
    }

    setDialogs((prev) => {
      const next = new Map(prev);
      next.set(id, { id, data, options });
      return next;
    });
    options?.onOpen?.();
  }, []);

  const getRegisteredIds = useCallback(() => getRegisteredDialogIds(), []);

  const close = useCallback((id: DialogId) => {
    setDialogs((prev) => {
      const next = new Map(prev);
      const dialog = next.get(id);
      dialog?.options?.onClose?.();
      next.delete(id);
      return next;
    });
  }, []);

  const closeAll = useCallback(() => {
    setDialogs((prev) => {
      prev.forEach((dialog) => {
        dialog.options?.onClose?.();
      });
      prev.clear();
      return new Map();
    });
  }, []);

  const isOpen = useCallback((id: DialogId) => dialogs.has(id), [dialogs]);

  const getData = useCallback((id: DialogId) => dialogs.get(id)?.data, [dialogs]);

  const isRegistered = useCallback((id: DialogId) => isDialogRegistered(id), []);

  const value: DialogContextValue = {
    open,
    close,
    closeAll,
    isOpen,
    getData,
    isRegistered,
    getRegisteredIds,
  };

  return <DialogContext.Provider value={value}>{children}</DialogContext.Provider>;
}

/**
 * Hook to access dialog manager
 * @throws Error if used outside DialogProvider
 */
export function useDialog() {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error('useDialog must be used within DialogProvider');
  }
  return context;
}
