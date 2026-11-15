export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]> } : T;
export type Brand<T, B> = T & { readonly __brand: B };

export type UUID = Brand<string, 'UUID'>;
export type Timestamp = Brand<string, 'ISO8601'>;
