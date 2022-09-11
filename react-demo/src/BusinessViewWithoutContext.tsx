import { globalTypeInjector } from './type-injector.context';
import { BusinessService } from 'type-injector-lib-demo-common-api';

const BusinessViewWithoutContext = () => <div>{globalTypeInjector.get(BusinessService).createdValue}</div>;
export default BusinessViewWithoutContext;
