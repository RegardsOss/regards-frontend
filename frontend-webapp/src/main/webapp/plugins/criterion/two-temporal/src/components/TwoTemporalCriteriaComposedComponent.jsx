/**
 * LICENSE_PLACEHOLDER
 **/
import values from 'lodash/values'
import isNil from 'lodash/isNil'
import { FormattedMessage } from 'react-intl'
import TemporalCriteriaComponent from './TemporalCriteriaComponent'
import ClearButton from './ClearButton'
import AttributeModel from '../common/AttributeModel'
import EnumTemporalComparator from '../model/EnumTemporalComparator'
import PluginComponent from '../common/PluginComponent'

/**
 * Component allowing the user to configure the temporal value of a single attribute with two date comparators (before, after, ...).
 * For example, it will display:
 *   23/02/2017 08:00 < [attributeName] < 23/02/2017 12:00
 *
 * The plugin's output is the execution of the passed {@code onChange} prop.
 *
 * @author Xavier-Alexandre Brochard
 */
export class TwoTemporalCriteriaComposedComponent extends PluginComponent {

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

  getPluginSearchQuery = (state) => {
    const { firstField, secondField } = state
    const lvalue1 = firstField ? firstField.toISOString() : '*'
    const lvalue2 = secondField ? secondField.toISOString() : '*'
    let searchQuery = ''
    if (firstField || secondField) {
      searchQuery = `${this.getAttributeName('firstField')}:[${lvalue1} TO ${lvalue2}]`
    }
    return searchQuery
  }

  parseOpenSearchQuery = (parameterName, openSearchQuery) => {
    const groups = openSearchQuery.match(/\[[ ]{0,1}([^ ]*) TO ([^ ]*)[ ]{0,1}\]/)
    if (groups.length === 3) {
      if (parameterName === 'firstField') {
        return new Date(groups[1])
      }
      return new Date(groups[2])
    }
    return openSearchQuery
  }

  /**
   * Clear the entered values
   */
  handleClear = () => {
    this.changeValue1(undefined)
    this.changeValue2(undefined)
  }

  render() {
    const { attributes } = this.props
    const { firstField, secondField } = this.state
    const attribute = values(attributes)[0]
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
          <span style={{ margin: '0px 10px' }}>{attribute.name}
            <FormattedMessage id="criterion.aggregator.between"/>
          </span>
          <TemporalCriteriaComponent
            label={this.getAttributeLabel('firstField')}
            comparator={EnumTemporalComparator.GE}
            value={firstField}
            onChange={this.changeValue1}
            hideAttributeName
            hideComparator
          />
          <FormattedMessage id="criterion.aggregator.and"/>
          <TemporalCriteriaComponent
            label={this.getAttributeLabel('secondField')}
            comparator={EnumTemporalComparator.LE}
            value={secondField}
            onChange={this.changeValue2}
            hideAttributeName
            hideComparator
          />
          <ClearButton onTouchTap={this.handleClear} displayed={clearButtonDisplayed}/>
        </div>
      </div>
    )
  }
}

export default TwoTemporalCriteriaComposedComponent
