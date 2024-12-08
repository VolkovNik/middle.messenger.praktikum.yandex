import { Block, BlockPropsType } from '@/utils/block';
import { Modal } from '@/components/Modal';

import moreIcon from '@/assets/more.svg';

import { UserType } from '@/types/store';
import { ChatsController } from '@/controllers/ChatsController';
import { ChatViewDropdownItem } from './components/ChatViewDropdownItem';
import { AddUserToChat } from './components/AddUserToChat';
import { DeleteUserFromChat } from './components/DeleteUserFromChat';
import { ChatUsers } from './components/ChatUsers';

import { template } from './template';

import './ChatViewDropdown.scss';

export class ChatViewDropdown extends Block {
  constructor(props: BlockPropsType) {
    const addUserModal = new Modal({
      title: 'Добавить пользователя',
      children: new AddUserToChat({
        onSuccess: () => {
          addUserModal.setProps({
            isOpen: false,
          });
        },
      }),
    });

    const addUserDropdownItem = new ChatViewDropdownItem({
      text: 'Добавить пользователя',
      icon: '+',
      events: {
        click: (event) => {
          event.preventDefault();
          addUserModal.setProps({
            isOpen: true,
          });
        },
      },
    });

    const deleteUserModal = new Modal({
      title: 'Удалить пользователя',
      children: new DeleteUserFromChat({
        onSuccess: () => {
          deleteUserModal.setProps({
            isOpen: false,
          });
        },
      }),
    });

    const deleteUserDropdownItem = new ChatViewDropdownItem({
      text: 'Удалить пользователя',
      icon: 'х',
      events: {
        click: (event) => {
          event.preventDefault();
          deleteUserModal.setProps({
            isOpen: true,
          });
        },
      },
    });

    const chatUsersModalContent = new ChatUsers({});
    const chatUsersModal = new Modal({
      title: 'В данном чате присутствуют',
      children: chatUsersModalContent,
    });

    const chatUsersDropdownItem = new ChatViewDropdownItem({
      text: 'Пользователи чата',
      icon: '?',
      events: {
        click: (event) => {
          event.preventDefault();
          chatUsersModal.setProps({
            isOpen: true,
          });
          ChatsController.getChatUsers().then((data) => {
            const chatUsers = (data as Array<UserType>)
              .map((user) => user.login)
              .join(', ');
            chatUsersModalContent.setProps({
              chatUsers,
            });
          }).catch(() => {
            chatUsersModalContent.setProps({
              error: 'Не удалось получить список пользователй',
            });
          });
        },
      },
    });
    super({
      ...props,
      moreIcon,
      addUserDropdownItem,
      deleteUserDropdownItem,
      deleteUserModal,
      addUserModal,
      chatUsersModal,
      chatUsersDropdownItem,
    });
  }

  render() {
    return this.compile(template, {});
  }
}
