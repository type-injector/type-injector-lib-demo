import { TypeInjector, Logger } from '@type-injector/lib';
import { InfoLogger, injectToken } from 'type-injector-lib-demo-common-api';
import { inject } from 'vue';

export const globalTypeInjector = TypeInjector.construct()
  .provideImplementation(Logger, InfoLogger)
  .provideValue(injectToken.simpleValue, 'Hello vue.js!')
  .provideFactory(injectToken.createdValue, {
    deps: [injectToken.simpleValue],
    create: (greeter) =>
      `${greeter} Time is: ${new Date().toLocaleTimeString()}`,
  })
  .build();

export const typeInjectorToken = Symbol.for('type injector');

export function typeInjector(): TypeInjector {
  return inject(typeInjectorToken) || globalTypeInjector;
}
