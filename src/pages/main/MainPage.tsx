import { Block } from '@/utils/block';
import { template } from './template';

export class MainPage extends Block {
  render() {
    return this.compile(template, {});
  }
}
