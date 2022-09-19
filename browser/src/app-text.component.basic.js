// @ts-check
import { BasicTypeInjector } from '@type-injector/lib';
import { BusinessService, injectToken } from 'type-injector-lib-demo-common-api';

class AppTextElement extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });

    const injector = new BasicTypeInjector({
      instances: {
        [injectToken.simpleValue]: 'Hello basic web component',
      },
      factories: {
        [injectToken.createdValue]: {
          deps: [injectToken.simpleValue],
          create: (greeter) => `${greeter} Time is: ${new Date().toLocaleTimeString()}`
        },
      }
    });

    const businessService = injector.get(BusinessService);
    const textContet = document.createTextNode(businessService.createdValue);
    shadowRoot.append(textContet);
  }
}

customElements.define('app-text', AppTextElement);
