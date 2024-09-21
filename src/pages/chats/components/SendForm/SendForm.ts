import { Block, BlockPropsAndChildrenType } from '@/utils/block';
import { ButtonImg } from '@/components/ButtonImg';
import { ChatInput } from '@/components/ChatInput';

import { template } from './template';

import './SendForm.scss';

export class SendForm extends Block {
  constructor(props: BlockPropsAndChildrenType) {
    const input = new ChatInput('div', {
      id: 'message_send',
      name: 'message',
      placeholder: 'Сообщение',
    });

    const button = new ButtonImg('div', {
      alt: 'send',
      src: '../../assets/send.svg',
      events: {
        click: (event) => {
          event.preventDefault();

          const inputValue = input.getContent()?.querySelector('input')?.value || '';

          if (!inputValue) {
            input.setProps({
              error: 'Сообщение не может быть пустым',
              value: inputValue,
            });
          } else {
            input.setProps({
              error: '',
              value: inputValue,
            });

            // eslint-disable-next-line no-console
            console.log('input form result', { message: inputValue });
          }
        },
      },
    });

    super('main', {
      ...props,
      button,
      input,
    });
  }

  render() {
    return this.compile(template, {});
  }
}
