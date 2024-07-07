import { Block, BlockPropsAndChildrenType } from '@/utils/block';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { Link } from '@/components/Link';
import { INPUT_NAMES_ENUM, INPUT_VALIDATOR_MAP, validate } from '@/utils/validate';
import { SendForm } from '@/pages/chats/components/SendForm';

import { template } from './template';

import './chats.scss';

export class ChatsPage extends Block {
  constructor(props: BlockPropsAndChildrenType) {
    const loginInput = new Input('div', {
      id: 'authorization_input_login',
      placeholder: 'Логин',
      name: 'login',
    });

    const passwordInput = new Input('div', {
      id: 'authorization_input_password',
      placeholder: 'Пароль',
      name: 'password',
    });

    const sendForm = new SendForm({});

    const button = new Button('div', {
      type: 'submit',
      text: 'Авторизоваться',
      events: {
        click: (event) => {
          event.preventDefault();

          const pageInputs = [loginInput, passwordInput];
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
      text: 'Профиль',
      href: '/settings',
    });

    super('main', {
      ...props,
      loginInput,
      passwordInput,
      button,
      link,
      sendForm,
    });
  }

  render() {
    return this.compile(template, {});
  }
}
