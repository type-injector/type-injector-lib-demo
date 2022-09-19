import React from 'react';
import { Logger, TypeInjector } from '@type-injector/lib';
import { InfoLogger, injectToken } from 'type-injector-lib-demo-common-api';

export const globalTypeInjector = TypeInjector.construct()
  .provideImplementation(Logger, InfoLogger)
  .provideValue(injectToken.simpleValue, '\nHello React!')
  .provideFactory(injectToken.createdValue, {
      deps: [injectToken.simpleValue],
      create: (greeter) => `${greeter} Time is: ${new Date().toLocaleTimeString('en-EN')}`
  })
.build();

export const TypeInjectorContext = React.createContext(globalTypeInjector);
