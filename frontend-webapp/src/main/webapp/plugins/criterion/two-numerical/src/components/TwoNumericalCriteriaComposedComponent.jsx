/**
 * LICENSE_PLACEHOLDER
 **/
import isNil from 'lodash/isNil'
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

  changeValue1 = (value) => {
    this.setState({
      firstField: value,
    })
  }

  changeValue2 = (value) => {
    this.setState({
      secondField: value,
    })
  }

  parseOpenSearchQuery = (parameterName, openSearchQuery) => {
    const groups = openSearchQuery.match(/\[[ ]{0,1}([0-9\*]*) TO ([0-9\*]*)[ ]{0,1}\]/)
    if (groups.length === 3) {
      if (parameterName === 'firstField') {
        return groups[1]
      }
      return groups[2]
    }
    return openSearchQuery
  }

  getPluginSearchQuery = (state) => {
    const { firstField, secondField } = state
    const lvalue1 = firstField || '*'
    const lvalue2 = secondField || '*'
    let searchQuery = ''
    if (firstField || secondField) {
      searchQuery = `${this.getAttributeName('firstField')}:[${lvalue1} TO ${lvalue2}]`
    }
    return searchQuery
  }

  /**
   * Clear the entered values
   */
  handleClear = () => {
    this.changeValue1(undefined)
    this.changeValue2(undefined)
  }

  render() {
    const { firstField, secondField } = this.state
    const clearButtonDisplayed = !isNil(firstField) || !isNil(secondField)

    const labelStyle = {
      margin: '0px 10px',
    }

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
          <span style={labelStyle}>
            {this.getAttributeLabel('firstField')} <FormattedMessage id="criterion.aggregator.between"/>
          </span>
          <NumericalCriteriaComponent
            label={this.getAttributeLabel('firstField')}
            value={firstField}
            comparator={EnumNumericalComparator.LE}
            onChange={this.changeValue1}
            hideAttributeName
            hideComparator
            reversed
            fixedComparator
          />
          <span style={{ marginRight: 10 }}><FormattedMessage id="criterion.aggregator.and"/></span>
          <NumericalCriteriaComponent
            label={this.getAttributeLabel('secondField')}
            value={secondField}
            comparator={EnumNumericalComparator.GE}
            onChange={this.changeValue2}
            hideAttributeName
            hideComparator
            fixedComparator
          />
          <ClearButton onTouchTap={this.handleClear} displayed={clearButtonDisplayed}/>
        </div>
      </div>
    )
  }
}

export default TwoNumericalCriteriaComposedComponent
