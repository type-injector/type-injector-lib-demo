// @ts-check
const { TypeInjector, Logger } = require('type-injector');
const { BusinessService, InfoLogger, injectToken } = require('type-injector-demo-common-api');

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
