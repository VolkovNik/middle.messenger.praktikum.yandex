export enum StoreEvents {
  Updated = 'updated',
}

export type UserType = {
  avatar: string;
  display_name: string;
  email: string;
  first_name: string;
  second_name: string;
  login: string;
  phone: string;
  name: string;
  id: number;
};

export type LastMessageType = {
  time: string;
  user: UserType;
  content: string;
}

export type ChatType = {
  id: number;
  title: string;
  avatar?: string;
  unread_count: number;
  last_message?: LastMessageType;
}

export type MessageType = {
  time: 'string',
  type: string,
  user_id: number,
  content: string,
}
