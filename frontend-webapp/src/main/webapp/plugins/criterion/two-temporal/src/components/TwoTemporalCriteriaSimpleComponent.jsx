/**
 * LICENSE_PLACEHOLDER
 **/
import { chain, keys, uniqueId, reduce, isNil } from 'lodash'
import { FormattedMessage } from 'react-intl'
import TemporalCriteriaComponent from './TemporalCriteriaComponent'
import ClearButton from './ClearButton'
import AttributeModel from '../common/AttributeModel'
import EnumTemporalComparator from '../model/EnumTemporalComparator'
import PluginComponent from '../common/PluginComponent'

/**
 * Component allowing the user to configure the temporal value of two different attributes with a date comparator (after, before, ...).
 * For example, it will display:
 *   [attributeName1] < 23/02/2017 08:00    et    [attributeName2] !=  23/02/2017 12:00
 *
 * The plugin's output is the execution of the passed {@code onChange} prop.
 *
 * @author Xavier-Alexandre Brochard
 */
export class TwoTemporalCriteriaSimpleComponent extends PluginComponent {

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
    const state = {}
    state[props.attributes.firstField.name] = {
      attribute: props.attributes.firstField,
      value: undefined,
      operator: EnumTemporalComparator.LE,
    }
    state[props.attributes.secondField.name] = {
      attribute: props.attributes.secondField,
      value: undefined,
      operator: EnumTemporalComparator.LE,
    }
    this.state = state
  }

  changeValue = (attribute, value, operator) => {
    const newState = Object.assign({}, this.state)
    const newAttState = Object.assign({}, this.state[attribute.name])

    newAttState.value = value
    newAttState.operator = operator
    newState[attribute.name] = newAttState

    // Update state to save the new value
    this.setState(newState, this._onPluginChangeValue)
  }

  getPluginSearchQuery = (state) => {
    const query = reduce(state, (result, attValue, key) => {
      let query = result
      if (attValue.attribute && attValue.value && attValue.operator) {
        query = this.criteriaToOpenSearchFormat(attValue.attribute, attValue.value, attValue.operator)
        if (result !== '' && query !== '') {
          query = `${result} AND ${query}`
        }
      }
      return query
    }, '')
    return query
  }

  /**
   * Format criterion to openSearch format for plugin handler
   * @param attribute
   * @param value
   * @param operator
   * @returns {string}
   */
  criteriaToOpenSearchFormat = (attribute, value, operator) => {
    let openSearchQuery = ''
    if (operator && value) {
      switch (operator) {
        case EnumTemporalComparator.EQ :
          openSearchQuery = `${attribute.jsonPath}:${value.toISOString()}`
          break
        case EnumTemporalComparator.LE :
          openSearchQuery = `${attribute.jsonPath}:[* TO ${value.toISOString()}]`
          break
        case EnumTemporalComparator.GE :
          openSearchQuery = `${attribute.jsonPath}:[${value.toISOString()} TO *]`
          break
        default:
          openSearchQuery = ''
      }
    }
    return openSearchQuery
  }

  render() {
    const { attributes } = this.props
    console.log("tamere")
    const clearButtonDisplayed = !isNil(this.state[attributes.firstField.name].value) && !isNil(this.state[attributes.secondField.name].value)

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
                onChange={this.changeValue}
                comparator={this.state[attribute.name].operator}
                value={this.state[attribute.name].value}
              />)
            .zip(new Array(keys(attributes).length).fill(<span key={uniqueId('react_generated_uuid_')}><FormattedMessage
              id="criterion.aggregator.and"
            /></span>))
            .flatten()
            .initial()
            .value()
          }
          <ClearButton onTouchTap={this.handleClear} displayed={clearButtonDisplayed} />
        </div>
      </div>
    )
  }
}

export default TwoTemporalCriteriaSimpleComponent
