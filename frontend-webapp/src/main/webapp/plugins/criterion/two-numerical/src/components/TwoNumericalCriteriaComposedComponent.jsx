/**
 * LICENSE_PLACEHOLDER
 **/
import { values } from 'lodash'
import NumericalCriteriaComponent from './NumericalCriteriaComponent'
import {AttributeModel} from '../common/AttributeModel'

/**
 * Component allowing the user to configure the numerical value of a single attribute with two mathematical comparators (=, >, <=, ...).
 * For example, it will display:
 *   1400 < [attributeName] < 15
 *
 * The plugin's output is the execution of the passed {@code onChange} prop.
 *
 * @author Xavier-Alexandre Brochard
 */
export class TwoNumericalCriteriaComposedComponent extends React.Component {

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

  render() {
    const { attributes, pluginInstanceId, onChange } = this.props
    const attribute = values(attributes)[0]

    return (
      <div style={{ display: 'flex' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <NumericalCriteriaComponent
            attribute={attribute}
            pluginInstanceId={pluginInstanceId}
            onChange={onChange}
            comparator="LE"
            hideAttributeName
            reversed
          />
          <span style={{ margin: '0px 10px' }}>{attribute.name}</span>
          <NumericalCriteriaComponent
            attribute={attribute}
            pluginInstanceId={pluginInstanceId}
            onChange={onChange}
            comparator="LE"
            hideAttributeName
          />
        </div>
      </div>
    )
  }
}

export default TwoNumericalCriteriaComposedComponent
