import { InjectorScope } from '@type-injector/lib';
import { mount, VueWrapper } from '@vue/test-utils';
import { injectToken } from 'type-injector-lib-demo-common-api';
import { beforeEach, describe, expect, it } from 'vitest';
import App from './App.vue';
import { globalTypeInjector, typeInjectorToken } from './type-injector';

describe('App', () => {
  let wrapper: VueWrapper;
  beforeEach(() => {
    wrapper = mount(App, {
      global: {
        provide: {
          [typeInjectorToken]: InjectorScope.construct()
            .withIdent(Symbol.for('testing'))
            .fromParent(globalTypeInjector)
            .provideValue(injectToken.simpleValue, 'Hello test!')
            .build(),
        },
      },
    });
  });

  it('should show vue logo', () => {
    expect(wrapper.get('img[src $= "logo.svg"]')).toBeTruthy();
  });

  it('should show direct usage', () => {
    const directUsage = wrapper.find('.container > section:nth-child(1)');
    expect(directUsage.find('h2').text()).to.match(/direct usage/i);
    expect(directUsage.find('p').text()).to.match(/Hello test!/);
  });

  it('should show authenticated scope', () => {
    const authenticatedScope = wrapper.find(
      '.container > section:nth-child(3)'
    );
    expect(authenticatedScope.find('h2').text()).to.match(/in scope/i);
    expect(authenticatedScope.find('.AuthenticatedScope p').text()).to.match(
      /Authenticated/
    );
  });
});
