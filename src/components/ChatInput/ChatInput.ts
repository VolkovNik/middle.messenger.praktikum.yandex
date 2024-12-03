import { Block } from '@/utils/block';

import { template } from './template';

import './ChatInput.scss';

export class ChatInput extends Block {
  render() {
    return this.compile(template, {});
  }
}
