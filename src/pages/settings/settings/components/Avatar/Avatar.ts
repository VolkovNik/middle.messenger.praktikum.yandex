import { Block, BlockPropsType } from '@/utils/block';

import { Button } from '@/components/Button';
import { connect } from '@/utils/connect';
import { UserType } from '@/types/store';

import avatarEmpty from '@/assets/avatar-empty.svg';

import { template } from './template';

import './Avatar.scss';

class AvatarContainer extends Block {
  constructor(props: BlockPropsType) {
    const confirmButton = new Button({
      text: 'Сохранить',
      events: {
        click: (event) => {
          this.setProps({
            error: '',
          });
          event.preventDefault();
        },
      },
    });

    super({
      ...props,
      confirmButton,
    });
  }

  render() {
    return this.compile(template, {});
  }
}

export const Avatar = connect((state) => ({
  avatar: (state.user as UserType)?.avatar
    ? `https://ya-praktikum.tech/api/v2/resources/${(state.user as UserType)?.avatar}`
    : avatarEmpty,
}))(AvatarContainer);
