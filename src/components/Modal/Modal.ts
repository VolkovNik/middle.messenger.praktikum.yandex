import { Block } from '@/utils/block';
import { template } from './template';

export class Modal extends Block {
  render() {
    return this.compile(template, {
      isOpen: false,
      events: {
        click: (event) => {
          if (this.element === event.target) {
            this.setProps({
              isOpen: false,
            });
          }
        },
      },
    });
  }
}
