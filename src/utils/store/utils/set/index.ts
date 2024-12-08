import { merge } from '@/utils/merge';
import { Indexed } from '@/types';

export const set = (object: Indexed, path: string, value: unknown): Indexed => {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  const result = path.split('.').reduceRight<Indexed>((acc, key) => ({
    [key]: acc,
  }), value as any);
  return merge(object, result);
};
