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
    operator1: EnumNumericalComparator.EQ,
    operator2: EnumNumericalComparator.EQ,
  }

  changeValue = (attribute, value, operator) => {
    if (attribute === 'firstField') {
      this.setState({
        firstField: value,
        operator1: operator,
      })
    } else {
      this.setState({
        secondField: value,
        operator2: operator,
      })
    }
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

  parseOpenSearchQuery = (parameterName, openSearchQuery) => {
    console.error("PARSE",parameterName,openSearchQuery)
    if (isNaN(openSearchQuery)) {
      const values = openSearchQuery.match(/\[[ ]{0,1}([0-9\*]*) TO ([0-9\*]*)[ ]{0,1}\]/)
      if (values.length === 3) {
        const value = values[1] !== '*' ? values[1] : values[2]
        const operator = values[1] === '*' ? EnumNumericalComparator.LE : EnumNumericalComparator.GE
        console.error("PARSE RESULT",parameterName,value,operator)
        if (parameterName === 'firstField') {
          this.setState({ operator1: operator })
        } else {
          this.setState({ operator2: operator })
        }
        return value
      }
    } else {
      console.error("PARSE RESULT",parameterName,openSearchQuery,EnumNumericalComparator.EQ)
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
    this.changeValue('firstField', undefined, undefined)
    this.changeValue('secondField', undefined, undefined)
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
    console.error("SEB",this.props,this.state)
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
          <NumericalCriteriaComponent // we are mapping on an object this is why we disable the lint next line
            key={'firstField'} // eslint-disable-line react/no-array-index-key
            attribute={'firstField'}
            attributeLabel={this.getAttributeLabel('firstField')}
            onChange={this.changeValue}
            comparator={this.state.operator1}
            value={this.state.firstField}
            fixedComparator={false}
          />
          <NumericalCriteriaComponent // we are mapping on an object this is why we disable the lint next line
            key={'secondField'} // eslint-disable-line react/no-array-index-key
            attribute={'secondField'}
            attributeLabel={this.getAttributeLabel('secondField')}
            onChange={this.changeValue}
            comparator={this.state.operator2}
            value={this.state.secondField}
            fixedComparator={false}
          />
          <ClearButton onTouchTap={this.handleClear} displayed={this.state.firstField || this.state.secondField} />
        </div>
      </div>
    )
  }
}

export default TwoNumericalCriteriaSimpleComponent
