/**
 * LICENSE_PLACEHOLDER
 **/
import {mapValues, chain} from 'lodash'
import TwoNumericalCriteriaSimpleComponent from './TwoNumericalCriteriaSimpleComponent'
import TwoNumericalCriteriaComposedComponent from './TwoNumericalCriteriaComposedComponent'
import AttributeModel from '../common/AttributeModel'

/**
 * Search form criteria plugin allowing the user to configure the numerical value of two different attributes with comparators.
 *
 * Below is an example of the simple layout for two different attributes :
 * attribute1 < value1 and attribute2 != value2
 *
 * TODO + TBC
 * Now if the two passed attributes are the same, we switch to as composed layout:
 * value1 <= attribute <= value2
 *
 * @author Xavier-Alexandre Brochard
 */
export class TwoNumericalCriteriaComponent extends React.Component {

  static propTypes = {
    /**
     * Plugin identifier
     */
    pluginInstanceId: React.PropTypes.string,
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
    attributes: React.PropTypes.objectOf(AttributeModel),
  }

  constructor(props) {
    super(props)
    this.state = {
      // Switch to composed mode if only one attribute passed
      isComposed: chain(props.attributes).map('name').uniq().value().length === 1,
    }
  }

  render() {
    const {isComposed} = this.state

    return isComposed ? <TwoNumericalCriteriaComposedComponent {...this.props} /> :
      <TwoNumericalCriteriaSimpleComponent {...this.props} />

  }
}

export default TwoNumericalCriteriaComponent
