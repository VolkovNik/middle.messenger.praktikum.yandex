import { Block, BlockPropsType } from '@/utils/block';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { ChatsController } from '@/controllers/ChatsController';

import { template } from './template';

import './DeleteUserFromChat.scss';

type DeleteUserFromChatPropsType = {
  onSuccess: () => void;
};

export class DeleteUserFromChat extends Block {
  constructor(props: BlockPropsType & DeleteUserFromChatPropsType) {
    const userIdInput = new Input({
      placeholder: 'ID пользователя',
      id: 'delete_user_input',
    });

    const confirmButton = new Button({
      text: 'Удалить',
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
          ChatsController.deleteUserFromChat(Number(userIdInputValue))
            .then(() => {
              props.onSuccess();
            }).catch(() => {
              this.setProps({
                error: 'Не удалось удалить пользователя',
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
