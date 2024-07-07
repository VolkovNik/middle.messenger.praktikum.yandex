import '../settings.scss';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';

import { INPUT_NAMES_ENUM, INPUT_VALIDATOR_MAP, validate } from '@/utils/validate';
import { Block, BlockPropsAndChildrenType } from '@/utils/block';

import { template } from './template';

export class UpdateSettingsPage extends Block {
  constructor(props: BlockPropsAndChildrenType) {
    const loginInput = new Input('div', {
      id: 'settings_input_login',
      name: 'login',
      value: 'HukumkaBanana',
    });

    const mailInput = new Input('div', {
      id: 'settings_input_email',
      name: 'email',
      value: 'nikitavolkov1707@gmail.com',
    });

    const firstNameInput = new Input('div', {
      id: 'settings_input_first_name',
      value: 'Никита',
      name: 'first_name',
    });

    const secondNameInput = new Input('div', {
      id: 'settings_input_second_name',
      value: 'Волков',
      name: 'second_name',
    });

    const telephoneNumberInput = new Input('div', {
      id: 'settings_input_phone',
      value: '923123123',
      name: 'phone',
    });

    const saveChangesButton = new Button('div', {
      text: 'Сохранить',
      events: {
        click: (event) => {
          event.preventDefault();

          const pageInputs = [
            loginInput,
            mailInput,
            telephoneNumberInput,
            firstNameInput,
            secondNameInput,
          ];

          const formResult: Record<string, string> = {};
          pageInputs.forEach((input) => {
            const inputValue = input.getContent()?.querySelector('input')?.value || '';
            const inputName = input.getContent()?.querySelector('input')?.name! as INPUT_NAMES_ENUM;

            formResult[inputName] = inputValue;

            // eslint-disable-next-line no-console
            console.log(inputValue, inputName, input.getContent()?.querySelector('input'));

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

    super('main', {
      ...props,
      saveChangesButton,
      mailInput,
      loginInput,
      firstNameInput,
      secondNameInput,
      telephoneNumberInput,
    });
  }

  render() {
    return this.compile(template, {});
  }
}
