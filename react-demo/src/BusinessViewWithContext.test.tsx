import { render, screen } from '@testing-library/react';
import BusinessViewWithContext from './BusinessViewWithContext';
import { globalTypeInjector, TypeInjectorContext } from './type-injector.context';
import { InjectorScope } from 'type-injector-lib';
import { injectToken } from 'type-injector-lib-demo-common-api';

describe('business view with context', () => {
  describe('without defined context', () => {
    test('should use default context', () => {
      render(<BusinessViewWithContext></BusinessViewWithContext>);

      expect(screen.getByText(/Hello React!/)).toBeInTheDocument();
    });
  });

  describe('in alternative context', () => {
    test('should use alternative injector form context', () => {
      const typeInjector = InjectorScope.construct()
        .withIdent(Symbol.for('test scope'))
        .fromParent(globalTypeInjector)
        .provideValue(injectToken.simpleValue, 'Hello Test!')
      .build();

      render(<TypeInjectorContext.Provider value={typeInjector}>
        <BusinessViewWithContext></BusinessViewWithContext>
      </TypeInjectorContext.Provider>);

      expect(screen.getByText(/Hello Test!/)).toBeInTheDocument();
    });
  });
});
