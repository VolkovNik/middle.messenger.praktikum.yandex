import { HTTPTransport } from '@/utils/api';
import {
  addUserToChatRequestDataType,
  CreateChatRequestDataType, deleteUserFromChatRequestDataType,
  GetChatTokenRequestDataType, GetChatUsersRequestDataType,
} from '@/types/api';

export class ChatsApi {
  private readonly _chatsApiInstance;

  constructor() {
    this._chatsApiInstance = new HTTPTransport('/chats');
  }

  async getChats() {
    return this._chatsApiInstance.get('/');
  }

  async getChatToken({ id }: GetChatTokenRequestDataType) {
    return this._chatsApiInstance.post(`/token/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((data) => data);
  }

  async getChatUsers({ chatId }: GetChatUsersRequestDataType) {
    return this._chatsApiInstance.get(`/${chatId}/users`, {
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((data) => data);
  }

  async createChat(data: CreateChatRequestDataType) {
    return this._chatsApiInstance.post('/', {
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });
  }

  async addUserToChat(data: addUserToChatRequestDataType) {
    return this._chatsApiInstance.put('/users', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        users: [data.userId],
        chatId: data.chatId,
      },
    });
  }

  async deleteUserFromChat(data: deleteUserFromChatRequestDataType) {
    return this._chatsApiInstance.put('/users', {
      headers: {
        'Content-Type': 'application/json',
      },
      data: {
        users: [data.userId],
        chatId: data.chatId,
      },
    });
  }
}
