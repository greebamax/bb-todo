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

    router.navigate('someRoute', { trigger: true });
    router.navigate('anotherRoute', { trigger: true });

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

    router.navigate('someRoute', { trigger: true });
    router.navigate('anotherRoute', { trigger: true });

    expect(router.controller.afterEach).to.have.been.calledTwice;
  });
});
