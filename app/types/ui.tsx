import type { ReactNode } from 'react';

import type { ClassValue } from 'clsx';

/**
 * A utility type for components that accept a `className` prop.
 *
 * @template T The name of the className prop (default is 'className').
 *
 * @example
 * const Component: FC<WithClassName> = ({ className }) => (
 *   <div className={clsx(className)}>Hello</div>
 * );
 */
export type WithClassName<T extends string = 'className'> = Partial<Record<T, ClassValue>>;

/**
 * A utility type for components that accept a `children` prop.
 *
 * @template T The type of the children.
 *
 * @example
 * const Box: FC<WithChildren> = ({ children }) => <div>{children}</div>;
 */
export interface WithChildren<T extends ReactNode = ReactNode> {
  /**
   * The content to render inside the component.
   */
  children?: T;
}

/**
 * A utility type for components that accept a `render` prop.
 *
 * @template T The render function signature.
 *
 * @example
 * interface Props extends WithRender<() => ReactNode> {}
 */
export interface WithRender<T> {
  /**
   * A function that returns renderable content.
   */
  render?: T;
}

/**
 * A utility type for components that accept an `extra` prop,
 * usually for rendering additional UI elements.
 *
 * @example
 * const Card: FC<WithExtra> = ({ extra }) => (
 *   <div>
 *     <div>Main content</div>
 *     <div>{extra}</div>
 *   </div>
 * );
 */
export interface WithExtra {
  /**
   * Additional UI content, e.g., a badge, link, or action button.
   */
  extra?: ReactNode;
}
