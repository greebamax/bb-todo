const chai = require('chai');
const BaseModule = require('base/module').default;

const expect = chai.expect;

describe('Base Module', () => {
  let testModule;

  beforeEach(() => {
    testModule = new BaseModule();
  });

  afterEach(() => {
    testModule = undefined;
  });

  it("shouldn't be loaded by default", () => {
    expect(testModule.isLoaded).to.be.false;
  });

  it('should provide load/unload API', () => {
    expect(testModule).to.has.property('load');
    expect(testModule.load).to.be.instanceof(Function);

    expect(testModule).to.has.property('unload');
    expect(testModule.unload).to.be.instanceof(Function);

    expect(testModule).to.has.property('isLoaded');
  });

  it('should be possible to load/unload module by using class API', () => {
    testModule.load();
    expect(testModule.isLoaded).to.be.true;

    testModule.unload();
    expect(testModule.isLoaded).to.be.false;
  });

  it('should be possible to load/unload module by using setter/getter isLoaded', () => {
    testModule.isLoaded = true;
    expect(testModule.isLoaded).to.be.true;

    testModule.isLoaded = false;
    expect(testModule.isLoaded).to.be.false;
  });

  it("shouldn't be possible to load module directly by changing isLoaded property", () => {
    testModule.options.isLoaded = true;
    expect(testModule.isLoaded).to.be.false;
  });

  it('should be able to create module which is loaded by default', () => {
    const anotherTestModule = new BaseModule({ isLoaded: true });
    expect(anotherTestModule.isLoaded).to.be.true;
  });
});
