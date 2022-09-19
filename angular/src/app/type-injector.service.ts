import { Inject, Injectable, Optional, SkipSelf } from '@angular/core';
import { InjectorScope, InjectToken, TypeInjector } from '@type-injector/lib';
import { injectToken } from 'type-injector-lib-demo-common-api';
import { AuthToken } from './auth-token.const';
import { globalTypeInjector } from './global-type-injector';

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
      : globalTypeInjector
    ;
  }

  get<T>(token: InjectToken<T>) {
    return this.typeInjector.get(token);
  }
}
