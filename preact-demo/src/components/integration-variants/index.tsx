import { h } from 'preact'
import BusinessViewWithContext from '../business-view-with-context'
import BusinessViewWithoutContext from '../business-view-without-context'
import style from './style.css'

const IntegrationVariants = () => (
	<div>
		<div className={style.integration} style={{ border: '3px solid green' }}>
			<h3>with context:</h3>
			<BusinessViewWithContext />
		</div>
		<div className={style.integration} style={{ border: '3px solid red' }}>
			<h3>without context:</h3>
			<BusinessViewWithoutContext />
		</div>
	</div>
)

export default IntegrationVariants
