import { Block, BlockPropsAndChildrenType } from '@/utils/block';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Link } from '@/components/Link';
import { INPUT_NAMES_ENUM, INPUT_VALIDATOR_MAP, validate } from '@/utils/validate';
import { AuthController } from '@/controllers/AuthController';
import { SigninRequestDataType } from '@/types/api';
import { router } from '@/utils/router';

import { template } from './template';

import '../authorization.scss';

export class LoginPage extends Block {
  constructor(props: BlockPropsAndChildrenType) {
    const loginInput = new Input({
      id: 'authorization_input_login',
      placeholder: 'Логин',
      name: 'login',
    });

    const passwordInput = new Input({
      id: 'authorization_input_password',
      placeholder: 'Пароль',
      name: 'password',
    });

    const button = new Button({
      text: 'Авторизоваться',
      events: {
        click: (event) => {
          this.setProps({
            error: '',
          });
          event.preventDefault();

          const pageInputs = [loginInput, passwordInput];
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
            AuthController.signin(formResult as SigninRequestDataType).then(() => {
              this.setProps({
                error: '',
              });
              router.go('/messenger');
            }).catch(() => {
              this.setProps({
                error: 'Неправильный логин или пароль',
              });
            });
          }
        },
      },
    });

    const link = new Link({
      class: 'form__buttons_link',
      text: 'Нет аккаунта?',
      href: '/signup',
      events: {
        click: (event) => {
          event.preventDefault();
          router.go('/sign-up');
        },
      },
    });

    super({
      ...props,
      loginInput,
      passwordInput,
      button,
      link,
    });
  }

  render() {
    return this.compile(template, {});
  }
}
