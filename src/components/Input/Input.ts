import { Block } from '@/utils/block';
import { template } from './template';

export class Input extends Block {
  render() {
    return this.compile(template, {});
  }
}
