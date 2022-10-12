import { h } from 'preact'
import App from '../src/components/app'
import { render, screen } from '@testing-library/preact'

describe('initiate App component', () => {
	beforeEach(() => {
		render(<App />)
	})
	test('renders context with Hello Preact', async () => {
		const businessViewsWithoutToken = await screen.findAllByText(/Hello Preact/)
		expect(businessViewsWithoutToken.length).toBe(3)
	})

	test('renders context with Token', async () => {
		const businessViewsWithToken = await screen.findAllByText(/Token[0-9]/)
		expect(businessViewsWithToken.length).toBe(1)
	})
})
