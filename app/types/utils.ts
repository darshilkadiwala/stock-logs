export type IdentityMapping<T extends string> = {
  [K in T]: { label: string; key: K };
};
