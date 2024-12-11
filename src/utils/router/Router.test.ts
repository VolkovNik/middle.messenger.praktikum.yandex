import { expect } from 'chai';
import sinon from 'sinon';
import { Router } from '.';
import { Block } from '../block';

describe('Router', () => {
  let mockBlock: typeof Block;
  let router: Router;

  beforeEach(() => {
    mockBlock = class extends Block {
      render() {
        return this.compile('<div>{{{text}}}</div>', {});
      }
    };
    router = new Router();
  });

  describe('use', () => {
    it('should add route with right value', () => {
      router.use('/test', mockBlock);

      expect(router.routes[0].match('/test')).to.be.true;
    });

    it('should add route', () => {
      router.use('/test', mockBlock);

      expect(router.routes).to.have.lengthOf(1);
    });

    it('should support chain of routes', () => {
      const result = router
        .use('/test1', mockBlock)
        .use('/test2', mockBlock);

      expect(router.routes).to.have.lengthOf(2);
    });

    it('should return router', () => {
      const result = router
        .use('/test1', mockBlock)
        .use('/test2', mockBlock);

      expect(result).to.equal(router);
    });
  });

  describe('getRoute', () => {
    it('should return existing route', () => {
      router.use('/test', mockBlock);

      const route = router.getRoute('/test');

      expect(route?.match('/test')).to.be.true;
    });

    it('should return if no rout', () => {
      router.use('/404', mockBlock);

      const route = router.getRoute('/unknown');

      expect(route?.match('/404')).to.be.true;
    });
  });

  describe('go', () => {
    let historyPushStateSpy: sinon.SinonSpy;
    let onRouteSpy: sinon.SinonSpy;

    beforeEach(() => {
      historyPushStateSpy = sinon.spy(router.history, 'pushState');
      onRouteSpy = sinon.spy(router as any, '_onRoute');
    });

    afterEach(() => {
      historyPushStateSpy.restore();
      onRouteSpy.restore();
    });

    it('should change the URL', () => {
      router.use('/test', mockBlock);

      router.go('/test');

      expect(historyPushStateSpy.calledOnce).to.be.true;
    });

    it('should call _onRoute', () => {
      router.use('/test', mockBlock);

      router.go('/test');

      expect(onRouteSpy.calledOnceWith('/test')).to.be.true;
    });
  });

  describe('start', () => {
    it('should set the onpopstate handler', () => {
      router.start();

      expect(window.onpopstate).not.to.be.null;
    });

    it('should call _onRoute with the current path', () => {
      const onRouteSpy = sinon.spy(router as any, '_onRoute');

      router.start();

      expect(onRouteSpy.calledOnceWith(window.location.pathname)).to.be.true;

      onRouteSpy.restore();
    });
  });

  describe('back и forward', () => {
    let historyBackSpy: sinon.SinonSpy;
    let historyForwardSpy: sinon.SinonSpy;

    beforeEach(() => {
      historyBackSpy = sinon.spy(router.history, 'back');
      historyForwardSpy = sinon.spy(router.history, 'forward');
    });

    afterEach(() => {
      historyBackSpy.restore();
      historyForwardSpy.restore();
    });

    it('should call history.back() when back', () => {
      router.back();

      expect(historyBackSpy.calledOnce).to.be.true;
    });

    it('should call history.forward() when forward', () => {
      router.forward();

      expect(historyForwardSpy.calledOnce).to.be.true;
    });
  });
});
