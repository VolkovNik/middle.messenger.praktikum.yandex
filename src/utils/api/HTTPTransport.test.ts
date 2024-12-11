import { expect } from 'chai';
import sinon, { SinonSandbox } from 'sinon';
import { HTTPTransport } from '.';
import { CHAT_BASE_API_URL } from '../../constants';

describe('HTTPTransport', () => {
  let sandbox: SinonSandbox;
  let xhrMock: sinon.SinonMock;
  let httpTransport: HTTPTransport;

  beforeEach(() => {
    sandbox = sinon.createSandbox();
    httpTransport = new HTTPTransport('/mock-api');
    xhrMock = sandbox.mock(XMLHttpRequest.prototype);
  });

  afterEach(() => {
    xhrMock.restore();
    sandbox.restore();
  });

  it('should open xhr with right params in get', () => {
    const url = '/test';
    const options = { data: { key: 'value' }, method: 'GET' };

    const xhrOpenSpy = sandbox.spy(XMLHttpRequest.prototype, 'open');
    httpTransport.get(url, options);

    expect(xhrOpenSpy.calledWith('GET', `${CHAT_BASE_API_URL}/mock-api/test?key=value`)).to.be.true;
  });

  it('should call xhr send in get', () => {
    const url = '/test';
    const options = { data: { key: 'value' }, method: 'GET' };

    const xhrSendSpy = sandbox.spy(XMLHttpRequest.prototype, 'send');
    httpTransport.get(url, options);

    expect(xhrSendSpy.calledOnce).to.be.true;
  });

  it('should open xhr with data in post', () => {
    const url = '/test';
    const options = { data: { key: 'value' }, method: 'GET' };

    const xhrOpenSpy = sandbox.spy(XMLHttpRequest.prototype, 'open');
    httpTransport.post(url, options);

    expect(xhrOpenSpy.calledWith('POST', `${CHAT_BASE_API_URL}/mock-api/test`)).to.be.true;
  });

  it('should call xhr send in post with right data', () => {
    const url = '/test';
    const options = { data: { key: 'value' }, method: 'POST' };

    const xhrSendSpy = sandbox.spy(XMLHttpRequest.prototype, 'send');
    httpTransport.post(url, options);

    expect(xhrSendSpy.calledOnceWith(JSON.stringify(options.data))).to.be.true;
  });

  it('should call xhr send in post with right form data', () => {
    const url = '/test';
    const data = new FormData();
    data.append('username', 'testuser');
    const options = { data, method: 'POST' };

    const xhrSendSpy = sandbox.spy(XMLHttpRequest.prototype, 'send');
    httpTransport.post(url, options);

    expect(xhrSendSpy.calledOnceWith(data)).to.be.true;
  });

  it('should call xhr set headers in post with right data', () => {
    const url = '/test';
    const options = { data: { key: 'value' }, method: 'POST', headers: { 'content-type': 'application/json' } };

    const xhrSetHeadersSpy = sandbox.spy(XMLHttpRequest.prototype, 'setRequestHeader');
    httpTransport.post(url, options);

    expect(xhrSetHeadersSpy.calledOnceWith('content-type', 'application/json')).to.be.true;
  });

  it('should open xhr with data in delete', () => {
    const url = '/test';
    const options = { data: { key: 'value' }, method: 'DELETE' };

    const xhrOpenSpy = sandbox.spy(XMLHttpRequest.prototype, 'open');
    httpTransport.delete(url, options);

    expect(xhrOpenSpy.calledWith('DELETE', `${CHAT_BASE_API_URL}/mock-api/test`)).to.be.true;
  });

  it('should call xhr send in delete with right data', () => {
    const url = '/test';
    const options = { data: { key: 'value' }, method: 'DELETE' };

    const xhrSendSpy = sandbox.spy(XMLHttpRequest.prototype, 'send');
    httpTransport.delete(url, options);

    expect(xhrSendSpy.calledOnceWith(JSON.stringify(options.data))).to.be.true;
  });

  it('should call xhr set headers in delete with right data', () => {
    const url = '/test';
    const options = { data: { key: 'value' }, method: 'DELETE', headers: { 'content-type': 'application/json' } };

    const xhrSetHeadersSpy = sandbox.spy(XMLHttpRequest.prototype, 'setRequestHeader');
    httpTransport.delete(url, options);

    expect(xhrSetHeadersSpy.calledOnceWith('content-type', 'application/json')).to.be.true;
  });

  it('should open xhr with data in put', () => {
    const url = '/test';
    const options = { data: { key: 'value' }, method: 'PUT' };

    const xhrOpenSpy = sandbox.spy(XMLHttpRequest.prototype, 'open');
    httpTransport.put(url, options);

    expect(xhrOpenSpy.calledWith('PUT', `${CHAT_BASE_API_URL}/mock-api/test`)).to.be.true;
  });

  it('should call xhr send in put with right data', () => {
    const url = '/test';
    const options = { data: { key: 'value' }, method: 'PUT' };

    const xhrSendSpy = sandbox.spy(XMLHttpRequest.prototype, 'send');
    httpTransport.put(url, options);

    expect(xhrSendSpy.calledOnceWith(JSON.stringify(options.data))).to.be.true;
  });

  it('should call xhr set headers in put with right data', () => {
    const url = '/test';
    const options = { data: { key: 'value' }, method: 'PUT', headers: { 'content-type': 'application/json' } };

    const xhrSetHeadersSpy = sandbox.spy(XMLHttpRequest.prototype, 'setRequestHeader');
    httpTransport.put(url, options);

    expect(xhrSetHeadersSpy.calledOnceWith('content-type', 'application/json')).to.be.true;
  });

  it('should call xhr send in put with right form data', () => {
    const url = '/test';
    const data = new FormData();
    data.append('username', 'testuser');
    const options = { data, method: 'PUT' };

    const xhrSendSpy = sandbox.spy(XMLHttpRequest.prototype, 'send');
    httpTransport.put(url, options);

    expect(xhrSendSpy.calledOnceWith(data)).to.be.true;
  });
});
