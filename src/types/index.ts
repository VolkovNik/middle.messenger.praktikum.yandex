export type Nullable<T> = T | null;

export type Indexed<T = any> = {
  [key in string]: T;
};

export type PlainObject<T = any> = {
  [k in string]: T;
};
