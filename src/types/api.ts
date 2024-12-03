export type SignupRequestDataType = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export type UpdateSettingsDataType = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  display_name: string;
  phone: string;
}

export type ChangePasswordRequestDataType = {
  oldPassword: string;
  newPassword: string;
}

export type CreateChatRequestDataType = {
  title: string;
}

export type addUserToChatRequestDataType = {
  userId: number;
  chatId: number;
}

export type deleteUserFromChatRequestDataType = {
  userId: number;
  chatId: number;
}

export type GetChatUsersRequestDataType = {
  chatId: number;
}

export type GetChatTokenRequestDataType = {
  id: number;
}

export type GetChatTokenResponseDataType = {
  token: string;
}

export type ChangeAvatarRequestDataType = FormData

export type SigninRequestDataType = {
  login: string;
  password: string;
}
