import { Block, BlockPropsType } from '@/utils/block';
import { ChatType } from '@/types/store';
import { getInitials } from '@/utils/getInitials';
import { getTime } from '@/utils/getTime';

import { template } from './template';

import './ChatListItem.scss';

export class ChatListItem extends Block {
  constructor(props: BlockPropsType & ChatType) {
    const avatarStub = getInitials(props.title);
    super({
      ...props,
      avatarStub,
      time: props.last_message ? getTime(props.last_message.time) : null,
      message: props.last_message ? props.last_message.content : null,
    });
  }

  render() {
    return this.compile(template, {});
  }
}
