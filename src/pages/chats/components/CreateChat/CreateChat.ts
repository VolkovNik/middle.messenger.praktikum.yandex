import { Block, BlockPropsType } from '@/utils/block';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { ChatsController } from '@/controllers/ChatsController';

import { template } from './template';

import './CreateChat.scss';

type CreateChatPropsType = {
  onSuccess: () => void;
};

export class CreateChat extends Block {
  constructor(props: BlockPropsType & CreateChatPropsType) {
    const chatNameInput = new Input({
      placeholder: 'Название чата',
      id: 'create_chat_input',
    });

    const confirmButton = new Button({
      text: 'Создать',
      events: {
        click: (event) => {
          this.setProps({
            error: '',
          });
          event.preventDefault();

          const chatNameInputValue = chatNameInput.getContent()?.querySelector('input')?.value || '';

          if (!chatNameInputValue) {
            this.setProps({
              error: 'Введите название чата',
            });
            return;
          }
          ChatsController.createChat({
            title: chatNameInputValue,
          }).then(() => {
            props.onSuccess();
            ChatsController.getChats();
          }).catch(() => {
            this.setProps({
              error: 'Не удалось создать чат',
            });
          });
        },
      },
    });

    super({
      ...props,
      chatNameInput,
      confirmButton,
    });
  }

  render() {
    return this.compile(template, {});
  }
}
