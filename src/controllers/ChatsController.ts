import { ChatsApi } from '@/api/ChatsApi';
import { store } from '@/utils/store';
import { ChatType, UserType } from '@/types/store';
import { CreateChatRequestDataType, GetChatTokenResponseDataType } from '@/types/api';
import { MessagesController } from '@/controllers/MessagesController';

export class ChatsControllerSingleTone {
  private readonly _chatsApi: ChatsApi;

  constructor() {
    this._chatsApi = new ChatsApi();
  }

  public async getChats() {
    try {
      return await this._chatsApi.getChats().then((data) => store.set('chats', data));
    } catch (e) {
      console.error('Error: get chats failed');
      return Promise.reject(e);
    }
  }

  public selectCurrentChat(chat: ChatType) {
    const { currentChat, user } = store.getState();
    if (currentChat && (currentChat as ChatType).id === chat.id) {
      return;
    }
    if (currentChat && (currentChat as ChatType).id !== chat.id) {
      MessagesController.disconnect();
    }
    store.set('currentChat', chat);

    this._chatsApi.getChatToken({ id: chat.id }).then((data) => {
      MessagesController
        .connect({
          chatId: chat.id,
          userId: (user as UserType).id,
          token: (data as GetChatTokenResponseDataType).token,
        }).then(() => {
          MessagesController.getMessages();
        });
    });
  }

  public async createChat(data: CreateChatRequestDataType) {
    try {
      return await this._chatsApi.createChat(data).then(() => {
        this._chatsApi.getChats();
      });
    } catch (e) {
      console.error('Error: signup failed');
      return Promise.reject(e);
    }
  }

  public async addUserToChat(id: number) {
    try {
      const { currentChat } = store.getState();
      if (!currentChat) {
        console.error('Error: add user to chat failed');
        return Promise.reject();
      }
      return await this._chatsApi.addUserToChat({ userId: id, chatId: (currentChat as ChatType).id });
    } catch (e) {
      console.error('Error: add user to chat failed');
      return Promise.reject(e);
    }
  }

  public async deleteUserFromChat(id: number) {
    try {
      const { currentChat } = store.getState();
      if (!currentChat) {
        console.error('Error: delete user from chat failed');
        return Promise.reject();
      }
      return await this._chatsApi.deleteUserFromChat({ userId: id, chatId: (currentChat as ChatType).id });
    } catch (e) {
      console.error('Error: delete user from chat failed');
      return Promise.reject(e);
    }
  }

  public async getChatUsers() {
    try {
      const { currentChat } = store.getState();
      if (!currentChat) {
        console.error('Error: get users from chat failed');
        return Promise.reject();
      }
      return await this._chatsApi
        .getChatUsers({ chatId: (currentChat as ChatType).id })
        .then((data) => data);
    } catch (e) {
      console.error('Error: get users from chat failed');
      return Promise.reject(e);
    }
  }
}

export const ChatsController = new ChatsControllerSingleTone();
