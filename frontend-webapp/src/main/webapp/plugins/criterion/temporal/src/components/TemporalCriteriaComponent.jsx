/**
 * LICENSE_PLACEHOLDER
 **/
import areIntlLocalesSupported from 'intl-locales-supported'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import { FormattedMessage } from 'react-intl'
import TemporalComparatorComponent from './TemporalComparatorComponent'

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
    pluginInstanceId: React.PropTypes.number,
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
    attributes: React.PropTypes.object,
  }

  constructor(props) {
    super(props)
    this.state = {
      value: undefined,
      comparator: 'is',
    }
  }

  /**
   * Callback function that is fired when the date value changes.
   *
   * @param {Object} event Change event targetting the text field.
   * @param {String} newValue The new value of the text field.
   */
  handleChangeDate = (event, newValue) => {
    const { attributes, pluginInstanceId, onChange } = this.props
    const { value, comparator } = this.state

    // Pick the time part from the time picker
    if (value) {
      newValue.setHours(value.getHours(), value.getMinutes(), value.getSeconds(), value.getMilliseconds())
    }

    this.setState({
      value: newValue,
    })
    onChange({
      attribute: attributes.searchField,
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
    const { attributes, pluginInstanceId, onChange } = this.props
    const { value, comparator } = this.state

    // Pick the date part from the the date picker
    if (value) {
      newValue.setFullYear(value.getFullYear(), value.getMonth(), value.getDate())
    }

    this.setState({
      value: newValue,
    })
    onChange({
      attribute: attributes.searchField,
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
    const attributeLabel = this.props.attributes && this.props.attributes.searchField && this.props.attributes.searchField.name
    const { value, comparator } = this.state

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            margin: '0px 10px',
          }}
        >
          {attributeLabel}
        </span>
        <TemporalComparatorComponent onChange={this.handleChangeComparator} value={comparator} />
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
        />
        <TimePicker
          value={value}
          onChange={this.handleChangeTime}
          format="24hr"
          floatingLabelText={<FormattedMessage id="criterion.time.field.label" />}
          hintText={<FormattedMessage id="criterion.time.field.label" />}
          okLabel={<FormattedMessage id="criterion.time.picker.ok" />}
          cancelLabel={<FormattedMessage id="criterion.time.picker.cancel" />}
          textFieldStyle={{
            maxWidth: 40,
            top: -13,
          }}
        />
      </div>
    )
  }
}

export default TemporalCriteriaComponent
