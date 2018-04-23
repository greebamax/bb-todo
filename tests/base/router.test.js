/* eslint-disable no-underscore-dangle */
const Bb = require('backbone');
const chai = require('chai');
const sinon = require('sinon');

const expect = chai.expect;
chai.use(require('sinon-chai'));
const BaseRouter = require('base/router').default;

describe('Base Router', () => {
  const location = {
    replace: sinon.stub(),
    href: 'http://www.test.com',
    pathname: '',
  };
  const document = {
    createElement: sinon.stub(),
  };
  const window = {
    location,
    document,
  };

  const RouterClass = BaseRouter.extend({
    appRoutes: {
      someRoute: 'someMethod',
      anotherRoute: 'anotherMethod',
    },
  });

  beforeEach(() => {
    global.window = window;
    global.document = document;
    global.location = location;

    Bb.history.location = location;
    Bb.history.start({ pushState: true });
  });

  afterEach(() => {
    Bb.history.stop();
    delete Bb.history.location;

    delete global.window;
    delete global.document;
    delete global.location;
  });

  it('should call beforeEach method on route navigation if defined', () => {
    const router = new RouterClass({
      controller: {
        someMethod: sinon.stub(),
        anotherMethod: sinon.stub(),
        beforeEach: sinon.spy(),
      },
    });

    router.redirectTo('someRoute');
    router.redirectTo('anotherRoute');

    expect(router.controller.beforeEach).to.have.been.calledTwice;
  });

  it('should call afterEach method on route navigation if defined', () => {
    const router = new RouterClass({
      controller: {
        someMethod: sinon.stub(),
        anotherMethod: sinon.stub(),
        afterEach: sinon.spy(),
      },
    });

    router.redirectTo('someRoute');
    router.redirectTo('anotherRoute');

    expect(router.controller.afterEach).to.have.been.calledTwice;
  });

  it('should allways return home route based on routesRoot or constructor name with ending slash', () => {
    const router = new BaseRouter({
      routesRoot: 'testRoute',
    });
    expect(/\/$/.test(router.homeRoute)).to.be.true;

    const router2 = new BaseRouter();
    expect(router2.homeRoute).to.be.eql(`${BaseRouter.routesRoot}/`);
  });

  describe('#redirectTo()', () => {
    let router;
    let navigateSpy;
    let methodSpy;

    beforeEach(() => {
      methodSpy = sinon.spy();
      router = new BaseRouter({
        appRoutes: {
          someRoute: 'methodSpy',
        },
        controller: {
          methodSpy,
        },
      });
      navigateSpy = sinon.spy(router, 'navigate');
    });

    afterEach(() => {
      router = undefined;
      navigateSpy = undefined;
      methodSpy = undefined;
    });

    it('should redirect to route with prefix', () => {
      router.redirectTo('someRoute');
      expect(navigateSpy).to.be.calledWith('#/someRoute');
      expect(methodSpy).to.be.called;
    });

    it('should call the route function by setting the trigger option to true by default', () => {
      router.redirectTo('anotherRoute');
      expect(navigateSpy).to.be.calledWith('#/anotherRoute', { trigger: true });
    });
  });
});
