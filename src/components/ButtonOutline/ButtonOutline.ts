import { Block } from '@/utils/block';
import { template } from './template';

export class ButtonOutline extends Block {
  render() {
    return this.compile(template, {});
  }
}
