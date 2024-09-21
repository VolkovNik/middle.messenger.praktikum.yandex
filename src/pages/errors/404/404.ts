import '../errors.scss';
import { Block, BlockPropsAndChildrenType } from '@/utils/block';
import { Link } from '@/components/Link';
import { template } from './template';

export class Page404 extends Block {
  constructor(props: BlockPropsAndChildrenType) {
    const link = new Link('div', {
      text: 'Назад к чатам',
    });

    super('main', {
      ...props,
      link,
    });
  }

  render() {
    return this.compile(template, {});
  }
}
