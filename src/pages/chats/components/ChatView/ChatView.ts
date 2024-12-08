import { Block, BlockPropsType } from '@/utils/block';
import { connect } from '@/utils/connect';
import { ChatType, MessageType, UserType } from '@/types/store';
import { isEqual } from '@/utils/isEqual';
import { getInitials } from '@/utils/getInitials';

import { SendForm } from './components/SendForm';
import { Message } from './components/Message';
import { ChatViewDropdown } from './components/ChatViewDropdown';

import { template } from './template';

import './ChatView.scss';

type ChatViewProps = {
  chat: ChatType;
}

class ChatViewController extends Block {
  constructor(props: BlockPropsType & ChatViewProps) {
    const sendForm = new SendForm({});

    const chatViewDropdown = new ChatViewDropdown({});

    const avatarStub = getInitials((props.currentChat as ChatType).title);

    super({
      ...props,
      sendForm,
      title: props.chat.title,
      chatViewDropdown,
      avatarStub,
    });
  }

  componentDidUpdate(oldProps: BlockPropsType, newProps: BlockPropsType): boolean {
    if (!isEqual(
      oldProps.messages as Array<MessageType>,
      newProps.messages as Array<MessageType>,
    )) {
      const messages = (newProps.messages as Array<MessageType>)
        .map((item) => new Message({
          ...item,
          isMine: this.props.userId === item.user_id,
        }));

      this.setProps({ messages });
    }

    return super.componentDidUpdate(oldProps, newProps);
  }

  componentDidMount() {
    if (this.props.messages) {
      const messages = (this.props.messages as Array<MessageType>)
        .map((item) => new Message({
          ...item,
          isMine: this.props.userId === item.user_id,
        }));

      this.setProps({ messages });
    }
    super.componentDidMount();
  }

  render() {
    return this.compile(template, {});
  }
}

export const ChatView = connect((state) => ({
  messages: state.messages || [],
  userId: (state.user as UserType)?.id || -1,
  currentChat: state.currentChat,
}))(ChatViewController);
