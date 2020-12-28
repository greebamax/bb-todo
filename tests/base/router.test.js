/* eslint-disable no-underscore-dangle */
const Backbone = require("backbone");
const chai = require("chai");
const sinon = require("sinon");

const expect = chai.expect;
chai.use(require("sinon-chai"));
const BaseRouter = require("base/router").default;

describe("Base Router", () => {
  const location = {
    replace: sinon.stub(),
    href: "http://www.test.com",
    pathname: "",
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
      someRoute: "someMethod",
      anotherRoute: "anotherMethod",
    },
  });

  beforeEach(() => {
    global.window = window;
    global.document = document;
    global.location = location;

    Backbone.history.location = location;
    Backbone.history.start({ pushState: true });
  });

  afterEach(() => {
    Backbone.history.stop();
    delete Backbone.history.location;

    delete global.window;
    delete global.document;
    delete global.location;
  });

  it("should call beforeEach method on route navigation if defined", () => {
    const router = new RouterClass({
      controller: {
        someMethod: sinon.stub(),
        anotherMethod: sinon.stub(),
        beforeEach: sinon.spy(),
      },
    });

    router.redirectTo("someRoute");
    router.redirectTo("anotherRoute");

    expect(router.controller.beforeEach).to.have.been.calledTwice;
  });

  it("should call afterEach method on route navigation if defined", () => {
    const router = new RouterClass({
      controller: {
        someMethod: sinon.stub(),
        anotherMethod: sinon.stub(),
        afterEach: sinon.spy(),
      },
    });

    router.redirectTo("someRoute");
    router.redirectTo("anotherRoute");

    expect(router.controller.afterEach).to.have.been.calledTwice;
  });

  it("should call beforeEach then target method then afterEach", () => {
    const router = new RouterClass({
      controller: {
        beforeEach: sinon.stub(),
        someMethod: sinon.stub(),
        anotherMethod: sinon.stub(),
        afterEach: sinon.spy(),
      },
    });

    router.redirectTo("anotherRoute");

    sinon.assert.callOrder(
      router.controller.beforeEach,
      router.controller.anotherMethod,
      router.controller.afterEach
    );
  });

  it("should stop another calls if beforeEach was returned trusty", () => {
    const router = new RouterClass({
      controller: {
        beforeEach: sinon.stub().returns(true),
        someMethod: sinon.stub(),
        anotherMethod: sinon.stub(),
        afterEach: sinon.spy(),
      },
    });

    router.redirectTo("anotherRoute");

    expect(router.controller.beforeEach).to.have.been.called;
    expect(router.controller.anotherMethod).to.have.not.been.called;
    expect(router.controller.afterEach).to.have.not.been.called;
  });

  it("should have name based on provided option or constructor name", () => {
    let router;

    router = new BaseRouter();
    expect(router).to.have.property("name");
    expect(router.name).to.be.equals("BaseRouter");

    const testRouterName = "testRouterName";
    router = new BaseRouter({ name: testRouterName });
    expect(router.name).to.be.equals(testRouterName);
  });

  describe("#redirectTo()", () => {
    let router;
    let navigateSpy;
    let methodSpy;
    let route;

    beforeEach(() => {
      methodSpy = sinon.spy();
      router = new BaseRouter({
        appRoutes: {
          someRoute: "methodSpy",
        },
        controller: {
          methodSpy,
        },
      });
      navigateSpy = sinon.spy(router, "navigate");
      route = "someRoute";
    });

    afterEach(() => {
      router = undefined;
      navigateSpy = undefined;
      methodSpy = undefined;
      route = undefined;
    });

    it("should redirect to route with prefix", () => {
      router.redirectTo(route);
      expect(navigateSpy).to.have.been.calledWith(`#/${route}`);
      expect(methodSpy).to.have.been.called;
    });

    it("should have name equals constructor name by default", () => {
      expect(router.name).to.be.equal(BaseRouter.name);
    });

    it("should be possible to define name by passing to constructor", () => {
      const testRouterName = "testRouterName";
      const testRouter = new BaseRouter({ name: testRouterName });
      expect(testRouter.name).to.be.equal(testRouterName);
    });

    it("should call the route function by setting the trigger option to true by default", () => {
      router.redirectTo(route);
      expect(navigateSpy).to.have.been.calledWith(`#/${route}`, {
        trigger: true,
      });
    });

    it("should be possible to pass additional parameters", () => {
      const params = { trigger: false, replace: true };
      router.redirectTo(route, params);
      expect(navigateSpy).to.have.been.calledWith(`#/${route}`, params);
    });

    it("should do nothing if route is not a string value", () => {
      const spy = sinon.spy(router, "redirectTo");
      router.redirectTo();
      expect(navigateSpy).to.have.not.been.called;
      expect(spy).returned(undefined);
      spy.restore();
    });
  });

  describe("#navigateTo()", () => {
    let router;
    let navigateSpy;
    let methodSpy;
    let route;

    beforeEach(() => {
      methodSpy = sinon.spy();
      router = new BaseRouter({
        appRoutes: {
          someRoute: "methodSpy",
        },
        controller: {
          methodSpy,
        },
      });
      navigateSpy = sinon.spy(router, "navigate");
      route = "someRoute";
    });

    afterEach(() => {
      router = undefined;
      navigateSpy = undefined;
      methodSpy = undefined;
      route = undefined;
    });

    it("should call the route function with none settings", () => {
      router.navigateTo(route);
      expect(navigateSpy).to.have.been.calledWithExactly(`#/${route}`);
    });

    it("should do nothing if route is not a string value", () => {
      const spy = sinon.spy(router, "navigateTo");
      router.navigateTo(1);
      expect(navigateSpy).to.have.not.been.called;
      expect(spy).returned(undefined);
      spy.restore();
    });
  });
});
