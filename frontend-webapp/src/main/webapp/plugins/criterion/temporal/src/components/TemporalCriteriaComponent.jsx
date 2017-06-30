/**
 * LICENSE_PLACEHOLDER
 **/
import areIntlLocalesSupported from 'intl-locales-supported'
import DatePicker from 'material-ui/DatePicker'
import TextField from 'material-ui/TextField'
import TimePicker from 'material-ui/TimePicker'
import { FormattedMessage } from 'react-intl'
import TemporalComparatorComponent from './TemporalComparatorComponent'
import ClearButton from './ClearButton'
import AttributeModel from '../common/AttributeModel'
import PluginComponent from '../common/PluginComponent'
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
 * 2017-02-10   14:28      59         234
 * ----------  ------   -------   ------------
 *    date      time    seconds   milliseconds
 *
 *  @author Xavier-Alexandre Brochard
 */
export class TemporalCriteriaComponent extends PluginComponent {

  static propTypes = {
    attributes: React.PropTypes.objectOf(AttributeModel),
  }

  state = {
    searchField: undefined,
    comparator: EnumTemporalComparator.BEFORE,
  }

  /**
   * Callback function that is fired when the date value changes.
   *
   * @param {Object} event Change event targetting the text field.
   * @param {Date} newValue The new value of the date field.
   */
  handleChangeDate = (event, newValue) => {
    const { searchField } = this.state
    // Pick the time part from the time picker
    if (searchField) {
      newValue.setHours(searchField.getHours(), searchField.getMinutes(), searchField.getSeconds(), searchField.getMilliseconds())
    }
    this.setState({ searchField: newValue })
  }

  /**
   * Callback function that is fired when the time value changes.
   *
   * @param {Object} event Change event targetting the text field.
   * @param {Date} newValue The new value of the time field.
   */
  handleChangeTime = (event, newValue) => {
    const { searchField } = this.state
    // Pick the date part from the the date picker
    if (searchField) {
      newValue.setFullYear(searchField.getFullYear(), searchField.getMonth(), searchField.getDate())
    }
    this.setState({ searchField: newValue })
  }

  /**
   * Callback function that is fired when the seconds value changes.
   *
   * @param {Object} event Change event targetting the text field.
   * @param {Integer} seconds The new value of the seconds field.
   */
  handleChangeSeconds = (event, seconds) => {
    const { searchField } = this.state
    const newValue = searchField || new Date()

    newValue.setSeconds(seconds)
    this.setState({ searchField: newValue })
  }

  /**
   * Callback function that is fired when the milliseconds value changes.
   *
   * @param {Object} event Change event targetting the text field.
   * @param {Integer} milliseconds The new value of the milliseconds field.
   */
  handleChangeMilliseconds = (event, milliseconds) => {
    const { searchField } = this.state
    const newValue = searchField || new Date()

    newValue.setMilliseconds(milliseconds)
    this.setState({ searchField: newValue })
  }

  /**
   * Callback function that is fired when the date comparator changes.
   *
   * @param {String} comparator
   */
  handleChangeComparator = comparator => this.setState({ comparator })

  /**
   * Clear the entered date & time values
   */
  handleClear = () => this.setState({ searchField: undefined })

  /**
   * Extract the seconds value to inject in the field input
   *
   * @param {Date} date
   */
  formatSeconds = date => date ? date.getSeconds() : ''

  /**
   * Extract the milliseconds value to inject in the field input
   *
   * @param {Date} date
   */
  formatMilliseconds = date => date ? date.getMilliseconds() : ''

  getPluginSearchQuery = (state) => {
    let query = ''
    const attribute = this.getAttributeName('searchField')
    if (state.searchField && state.comparator) {
      switch (state.comparator) {
        case EnumTemporalComparator.BEFORE:
          query = `${attribute}:[* TO ${state.searchField.toISOString()}]`
          break
        case EnumTemporalComparator.AFTER :
          query = `${attribute}:[${state.searchField.toISOString()} TO *]`
          break
        default :
          console.error('Unavailable comparator')
      }
    }

    return query
  }

  parseOpenSearchQuery = (parameterName, openSearchQuery) => {
    const values = openSearchQuery.match(/\[[ ]{0,1}([^ ]*) TO ([^ ]*)[ ]{0,1}\]/)
    if (values.length === 3) {
      if (values[1] === '*') {
        this.setState({ comparator: EnumTemporalComparator.BEFORE })
        return new Date(values[2])
      }
      if (values[2] === '*') {
        this.setState({ comparator: EnumTemporalComparator.AFTER })
        return new Date(values[1])
      }
    }
    return undefined
  }

  render() {
    const attributeLabel = this.getAttributeLabel('searchField')
    const { searchField, comparator } = this.state
    const clearButtonDisplayed = searchField !== undefined

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
            fontSize: '1.3em',
          }}
        >
          {attributeLabel}
        </span>
        <TemporalComparatorComponent onChange={this.handleChangeComparator} value={comparator}/>
        <DatePicker
          value={searchField}
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
        />
        <TimePicker
          value={searchField}
          onChange={this.handleChangeTime}
          format="24hr"
          floatingLabelText={<FormattedMessage id="criterion.time.field.label"/>}
          hintText={<FormattedMessage id="criterion.time.field.label"/>}
          okLabel={<FormattedMessage id="criterion.time.picker.ok"/>}
          cancelLabel={<FormattedMessage id="criterion.time.picker.cancel"/>}
          textFieldStyle={{
            maxWidth: 40,
            top: -13,
          }}
        />
        <TextField
          type="number"
          floatingLabelText={<FormattedMessage id="criterion.seconds.field.label"/>}
          value={this.formatSeconds(searchField)}
          onChange={this.handleChangeSeconds}
          style={{
            top: -13,
            maxWidth: 71,
            margin: '0px 10px',
          }}
        />
        <TextField
          type="number"
          floatingLabelText={<FormattedMessage id="criterion.milliseconds.field.label"/>}
          value={this.formatMilliseconds(searchField)}
          onChange={this.handleChangeMilliseconds}
          style={{
            top: -13,
            maxWidth: 95,
            margin: '0px 10px',
          }}
        />
        <ClearButton onTouchTap={this.handleClear} displayed={clearButtonDisplayed}/>
      </div>
    )
  }
}

export default TemporalCriteriaComponent
