import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { registerDialog } from '@/lib/dialog-registry';

import type { DialogProps } from '@/types/ui';

interface ConfirmDialogData {
  title?: string;
  message: string;
  confirmText?: ReactNode;
  cancelText?: ReactNode;
  variant?: 'default' | 'destructive';
  onConfirm: () => void | Promise<void>;
  onCancel?: () => void;
}

interface ConfirmDialogProps extends DialogProps {
  data?: ConfirmDialogData;
}

/**
 * Pre-built confirmation dialog component
 * Usage: dialog.open('confirm', { message: 'Are you sure?', onConfirm: () => {} })
 */
function ConfirmDialogComponent({ data, onClose }: ConfirmDialogProps) {
  if (!data) {
    console.error('ConfirmDialog: data is required');
    return null;
  }

  const {
    title = 'Confirm Action',
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    variant = 'default',
    onConfirm,
    onCancel,
  } = data;

  const handleConfirm = async () => {
    await onConfirm();
    onClose();
  };

  const handleCancel = () => {
    onCancel?.();
    onClose();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{message}</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button variant='outline' onClick={handleCancel}>
          {cancelText}
        </Button>
        <Button variant={variant === 'destructive' ? 'destructive' : 'default'} onClick={handleConfirm}>
          {confirmText}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

// Self-register the dialog
registerDialog({
  id: 'confirm',
  component: (props) => <ConfirmDialogComponent {...props} data={props.data} />,
});

// Export the component for direct use if needed
export { ConfirmDialogComponent as ConfirmDialog };
