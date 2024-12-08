import { SigninRequestDataType, SignupRequestDataType } from '@/types/api';
import { AuthApi } from '@/api/AuthApi';
import { store } from '@/utils/store';

export class AuthControllerSingleTone {
  private readonly _authApi: AuthApi;

  constructor() {
    this._authApi = new AuthApi();
  }

  public async signup(data: SignupRequestDataType) {
    try {
      return await this._authApi.signup(data);
    } catch (e) {
      console.error('Error: signup failed');
      return Promise.reject(e);
    }
  }

  public async getUserInfo() {
    try {
      return await this._authApi.user().then((data) => store.set('user', data));
    } catch (e) {
      console.error('Error: get user info failed');
      return Promise.reject(e);
    }
  }

  public async signin(data: SigninRequestDataType) {
    try {
      return await this._authApi.signin(data);
    } catch (e) {
      console.error('Error: get user info failed');
      return Promise.reject(e);
    }
  }

  public async logout() {
    try {
      await this._authApi.logout();
    } catch {
      console.log('Error: logout failed');
    }
  }
}

export const AuthController = new AuthControllerSingleTone();
