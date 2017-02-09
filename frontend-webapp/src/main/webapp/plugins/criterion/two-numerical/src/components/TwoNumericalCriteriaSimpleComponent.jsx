/**
 * LICENSE_PLACEHOLDER
 **/
import { chain, keys, uniqueId } from 'lodash'
import Paper from 'material-ui/Paper'
import NumericalCriteriaComponent from './NumericalCriteriaComponent'

/**
 * Component allowing the user to configure the numerical value of two different attributes with a mathematical comparator (=, >, <=, ...).
 * For example, it will display:
 *   [attributeName1] < 1400    et    [attributeName2] !=  15
 *
 * The plugin's output is the execution of the passed {@code onChange} prop.
 *
 * @author Xavier-Alexandre Brochard
 */
export class TwoNumericalCriteriaSimpleComponent extends React.Component {

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

    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'baseline',
        }}
      >
        <Paper
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >

          {chain(attributes)
            .map((attribute, attributeName) => <NumericalCriteriaComponent // we are mapping on an object this is why we disable the lint next line
              key={attributeName} // eslint-disable-line react/no-array-index-key
              attribute={attribute}
              pluginInstanceId={pluginInstanceId}
              onChange={onChange}
            />)
            .zip(new Array(keys(attributes).length).fill(<span key={uniqueId('react_generated_uuid_')}>et</span>))
            .flatten()
            .initial()
            .value()
          }

        </Paper>
      </div>
    )
  }
}

export default TwoNumericalCriteriaSimpleComponent
