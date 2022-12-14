import React from 'react';
import { TypeInjectorContext } from './type-injector.context';
import { BusinessService } from 'type-injector-lib-demo-common-api';

class BusinessViewWithContext extends React.Component {
  static contextType = TypeInjectorContext;
  context!: React.ContextType<typeof TypeInjectorContext>;

  private _businessService!: BusinessService;

  initialize() {
    this.initialize = () => {};
    this._businessService = this.context.get(BusinessService);
  }

  render() {
    this.initialize();
    return <div>{this._businessService.createdValue}</div>;
  }
}

export default BusinessViewWithContext;
