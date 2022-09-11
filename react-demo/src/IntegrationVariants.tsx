import BusinessViewWithContext from './BusinessViewWithContext';
import BusinessViewWithoutContext from './BusinessViewWithoutContext';
import './IntegrationVariants.css';

const IntegrationVariants = () => <div className="integration-variants">
  <div className="integration-variant integration-with-context">
    <h3>with context:</h3>
    <BusinessViewWithContext></BusinessViewWithContext>
  </div>
  <div className="integration-variant integration-without-context">
    <h3>without context:</h3>
    <BusinessViewWithoutContext></BusinessViewWithoutContext>
  </div>
</div>

export default IntegrationVariants;
