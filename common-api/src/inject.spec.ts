import { expect } from 'chai';
import { Logger, TypeInjector } from 'type-injector';
import { BusinessService } from './business-service';
import { InfoLogger } from './info-logger';
import { injectToken } from './inject-token.const';

describe('inject in common api', () => {
  it('should be possible to create an injector for business service', () => {
    const injector = TypeInjector.construct()
        .provideImplementation(Logger, InfoLogger)
        .provideValue(injectToken.simpleValue, 'Hello Chai!')
        .provideFactory(injectToken.createdValue, {
            deps: [injectToken.simpleValue],
            create: (greeter) => `${greeter} Time is: ${new Date().toLocaleTimeString('en-EN')}`
        })
    .build();

    const businessService = injector.get(BusinessService);

    expect(businessService.createdValue).to.match(/^Hello Chai! Time is: [0-9:]+ (AM|PM)$/);
    expect(businessService.logger instanceof InfoLogger).to.be.true;
  });
});
