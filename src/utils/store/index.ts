import { Indexed } from '@/types';
import { EventBus } from '@/utils/eventBus';
import { StoreEvents } from '@/types/store';

import { set } from './utils/set';

type StateType = Indexed<unknown>;

class Store extends EventBus {
  private _state: StateType = {
    user: {
      avatar: '',
      display_name: '',
      email: '',
      first_name: '',
      login: '',
      phone: '',
      name: '',
    },
    chats: [],
    currentChat: null,
    messages: [],
  };

  public getState() {
    return this._state;
  }

  public set(path: string, value: unknown) {
    if (Array.isArray(value) && !value.length) {
      this._state[path] = [];
    } else {
      this._state = set(this._state, path, value);
    }
    this.emit(StoreEvents.Updated);
  }
}

export const store = new Store();
