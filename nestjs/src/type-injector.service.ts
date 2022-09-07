import { ConsoleLogger, Injectable } from '@nestjs/common';
import {
  InjectToken,
  Logger as TypeInjectorLogger,
  TypeInjector,
} from 'type-injector';
import { BusinessService, injectToken } from 'type-injector-demo-common-api';

@Injectable()
export class TypeInjectorService {
  private typeInjector: TypeInjector;

  constructor() {
    this.typeInjector = getGlobalInjector();
  }

  get<T>(token: InjectToken<T>) {
    return this.typeInjector.get(token);
  }
}

function createGlobalInjector() {
  return TypeInjector.construct()
    .provideValue(injectToken.simpleValue, 'Hello NestJS!')
    .provideFactory(injectToken.createdValue, {
      deps: [injectToken.simpleValue],
      create: (greetings: string) =>
        `${greetings} Time is: ${new Date().toLocaleTimeString('en-EN')}`,
    })
    .provideImplementation(TypeInjectorLogger, ConsoleLogger)
    .build();
}

let globalInjector: TypeInjector;
function getGlobalInjector() {
  return globalInjector || (globalInjector = createGlobalInjector());
}

export const provideBusinessService = {
  provide: BusinessService,
  inject: [TypeInjectorService],
  useFactory: (typeInjector: TypeInjectorService) =>
    typeInjector.get(BusinessService),
};

export const typeInjectProviders = [
  TypeInjectorService,
  provideBusinessService,
];
