import type { ReactNode } from "react";

/**
 * @name LayoutParams
 *
 * @usage
 * In NextJS, params can be defined also in the layout.
 *
 * For an example, this file `/app/users/[userId]/layout.tsx` will have the following params:
 *
 * ```tsx
 * export default function Layout(params: LayoutParams<{ userId: string }>) {
 *   ...
 * }
 * ```
 */
export type LayoutParams<T extends Record<string, string> = {}> = {
  params: T;
  children?: ReactNode | undefined;
};