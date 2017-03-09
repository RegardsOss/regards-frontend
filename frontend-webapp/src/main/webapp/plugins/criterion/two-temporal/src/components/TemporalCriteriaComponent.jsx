/**
 * LICENSE_PLACEHOLDER
 **/
import areIntlLocalesSupported from 'intl-locales-supported'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import { FormattedMessage } from 'react-intl'
import TemporalComparatorComponent from './TemporalComparatorComponent'
import EnumTemporalComparator from '../model/EnumTemporalComparator'
import {AttributeModel} from '../common/AttributeModel'

let DateTimeFormat

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(['fr'])) {
  DateTimeFormat = global.Intl.DateTimeFormat
} else {
  const IntlPolyfill = require('intl')
  DateTimeFormat = IntlPolyfill.DateTimeFormat
  require('intl/locale-data/jsonp/fr')
}

/**
 * Search form criteria plugin allowing the user to configure the temporal value of the passed attribute with a comparator.
 *
 * The following terminology for dates is used in this file:
 *
 * 2017-02-10   14:28
 * ----------  ------
 *    date      time
 *
 *  @author Xavier-Alexandre Brochard
 */
export class TemporalCriteriaComponent extends React.Component {

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
    attribute: AttributeModel,
    /**
     * Init with a specific comparator set.
     */
    comparator: React.PropTypes.oneOf(EnumTemporalComparator),
    /**
     * If true, the attribute name, comparator and and field will be rendered in reversed order
     * Default to false.
     */
    reversed: React.PropTypes.bool,
    /**
     * If true, the attribute name will not be rendered.
     * Default to false.
     */
    hideAttributeName: React.PropTypes.bool,
  }

  static defaultProps = {
    reversed: false,
    hideAttributeName: false,
  }

  constructor(props) {
    super(props)
    this.state = {
      value: undefined,
      comparator: props.comparator || 'is',
    }
  }

  /**
   * Callback function that is fired when the date value changes.
   *
   * @param {Object} event Change event targetting the text field.
   * @param {String} newValue The new value of the text field.
   */
  handleChangeDate = (event, newValue) => {
    const { attribute, pluginInstanceId, onChange } = this.props
    const { value, comparator } = this.state

    // Pick the time part from the time picker
    if (value) {
      newValue.setHours(value.getHours(), value.getMinutes(), value.getSeconds(), value.getMilliseconds())
    }

    this.setState({
      value: newValue,
    })
    onChange({
      attribute,
      comparator,
      value: newValue,
    }, pluginInstanceId)
  }

  /**
   * Callback function that is fired when the time value changes.
   *
   * @param {Object} event Change event targetting the text field.
   * @param {String} newValue The new value of the text field.
   */
  handleChangeTime = (event, newValue) => {
    const { attribute, pluginInstanceId, onChange } = this.props
    const { value, comparator } = this.state

    // Pick the date part from the the date picker
    if (value) {
      newValue.setFullYear(value.getFullYear(), value.getMonth(), value.getDate())
    }

    this.setState({
      value: newValue,
    })
    onChange({
      attribute,
      comparator,
      value: newValue,
    }, pluginInstanceId)
  }

  /**
   * Callback function that is fired when the date comparator changes.
   *
   * @param {String} comparator
   */
  handleChangeComparator = (comparator) => {
    this.setState({
      comparator,
    })
  }

  render() {
    const { attribute, reversed, hideAttributeName } = this.props
    const { value, comparator } = this.state

    // Store the content in an array because we need to maybe reverse to order
    const content = []
    if (!hideAttributeName) {
      content.push(<span key="attributeName" style={{ margin: '0px 10px' }}>{attribute.name}</span>)
    }
    content.push(
      <TemporalComparatorComponent key="comparator" value={comparator} onChange={this.handleChangeComparator} />,
    )
    content.push([
      <DatePicker
        value={value}
        onChange={this.handleChangeDate}
        DateTimeFormat={DateTimeFormat}
        locale="fr"
        hintText={<FormattedMessage id="criterion.date.field.label" />}
        floatingLabelText={<FormattedMessage id="criterion.date.field.label" />}
        okLabel={<FormattedMessage id="criterion.date.picker.ok" />}
        cancelLabel={<FormattedMessage id="criterion.date.picker.cancel" />}
        style={{
          margin: '0px 10px',
        }}
        textFieldStyle={{
          maxWidth: 85,
          top: -13,
        }}
      />,
      <TimePicker
        value={value}
        onChange={this.handleChangeTime}
        format="24hr"
        floatingLabelText={<FormattedMessage id="criterion.time.field.label" />}
        hintText={<FormattedMessage id="criterion.time.field.label" />}
        okLabel={<FormattedMessage id="criterion.time.picker.ok" />}
        cancelLabel={<FormattedMessage id="criterion.time.picker.cancel" />}
        style={{
          marginRight: 10,
        }}
        textFieldStyle={{
          maxWidth: 40,
          top: -13,
        }}
      />,
    ])

    if (reversed) content.reverse()

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        {content}
      </div>
    )
  }
}

export default TemporalCriteriaComponent
