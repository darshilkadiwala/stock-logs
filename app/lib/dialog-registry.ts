import type { DialogComponent, DialogId, DialogRegistry } from '@/types/ui';

/**
 * Dialog registration entry
 */
export interface DialogRegistration {
  id: DialogId;
  component: DialogComponent;
}

/**
 * Global dialog registry storage
 * This is populated by dialog components when they register themselves
 * Using globalThis with string literal to avoid initialization order issues with eager imports
 */
function getRegistryMap(): Map<DialogId, DialogComponent> {
  // Use globalThis with string literal directly to avoid any initialization order issues
  const key = '__customDialogRegistryMap__';
  if (!(globalThis as any)[key]) {
    (globalThis as any)[key] = new Map<DialogId, DialogComponent>();
  }
  return (globalThis as any)[key] as Map<DialogId, DialogComponent>;
}

/**
 * Register a dialog component
 * Call this in your dialog component file to self-register
 *
 * @example
 * // In your dialog component file:
 * registerDialog({
 *   id: 'my-dialog',
 *   component: (props) => <MyDialog {...props} />
 * });
 */
export function registerDialog(registration: DialogRegistration): void {
  const map = getRegistryMap();
  if (map.has(registration.id)) {
    console.warn(`Dialog with id "${registration.id}" is already registered. Overwriting...`);
  }
  map.set(registration.id, registration.component);
}

/**
 * Get the combined dialog registry
 * This combines all registered dialogs into a single registry object
 */
function _getDialogRegistry(): DialogRegistry {
  return Object.fromEntries(getRegistryMap().entries());
}

/**
 * Check if a dialog is registered
 */
export function isDialogRegistered(id: DialogId): boolean {
  return getRegistryMap().has(id);
}

/**
 * Get all registered dialog IDs
 */
export function getRegisteredDialogIds(): DialogId[] {
  return Array.from(getRegistryMap().keys());
}

/**
 * Validate dialog registry and check for potential missing registrations
 * In development mode, this will scan dialog files and warn about unregistered dialogs
 */
export function validateDialogRegistry(): {
  registered: DialogId[];
  warnings: string[];
} {
  const registered = getRegisteredDialogIds();
  const warnings: string[] = [];

  if (import.meta.env.DEV) {
    // In development, check if we have any dialogs registered
    if (registered.length === 0) {
      warnings.push(
        '⚠️ No dialogs registered! Make sure your dialog files call registerDialog() and are in the correct directory.',
      );
    }

    // Check for common issues
    const dialogFiles = import.meta.glob('../components/dialogs/*.dialog.tsx', { eager: false });
    const dialogFileNames = Object.keys(dialogFiles);

    if (dialogFileNames.length > registered.length) {
      warnings.push(
        `⚠️ Found ${dialogFileNames.length} dialog files but only ${registered.length} are registered. Some dialogs may be missing registerDialog() calls.`,
      );
    }
  }

  return { registered, warnings };
}

/**
 * Auto-discover and import all dialog files
 * This automatically imports dialog files which triggers their self-registration
 *
 * Using Vite's import.meta.glob for automatic file discovery:
 * - Scans app/components/dialogs/*.dialog.tsx for dialog components
 *
 * IMPORTANT: We use eager: false and import them lazily to avoid initialization order issues.
 * Dialogs are imported when getDialogRegistry() is first called, ensuring the module is fully initialized.
 *
 * Files are automatically discovered - no manual imports needed!
 * Just create a dialog file with the .dialog.tsx extension and call registerDialog() - it will be available.
 */
let dialogFilesImported = false;

function importDialogFiles(): void {
  if (dialogFilesImported) return;
  dialogFilesImported = true;

  // Import dialog files from dialogs directory
  // Only files matching *.dialog.tsx pattern are imported (no manual filtering needed)
  // Note: import.meta.glob requires relative paths, not path aliases
  // Using eager: false to avoid initialization order issues
  const dialogModules = import.meta.glob('../components/dialogs/*.dialog.tsx', { eager: false });

  // Import all dialog files to trigger their self-registration
  Promise.all(Object.values(dialogModules).map((importFn) => importFn())).catch((error) => {
    console.error('Error importing dialog files:', error);
  });
}

/**
 * Get the combined dialog registry
 * This triggers lazy import of dialog files and returns the registry
 */
export function getDialogRegistry(): DialogRegistry {
  importDialogFiles();
  return _getDialogRegistry();
}
