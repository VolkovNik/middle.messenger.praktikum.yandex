enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT ='PUT',
  DELETE = 'DELETE',
}

function queryStringify(data: any) {
  if (typeof data !== 'object') {
    throw new Error('Data must be object');
  }

  const keys = Object.keys(data);
  return keys.reduce((result, key, index) => `${result}${key}=${data[key]}${index < keys.length - 1 ? '&' : ''}`, '?');
}

type OptionsType = {
  method: METHODS;
  data?: any;
  timeout: number;
  headers?: Record<string, string>;
}
type OptionsWithoutMethodType = Omit<OptionsType, 'method'>;

export class HTTPTransport {
  get = (url: string, options: OptionsWithoutMethodType = { timeout: 5000 }) => (
    this.request(url, { ...options, method: METHODS.GET }, options.timeout)
  );

  post = (url: string, options: OptionsWithoutMethodType = { timeout: 5000 }) => (
    this.request(url, { ...options, method: METHODS.POST }, options.timeout)
  );

  put = (url: string, options: OptionsWithoutMethodType = { timeout: 5000 }) => (
    this.request(url, { ...options, method: METHODS.PUT }, options.timeout)
  );

  delete = (url: string, options: OptionsWithoutMethodType = { timeout: 5000 }) => (
    this.request(url, { ...options, method: METHODS.DELETE }, options.timeout)
  );

  // eslint-disable-next-line class-methods-use-this
  request = (url: string, options: OptionsType, timeout = 5000) => {
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
          ? `${url}${queryStringify(data)}`
          : url,
      );

      Object.keys(headers).forEach((key) => {
        xhr.setRequestHeader(key, headers[key]);
      });

      xhr.onload = () => {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;

      xhr.timeout = timeout;
      xhr.ontimeout = reject;

      if (isGet || !data) {
        xhr.send();
      } else {
        xhr.send(data);
      }
    });
  };
}
