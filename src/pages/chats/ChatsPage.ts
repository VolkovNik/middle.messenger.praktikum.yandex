import { Block, BlockPropsType } from '@/utils/block';
import { connect } from '@/utils/connect';
import { Link } from '@/components/Link';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/Button';
import { ChatsController } from '@/controllers/ChatsController';
import { AuthController } from '@/controllers/AuthController';
import { ChatType } from '@/types/store';
import { isEqual } from '@/utils/isEqual';
import { router } from '@/utils/router';

import { ChatListItem } from './components/ChatListItem';
import { ChatView } from './components/ChatView';
import { CreateChat } from './components/CreateChat';

import { template } from './template';

import './chats.scss';

class ChatsPageContainer extends Block {
  constructor(props: BlockPropsType) {
    ChatsController.getChats();

    const link = new Link({
      text: 'Профиль',
      events: {
        click: (event: Event) => {
          event.preventDefault();
          router.go('/settings');
        },
      },
    });

    const createChatModal = new Modal({
      title: 'Создать чат',
      children: new CreateChat({
        onSuccess: () => {
          createChatModal.setProps({
            isOpen: false,
          });
        },
      }),
    });

    const createChatButton = new Button({
      text: 'Создать чат',
      events: {
        click: (event) => {
          event.preventDefault();
          createChatModal.setProps({
            isOpen: true,
          });
        },
      },
    });

    super({
      ...props,
      link,
      createChatButton,
      createChatModal,
    });
  }

  componentDidUpdate(oldProps: BlockPropsType, newProps: BlockPropsType): boolean {
    if (!isEqual(oldProps.chats as Array<ChatType>, newProps.chats as Array<ChatType>)) {
      const chatItems = (newProps.chats as Array<ChatType>).map((item) => new ChatListItem({
        ...item,
        events: {
          click: (event: Event) => {
            event.preventDefault();
            AuthController.getUserInfo().then(() => {
              ChatsController.selectCurrentChat(item);
            });
          },
        },
      }));
      this.setProps({ chatItems });
    }

    if (!isEqual(oldProps.currentChat as ChatType, newProps.currentChat as ChatType)) {
      const chatView = new ChatView({ chat: newProps.currentChat as ChatType });
      this.setProps({ chatView });
    }

    return super.componentDidUpdate(oldProps, newProps);
  }

  componentDidMount() {
    if (this.props.chats) {
      const chatItems = (this.props.chats as Array<ChatType>).map((item) => new ChatListItem({
        ...item,
        events: {
          click: (event: Event) => {
            event.preventDefault();
            AuthController.getUserInfo().then(() => {
              ChatsController.selectCurrentChat(item);
            });
          },
        },
      }));
      this.setProps({ chatItems });
    }

    if (this.props.currentChat) {
      const chatView = new ChatView({ chat: this.props.currentChat as ChatType });
      this.setProps({ chatView });
    }

    super.componentDidMount();
  }

  render() {
    return this.compile(template, {});
  }
}

export const ChatsPage = connect((state) => ({
  chats: state.chats || [],
  currentChat: state.currentChat,
}))(ChatsPageContainer);
