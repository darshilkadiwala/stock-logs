import { Dialog } from '@/components/ui/dialog';
import { useDialog } from '@/providers/dialog-provider';

import type { DialogProps, DialogRegistry } from '@/types/ui';

interface DialogManagerProps {
  /**
   * Registry of dialog components by ID
   * Each dialog component receives DialogProps
   */
  dialogs: DialogRegistry;
}

/**
 * DialogManager - Renders active dialogs based on registry
 * Place this component in your app layout, after DialogProvider
 */
export function DialogManager({ dialogs }: DialogManagerProps) {
  const { isOpen, close, getData, isRegistered } = useDialog();

  return (
    <>
      {Object.entries(dialogs).map(([id, DialogComponent]) => {
        const open = isOpen(id);
        if (!open) return null;

        // Double-check registration (defensive programming)
        if (!isRegistered(id)) {
          if (import.meta.env.DEV) {
            console.error(`DialogManager: Dialog "${id}" is in registry but not registered. This should not happen.`);
          }
          return null;
        }

        const data = getData(id);
        // Get options from dialog state if needed (for future enhancement)
        const dialogProps: DialogProps = {
          id,
          isOpen: open,
          onClose: () => close(id),
          data,
        };

        const content = DialogComponent(dialogProps);

        return (
          <Dialog key={id} open={open} onOpenChange={(isOpen) => !isOpen && close(id)}>
            {content}
          </Dialog>
        );
      })}
    </>
  );
}
