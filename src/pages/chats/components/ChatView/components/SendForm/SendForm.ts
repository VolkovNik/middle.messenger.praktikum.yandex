import { Block, BlockPropsAndChildrenType } from '@/utils/block';
import { ButtonImg } from '@/components/ButtonImg';
import { ChatInput } from '@/components/ChatInput';
import { MessagesController } from '@/controllers/MessagesController';

import sendIcon from '@/assets/send.svg';

import { template } from './template';
import './SendForm.scss';

export class SendForm extends Block {
  constructor(props: BlockPropsAndChildrenType) {
    const input = new ChatInput({
      id: 'message_send',
      name: 'message',
      placeholder: 'Сообщение',
    });

    const button = new ButtonImg({
      alt: 'send',
      src: sendIcon,
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
              value: '',
            });

            MessagesController.sendMessage(inputValue);
          }
        },
      },
    });

    super({
      ...props,
      button,
      input,
    });
  }

  render() {
    return this.compile(template, {});
  }
}
