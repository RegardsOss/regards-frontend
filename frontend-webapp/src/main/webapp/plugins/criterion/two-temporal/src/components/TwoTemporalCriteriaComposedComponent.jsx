/**
 * LICENSE_PLACEHOLDER
 **/
import { merge, values } from 'lodash'
import { FormattedMessage } from 'react-intl'
import TemporalCriteriaComponent from './TemporalCriteriaComponent'
import {AttributeModel,getAttributeName} from '../common/AttributeModel'
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
    },this._onPluginChangeValue)
  }

  getPluginSearchQuery = (state) => {
    const attribute = values(this.props.attributes)[0]
    const lvalue1 = state.value1 ? state.value1.toISOString() : '*'
    const lvalue2 = state.value2 ? state.value2.toISOString() : '*'
    let searchQuery=''
    if (state.value1 || state.value2) {
      searchQuery= `${getAttributeName(attribute)}:[${lvalue1} TO ${lvalue2}]`
    }
    return searchQuery
  }

  render() {
    const { attributes } = this.props
    const attribute = values(attributes)[0]

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
          <span style={{ margin: '0px 10px' }}>{attribute.name} <FormattedMessage id="criterion.aggregator.between" /></span>
          <TemporalCriteriaComponent
            attribute={attribute}
            onChange={this.changeValue1}
            comparator={EnumTemporalComparator.GE}
            value={this.state.value1}
            hideAttributeName
            hideComparator
          />
          <span style={{ marginRight: 10 }}><FormattedMessage id="criterion.aggregator.and" /></span>
          <TemporalCriteriaComponent
            attribute={attribute}
            onChange={this.changeValue2}
            value={this.state.value2}
            comparator={EnumTemporalComparator.LE}
            hideAttributeName
            hideComparator
          />
        </div>
      </div>
    )
  }
}

export default TwoTemporalCriteriaComposedComponent
