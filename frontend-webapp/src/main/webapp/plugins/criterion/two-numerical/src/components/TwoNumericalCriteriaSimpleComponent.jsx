/**
 * LICENSE_PLACEHOLDER
 **/
import NumericalCriteriaComponent from './NumericalCriteriaComponent'
import AttributeModel from '../common/AttributeModel'
import EnumNumericalComparator from '../model/EnumNumericalComparator'
import PluginComponent from '../common/PluginComponent'
import ClearButton from './ClearButton'

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

  state = {
    firstField: undefined,
    secondField: undefined,
    operator1: EnumNumericalComparator.GE,
    operator2: EnumNumericalComparator.LE,
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
    const { firstField, secondField, operator1, operator2 } = state
    let searchQuery = ''
    if (firstField) {
      searchQuery = this.criteriaToOpenSearchFormat('firstField', firstField, operator1)
    }
    if (secondField) {
      if (searchQuery && searchQuery.length > 0) {
        searchQuery = `${searchQuery} AND `
      }
      const searchQuery2 = this.criteriaToOpenSearchFormat('secondField', secondField, operator2)
      searchQuery = `${searchQuery}${searchQuery2}`
    }
    return searchQuery
  }

  parseOpenSearchQuery = (parameterName, openSearchQuery) => {
    if (isNaN(openSearchQuery)) {
      const values = openSearchQuery.match(/\[[ ]{0,1}([0-9\*]*) TO ([0-9\*]*)[ ]{0,1}\]/)
      if (values.length === 3) {
        const value = values[1] !== '*' ? values[1] : values[2]
        const operator = values[1] === '*' ? EnumNumericalComparator.LE : EnumNumericalComparator.GE
        if (parameterName === 'firstField') {
          this.setState({ operator1: operator })
        } else {
          this.setState({ operator2: operator })
        }
        return value
      }
    } else {
      if (parameterName === 'firstField') {
        this.setState({ operator1: EnumNumericalComparator.EQ })
      } else {
        this.setState({ operator2: EnumNumericalComparator.EQ })
      }
      return openSearchQuery
    }

    return undefined
  }

  /**
   * Clear the entered value
   */
  handleClear = () => {
    const { operator1, operator2 } = this.state
    this.changeValue1(undefined, operator1)
    this.changeValue2(undefined, operator2)
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
    const lvalue = value || '*'
    switch (operator) {
      case EnumNumericalComparator.EQ :
        openSearchQuery = `${this.getAttributeName(attribute)}:${lvalue}`
        break
      case EnumNumericalComparator.LE :
        openSearchQuery = `${this.getAttributeName(attribute)}:[* TO ${lvalue}]`
        break
      case EnumNumericalComparator.GE :
        openSearchQuery = `${this.getAttributeName(attribute)}:[${lvalue} TO *]`
        break
      default:
        openSearchQuery = ''
    }
    return openSearchQuery
  }

  render() {
    const { firstField, secondField, operator1, operator2 } = this.state
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
            label={this.getAttributeLabel('firstField')}
            value={firstField}
            comparator={operator1}
            onChange={this.changeValue1}
            fixedComparator={false}
          />
          <NumericalCriteriaComponent
            label={this.getAttributeLabel('secondField')}
            value={secondField}
            comparator={operator2}
            onChange={this.changeValue2}
            fixedComparator={false}
          />
          <ClearButton onTouchTap={this.handleClear} displayed={firstField || secondField}/>
        </div>
      </div>
    )
  }
}

export default TwoNumericalCriteriaSimpleComponent
