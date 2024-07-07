import '../errors.scss';
import { Block, BlockPropsAndChildrenType } from '@/utils/block';
import { Link } from '@/components/Link';
import { template } from './template';

export class ErrorPage extends Block {
  constructor(props: BlockPropsAndChildrenType) {
    const link = new Link('div', {
      text: 'Назад к чатам',
      href: '/chats',
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
