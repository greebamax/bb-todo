const chai = require('chai');
const sinon = require('sinon');
const AppRoutersCache = require('application/app-routers-cache').default;
const BaseRouter = require('base/router').default;

const expect = chai.expect;

describe('AppRouters Cache', () => {
  let appRoutersCache;

  beforeEach(() => {
    appRoutersCache = new AppRoutersCache();
  });

  afterEach(() => {
    appRoutersCache = undefined;
  });

  describe('.registerRouter()', () => {
    it('should register router', () => {
      appRoutersCache.registerRouter(BaseRouter);
      const registeredRouter = appRoutersCache.getRouter(BaseRouter.name);

      expect(registeredRouter).to.be.an.instanceOf(BaseRouter);
    });

    it('should create and return new instance of registered router', () => {
      const routerInstance = appRoutersCache.registerRouter(BaseRouter);

      expect(routerInstance).to.be.an.instanceOf(BaseRouter);
    });

    it('should not create new instance if attempt to register the same class of router', () => {
      const routerInstance = appRoutersCache.registerRouter(BaseRouter);

      expect(routerInstance).equals(appRoutersCache.registerRouter(BaseRouter));
    });

    it('should accept on input only inheritance of BaseRouter class', () => {
      const spy = sinon.spy(appRoutersCache, 'registerRouter');

      try {
        appRoutersCache.registerRouter(Object.create({}));
      } catch (error) { } // eslint-disable-line

      expect(spy).to.throws('Attempt to register a malformed RouterClass');
    });
  });

  describe('.unregisterRouter()', () => {
    it('should unregister router', () => {
      appRoutersCache.registerRouter(BaseRouter);
      expect(appRoutersCache.getRouter(BaseRouter.name) === BaseRouter).to.be.false;

      // returns true if succeed
      expect(appRoutersCache.unregisterRouter(BaseRouter)).to.be.true;

      // returns false if not succeed because it has been already unregistered
      expect(appRoutersCache.unregisterRouter(BaseRouter)).to.be.false;
    });

    it('should accept on input only inheritance of BaseRouter class', () => {
      const spy = sinon.spy(appRoutersCache, 'unregisterRouter');

      try {
        appRoutersCache.unregisterRouter(Object.create({}));
      } catch (error) { } // eslint-disable-line

      expect(spy).to.throws('Attempt to unregister a malformed RouterClass');
    });
  });

  describe('.forEach(callback)', () => {
    it('should iterate through the routers', () => {
      const spyCb = sinon.spy();

      appRoutersCache.forEach(spyCb);
      expect(spyCb).to.have.not.been.called;

      appRoutersCache.registerRouter(BaseRouter);
      appRoutersCache.forEach(spyCb);
      expect(spyCb).to.have.been.calledOnce;

      const passedArgs = spyCb.args[0];
      expect(passedArgs[0]).to.be.an.instanceOf(BaseRouter);
      expect(passedArgs[1]).to.be.equals(BaseRouter.name);
      expect(passedArgs[2]).to.be.an.instanceOf(Map);
    });
  });
});
