import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { ButtonImg } from '@/components/ButtonImg';
import { AuthController } from '@/controllers/AuthController';
import { UserController } from '@/controllers/UserController';

import { connect } from '@/utils/connect';
import { INPUT_NAMES_ENUM, INPUT_VALIDATOR_MAP, validate } from '@/utils/validate';
import { Block, BlockPropsAndChildrenType } from '@/utils/block';
import { router } from '@/utils/router';

import { UserType } from '@/types/store';

import backIcon from '@/assets/icon-back.svg';

import { template } from './template';

import '../settings.scss';

export class UpdateSettingsPage extends Block {
  constructor(props: BlockPropsAndChildrenType) {
    AuthController.getUserInfo();

    const loginInput = new (connect((state) => ({
      value: (state.user as UserType)?.login || '',
    }))(Input))({
      id: 'settings_input_login',
      name: 'login',
    });

    const mailInput = new (connect((state) => ({
      value: (state.user as UserType)?.email || '',
    }))(Input))({
      id: 'settings_input_email',
      name: 'email',
    });

    const firstNameInput = new (connect((state) => ({
      value: (state.user as UserType)?.first_name || '',
    }))(Input))({
      id: 'settings_input_first_name',
      name: 'first_name',
    });

    const secondNameInput = new (connect((state) => ({
      value: (state.user as UserType)?.second_name || '',
    }))(Input))({
      id: 'settings_input_second_name',
      name: 'second_name',
    });

    const telephoneNumberInput = new (connect((state) => ({
      value: (state.user as UserType)?.phone || '',
    }))(Input))({
      id: 'settings_input_phone',
      name: 'phone',
    });

    const displayNameInput = new (connect((state) => ({
      value: (state.user as UserType)?.display_name || '',
    }))(Input))({
      id: 'settings_input_display_name',
      name: 'display_name',
    });

    const saveChangesButton = new Button({
      text: 'Сохранить',
      events: {
        click: (event) => {
          event.preventDefault();
          this.setProps({
            error: '',
          });

          const pageInputs = [
            loginInput,
            mailInput,
            telephoneNumberInput,
            firstNameInput,
            secondNameInput,
            displayNameInput,
          ];

          const formResult: Record<string, string> = {};
          let isValidateSuccess = true;
          pageInputs.forEach((input) => {
            const inputValue = input.getContent()?.querySelector('input')?.value || '';
            const inputName = input.getContent()?.querySelector('input')?.name! as INPUT_NAMES_ENUM;

            formResult[inputName] = inputValue;

            if (!validate(inputName, inputValue)) {
              isValidateSuccess = false;
              input.setProps({
                error: INPUT_VALIDATOR_MAP[inputName].error,
                value: inputValue,
              });
            } else {
              input.setProps({
                error: '',
                value: inputValue,
              });
            }
          });

          if (isValidateSuccess) {
            UserController.updateSettings({
              display_name: displayNameInput.getContent()?.querySelector('input')?.value || '',
              email: mailInput.getContent()?.querySelector('input')?.value || '',
              first_name: firstNameInput.getContent()?.querySelector('input')?.value || '',
              login: loginInput.getContent()?.querySelector('input')?.value || '',
              phone: telephoneNumberInput.getContent()?.querySelector('input')?.value || '',
              second_name: secondNameInput.getContent()?.querySelector('input')?.value || '',
            }).catch(() => {
              this.setProps({
                error: 'Не удалось обновить данные',
              });
            });
          }
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
      saveChangesButton,
      mailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      telephoneNumberInput,
      displayNameInput,
      returnButton,
    });
  }

  render() {
    return this.compile(template, {});
  }
}
