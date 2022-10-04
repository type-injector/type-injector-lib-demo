import { TypeInjector, Logger } from '@type-injector/lib';
import { InfoLogger, injectToken } from 'type-injector-lib-demo-common-api';

export  const injector = TypeInjector.construct()
.provideImplementation(Logger, InfoLogger)
.provideValue(injectToken.simpleValue, 'Hello web component!')
.provideFactory(injectToken.createdValue, {
  deps: [injectToken.simpleValue],
  create: (greeter) => `${greeter} Time is: ${new Date().toLocaleTimeString()}`
})
.build();