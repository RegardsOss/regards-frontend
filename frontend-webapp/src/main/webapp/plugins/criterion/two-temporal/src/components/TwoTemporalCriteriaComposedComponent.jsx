/**
 * LICENSE_PLACEHOLDER
 **/
import { values } from 'lodash'
import { FormattedMessage } from 'react-intl'
import TemporalCriteriaComponent from './TemporalCriteriaComponent'
import {AttributeModel,getAttributeName} from '../common/AttributeModel'
import EnumTemporalComparator from '../model/EnumTemporalComparator'

/**
 * Component allowing the user to configure the temporal value of a single attribute with two date comparators (before, after, ...).
 * For example, it will display:
 *   23/02/2017 08:00 < [attributeName] < 23/02/2017 12:00
 *
 * The plugin's output is the execution of the passed {@code onChange} prop.
 *
 * @author Xavier-Alexandre Brochard
 */
export class TwoTemporalCriteriaComposedComponent extends React.Component {

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
    this.state = {
      value1: null,
      value2: null,
    }
  }

  changeValue1 = (attribute, value, comparator) => {
    this.setState({
      value1: value,
    })
    this.props.onChange(this.criterionToOpenSearchFormat(value, this.state.value2), this.props.pluginInstanceId)
  }

  changeValue2 = (attribute, value, comparator) => {
    this.setState({
      value2: value,
    })
    this.props.onChange(this.criterionToOpenSearchFormat(this.state.value1, value), this.props.pluginInstanceId)
  }

  criterionToOpenSearchFormat = (value1, value2) => {
    const attribute = values(this.props.attributes)[0]
    const lvalue1 = value1 || '*'
    const lvalue2 = value2 || '*'
    return `${getAttributeName(attribute)}:[${lvalue1} TO ${lvalue2}]`
  }

  render() {
    const { attributes, pluginInstanceId, onChange } = this.props
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
            pluginInstanceId={pluginInstanceId}
            onChange={this.changeValue1}
            comparator={EnumTemporalComparator.GE}
            hideAttributeName
            hideComparator
          />
          <span style={{ marginRight: 10 }}><FormattedMessage id="criterion.aggregator.and" /></span>
          <TemporalCriteriaComponent
            attribute={attribute}
            pluginInstanceId={pluginInstanceId}
            onChange={this.changeValue2}
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
