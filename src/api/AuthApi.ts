import { HTTPTransport } from '@/utils/api';
import { SigninRequestDataType, SignupRequestDataType } from '@/types/api';

export class AuthApi {
  private readonly _authApiInstance;

  constructor() {
    this._authApiInstance = new HTTPTransport('/auth');
  }

  async signup(data: SignupRequestDataType) {
    return this._authApiInstance.post('/signup', {
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });
  }

  async signin(data: SigninRequestDataType) {
    return this._authApiInstance.post('/signin', {
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    });
  }

  async logout() {
    return this._authApiInstance.post('/logout');
  }

  async user() {
    return this._authApiInstance.get('/user');
  }
}
