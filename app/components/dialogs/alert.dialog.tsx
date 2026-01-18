import type { ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { registerDialog } from '@/lib/dialog-registry';

import type { DialogProps } from '@/types/ui';

interface AlertDialogData {
  title?: string;
  message: string;
  buttonText?: ReactNode;
  variant?: 'default' | 'destructive' | 'success';
  onClose?: () => void;
}

interface AlertDialogProps extends DialogProps {
  data?: AlertDialogData;
}

/**
 * Pre-built alert dialog component
 * Usage: dialog.open('alert', { message: 'Something happened!', variant: 'success' })
 */
function AlertDialogComponent({ data, onClose }: AlertDialogProps) {
  if (!data) {
    console.error('AlertDialog: data is required');
    return null;
  }

  const { title = 'Alert', message, buttonText = 'OK', variant = 'default', onClose: onCloseCallback } = data;

  const handleClose = () => {
    onCloseCallback?.();
    onClose();
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{message}</DialogDescription>
      </DialogHeader>
      <DialogFooter>
        <Button
          variant={variant === 'destructive' ? 'destructive' : variant === 'success' ? 'default' : 'default'}
          onClick={handleClose}>
          {buttonText}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}

// Self-register the dialog
registerDialog({
  id: 'alert',
  component: (props) => <AlertDialogComponent {...props} data={props.data} />,
});

// Export the component for direct use if needed
export { AlertDialogComponent as AlertDialog };
