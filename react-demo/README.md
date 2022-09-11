# Inetgrate type injector lib into React
React has no DI-Container in its core library. But react provides a context that can provide values and services.
```type-injector-lib``` can get integrated into this context so it provides a complete DI-Container that is context aware.

## Integration with React context
### 1. Create a ```TypeInjectorContext```
```typescript
import React from 'react';
import { TypeInjector } from 'type-injector-lib';

export const TypeInjectorContext = React.createContext(new TypeInjector());
```
### 2. Use it in your ```React.Component```
```typescript
import React from 'react';
import { TypeInjectorContext } from './type-injector.context';
import { BusinessService } from 'type-injector-lib-demo-common-api';

class BusinessViewWithContext extends React.Component {
  static contextType = TypeInjectorContext;
  context!: React.ContextType<typeof TypeInjectorContext>;

  private _businessService!: BusinessService;

  initialize() {
    this.initialize = () => {};
    this._businessService = this.context.get(BusinessService);
  }

  render() {
    this.initialize();
    return <div>{this._businessService.createdValue}</div>;
  }
}

export default BusinessViewWithContext;
```

### Create a sub-context/-scope
```typescript
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
```

## Integration without context
### Create a ```globalTypeInjector```
```typescript
export const globalTypeInjector = new TypeInjector();
```
### You can use it directly at the property initialization
```typescript
import React from 'react';
import { globalTypeInjector } from './global-type-injector';
import { BusinessService } from 'type-injector-lib-demo-common-api';

class BusinessView extends React.Component {
  private _businessService = globalTypeInjector.get(BusinessService);

  render() {
    return <div>this._businessService.createdValue</div>;
  }
}

export default BusinessView;
```
### Or even simpler without a property
```typescript
import { globalTypeInjector } from './type-injector.context';
import { BusinessService } from 'type-injector-lib-demo-common-api';

const BusinessViewWithoutContext = () => <div>{globalTypeInjector.get(BusinessService).createdValue}</div>;
export default BusinessViewWithoutContext;
```
