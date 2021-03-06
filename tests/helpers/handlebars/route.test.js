const { expect } = require("chai");

function FakeSafeString(str) {
  this.str = str;
}
FakeSafeString.prototype.toString = function toString() {
  return this.str;
};

const FakeHandlebars = {
  escapeExpression: (passed) => passed,
  SafeString: FakeSafeString,
};
const routeHelper = require("helpers/handlebars/route").default(FakeHandlebars);

describe("Handlebars routeHelper", () => {
  it("should render route with passed href and inner text", () => {
    const route = "route";
    const html = routeHelper({
      hash: {
        to: route,
      },
    }).toString();

    expect(html).to.be.equal(`#/${route}`);
  });

  it("should render route with resolved params", () => {
    const route = "{some}/route/{with}/params";
    const expectedRoute = "1/route/2/params";
    const html = routeHelper({
      hash: {
        to: route,
        some: 1,
        with: 2,
      },
    }).toString();

    expect(html).to.be.equal(`#/${expectedRoute}`);
  });
});
