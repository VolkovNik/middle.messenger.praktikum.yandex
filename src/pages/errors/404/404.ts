import { Block, BlockPropsAndChildrenType } from '@/utils/block';
import { Link } from '@/components/Link';
import { router } from '@/utils/router';

import { template } from './template';

import '../errors.scss';

export class Page404 extends Block {
  constructor(props: BlockPropsAndChildrenType) {
    const link = new Link({
      text: 'Назад к чатам',
      events: {
        click: (event) => {
          event.preventDefault();
          router.go('/messenger');
        },
      },
    });

    super({
      ...props,
      link,
    });
  }

  render() {
    return this.compile(template, {});
  }
}
