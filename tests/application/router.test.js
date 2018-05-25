const sinon = require('sinon');
const expect = require('chai').expect;
const Backbone = require('backbone');
const ApplicationRouter = require('application/router').default;
const BaseRouter = require('base/router').default;


let applicationRouter;
const testModule = {
  name: 'TestModule',
  router: BaseRouter,
  appRoutes: {
    route: 'method',
    anotherRoute: 'anotherMethod',
  },
};
const redirectionMethodName = `redirectTo${testModule.name}`;

describe('Main application router', () => {
  beforeEach(() => {
    applicationRouter = new ApplicationRouter();
  });

  afterEach(() => {
    applicationRouter = undefined;
  });

  describe('.registerSubRouter(module)', () => {
    it('should register sub-router of module and create redirecrtion callback to it', () => {
      applicationRouter.registerSubRouter(testModule);

      expect(applicationRouter.controller).to.have.property(redirectionMethodName);
      expect(applicationRouter.controller[redirectionMethodName]).to.be.an.instanceof(Function);
    });

    it('should attempt to register all routes from module router within main app router', () => {
      const spyFn = sinon.spy(applicationRouter, 'processAppRoutes');

      applicationRouter.registerSubRouter(testModule);

      const passedArgs = spyFn.args[0];
      const handlers = {};
      Object.keys(testModule.appRoutes).forEach(route => {
        handlers[route] = redirectionMethodName;
      });

      expect(passedArgs[0]).to.be.equal(applicationRouter.controller);
      expect(passedArgs[1]).to.be.deep.equal(handlers);
    });
  });
});

describe('registered redirection method', () => {
  let matchRootStub;
  let loadUrlSpy;

  beforeEach(() => {
    matchRootStub = sinon.stub(Backbone.history, 'matchRoot');
    loadUrlSpy = sinon.spy(Backbone.history, 'loadUrl');
    applicationRouter = new ApplicationRouter();
  });

  afterEach(() => {
    matchRootStub.restore();
    loadUrlSpy.restore();
    applicationRouter = undefined;
  });

  it('should check if module is loaded', () => {
    const spyIsLoaded = sinon.spy(applicationRouter.routers, 'isLoaded');

    applicationRouter.registerSubRouter(testModule);
    applicationRouter.controller[redirectionMethodName]();

    expect(spyIsLoaded).to.have.been.calledWithExactly(testModule);
  });

  it('should do nothing if module is already loaded', () => {
    applicationRouter.routers.isLoaded = sinon.stub().returns(true);

    applicationRouter.registerSubRouter(testModule);
    const spy = sinon.spy(applicationRouter.controller, redirectionMethodName);
    applicationRouter.controller[redirectionMethodName]();
    expect(spy.returnValue).to.be.undefined;
    expect(loadUrlSpy).to.not.have.been.called;
  });

  it("should attempt to register router router and call loadUrl if module isn't loaded yet", () => {
    applicationRouter.routers.isLoaded = sinon.stub().returns(false);

    applicationRouter.registerSubRouter(testModule);
    const spy = sinon.spy(applicationRouter.controller, redirectionMethodName);
    applicationRouter.controller[redirectionMethodName]();
    expect(spy.returnValue).to.be.undefined;
    expect(loadUrlSpy).to.have.been.called;
  });
});
