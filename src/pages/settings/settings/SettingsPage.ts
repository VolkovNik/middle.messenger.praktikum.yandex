import '../settings.scss';
import { Block, BlockPropsAndChildrenType } from '@/utils/block';

import { ButtonOutline } from '@/components/ButtonOutline';
import { template } from './template';

export class SettingsPage extends Block {
  constructor(props: BlockPropsAndChildrenType) {
    const navigateToUpdateSettingButton = new ButtonOutline('div', {
      text: 'Изменить данные',
    });

    const navigateToUpdatePasswordButton = new ButtonOutline('div', {
      text: 'Изменить пароль',
    });

    const exitButton = new ButtonOutline('div', {
      text: 'Выйти',
      class: 'settings-page__footer_item-red',
    });

    super('main', {
      ...props,
      navigateToUpdateSettingButton,
      navigateToUpdatePasswordButton,
      exitButton,
    });
  }

  render() {
    return this.compile(template, {});
  }
}
