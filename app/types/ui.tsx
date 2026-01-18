import type { ReactElement, ReactNode } from 'react';

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

/**
 * A base type for any option-like item with a label and a value.
 *
 * @template V The type of the value (default is string).
 *
 * @example
 * const option: LabelValueOption = { label: 'Admin', value: 'admin' };
 */
export interface LabelValueOption<V = string> {
  /**
   * The visible label (can be text or a React node).
   */
  label?: ReactNode;
  /**
   * The actual value of the option (e.g., string, number, enum).
   */
  value: V;
}

/**
 * A full option type used for menus, dropdowns, and command palettes.
 * Includes optional leading and trailing nodes for icons, badges, shortcuts, etc.
 *
 * @template V The type of the option's value.
 *
 * @example
 * const option: Option = {
 *   label: 'Settings',
 *   value: 'settings',
 *   leading: <SettingsIcon />,
 *   trailing: <kbd>⌘S</kbd>,
 * };
 */
export interface Option<V = string> extends LabelValueOption<V> {
  /**
   * Content shown before the label, such as an icon, avatar, etc.
   * - Want to send numbers here? convert them to strings.
   */
  leading?: ReactElement | string;
  /**
   * Content shown after the label, such as a keyboard shortcut, badge, icons, or status dot, etc.
   * - Want to send numbers here? convert them to strings.
   */
  trailing?: ReactElement | string;
}

/* ================================= DIALOG TYPES ================================= */

/**
 * Dialog configuration types
 */
export type DialogId = string;

export interface DialogOptions {
  /**
   * Whether the dialog can be closed by clicking outside or pressing ESC
   * @default true
   */
  dismissible?: boolean;
  /**
   * Whether to show the close button
   * @default true
   */
  showCloseButton?: boolean;
  /**
   * Custom className for the dialog content
   */
  className?: string;
  /**
   * Callback when dialog is closed
   */
  onClose?: () => void;
  /**
   * Callback when dialog is opened
   */
  onOpen?: () => void;
}

export interface DialogProps {
  id: DialogId;
  isOpen: boolean;
  onClose: () => void;
  data?: any;
}

export type DialogComponent = (props: DialogProps) => ReactNode;

/**
 * Dialog registry type
 * Maps dialog IDs to component functions that receive DialogProps
 */
export type DialogRegistry = Record<DialogId, DialogComponent>;
