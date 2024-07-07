import { Block } from '@/utils/block';
import { template } from './template';

export class Button extends Block {
  render() {
    return this.compile(template, {});
  }
}
