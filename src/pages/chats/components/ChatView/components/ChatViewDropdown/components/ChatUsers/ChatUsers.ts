import { Block, BlockPropsType } from '@/utils/block';
import { ChatsController } from '@/controllers/ChatsController';
import { UserType } from '@/types/store';

import { template } from './template';

import './ChatUsers.scss';

export class ChatUsers extends Block {
  constructor(props: BlockPropsType) {
    ChatsController.getChatUsers().then((data) => {
      const chatUsers = (data as Array<UserType>).map((user) => user.login);
      this.setProps({
        chatUsers,
      });
    }).catch(() => {
      this.setProps({
        error: 'Не удалось получить список пользователй',
      });
    });

    super({
      ...props,
    });
  }

  render() {
    return this.compile(template, {});
  }
}
