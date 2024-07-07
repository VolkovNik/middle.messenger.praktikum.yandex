import { Block } from '@/utils/block';
import { template } from './template';

export class ChatInput extends Block {
  render() {
    return this.compile(template, {});
  }
}
