import { Inject, Injectable, InjectionToken, Optional, SkipSelf } from '@angular/core';
import { Logger, TypeInjector, InjectToken, InjectorScope } from 'type-injector-lib';
import { BusinessService, InfoLogger, injectToken } from 'type-injector-lib-demo-common-api';
import { AuthToken } from './auth-token.const';

let nextScopeId = 0;

@Injectable({
  providedIn: 'root',
})
export class TypeInjectorService {
  private typeInjector: TypeInjector;
  private scopeIdent = Symbol.for(`scope ${nextScopeId++}`);

  constructor(
    @Optional() @Inject(AuthToken) authToken = 'notAuthenticated',
    @Optional() @SkipSelf() parent?: TypeInjectorService,
  ) {
    this.typeInjector = parent
      ? InjectorScope.construct()
        .withIdent(this.scopeIdent)
        .fromParent(parent.typeInjector)
        .provideValue(injectToken.simpleValue, `Hello Angular! My token is '${authToken}'.`)
      .build()

      : getGlobalInjector()
    ;
  }

  get<T>(token: InjectToken<T>) {
    return this.typeInjector.get(token);
  }
}

export const Nothing = new InjectionToken('injectExternal', {
  providedIn: 'root',
  factory: (...args: any) => {
    console.log('inject internal', args);
    return undefined;
  }
});

function createGlobalInjector() {
  return TypeInjector.construct()
    .provideValue(injectToken.simpleValue, 'Hello Angular!')
    .provideFactory(injectToken.createdValue, {
      deps: [injectToken.simpleValue],
      create: (greetings: string) => `${greetings} Time is: ${new Date().toLocaleTimeString('en-EN')}`,
    })
    .provideImplementation(Logger, InfoLogger)
  .build();
}
function getGlobalInjector() {
  return (globalInjector || (globalInjector = createGlobalInjector()))
}

let globalInjector: TypeInjector;
function typeInject<T>(injectToken: InjectToken<T>): T {
  return getGlobalInjector().get(injectToken);
}
export const BusinessServiceToken = new InjectionToken('businessService', {
  providedIn: 'root',
  factory: () => typeInject(BusinessService),
});
