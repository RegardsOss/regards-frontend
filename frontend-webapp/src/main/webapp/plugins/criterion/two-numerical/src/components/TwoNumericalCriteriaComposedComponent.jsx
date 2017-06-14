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
      value1: undefined,
      value2: undefined,
    }
  }

  changeValue1 = (attribute, value, comparator) => {
    this.setState({
      value1: value,
    }, this._onPluginChangeValue)
  }

  changeValue2 = (attribute, value, comparator) => {
    this.setState({
      value2: value,
    }, this._onPluginChangeValue)
  }

  getPluginSearchQuery = (state) => {
    const attribute = values(this.props.attributes)[0]
    const lvalue1 = state.value1 || '*'
    const lvalue2 = state.value2 || '*'
    let searchQuery = ''
    if (state.value1 || state.value2) {
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
    const { attributes } = this.props
    const { value1, value2 } = this.state
    const attribute = values(attributes)[0]
    console.log("coucou")
    const clearButtonDisplayed = !isNil(value1) || !isNil(value2)

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
          <span style={{ margin: '0px 10px' }}>{attribute.name} <FormattedMessage
            id="criterion.aggregator.between"/></span>
          <NumericalCriteriaComponent
            attribute={attribute}
            onChange={this.changeValue1}
            value={this.state.value1}
            comparator={EnumNumericalComparator.LE}
            hideAttributeName
            hideComparator
            reversed
            fixedComparator
          />
          <span style={{ marginRight: 10 }}><FormattedMessage id="criterion.aggregator.and"/></span>
          <NumericalCriteriaComponent
            attribute={attribute}
            onChange={this.changeValue2}
            value={this.state.value2}
            comparator={EnumNumericalComparator.LE}
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
