// @ts-check
const { expect } = require('chai');
const { TypeInjector, Logger } = require('type-injector-lib');
const { BusinessService, InfoLogger, injectToken } = require('type-injector-lib-demo-common-api');

const injector = TypeInjector.construct()
    .provideImplementation(Logger, InfoLogger)
    .provideValue(injectToken.simpleValue, 'Hello NodeJS!')
    .provideFactory(injectToken.createdValue, {
        deps: [injectToken.simpleValue],
        create: (greeter) => `${greeter} Time is: ${new Date().toLocaleTimeString()}`
    })
.build();

const businessService = injector.get(BusinessService);

businessService.logCreatedValue();

describe('using business service from common api in nodejs', () => {
  it('should be possible to create an injector for business service', () => {
    const injector = TypeInjector.construct()
        .provideImplementation(Logger, InfoLogger)
        .provideValue(injectToken.simpleValue, 'Hello NodeJS!')
        .provideFactory(injectToken.createdValue, {
            deps: [injectToken.simpleValue],
            create: (greeter) => `${greeter} Time is: ${new Date().toLocaleTimeString('en-EN')}`
        })
    .build();

    const businessService = injector.get(BusinessService);

    expect(businessService.createdValue).to.match(/^Hello NodeJS! Time is: [0-9:]+ (AM|PM)$/);
    expect(businessService.logger instanceof InfoLogger).to.be.true;
  });
});
