import { Nullable } from '@/types';
import { Block } from '../block';

export const renderDOM = (query: string, block: Block): Nullable<Element> => {
  const root = document.querySelector(query);

  if (!root) {
    return root;
  }

  root.innerHTML = '';
  root.appendChild(block.getContent() as HTMLElement);

  block.dispatchComponentDidMount();

  return root;
};
