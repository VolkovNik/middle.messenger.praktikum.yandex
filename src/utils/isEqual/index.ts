import { PlainObject } from '@/types';

const isPlainObject = (value: unknown): value is PlainObject => typeof value === 'object'
    && value !== null
    && value.constructor === Object
    && Object.prototype.toString.call(value) === '[object Object]';

const isArray = (value: unknown): value is [] => Array.isArray(value);

export const isEqual = (lhs: PlainObject, rhs: PlainObject): boolean => {
  const stack: Array<[unknown, unknown]> = [[lhs, rhs]];

  while (stack.length > 0) {
    const [left, right] = stack.pop()!;

    if (isPlainObject(left) && isPlainObject(right)) {
      const leftKeys = Object.keys(left);
      const rightKeys = Object.keys(right);

      if (leftKeys.length !== rightKeys.length) {
        return false;
      }

      for (let i = 0; i < leftKeys.length; i += 1) {
        if (!rightKeys.includes(leftKeys[i])) {
          return false;
        }
        stack.push([left[leftKeys[i]], right[leftKeys[i]]]);
      }
    } else if (isArray(left) && isArray(right)) {
      if (left.length !== right.length) {
        return false;
      }

      for (let i = 0; i < left.length; i += 1) {
        stack.push([left[i], right[i]]);
      }
    } else if (left !== right) {
      return false;
    }
  }

  return true;
};
