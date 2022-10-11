import preact, { Component, h } from 'preact'
import { BusinessService } from 'type-injector-lib-demo-common-api'
import { TypeInjectorContext } from '../../type-injector-context'

class BusinessViewWithContext extends Component {
	static contextType = TypeInjectorContext
	context!: preact.ContextType<typeof TypeInjectorContext>

	private _businessService!: BusinessService

	initialize() {
		this.initialize = () => {}
		this._businessService = this.context.get(BusinessService)
	}

	render() {
		this.initialize()
		return <div>{this._businessService.createdValue}</div>
	}
}

export default BusinessViewWithContext
