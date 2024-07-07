import { Block } from '@/utils/block';
import { template } from './template';

export class Link extends Block {
  render() {
    return this.compile(template, {});
  }
}
