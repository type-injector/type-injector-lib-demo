import { h } from 'preact'
// See: https://github.com/preactjs/enzyme-adapter-preact-pure
import { shallow } from 'enzyme'
import { render, screen } from '@testing-library/preact'
import Header from '../src/components/header/index'
import IntegrationVariants from '../src/components/integration-variants'

describe('initiate Header component', () => {
	test('renders h1 Preact App', async () => {
		const context = shallow(<Header />)
		expect(context.find('h1').text()).toMatch(/Preact App/)
	})

	test('renders the preact logo', () => {
		const context = shallow(<Header />)
		expect(context.find('img').hasClass('logo')).toBe(true)
	})

	test('renders IntegrationVariants component', () => {
		const context = shallow(<IntegrationVariants />)
		expect(context.find('IntegrationVariants')).toBeDefined()
	})

	test('renders Hello Preact text', () => {
		render(<IntegrationVariants />)
		expect(screen.findByDisplayValue(/Hello Preact/)).toBeDefined()
	})
})
