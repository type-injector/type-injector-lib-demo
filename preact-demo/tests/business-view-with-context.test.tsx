import { h } from 'preact'
import { render, screen } from '@testing-library/preact'
import BusinessViewWithContext from '../src/components/business-view-with-context/index'
import {
	globalTypeInjector,
	TypeInjectorContext,
} from '../src/type-injector-context'
import { InjectorScope } from '@type-injector/lib'
import { injectToken } from 'type-injector-lib-demo-common-api'

describe('business view with context', () => {
	describe('without defined context', () => {
		test('should use default context', () => {
			render(<BusinessViewWithContext />)
			expect(screen.getByText(/Hello Preact!/)).toBeDefined()
		})
	})

	describe('in alternative context', () => {
		test('should use alternative injector form context', () => {
			const typeInjector = InjectorScope.construct()
				.withIdent(Symbol.for('test scope'))
				.fromParent(globalTypeInjector)
				.provideValue(injectToken.simpleValue, 'Hello Test!')
				.build()

			render(
				<TypeInjectorContext.Provider value={typeInjector}>
					<BusinessViewWithContext />
				</TypeInjectorContext.Provider>,
			)

			expect(screen.getByText(/Hello Test!/)).toBeDefined()
		})
	})
})
