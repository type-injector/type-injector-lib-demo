import { Component, h } from '@stencil/core';
import { BusinessService } from 'type-injector-lib-demo-common-api';
import {injector} from '../../type-injector'

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {

  
  render() {
    
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
