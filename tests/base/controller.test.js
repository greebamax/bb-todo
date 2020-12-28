const { expect } = require("chai");
const sinon = require("sinon");
const Radio = require("backbone.radio");
const BaseController = require("base/controller").default;

describe("Base Controller", () => {
  it("should do not have assinned routes and router fi there are weren't passed", () => {
    const TestController = BaseController.extend({ router: null });
    const testControllerInstance = new TestController();

    expect(testControllerInstance.router).to.be.null;
    expect(testControllerInstance.routes).to.be.undefined;
  });

  describe("#redirectTo", () => {
    const Controller = BaseController.extend(
      {
        home: function home() {},
      },
      {
        appRoutes: {
          homeRoute: "home",
        },
      }
    );

    it("should redirect to route assigned to controller method by calling using method function object", () => {
      const redirectToStub = sinon.stub();
      const testController = new Controller({
        router: { redirectTo: redirectToStub },
      });
      testController.redirectTo(testController.home);
      expect(redirectToStub).to.have.been.calledWith("homeRoute");
    });

    it("should redirect to route assigned to controller method by calling using method name", () => {
      const redirectToStub = sinon.stub();
      const testController = new Controller({
        router: { redirectTo: redirectToStub },
      });
      testController.redirectTo("home");
      expect(redirectToStub).to.have.been.calledWith("homeRoute");
    });

    it("should do nothing if route wasn't assigned to controller method", () => {
      const redirectToStub = sinon.stub();
      const testController = new Controller({
        router: { redirectTo: redirectToStub },
      });
      testController.redirectTo(testController.another);
      expect(redirectToStub).to.have.not.been.called;
    });

    it("should do nothing if router wasn't passed to the constructor", () => {
      const testController = new BaseController();
      const redirectToStub = sinon.stub(testController, "redirectTo");

      testController.redirectTo("someTargetRoute");
      expect(redirectToStub.returnValue).to.be.equal(undefined);
      redirectToStub.restore();
    });
  });

  describe("#show", () => {
    it("should attempt to render view in main app region", () => {
      const testController = new BaseController({
        router: {}, // stub any object
      });
      const requestStub = sinon.stub();
      const channelStub = sinon.stub(Radio, "channel").returns({
        request: requestStub,
      });
      const testView = {};

      testController.show(testView);

      expect(requestStub).to.have.been.calledWith("show:content", testView);

      channelStub.restore();
    });
  });
});
