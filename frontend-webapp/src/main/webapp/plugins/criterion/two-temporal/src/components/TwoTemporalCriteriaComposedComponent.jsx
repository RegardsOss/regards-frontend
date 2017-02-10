/**
 * LICENSE_PLACEHOLDER
 **/
import { values } from 'lodash'
import { FormattedMessage } from 'react-intl'
import TemporalCriteriaComponent from './TemporalCriteriaComponent'

/**
 * Component allowing the user to configure the temporal value of a single attribute with two date comparators (before, after, ...).
 * For example, it will display:
 *   23/02/2017 08:00 < [attributeName] < 23/02/2017 12:00
 *
 * The plugin's output is the execution of the passed {@code onChange} prop.
 *
 * @author Xavier-Alexandre Brochard
 */
export class TwoTemporalCriteriaComposedComponent extends React.Component {

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
          <span style={{ margin: '0px 10px' }}>{attribute.name}<FormattedMessage id="criterion.aggregator.is" /></span>
          <TemporalCriteriaComponent
            attribute={attribute}
            pluginInstanceId={pluginInstanceId}
            onChange={onChange}
            comparator="is"
            hideAttributeName
          />
          <span style={{ marginRight: 10 }}><FormattedMessage id="criterion.aggregator.and" /></span>
          <TemporalCriteriaComponent
            attribute={attribute}
            pluginInstanceId={pluginInstanceId}
            onChange={onChange}
            comparator="is"
            hideAttributeName
          />
        </div>
      </div>
    )
  }
}

export default TwoTemporalCriteriaComposedComponent
