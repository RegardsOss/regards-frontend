/**
 * LICENSE_PLACEHOLDER
 **/
import { values, forEach, isNil } from 'lodash'
import { FormattedMessage } from 'react-intl'
import NumericalCriteriaComponent from './NumericalCriteriaComponent'
import AttributeModel from '../common/AttributeModel'
import EnumNumericalComparator from '../model/EnumNumericalComparator'
import PluginComponent from '../common/PluginComponent'
import ClearButton from './ClearButton'

/**
 * Component allowing the user to configure the numerical value of a single attribute with two mathematical comparators (=, >, <=, ...).
 * For example, it will display:
 *   1400 < [attributeName] < 15
 *
 * The plugin's output is the execution of the passed {@code onChange} prop.
 *
 * @author Xavier-Alexandre Brochard
 */
export class TwoNumericalCriteriaComposedComponent extends PluginComponent {

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
    this.state = {
      firstField: undefined,
      secondField: undefined,
    }
  }

  changeValue = (attribute, value, comparator) => {
    const newState = {}
    newState[attribute] = value
    this.setState(newState)
  }

  parseOpenSearchQuery = (parameterName, openSearchQuery) => {
    const values = openSearchQuery.match(/\[[ ]{0,1}([0-9\*]*) TO ([0-9\*]*)[ ]{0,1}\]/)
    if (values.length === 3) {
      if (parameterName === 'firstField') {
        return values[1]
      }
      return values[2]
    }
    return openSearchQuery
  }

  getPluginSearchQuery = (state) => {
    const lvalue1 = state.firstField || '*'
    const lvalue2 = state.secondField || '*'
    let searchQuery = ''
    if (state.firstField || state.secondField) {
      searchQuery = `${this.getAttributeName('firstField')}:[${lvalue1} TO ${lvalue2}]`
    }
    return searchQuery
  }

  /**
   * Clear the entered values
   */
  handleClear = () => {
    this.changeValue1(undefined, undefined, undefined)
    this.changeValue2(undefined, undefined, undefined)
  }

  render() {
    const { firstField, secondField } = this.state
    const clearButtonDisplayed = !isNil(firstField) || !isNil(secondField)

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

          <span style={{ margin: '0px 10px' }}>{this.getAttributeLabel('firstField')} <FormattedMessage
            id="criterion.aggregator.between"
          /></span>
          <NumericalCriteriaComponent
            attribute={'firstField'}
            attributeLabel={this.getAttributeLabel('firstField')}
            onChange={this.changeValue}
            value={firstField}
            comparator={EnumNumericalComparator.LE}
            hideAttributeName
            hideComparator
            reversed
            fixedComparator
          />
          <span style={{ marginRight: 10 }}><FormattedMessage id="criterion.aggregator.and" /></span>
          <NumericalCriteriaComponent
            attribute={'secondField'}
            attributeLabel={this.getAttributeLabel('secondField')}
            onChange={this.changeValue}
            value={secondField}
            comparator={EnumNumericalComparator.LE}
            hideAttributeName
            hideComparator
            fixedComparator
          />
          <ClearButton onTouchTap={this.handleClear} displayed={clearButtonDisplayed} />
        </div>
      </div>
    )
  }
}

export default TwoNumericalCriteriaComposedComponent
