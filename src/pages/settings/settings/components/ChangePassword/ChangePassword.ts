import { Block, BlockPropsType } from '@/utils/block';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { INPUT_NAMES_ENUM, INPUT_VALIDATOR_MAP, validate } from '@/utils/validate';
import { UserController } from '@/controllers/UserController';

import { template } from './template';

import './ChangePassword.scss';

type ChangePasswordPropsType = {
  onSuccess: () => void;
};

export class ChangePassword extends Block {
  constructor(props: BlockPropsType & ChangePasswordPropsType) {
    const oldPasswordInput = new Input({
      type: 'password',
      placeholder: 'Старый пароль',
      id: 'change-password_old_password',
      name: 'password',
    });
    const newPasswordInput = new Input({
      type: 'password',
      placeholder: 'Новый пароль',
      id: 'change-password_new_password',
      name: 'password',
    });
    const repeatPasswordInput = new Input({
      type: 'password',
      placeholder: 'Повторите новый пароль',
      id: 'change-password_repeat_password',
      name: 'password',
    });

    let newPasswordInputValue = newPasswordInput.getContent()?.querySelector('input')?.value || '';
    let repeatPasswordInputValue = repeatPasswordInput.getContent()?.querySelector('input')?.value || '';
    let oldPasswordInputValue = oldPasswordInput.getContent()?.querySelector('input')?.value || '';

    const confirmButton = new Button({
      text: 'Сохранить',
      events: {
        click: (event) => {
          this.setProps({
            error: '',
          });
          event.preventDefault();

          const pageInputs = [
            oldPasswordInput,
            newPasswordInput,
            repeatPasswordInput,
          ];

          let isValidateSuccess = true;
          pageInputs.forEach((input) => {
            const inputValue = input.getContent()?.querySelector('input')?.value || '';
            const inputName = input.getContent()?.querySelector('input')?.name! as INPUT_NAMES_ENUM;

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

          newPasswordInputValue = newPasswordInput.getContent()?.querySelector('input')?.value || '';
          repeatPasswordInputValue = repeatPasswordInput.getContent()?.querySelector('input')?.value || '';
          oldPasswordInputValue = oldPasswordInput.getContent()?.querySelector('input')?.value || '';

          if (isValidateSuccess) {
            if (newPasswordInputValue !== repeatPasswordInputValue) {
              this.setProps({
                error: 'Пароли не совпадают',
              });
              return;
            }
            UserController.changePassword({
              oldPassword: oldPasswordInputValue,
              newPassword: newPasswordInputValue,
            }).then(() => {
              props.onSuccess();
            }).catch(() => {
              this.setProps({
                error: 'Не удалось изменить пароль',
              });
            });
          }
        },
      },
    });

    super({
      ...props,
      oldPasswordInput,
      newPasswordInput,
      repeatPasswordInput,
      confirmButton,
    });
  }

  render() {
    return this.compile(template, {});
  }
}
