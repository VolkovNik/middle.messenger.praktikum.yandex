export enum INPUT_NAMES_ENUM {
  INPUT_LOGIN = 'login',
  INPUT_PASSWORD = 'password',
  INPUT_EMAIL = 'email',
  INPUT_PHONE = 'phone',
  INPUT_FIRST_NAME = 'first_name',
  INPUT_SECOND_NAME = 'second_name',
}

export type InputValidatorMapValueType = {
  error: string,
  regex: RegExp
}

export type InputValidatorMapType = Record<INPUT_NAMES_ENUM, InputValidatorMapValueType>

export const INPUT_VALIDATOR_MAP: InputValidatorMapType = {
  [INPUT_NAMES_ENUM.INPUT_LOGIN]: {
    error: 'Логин должен начинаться с латинской буквы, может содержать только латинские '
      + 'буквы, цифры, _ или -. Длина должна быть от 3 до 20 символов',
    regex: /^[a-zA-Z][a-zA-Z0-9-_]{2,19}$/,
  },
  [INPUT_NAMES_ENUM.INPUT_PASSWORD]: {
    error: 'Пароль должен содержать от 8 до 40 символов, обязательно хотя бы одна заглавная буква и цифра',
    regex: /^(?=.*[A-Z])(?=.*\d).{8,40}$/,
  },
  [INPUT_NAMES_ENUM.INPUT_EMAIL]: {
    error: 'Неправильный почтовый адрес',
    regex: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+$/,
  },
  [INPUT_NAMES_ENUM.INPUT_PHONE]: {
    error: 'Номер должен быть от 10 до 15 символов, состоит из цифр, может начинается с плюса',
    regex: /^\+?\d{10,15}$/,
  },
  [INPUT_NAMES_ENUM.INPUT_FIRST_NAME]: {
    error: 'Имя - латиница или кириллица, первая буква должна быть заглавной,'
      + ' без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
    regex: /^[А-ЯA-Z][а-яa-z]*-?[А-ЯA-Z]?[а-яa-z]*$/,
  },
  [INPUT_NAMES_ENUM.INPUT_SECOND_NAME]: {
    error: 'Фамилия - латиница или кириллица, первая буква должна быть заглавной,'
      + ' без пробелов и без цифр, нет спецсимволов (допустим только дефис)',
    regex: /^[А-ЯA-Z][а-яa-z]*-?[А-ЯA-Z]?[а-яa-z]*$/,
  },
};

export const validate = (inputName: INPUT_NAMES_ENUM, inputValue: string): boolean => (
  INPUT_VALIDATOR_MAP[inputName].regex.test(inputValue)
);
