# Dialog Auto-Discovery System

## Overview

The dialog registry automatically discovers and registers dialog components using Vite's `import.meta.glob()` feature. This eliminates the need for manual imports or registry management.

## How It Works

Dialogs are **automatically discovered and registered** - no manual imports needed!

### Automatic Discovery

The registry uses Vite's `import.meta.glob` to automatically scan and import:

- `app/components/dialogs/*.dialog.tsx` - All dialog components with `.dialog.tsx` extension

When these files are imported, they execute their `registerDialog()` calls automatically.

**Note**: Only files with the `.dialog.tsx` extension are discovered. This naming convention eliminates the need for manual file filtering.

## File Naming Conventions

**Important**: Dialog files must use the `.dialog.tsx` extension to be automatically discovered.

- ✅ `app/components/dialogs/*.dialog.tsx` - Files with `.dialog.tsx` extension are auto-discovered
- ❌ `app/components/dialogs/*.tsx` - Regular `.tsx` files are **not** discovered

**Examples:**

- ✅ `alert.dialog.tsx` - Will be discovered
- ✅ `confirm.dialog.tsx` - Will be discovered
- ✅ `my-custom-dialog.dialog.tsx` - Will be discovered
- ❌ `dialog-manager.tsx` - Will **not** be discovered (doesn't match pattern)
- ❌ `my-dialog.tsx` - Will **not** be discovered (missing `.dialog` in extension)

This naming convention eliminates the need for manual file filtering - only dialog files are imported automatically.

## Creating a New Dialog

### Step 1: Create Your Dialog Component

```tsx
// app/components/dialogs/my-dialog.dialog.tsx
import { registerDialog } from '@/lib/dialog-registry';

import type { DialogProps } from '@/types/ui';

interface MyDialogData {
  message: string;
}

function MyDialogComponent({ data, onClose }: DialogProps<MyDialogData>) {
  if (!data) return null;

  return (
    <>
      <DialogHeader>
        <DialogTitle>My Dialog</DialogTitle>
      </DialogHeader>
      <DialogContent>
        <p>{data.message}</p>
        <button onClick={onClose}>Close</button>
      </DialogContent>
    </>
  );
}

// Self-register the dialog
registerDialog({
  id: 'my-dialog',
  component: (props) => <MyDialogComponent {...props} />,
});

export { MyDialogComponent as MyDialog };
```

### Step 2: That's It

The dialog is automatically discovered and registered. No need to:

- ❌ Import it in the registry file
- ❌ Manually add it to a registry object
- ❌ Update any configuration

Just create the file and it's available via `dialog.open('my-dialog', data)`!

## How It Works Under the Hood

1. `dialog-registry.ts` uses `import.meta.glob()` to scan for `*.dialog.tsx` files
2. Only files matching the `*.dialog.tsx` pattern are discovered (no manual filtering needed)
3. Files matching the pattern are imported **lazily** when `getDialogRegistry()` is first called
4. Each file's `registerDialog()` call executes on import
5. Dialogs are stored in a global registry map (using `globalThis` to avoid initialization order issues)
6. `getDialogRegistry()` returns the combined registry

### Lazy Import Strategy

The system uses **lazy imports** (`eager: false`) to avoid initialization order issues:

- Dialog files are discovered at build time via `import.meta.glob`
- They're imported when `getDialogRegistry()` is first called
- This ensures the module is fully initialized before any imports execute
- The registry uses `globalThis` to store the map, avoiding temporal dead zone issues

### Initialization Order

To prevent initialization errors, the system:

1. Uses `globalThis` with a string literal (no module-level constants)
2. Imports dialogs lazily when `getDialogRegistry()` is called
3. Ensures all module code is initialized before any dialog imports execute

## Error Handling & Validation

### What Happens If a Dialog Fails to Register?

The system includes built-in validation to catch missing registrations:

1. **Development Mode Validation**:
   - On app startup, validates the registry and warns about issues
   - Checks if dialog files exist but aren't registered
   - Logs warnings to console

2. **Runtime Validation**:
   - When opening a dialog, checks if it's registered
   - In development: Throws an error with helpful message
   - In production: Silently fails to prevent app crashes
   - Shows available dialogs in error message

3. **Debug Helper**:

   ```tsx
   import { useDialogDebug } from '@/hooks/use-dialog-debug';

   function MyComponent() {
     const debug = useDialogDebug();

     // Check registered dialogs
     console.log(debug.registeredDialogs);

     // Validate registry
     const { warnings } = debug.validate();

     // Log full registry info
     debug.logRegistry();
   }
   ```

### Common Issues & Solutions

**Issue**: Dialog not found when opening

- **Check**: Make sure the file uses `.dialog.tsx` extension (e.g., `my-dialog.dialog.tsx`)
- **Check**: Make sure `registerDialog()` is called in the dialog file
- **Check**: Verify the file is in `app/components/dialogs/`
- **Check**: Ensure the dialog ID matches exactly (case-sensitive)

**Issue**: Warning about unregistered dialogs

- **Check**: Make sure the file uses `.dialog.tsx` extension
- **Check**: Some files might not call `registerDialog()`

**Issue**: Initialization errors

- **Check**: Make sure you're using the latest version with lazy imports
- **Check**: Ensure `registerDialog()` is called at the module level (not inside a function)

## Technical Details

### Registry Storage

The registry uses `globalThis` to store the dialog map:

```typescript
const key = '__customDialogRegistryMap__';
if (!(globalThis as any)[key]) {
  (globalThis as any)[key] = new Map<DialogId, DialogComponent>();
}
```

This approach:

- Avoids temporal dead zone issues
- Works with lazy imports
- Persists across module reloads

### Import Pattern

```typescript
const dialogModules = import.meta.glob('../components/dialogs/*.dialog.tsx', {
  eager: false,
});

// Imported when getDialogRegistry() is first called
Promise.all(Object.values(dialogModules).map((importFn) => importFn()));
```

**Note**: The `*.dialog.tsx` pattern ensures only dialog files are imported, eliminating the need for manual file filtering.

### Registration Flow

1. Dialog file is imported (lazily)
2. Module-level `registerDialog()` call executes
3. Dialog is added to global registry map
4. Available immediately via `dialog.open()`

## Benefits

✅ **Zero Configuration** - Create file → Done!  
✅ **Automatic Discovery** - No manual imports  
✅ **Type-Safe** - Full TypeScript support  
✅ **Self-Contained** - Each dialog manages itself  
✅ **Scalable** - Add unlimited dialogs without touching registry
