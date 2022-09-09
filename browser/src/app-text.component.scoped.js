// @ts-check
import { Logger, TypeInjector, InjectorScope } from 'type-injector-lib';
import { BusinessService, InfoLogger, injectToken } from 'type-injector-lib-demo-common-api';

class AppTextElement extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    const topLevelInjector = TypeInjector.construct()
      .provideValue(injectToken.simpleValue, 'Hello web component!')
      .provideFactory(injectToken.createdValue, {
        deps: [injectToken.simpleValue],
        create: (greeter) => `${greeter} Time is: ${new Date().toLocaleTimeString()}`
      })
    .build();

    const injector = InjectorScope.construct()
      .withIdent(Symbol.for('detailed logging'))
      .fromParent(topLevelInjector)
      .provideImplementation(Logger, InfoLogger)
    .build();

    const businessService = injector.get(BusinessService);
    const textContet = document.createTextNode(businessService.createdValue);
    shadowRoot.append(textContet);
  }
}

customElements.define('app-text', AppTextElement);
