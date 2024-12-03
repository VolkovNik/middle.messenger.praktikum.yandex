import { CHAT_BASE_API_URL } from '@/constants';
import { router } from '@/utils/router';

enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT ='PUT',
  DELETE = 'DELETE',
}

const queryStringify = (data: any) => {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys
    .reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
};

type OptionsType = {
  method: METHODS;
  data?: any;
  timeout?: number;
  headers?: Record<string, string>;
}
type OptionsWithoutMethodType = Omit<OptionsType, 'method'>;
type HTTPMethodType = (url: string, options?: OptionsWithoutMethodType) => Promise<unknown>

export class HTTPTransport {
  private readonly _url: string;

  constructor(url: string) {
    this._url = `${CHAT_BASE_API_URL}${url}`;
  }

  get: HTTPMethodType = (url, options) => (
    this.request(url, { ...options, method: METHODS.GET }, options?.timeout)
  );

  post: HTTPMethodType = (url, options) => (
    this.request(url, { ...options, method: METHODS.POST }, options?.timeout)
  );

  put: HTTPMethodType = (url, options) => (
    this.request(url, { ...options, method: METHODS.PUT }, options?.timeout)
  );

  delete: HTTPMethodType = (url, options) => (
    this.request(url, { ...options, method: METHODS.DELETE }, options?.timeout)
  );

  // eslint-disable-next-line class-methods-use-this
  private request = (url: string, options: OptionsType, timeout = 5000) => {
    const { headers = {}, method, data } = options;

    return new Promise((resolve, reject) => {
      if (!method) {
        reject(new Error('No method'));
        return;
      }

      const xhr = new XMLHttpRequest();
      const isGet = method === METHODS.GET;

      xhr.open(
        method,
        isGet && !!data
          ? `${this._url}${url}${queryStringify(data)}`
          : `${this._url}${url}`,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        if (xhr.status !== 200) {
          reject(xhr.responseText);
          if (xhr.status === 401 && url !== '/signin' && url !== '/signup') {
            router.go('/');
          } else if (xhr.responseText === '{"reason":"User already in system"}') {
            router.go('/messenger');
          }
        }
        if (xhr.response === 'OK') {
          resolve(xhr.response);
        } else {
          resolve(JSON.parse(xhr.response));
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;
      xhr.withCredentials = true;

      if (isGet || !data) {
        xhr.send();
      } else {
        const requestData = data instanceof FormData ? data : JSON.stringify(data);
        xhr.send(requestData);
      }
    });
  };
}
