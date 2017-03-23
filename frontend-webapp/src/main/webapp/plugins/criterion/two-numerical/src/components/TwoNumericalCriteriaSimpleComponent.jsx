/**
 * LICENSE_PLACEHOLDER
 **/
import {chain, keys, uniqueId, reduce} from 'lodash'
import {FormattedMessage} from 'react-intl'
import NumericalCriteriaComponent from './NumericalCriteriaComponent'
import {AttributeModel, getAttributeName} from '../common/AttributeModel'
import EnumNumericalComparator from '../model/EnumNumericalComparator'
import PluginComponent from '../common/PluginComponent'

/**
 * Component allowing the user to configure the numerical value of two different attributes with a mathematical comparator (=, >, <=, ...).
 * For example, it will display:
 *   [attributeName1] < 1400    et    [attributeName2] !=  15
 *
 * The plugin's output is the execution of the passed {@code onChange} prop.
 *
 * @author Xavier-Alexandre Brochard
 */
export class TwoNumericalCriteriaSimpleComponent extends PluginComponent {

  static propTypes = {
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
      operator: EnumNumericalComparator.LE,
    }
    state[props.attributes.secondField.name] = {
      attribute: props.attributes.secondField,
      value: undefined,
      operator: EnumNumericalComparator.LE,
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
  criteriaToOpenSearchFormat = (attribute,value,operator) => {
    let openSearchQuery = ''
    const lvalue = value || '*'
      switch (operator) {
        case EnumNumericalComparator.EQ :
          openSearchQuery = `${getAttributeName(attribute)}:${lvalue}`
          break
        case EnumNumericalComparator.LE :
          openSearchQuery = `${getAttributeName(attribute)}:[* TO ${lvalue}]`
          break
        case EnumNumericalComparator.GE :
          openSearchQuery = `${getAttributeName(attribute)}:[${lvalue} TO *]`
          break
        default:
          openSearchQuery = ''
      }
    return openSearchQuery
  }

  render() {
    const {attributes} = this.props
    return (
      <div style={{display: 'flex'}}>
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
              <NumericalCriteriaComponent // we are mapping on an object this is why we disable the lint next line
                key={attributeName} // eslint-disable-line react/no-array-index-key
                attribute={attribute}
                onChange={this.changeValue}
                comparator={this.state[attribute.name].operator}
                value={this.state[attribute.name].value}
                fixedComparator={false}
              />)
            .zip(new Array(keys(attributes).length).fill(<span key={uniqueId('react_generated_uuid_')}><FormattedMessage
              id="criterion.aggregator.text"
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

export default TwoNumericalCriteriaSimpleComponent
