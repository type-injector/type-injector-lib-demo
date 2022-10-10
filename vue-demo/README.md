# Inetgrate Type Injector Lib into Vue.js
***looking for other [framework integrations](../README.md)?***  

Vue.js has an own injection system but this system knows nothing about services from ```@type-injector/lib```.
So you have to connect those systems somehow. Here's a suggestion how to do it:

## 1. Setup ```@type-injector/lib```:
```typescript:
export const globalTypeInjector = TypeInjector.construct()
  .provideImplementation(Logger, InfoLogger)
  .provideValue(injectToken.simpleValue, 'Hello vue.js!')
  .provideFactory(injectToken.createdValue, {
    deps: [injectToken.simpleValue],
    create: (greeter) =>
      `${greeter} Time is: ${new Date().toLocaleTimeString()}`,
  })
  .build();
```

## 2. Create a simple convinient method ```typeInjector()``` that connects both worlds:
```typescript
export const typeInjectorToken = Symbol.for('type injector');

export const typeInjector: TypeInjector['get'] = (...args) =>
  (inject<TypeInjector>(typeInjectorToken) || globalTypeInjector).get(...args);
```

## 3. Provide TypeInjector (optional):
### a) global in main.ts:
```typescript
  createApp(App).provide(typeInjectorToken, globalTypeInjector).mount('#app');
```

### b) local scopes:
```html
<script setup lang="ts">
import { provide } from "vue";
import { typeInjector, typeInjectorToken } from "./type-injector";
import { InjectorScope } from "@type-injector/lib";
import { injectToken } from "type-injector-lib-demo-common-api";

provide(
provide(
  typeInjectorToken,
  InjectorScope.construct()
    .withIdent(Symbol.for("AuthenticatedScope"))
    .fromParent(typeInjector())
    .provideValue(injectToken.simpleValue, "Authenticated")
    .build()
);
</script>
```

## 4. Use it in your components:
```html
<script setup lang="ts">
import { BusinessService } from "type-injector-lib-demo-common-api";
import { typeInjector } from "./type-injector";

const businessService = typeInjector().get(BusinessService);
const message = businessService.createdValue;
</script>
```

> To run the example stick to [CONTRIBUTE.md](./CONTRIBUTE.md)
