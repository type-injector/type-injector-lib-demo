import { h } from 'preact'
import { BusinessService } from 'type-injector-lib-demo-common-api'
import { globalTypeInjector } from '../../type-injector-context'

const BusinessViewWithoutContext = () => (
	<div>{globalTypeInjector.get(BusinessService).createdValue}</div>
)
export default BusinessViewWithoutContext
