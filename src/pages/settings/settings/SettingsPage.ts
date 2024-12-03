import { Block, BlockPropsAndChildrenType } from '@/utils/block';
import { ButtonOutline } from '@/components/ButtonOutline';
import { connect } from '@/utils/connect';
import { UserType } from '@/types/store';
import { AuthController } from '@/controllers/AuthController';
import { Modal } from '@/components/Modal';
import { ButtonImg } from '@/components/ButtonImg';
import { router } from '@/utils/router';

import backIcon from '@/assets/icon-back.svg';

import { ChangePassword } from './components/ChangePassword';
import { Avatar } from './components/Avatar';
import { ChangeAvatar } from './components/ChangeAvatar';

import { template } from './template';

import '../settings.scss';

class SettingsPageContainer extends Block {
  constructor(props: BlockPropsAndChildrenType) {
    AuthController.getUserInfo();
    const navigateToUpdateSettingButton = new ButtonOutline({
      text: 'Изменить данные',
      events: {
        click: () => {
          router.go('/update-settings');
        },
      },
    });

    const exitButton = new ButtonOutline({
      text: 'Выйти',
      class: 'settings-page__footer_item-red',
      events: {
        click: (event) => {
          event.preventDefault();
          AuthController.logout();
          router.go('/');
        },
      },
    });

    const changePasswordModal = new Modal({
      title: 'Сменить пароль',
      children: new ChangePassword({
        onSuccess: () => {
          changePasswordModal.setProps({
            isOpen: false,
          });
        },
      }),
    });

    const navigateToUpdatePasswordButton = new ButtonOutline({
      text: 'Изменить пароль',
      events: {
        click: (event) => {
          event.preventDefault();
          changePasswordModal.setProps({
            isOpen: true,
          });
        },
      },
    });

    const changeAvatarModal = new Modal({
      title: 'Загрузите файл',
      children: new ChangeAvatar({
        onSuccess: () => {
          changeAvatarModal.setProps({
            isOpen: false,
          });
        },
      }),
    });

    const avatar = new Avatar({
      events: {
        click: () => {
          changeAvatarModal.setProps({
            isOpen: true,
          });
        },
      },
    });

    const returnButton = new ButtonImg({
      alt: 'back',
      src: backIcon,
      events: {
        click: (event) => {
          event.preventDefault();
          router.back();
        },
      },
    });

    super({
      ...props,
      navigateToUpdateSettingButton,
      navigateToUpdatePasswordButton,
      changePasswordModal,
      exitButton,
      avatar,
      changeAvatarModal,
      returnButton,
    });
  }

  render() {
    return this.compile(template, {});
  }
}

export const SettingsPage = connect((state) => ({
  first_name: (state.user as UserType)?.first_name || '',
  email: (state.user as UserType)?.email || '-',
  login: (state.user as UserType)?.login || '',
  second_name: (state.user as UserType)?.second_name || '-',
  display_name: (state.user as UserType)?.display_name || '-',
  phone: (state.user as UserType)?.phone || '-',
}))(SettingsPageContainer);
