import { createContext, useCallback, useContext, useMemo, type ReactNode } from 'react';
import { useLocation } from 'react-router';

import type { LucideIcon } from 'lucide-react';

export interface NavigationItem extends NavigationBreadcrumbItem {
  children?: NavigationItem[];
}

export interface NavigationBreadcrumbItem {
  title: string;
  url: string;
  icon?: LucideIcon;
}

interface NavigationContextProps {
  items: NavigationItem[];
  activeUrl: string;
  activeItem: NavigationItem | null;
  currentPageTitle: string;
  breadcrumbs: NavigationBreadcrumbItem[];
  isActive: (url: string, parentUrl?: string) => boolean;
}

const NavigationContext = createContext<NavigationContextProps | null>(null);

function useNavigation() {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider.');
  }
  return context;
}

interface NavigationProviderProps {
  items: NavigationItem[];
  children: ReactNode;
}

// Helper function to resolve relative URLs to absolute paths
// For navigation items, relative URLs are resolved relative to root '/'
function resolveUrl(url: string, basePath: string = '/'): string {
  // If already absolute, return as is
  if (url.startsWith('/')) {
    return url;
  }
  // Resolve relative URL relative to base path
  const base = basePath === '/' ? '' : basePath.replace(/\/$/, '');
  const resolved = `${base}/${url}`.replace(/\/+/g, '/');
  return resolved;
}

function NavigationProvider({ items, children }: NavigationProviderProps) {
  const location = useLocation();
  const currentPath = location.pathname;

  // Build optimized Maps for O(1) lookups
  // This only depends on items, so it's memoized separately
  const navigationMaps = useMemo(() => {
    // Map from resolved URL to item
    const urlToItemMap = new Map<string, NavigationItem>();
    // Map from item to resolved URL
    const itemToUrlMap = new Map<NavigationItem, string>();
    // Map from child item to parent item
    const itemToParentMap = new Map<NavigationItem, NavigationItem>();

    const buildMaps = (items: NavigationItem[], parentUrl?: string, parentItem?: NavigationItem) => {
      for (const item of items) {
        const resolvedUrl = resolveUrl(item.url, parentUrl);

        // Store URL to item mapping
        urlToItemMap.set(resolvedUrl, item);
        // Store item to URL mapping
        itemToUrlMap.set(item, resolvedUrl);

        // If this item has a parent, store the parent relationship
        if (parentItem) {
          itemToParentMap.set(item, parentItem);
        }

        // If this item has children, recurse to build maps for children
        if (item.children && item.children.length > 0) {
          buildMaps(item.children, resolvedUrl, item);
        }
      }
    };

    buildMaps(items);

    return { urlToItemMap, itemToUrlMap, itemToParentMap };
  }, [items]);

  // Find the active item based on current path - O(1) lookup for exact match
  const activeItem = useMemo(() => {
    const { urlToItemMap } = navigationMaps;

    // First, try exact match - O(1)
    const exactMatch = urlToItemMap.get(currentPath);
    if (exactMatch) return exactMatch;

    // If no exact match, try to find the best match (longest matching path)
    // Optimize by finding the longest match in a single pass
    let bestMatch: NavigationItem | undefined;
    let bestMatchLength = 0;

    for (const [url, item] of urlToItemMap.entries()) {
      if (url !== '/' && currentPath.startsWith(url) && url.length > bestMatchLength) {
        bestMatch = item;
        bestMatchLength = url.length;
      }
    }

    return bestMatch || null;
  }, [navigationMaps, currentPath]);

  // Build breadcrumbs: find parent and child items - O(1) lookups
  const breadcrumbs = useMemo(() => {
    const result: NavigationBreadcrumbItem[] = [];

    if (!activeItem) return result;

    const { itemToUrlMap, itemToParentMap } = navigationMaps;

    // Get the active item's resolved URL - O(1)
    const activeResolvedUrl = itemToUrlMap.get(activeItem);

    if (!activeResolvedUrl) return result;

    // Check if active item has a parent - O(1)
    const parentItem = itemToParentMap.get(activeItem);

    if (parentItem) {
      // We have a parent, so add both parent and child to breadcrumbs
      const parentResolvedUrl = itemToUrlMap.get(parentItem);

      if (parentResolvedUrl) {
        result.push({ title: parentItem.title, url: parentResolvedUrl, icon: parentItem.icon });
      }

      result.push({ title: activeItem.title, url: activeResolvedUrl, icon: activeItem.icon });
    } else {
      // No parent found, just add the active item
      result.push({ title: activeItem.title, url: activeResolvedUrl, icon: activeItem.icon });
    }

    return result;
  }, [navigationMaps, activeItem]);

  const currentPageTitle = useMemo(() => {
    return activeItem?.title || 'Page';
  }, [activeItem]);

  const isActive = useCallback(
    (url: string, parentUrl?: string): boolean => {
      const resolvedUrl = resolveUrl(url, parentUrl || '/');

      if (resolvedUrl === currentPath) return true;
      // Also check if current path starts with this url (for nested routes)
      if (currentPath.startsWith(resolvedUrl) && resolvedUrl !== '/') return true;
      return false;
    },
    [currentPath],
  );

  const contextValue = useMemo<NavigationContextProps>(
    () => ({
      items,
      activeUrl: currentPath,
      activeItem,
      currentPageTitle,
      breadcrumbs,
      isActive,
    }),
    [items, currentPath, activeItem, currentPageTitle, breadcrumbs, isActive],
  );

  return <NavigationContext.Provider value={contextValue}>{children}</NavigationContext.Provider>;
}

export { NavigationProvider, useNavigation };
export type { NavigationContextProps, NavigationProviderProps };
