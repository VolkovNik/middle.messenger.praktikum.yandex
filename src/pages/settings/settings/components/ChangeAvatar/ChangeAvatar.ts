import { Block, BlockPropsType } from '@/utils/block';

import { Button } from '@/components/Button';
import { UserController } from '@/controllers/UserController';

import { AvatarInput } from './components/AvatarInput';

import { template } from './template';

import './ChangeAvatar.scss';

type ChangeAvatarPropsType = {
  onSuccess: () => void;
};

export class ChangeAvatar extends Block {
  constructor(props: BlockPropsType & ChangeAvatarPropsType) {
    let avatarFile: File | undefined;
    const avatarInput = new AvatarInput({
      onChange: (file) => {
        this.setProps({
          avatarName: file.name,
        });
        avatarFile = file;
      },
    });

    const confirmButton = new Button({
      text: 'Поменять',
      events: {
        click: (event) => {
          event.preventDefault();
          this.setProps({
            error: '',
          });
          if (avatarFile) {
            const avatar = new FormData();
            avatar.append('avatar', avatarFile);
            UserController.changeAvatar(avatar).then(() => {
              props.onSuccess();
              this.setProps({
                avatarName: '',
              });
            }).catch(() => {
              this.setProps({
                error: 'Ошибка, попробуйте ещё раз',
              });
            });
          } else {
            this.setProps({
              error: 'Нужно выбрать файл',
            });
          }
        },
      },
    });

    super({
      ...props,
      confirmButton,
      avatarInput,
    });
  }

  render() {
    return this.compile(template, {});
  }
}
