/**
 * LICENSE_PLACEHOLDER
 **/
import { mapValues, chain } from 'lodash'
import TwoTemporalCriteriaSimpleComponent from './TwoTemporalCriteriaSimpleComponent'
import TwoTemporalCriteriaComposedComponent from './TwoTemporalCriteriaComposedComponent'

/**
 * Search form criteria plugin allowing the user to configure the temporal value of two different attributes with comparators.
 *
 * Below is an example of the simple layout for two different attributes :
 * attribute1 before value1 and attribute2 after value2
 *
 * Now if the two passed attributes are the same, we switch to as composed layout:
 * attribute before value1 and after value2
 *
 * @author Xavier-Alexandre Brochard
 */
export class TwoTemporalCriteriaComponent extends React.Component {

  static propTypes = {
    /**
     * Plugin identifier
     */
    pluginInstanceId: React.PropTypes.number,
    /**
     * Callback to change the current criteria values in form
     * Parameters :
     * criteria : an object like : {attribute:<AttributeModel>, comparator:<ComparatorEnumType>, value:<value>}
     * id: current plugin identifier
     */
    onChange: React.PropTypes.func,
    /**
     * List of attributes associated to the plugin.
     * Keys of this object are the "name" props of the attributes defined in the plugin-info.json
     * Value of each keys are the attribute id (retrieved from the server) associated
     */
    attributes: React.PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      // Switch to composed mode if only one attribute passed
      isComposed: chain(props.attributes).map('name').uniq().value().length === 1,
      criteria: mapValues(props.attributes, el => ({
        value: undefined,
        comparator: 'EQ',
      })),
    }
  }

  render() {
    const { isComposed } = this.state

    return isComposed ? <TwoTemporalCriteriaComposedComponent {...this.props} /> :
    <TwoTemporalCriteriaSimpleComponent {...this.props} />
  }
}

export default TwoTemporalCriteriaComponent
