import { Block, BlockPropsAndChildrenType } from '@/utils/block';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Link } from '@/components/Link';
import { INPUT_NAMES_ENUM, INPUT_VALIDATOR_MAP, validate } from '@/utils/validate';

import { template } from './template';

import '../authorization.scss';

export class SignupPage extends Block {
  constructor(props: BlockPropsAndChildrenType) {
    const loginInput = new Input('div', {
      id: 'authorization_input_login',
      placeholder: 'Логин',
      name: 'login',
    });

    const mailInput = new Input('div', {
      id: 'authorization_input_email',
      placeholder: 'Почта',
      name: 'email',
    });

    const firstNameInput = new Input('div', {
      id: 'authorization_input_first_name',
      placeholder: 'Имя',
      name: 'first_name',
    });

    const secondNameInput = new Input('div', {
      id: 'authorization_input_second_name',
      placeholder: 'Фамилия',
      name: 'second_name',
    });

    const telephoneNumberInput = new Input('div', {
      id: 'authorization_input_phone',
      placeholder: 'Телефон',
      name: 'phone',
    });

    const passwordInput = new Input('div', {
      id: 'authorization_input_password',
      placeholder: 'Пароль',
      name: 'password',
    });

    const repeatPasswordInput = new Input('div', {
      id: 'authorization_input_repeat_password',
      placeholder: 'Пароль (еще раз)',
      name: 'password',
    });

    const button = new Button('div', {
      type: 'submit',
      text: 'Зарегистрироваться',
      events: {
        click: (event) => {
          event.preventDefault();

          const pageInputs = [
            loginInput,
            passwordInput,
            mailInput,
            repeatPasswordInput,
            telephoneNumberInput,
            firstNameInput,
            secondNameInput,
          ];

          const formResult: Record<string, string> = {};
          pageInputs.forEach((input) => {
            const inputValue = input.getContent()?.querySelector('input')?.value || '';
            const inputName = input.getContent()?.querySelector('input')?.name! as INPUT_NAMES_ENUM;

            formResult[inputName] = inputValue;

            if (!validate(inputName, inputValue)) {
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

          // eslint-disable-next-line no-console
          console.log('input form result', formResult);
        },
      },
    });

    const link = new Link('div', {
      class: 'form__buttons_link',
      text: 'Войти',
      href: '/login',
    });

    super('main', {
      ...props,
      loginInput,
      passwordInput,
      mailInput,
      telephoneNumberInput,
      firstNameInput,
      secondNameInput,
      repeatPasswordInput,
      button,
      link,
    });
  }

  render() {
    return this.compile(template, {});
  }
}
