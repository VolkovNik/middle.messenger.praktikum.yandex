import { Block } from '@/utils/block';

import { template } from './template';

import './ChatUsers.scss';

export class ChatUsers extends Block {
  render() {
    return this.compile(template, {});
  }
}
