// @ts-check
import { Logger, TypeInjector } from 'type-injector';
import { BusinessService, InfoLogger, injectToken } from 'type-injector-demo-common-api';

class AppTextElement extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    const injector = TypeInjector.construct()
      .provideImplementation(Logger, InfoLogger)
      .provideValue(injectToken.simpleValue, 'Hello web component!')
      .provideFactory(injectToken.createdValue, {
        deps: [injectToken.simpleValue],
        create: (greeter) => `${greeter} Time is: ${new Date().toLocaleTimeString()}`
      })
    .build();

    const businessService = injector.get(BusinessService);
    const textContet = document.createTextNode(businessService.createdValue);
    shadowRoot.append(textContet);
  }
}

customElements.define('app-text', AppTextElement);
