import { Block } from '@/utils/block';

import { template } from './template';

import './ChatViewDropdownItem.scss';

export class ChatViewDropdownItem extends Block {
  render() {
    return this.compile(template, {});
  }
}
