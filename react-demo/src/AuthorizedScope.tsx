import React, { ReactNode } from 'react';
import { InjectorScope, TypeInjector } from 'type-injector-lib';
import { injectToken } from 'type-injector-lib-demo-common-api';
import { TypeInjectorContext } from './type-injector.context';

class AuthorizedScope extends React.Component<{ children: ReactNode }> {
  static contextType = TypeInjectorContext;
  context!: React.ContextType<typeof TypeInjectorContext>
  token!: string;
  authorizedInjector!: TypeInjector;

  initialize() {
    this.initialize = () => {};
    const token = this.token = `Token${Math.round(Math.random() * 9)}`;
    this.authorizedInjector = InjectorScope.construct()
      .withIdent(Symbol.for('authorized'))
      .fromParent(this.context)
      .provideValue(injectToken.simpleValue, `Auth: ${token}`)
    .build();
  }

  render() {
    this.initialize();
    return (<div>
      <h2>Authorized scope</h2>
      <TypeInjectorContext.Provider value={this.authorizedInjector}>
        {this.props.children}
      </TypeInjectorContext.Provider>
    </div>);
  }
}

export default AuthorizedScope;
