import {
  ChangeAvatarRequestDataType,
  ChangePasswordRequestDataType,
  UpdateSettingsDataType,
} from '@/types/api';
import { UserApi } from '@/api/UserApi';
import { store } from '@/utils/store';

export class UserControllerSingleTone {
  private readonly _userApi: UserApi;

  constructor() {
    this._userApi = new UserApi();
  }

  public async changePassword(data: ChangePasswordRequestDataType) {
    try {
      return await this._userApi.changePassword(data);
    } catch (e) {
      console.error('Error: change password failed');
      return Promise.reject(e);
    }
  }

  public async changeAvatar(data: ChangeAvatarRequestDataType) {
    try {
      return await this._userApi.changeAvatar(data).then((data) => store.set('user', data));
    } catch (e) {
      console.error('Error: change avatar failed');
      return Promise.reject(e);
    }
  }

  public async updateSettings(data: UpdateSettingsDataType) {
    try {
      return await this._userApi.updateSettings(data);
    } catch (e) {
      console.error('Error: update settings failed');
      return Promise.reject(e);
    }
  }
}

export const UserController = new UserControllerSingleTone();
