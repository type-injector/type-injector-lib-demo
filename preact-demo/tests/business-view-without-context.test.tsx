import { h } from 'preact'
import { render, screen } from '@testing-library/preact'
import BusinessViewWithoutContext from '../src/components/business-view-without-context/index'

describe('business service without context', () => {
	test('should use default context', () => {
		render(<BusinessViewWithoutContext />)
		expect(screen.getByText(/Hello Preact!/)).toBeDefined()
	})
})
