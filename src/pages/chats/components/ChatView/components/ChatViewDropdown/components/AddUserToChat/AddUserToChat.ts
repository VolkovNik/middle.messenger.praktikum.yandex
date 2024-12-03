import { Block, BlockPropsType } from '@/utils/block';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { ChatsController } from '@/controllers/ChatsController';

import { template } from './template';

import './AddUserToChat.scss';

type AddUserToChatPropsType = {
  onSuccess: () => void;
};

export class AddUserToChat extends Block {
  constructor(props: BlockPropsType & AddUserToChatPropsType) {
    const userIdInput = new Input({
      placeholder: 'ID пользователя',
      id: 'add_user_input',
    });

    const confirmButton = new Button({
      text: 'Добавить',
      events: {
        click: (event) => {
          this.setProps({
            error: '',
          });
          event.preventDefault();

          const userIdInputValue = userIdInput.getContent()?.querySelector('input')?.value || '';

          if (!userIdInput) {
            this.setProps({
              error: 'Введите id пользователя',
            });
            return;
          }
          ChatsController.addUserToChat(Number(userIdInputValue))
            .then(() => {
              props.onSuccess();
            }).catch(() => {
              this.setProps({
                error: 'Не удалось добавить пользователя',
              });
            });
        },
      },
    });

    super({
      ...props,
      userIdInput,
      confirmButton,
    });
  }

  render() {
    return this.compile(template, {});
  }
}
