import { h } from 'preact'
import AuthorizedScope from './authorized-scope'
import Header from './header'
import IntegrationVariants from './integration-variants'

// Code-splitting is automated for `routes` directory

const App = () => (
	<div id='app'>
		<Header />
		<AuthorizedScope>
			<IntegrationVariants />
		</AuthorizedScope>
	</div>
)

export default App
