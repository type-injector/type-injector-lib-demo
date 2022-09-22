import { Component, h } from '@stencil/core';
import { TypeInjector, Logger } from '@type-injector/lib';
import { InfoLogger, injectToken, BusinessService } from 'type-injector-lib-demo-common-api';


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  render() {

    const injector = TypeInjector.construct()
    .provideImplementation(Logger, InfoLogger)
    .provideValue(injectToken.simpleValue, 'Hello web component!')
    .provideFactory(injectToken.createdValue, {
      deps: [injectToken.simpleValue],
      create: (greeter) => `${greeter} Time is: ${new Date().toLocaleTimeString()}`
    })
  .build();

  const businessService = injector.get(BusinessService);

    return (
      <div>
        <header>
          <h1>Stencil App Starter</h1>
        </header>

        <main>
          <h1>
            {
              businessService.createdValue
            }
          </h1>
        </main>
      </div>
    );
  }
}
