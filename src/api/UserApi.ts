import { HTTPTransport } from '@/utils/api';
import {
  ChangeAvatarRequestDataType,
  ChangePasswordRequestDataType,
  UpdateSettingsDataType,
} from '@/types/api';

export class UserApi {
  private readonly _userApiInstance;

  constructor() {
    this._userApiInstance = new HTTPTransport('/user');
  }

  async changePassword(data: ChangePasswordRequestDataType) {
    return this._userApiInstance.put('/password', {
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });
  }

  async updateSettings(data: UpdateSettingsDataType) {
    return this._userApiInstance.put('/profile', {
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });
  }

  async changeAvatar(data: ChangeAvatarRequestDataType) {
    return this._userApiInstance.put('/profile/avatar', {
      data,
    });
  }
}
