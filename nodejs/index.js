// @ts-check
const { TypeInjector, Logger } = require('type-injector-lib');
const { BusinessService, InfoLogger, injectToken } = require('type-injector-lib-demo-common-api');

const injector = TypeInjector.construct()
    .provideImplementation(Logger, InfoLogger)
    .provideValue(injectToken.simpleValue, '\nHello NodeJS!')
    .provideFactory(injectToken.createdValue, {
        deps: [injectToken.simpleValue],
        create: (greeter) => `${greeter} Time is: ${new Date().toLocaleTimeString('en-EN')}`
    })
.build();

const businessService = injector.get(BusinessService);
businessService.logCreatedValue();
