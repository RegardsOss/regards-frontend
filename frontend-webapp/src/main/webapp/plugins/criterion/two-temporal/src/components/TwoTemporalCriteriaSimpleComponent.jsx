/**
 * LICENSE_PLACEHOLDER
 **/
import isNil from 'lodash/isNil'
import { FormattedMessage } from 'react-intl'
import TemporalCriteriaComponent from './TemporalCriteriaComponent'
import ClearButton from './ClearButton'
import AttributeModel from '../common/AttributeModel'
import EnumTemporalComparator from '../model/EnumTemporalComparator'
import PluginComponent from '../common/PluginComponent'

/**
 * Component allowing the user to configure the temporal value of two different attributes with a date comparator (after, before, ...).
 * For example, it will display:
 *   [attributeName1] < 23/02/2017 08:00    et    [attributeName2] = 23/02/2017 12:00
 *
 * @author Xavier-Alexandre Brochard
 */
export class TwoTemporalCriteriaSimpleComponent extends PluginComponent {

  static propTypes = {
    /**
     * List of attributes associated to the plugin.
     * Keys of this object are the "name" props of the attributes defined in the plugin-info.json
     * Value of each keys are the attribute id (retrieved from the server) associated
     */
    attributes: React.PropTypes.objectOf(AttributeModel),
  }

  state = {
    firstField: undefined,
    secondField: undefined,
    operator1: EnumTemporalComparator.GE,
    operator2: EnumTemporalComparator.LE,
  }

  changeValue1 = (value, operator) => {
    this.setState({
      firstField: value,
      operator1: operator,
    })
  }

  changeValue2 = (value, operator) => {
    this.setState({
      secondField: value,
      operator2: operator,
    })
  }

  getPluginSearchQuery = (state) => {
    let searchQuery = ''
    if (state.firstField) {
      searchQuery = this.criteriaToOpenSearchFormat('firstField', state.firstField, state.operator1)
    }
    if (state.secondField) {
      if (searchQuery && searchQuery.length > 0) {
        searchQuery = `${searchQuery} AND `
      }
      const searchQuery2 = this.criteriaToOpenSearchFormat('secondField', state.secondField, state.operator2)
      searchQuery = `${searchQuery}${searchQuery2}`
    }
    return searchQuery
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
        case EnumTemporalComparator.LE :
          openSearchQuery = `${this.getAttributeName(attribute)}:[* TO ${value.toISOString()}]`
          break
        case EnumTemporalComparator.GE :
          openSearchQuery = `${this.getAttributeName(attribute)}:[${value.toISOString()} TO *]`
          break
        default:
          openSearchQuery = ''
      }
    }
    return openSearchQuery
  }

  /**
   * Clear all fields
   */
  handleClear = () => {
    const { operator1, operator2 } = this.state
    this.changeValue1(undefined, operator1)
    this.changeValue2(undefined, operator2)
  }

  parseOpenSearchQuery = (parameterName, openSearchQuery) => {
    if (openSearchQuery.includes('[')) {
      const values = openSearchQuery.match(/\[[ ]{0,1}([^ ]*) TO ([^ ]*)[ ]{0,1}\]/)
      if (values.length === 3) {
        const value = values[1] !== '*' ? values[1] : values[2]
        const operator = values[1] === '*' ? EnumTemporalComparator.LE : EnumTemporalComparator.GE
        if (parameterName === 'firstField') {
          this.setState({ operator1: operator })
        } else {
          this.setState({ operator2: operator })
        }
        return new Date(value)
      }
    }
    return undefined
  }

  render() {
    const { firstField, secondField, operator1, operator2 } = this.state
    const clearButtonDisplayed = !isNil(firstField) || !isNil(secondField)

    return (
      <div style={{ display: 'flex' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <TemporalCriteriaComponent
            label={this.getAttributeLabel('firstField')}
            comparator={operator1}
            value={firstField}
            onChange={this.changeValue1}
          />
          <FormattedMessage id="criterion.aggregator.and"/>
          <TemporalCriteriaComponent
            label={this.getAttributeLabel('secondField')}
            comparator={operator2}
            value={secondField}
            onChange={this.changeValue2}
          />
          <ClearButton onTouchTap={this.handleClear} displayed={clearButtonDisplayed}/>
        </div>
      </div>
    )
  }
}

export default TwoTemporalCriteriaSimpleComponent
