/**
 * LICENSE_PLACEHOLDER
 **/
import areIntlLocalesSupported from 'intl-locales-supported'
import DatePicker from 'material-ui/DatePicker'
import IconButton from 'material-ui/IconButton'
import TimePicker from 'material-ui/TimePicker'
import Clear from 'material-ui/svg-icons/content/clear'
import { FormattedMessage } from 'react-intl'
import TemporalComparatorComponent from './TemporalComparatorComponent'
import AttributeModel from '../common/AttributeModel'
import EnumTemporalComparator from '../model/EnumTemporalComparator'
import PluginComponent from '../common/PluginComponent'

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
export class TemporalCriteriaComponent extends PluginComponent {

  static propTypes = {
    attributes: React.PropTypes.objectOf(AttributeModel),
  }

  constructor(props) {
    super(props)
    this.state = {
      value: undefined,
      comparator: EnumTemporalComparator.IS,
    }
  }

  /**
   * Callback function that is fired when the date value changes.
   *
   * @param {Object} event Change event targetting the text field.
   * @param {String} newValue The new value of the text field.
   */
  handleChangeDate = (event, newValue) => {
    const { value } = this.state
    // Pick the time part from the time picker
    if (value) {
      newValue.setHours(value.getHours(), value.getMinutes(), value.getSeconds(), value.getMilliseconds())
    }
    this.setState({ value: newValue })
  }

  /**
   * Callback function that is fired when the time value changes.
   *
   * @param {Object} event Change event targetting the text field.
   * @param {String} newValue The new value of the text field.
   */
  handleChangeTime = (event, newValue) => {
    const { value } = this.state
    // Pick the date part from the the date picker
    if (value) {
      newValue.setFullYear(value.getFullYear(), value.getMonth(), value.getDate())
    }
    this.setState({ value: newValue })
  }

  /**
   * Callback function that is fired when the date comparator changes.
   *
   * @param {String} comparator
   */
  handleChangeComparator = (comparator) => {
    this.setState({
      comparator,
    }, this._onPluginChangeValue)
  }

  /**
   * Clear the entered date & time values
   */
  handleClear = () => {
    this.setState({
      value: undefined,
    }, this._onPluginChangeValue)
  }

  getPluginSearchQuery = (state) => {
    let query = ''
    const attribute = this.getAttributeName('searchField')
    if (state.value && state.comparator) {
      switch (state.comparator) {
        case EnumTemporalComparator.BEFORE:
          query = `${attribute}:[* TO ${state.value.toISOString()}]`
          break
        case EnumTemporalComparator.AFTER :
          query = `${attribute}:[${state.value.toISOString()} TO *]`
          break
        case EnumTemporalComparator.IS :
          query = `${attribute}:${state.value.toISOString()}`
          break
        case EnumTemporalComparator.NOT :
          query = `${attribute}:!${state.value.toISOString()}`
          break
        default :
          console.error("Unavailable comparator")
      }
    }

    return query

  }

  render() {
    const attributeLabel = this.getAttributeLabel('searchField')
    const { value, comparator } = this.state
    const iconButtonScale = value !== undefined ? 1 : 0

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
            fontSize: '1.3em'
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
        <IconButton
          tooltip={<FormattedMessage id="criterion.clear" />}
          style={{transform:`scale(${iconButtonScale})`}}
        >
          <Clear onTouchTap={this.handleClear}/>
        </IconButton>
      </div>
    )
  }
}

export default TemporalCriteriaComponent
