const chai = require('chai');
const sinon = require('sinon');
const ApplicationRouter = require('application/router').default;
const BaseRouter = require('base/router').default;

const expect = chai.expect;


describe('Main application router', () => {
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
