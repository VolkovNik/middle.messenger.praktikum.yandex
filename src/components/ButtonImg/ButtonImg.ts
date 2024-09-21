import { Block } from '@/utils/block';
import { template } from './template';

export class ButtonImg extends Block {
  render() {
    return this.compile(template, {});
  }
}
