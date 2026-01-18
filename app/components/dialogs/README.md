# Dialog Manager System

A flexible, type-safe dialog management system for React applications using Context API and hooks.

## Features

- ✅ **Programmatic Control**: Open/close dialogs from anywhere in your app
- ✅ **Type-Safe**: Full TypeScript support
- ✅ **Multiple Dialogs**: Support for multiple dialogs open simultaneously
- ✅ **Data Passing**: Pass data to dialogs dynamically
- ✅ **Pre-built Components**: Alert and Confirm dialogs included
- ✅ **Custom Dialogs**: Easy to create and register custom dialogs
- ✅ **Clean API**: Simple hook-based interface
- ✅ **Auto-Discovery**: Dialogs automatically discover and register themselves

## Setup

### 1. Wrap your app with DialogProvider

```tsx
// app/layouts/base-layout.tsx
import { DialogManager } from '@/components/dialogs';
import { getDialogRegistry } from '@/lib/dialog-registry';
import { DialogProvider } from '@/providers/dialog-provider';

export function BaseLayout({ children }: { children: React.ReactNode }) {
  return (
    <DialogProvider>
      {/* Your existing layout */}
      {children}
      <DialogManager dialogs={getDialogRegistry()} />
    </DialogProvider>
  );
}
```

**That's it!** Dialogs are automatically discovered and registered. No manual imports needed.

## Creating a New Dialog

### Step 1: Create Your Dialog Component

Create a new file in `app/components/dialogs/` with the `.dialog.tsx` extension:

```tsx
// app/components/dialogs/my-dialog.dialog.tsx
import { registerDialog } from '@/lib/dialog-registry';

import type { DialogProps } from '@/types/ui';

interface MyDialogData {
  message: string;
  userId?: string;
}

function MyDialogComponent({ data, onClose }: DialogProps<MyDialogData>) {
  if (!data) return null;

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>My Dialog</DialogTitle>
      </DialogHeader>
      <p>{data.message}</p>
      {data.userId && <p>User ID: {data.userId}</p>}
      <button onClick={onClose}>Close</button>
    </DialogContent>
  );
}

// Self-register the dialog
registerDialog({
  id: 'my-dialog',
  component: (props) => <MyDialogComponent {...props} />,
});

// Export for direct use if needed
export { MyDialogComponent as MyDialog };
```

### Step 2: That's It

The dialog is **automatically discovered and registered**. No need to:

- ❌ Import it in the registry file
- ❌ Manually add it to a registry object
- ❌ Update any configuration

Just create the file and it's available via `dialog.open('my-dialog', data)`!

### File Naming Convention

**Important**: Dialog files must use the `.dialog.tsx` extension to be automatically discovered.

- ✅ `my-dialog.dialog.tsx` - Will be discovered
- ❌ `my-dialog.tsx` - Will **not** be discovered

For more details, see [File Naming Conventions](../../lib/dialog-registry.md#file-naming-conventions).

## Usage Examples

### Basic Usage - Alert Dialog

```tsx
import { useDialog } from '@/hooks/use-dialog';

function MyComponent() {
  const dialog = useDialog();

  const handleClick = () => {
    dialog.open('alert', {
      title: 'Success!',
      message: 'Your changes have been saved.',
      variant: 'success',
    });
  };

  return <button onClick={handleClick}>Show Alert</button>;
}
```

### Confirmation Dialog

```tsx
import { useDialog } from '@/hooks/use-dialog';

function DeleteButton() {
  const dialog = useDialog();

  const handleDelete = () => {
    dialog.open('confirm', {
      title: 'Delete Item',
      message: 'Are you sure you want to delete this item? This action cannot be undone.',
      confirmText: 'Delete',
      cancelText: 'Cancel',
      variant: 'destructive',
      onConfirm: async () => {
        // Perform delete operation
        await deleteItem();
      },
    });
  };

  return <button onClick={handleDelete}>Delete</button>;
}
```

### Custom Dialog with Data

```tsx
import { useDialog } from '@/hooks/use-dialog';

function EditButton({ tradeId }: { tradeId: string }) {
  const dialog = useDialog();
  const { data: trade } = useTrade(tradeId);

  const handleEdit = () => {
    dialog.open('add-trade', trade, {
      onClose: () => {
        // Refresh data after dialog closes
        refetch();
      },
    });
  };

  return <button onClick={handleEdit}>Edit Trade</button>;
}
```

### Check if Dialog is Open

```tsx
function MyComponent() {
  const dialog = useDialog();
  const isDialogOpen = dialog.isOpen('add-trade');

  return <div>Dialog is {isDialogOpen ? 'open' : 'closed'}</div>;
}
```

### Close Dialog Programmatically

```tsx
function MyComponent() {
  const dialog = useDialog();

  const handleClose = () => {
    dialog.close('add-trade');
  };

  return <button onClick={handleClose}>Close Dialog</button>;
}
```

## API Reference

### `useDialog()` Hook

Returns an object with the following methods:

#### `open(id: DialogId, data?: any, options?: DialogOptions)`

Opens a dialog by ID.

- `id`: Unique identifier for the dialog (must be registered)
- `data`: Optional data to pass to the dialog component
- `options`: Optional configuration
  - `dismissible`: Whether dialog can be closed by clicking outside (default: true)
  - `showCloseButton`: Whether to show close button (default: true)
  - `className`: Custom className for dialog content
  - `onClose`: Callback when dialog closes
  - `onOpen`: Callback when dialog opens

#### `close(id: DialogId)`

Closes a dialog by ID.

#### `closeAll()`

Closes all open dialogs.

#### `isOpen(id: DialogId): boolean`

Checks if a dialog is currently open.

#### `getData(id: DialogId): any`

Gets the data passed to a dialog.

## How Auto-Discovery Works

Dialogs are automatically discovered when you create a file with the `.dialog.tsx` extension in `app/components/dialogs/`. The system:

1. Scans for `*.dialog.tsx` files using Vite's `import.meta.glob()`
2. Imports them lazily when `getDialogRegistry()` is first called
3. Executes each file's `registerDialog()` call
4. Makes dialogs available via `dialog.open()`

For technical details, see [Dialog Auto-Discovery System](../../lib/dialog-registry.md).

## Troubleshooting

**Dialog not found when opening:**

- Make sure the file uses `.dialog.tsx` extension (e.g., `my-dialog.dialog.tsx`)
- Make sure `registerDialog()` is called in the dialog file
- Verify the file is in `app/components/dialogs/`
- Ensure the dialog ID matches exactly (case-sensitive)

For more troubleshooting help, see [Error Handling & Validation](../../lib/dialog-registry.md#error-handling--validation).

## Migration from URL-based Dialogs

If you're currently using URL search params for dialogs (like `?dialog=add-trade`), you can migrate:

### Before (URL-based)

```tsx
const navigate = useNavigate();
const [searchParams] = useSearchParams();
const open = searchParams.get('dialog') === 'add-trade';

// Open
navigate({ search: '?dialog=add-trade' });

// Close
navigate({ search: '' });
```

### After (Dialog Manager)

```tsx
const dialog = useDialog();

// Open
dialog.open('add-trade', initialData);

// Close
dialog.close('add-trade');
```

## Best Practices

1. **Use descriptive IDs** - Use clear, descriptive dialog IDs (e.g., 'confirm-delete', 'edit-trade')
2. **Type your dialog data** - Create TypeScript interfaces for dialog data
3. **Handle async operations** - Use async/await in onConfirm callbacks
4. **Clean up on unmount** - Consider closing dialogs when components unmount
5. **Self-register in the same file** - Keep dialog registration with the component
