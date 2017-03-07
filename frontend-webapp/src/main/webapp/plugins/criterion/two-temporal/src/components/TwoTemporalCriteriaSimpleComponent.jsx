/**
 * LICENSE_PLACEHOLDER
 **/
import { chain, keys, uniqueId } from 'lodash'
import { FormattedMessage } from 'react-intl'
import TemporalCriteriaComponent from './TemporalCriteriaComponent'

/**
 * Component allowing the user to configure the temporal value of two different attributes with a date comparator (after, before, ...).
 * For example, it will display:
 *   [attributeName1] < 23/02/2017 08:00    et    [attributeName2] !=  23/02/2017 12:00
 *
 * The plugin's output is the execution of the passed {@code onChange} prop.
 *
 * @author Xavier-Alexandre Brochard
 */
export class TwoTemporalCriteriaSimpleComponent extends React.Component {

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
    attributes: React.PropTypes.object,
  }

  render() {
    const { attributes, pluginInstanceId, onChange } = this.props

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
          {chain(attributes)
            .map((attribute, attributeName) =>
              <TemporalCriteriaComponent // we are mapping on an object this is why we disable the lint next line
                key={attributeName} // eslint-disable-line react/no-array-index-key
                attribute={attribute}
                pluginInstanceId={pluginInstanceId}
                onChange={onChange}
              />)
            .zip(new Array(keys(attributes).length).fill(<span key={uniqueId('react_generated_uuid_')}><FormattedMessage
              id="criterion.aggregator.and"
            /></span>))
            .flatten()
            .initial()
            .value()
          }

        </div>
      </div>
    )
  }
}

export default TwoTemporalCriteriaSimpleComponent
