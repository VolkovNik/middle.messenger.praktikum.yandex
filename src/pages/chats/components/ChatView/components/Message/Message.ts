import { Block, BlockPropsType } from '@/utils/block';
import { getTime } from '@/utils/getTime';
import { MessageType } from '@/types/store';

import { template } from './template';

import './Message.scss';

type MessagePropsType = {
  isMine: boolean;
} & MessageType;

export class Message extends Block {
  constructor(props: BlockPropsType & MessagePropsType) {
    const time = getTime(props.time);

    super({
      ...props,
      time,
    });
  }

  render() {
    return this.compile(template, {});
  }
}
