import { Indexed } from '@/types';
import { cloneDeep } from '@/utils/cloneDeep';

export const merge = (lhs: Indexed, rhs: Indexed): Indexed => {
  const result: Indexed = cloneDeep(lhs);
  const stack: Array<{ target: Indexed; source: Indexed }> = [{ target: result, source: rhs }];

  while (stack.length > 0) {
    const { target, source } = stack.pop()!;

    Object.keys(source).forEach((key) => {
      const sourceValue = source[key];
      const targetValue = target[key];

      if (
        typeof sourceValue === 'object'
        && sourceValue !== null
        && typeof targetValue === 'object'
        && targetValue !== null
      ) {
        if (!Object.prototype.hasOwnProperty.call(target, key)) {
          target[key] = {};
        }
        stack.push({
          target: target[key] as Indexed,
          source: sourceValue as Indexed,
        });
      } else {
        target[key] = sourceValue;
      }
    });
  }

  return result;
};
