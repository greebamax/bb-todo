const chai = require("chai");
const sinon = require("sinon");
const ApplicationController = require("application/controller").default;

const expect = chai.expect;

describe("Main application controller", () => {
  it("should attempt ro redirect to lists/ on navigate to home route", () => {
    const redirectToSpy = sinon.spy();
    const appController = new ApplicationController({
      router: {
        redirectTo: redirectToSpy,
      },
    });

    appController.home();
    expect(redirectToSpy).to.have.been.calledWithExactly("lists");
  });

  it("should attempt ro redirect to home otherwise", () => {
    const routerRedirectToSpy = sinon.spy();

    const appController = new ApplicationController({
      router: {
        redirectTo: routerRedirectToSpy,
      },
    });
    const redirectToSpy = sinon.spy(appController, "redirectTo");

    appController.otherwise();
    expect(redirectToSpy).to.have.been.calledWithExactly(appController.home);

    const MAIN_APP_CTRL_HOME_ROUTE = "";
    expect(routerRedirectToSpy).to.have.been.calledWithExactly(
      MAIN_APP_CTRL_HOME_ROUTE
    );
  });
});
