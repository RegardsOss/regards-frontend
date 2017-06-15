/**
 * LICENSE_PLACEHOLDER
 **/
import values from 'lodash/values'
import areIntlLocalesSupported from 'intl-locales-supported'
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import { FormattedMessage } from 'react-intl'
import TemporalComparatorComponent from './TemporalComparatorComponent'
import EnumTemporalComparator from '../model/EnumTemporalComparator'

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
     * Callback to change the current criteria values in form
     * Parameters :
     * value: The value of the field as a Date
     * comparator: EnumTemporalComparator
     */
    onChange: React.PropTypes.func,
    /**
     * Label of the field displayed
     */
    label: React.PropTypes.string.isRequired,
    /**
     * Init with a specific comparator set.
     */
    comparator: React.PropTypes.oneOf(values(EnumTemporalComparator)),
    /**
     * Default value
     */
    value: React.PropTypes.instanceOf(Date),
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
    /**
     * If true, the comparator will not be rendered.
     * Default to false.
     */
    hideComparator: React.PropTypes.bool,
  }

  static defaultProps = {
    reversed: false,
    hideAttributeName: false,
    hideComparator: false,
    value: undefined,
    comparator: EnumTemporalComparator.EQ,
  }

  /**
   * Callback function that is fired when the date value changes.
   *
   * @param {Object} event Change event targetting the text field.
   * @param {String} newValue The new value of the text field.
   */
  handleChangeDate = (event, newValue) => {
    const { onChange, value, comparator } = this.props
    // Pick the time part from the time picker
    if (value) {
      newValue.setHours(value.getHours(), value.getMinutes(), value.getSeconds(), value.getMilliseconds())
    }
    onChange(newValue, comparator)
  }

  /**
   * Callback function that is fired when the time value changes.
   *
   * @param {Object} event Change event targetting the text field.
   * @param {String} newValue The new value of the text field.
   */
  handleChangeTime = (event, newValue) => {
    const { onChange, value, comparator } = this.props
    // Pick the date part from the the date picker
    if (value) {
      newValue.setFullYear(value.getFullYear(), value.getMonth(), value.getDate())
    }
    onChange(newValue, comparator)
  }

  /**
   * Callback function that is fired when the date comparator changes.
   *
   * @param {String} comparator
   */
  handleChangeComparator = (comparator) => {
    const { onChange, value } = this.props
    onChange(value, comparator)
  }

  render() {
    const { label, comparator, value, reversed, hideAttributeName, hideComparator } = this.props

    // Store the content in an array because we need to maybe reverse to order
    const content = []
    if (!hideAttributeName) {
      content.push(<span key="label" style={{
        margin: '0px 10px',
        fontSize: '1.3em',
      }}>{label}</span>)
    }
    if (!hideComparator) {
      content.push(
        <TemporalComparatorComponent key="comparator" value={comparator} onChange={this.handleChangeComparator}/>,
      )
    }
    content.push([
      <DatePicker
        key={`${label}.date`}
        value={value}
        onChange={this.handleChangeDate}
        DateTimeFormat={DateTimeFormat}
        locale="fr"
        hintText={<FormattedMessage id="criterion.date.field.label"/>}
        floatingLabelText={<FormattedMessage id="criterion.date.field.label"/>}
        okLabel={<FormattedMessage id="criterion.date.picker.ok"/>}
        cancelLabel={<FormattedMessage id="criterion.date.picker.cancel"/>}
        style={{
          margin: '0px 10px',
        }}
        textFieldStyle={{
          maxWidth: 85,
          top: -13,
        }}
      />,
      <TimePicker
        key={`${label}.time`}
        value={value}
        onChange={this.handleChangeTime}
        format="24hr"
        floatingLabelText={<FormattedMessage id="criterion.time.field.label"/>}
        hintText={<FormattedMessage id="criterion.time.field.label"/>}
        okLabel={<FormattedMessage id="criterion.time.picker.ok"/>}
        cancelLabel={<FormattedMessage id="criterion.time.picker.cancel"/>}
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
