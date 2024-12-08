import { Nullable } from '@/types';
import { WSTransport } from '@/utils/wsTransport';
import { WS_BASE_URL } from '@/constants';
import { WSTransportEvents } from '@/types/websocket';
import { MessageType } from '@/types/store';
import { store } from '@/utils/store';

type ConnectPropsType = {
  token: string
  userId: number;
  chatId: number;
}
class MessagesControllerSingleTone {
  private websocket: Nullable<WSTransport> = null;

  async connect({ token, chatId, userId }: ConnectPropsType) {
    this.websocket = new WSTransport(
      `${WS_BASE_URL}/${userId}/${chatId}/${token}`,
    );

    await this.websocket.connect();

    this.websocket.on(
      WSTransportEvents.Message,
      (message: MessageType | Array<MessageType>) => {
        if (Array.isArray(message)) {
          store.set('messages', [...message, ...(store.getState().messages as Array<MessageType>)]);
        } else {
          store.set('messages', [message, ...(store.getState().messages as Array<MessageType>)]);
        }
      },
    );
  }

  getMessages() {
    if (!this.websocket) {
      throw new Error('Error: websocket is not connected');
    }
    store.set('messages', []);
    return this.websocket.send({ type: 'get old', content: '0' });
  }

  disconnect() {
    this.websocket?.close();
    store.set('messages', []);
  }

  sendMessage(message: string) {
    if (!this.websocket) {
      throw new Error('Error: websocket is not connected');
    }

    return this.websocket.send({ type: 'message', content: message });
  }
}

export const MessagesController = new MessagesControllerSingleTone();
