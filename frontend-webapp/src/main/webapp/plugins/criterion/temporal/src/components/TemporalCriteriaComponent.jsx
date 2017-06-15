/**
 * LICENSE_PLACEHOLDER
 **/
import areIntlLocalesSupported from 'intl-locales-supported'
import DatePicker from 'material-ui/DatePicker'
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

  state = {
    searchField: undefined,
    comparator: EnumTemporalComparator.IS,
  }

  /**
   * Callback function that is fired when the date value changes.
   *
   * @param {Object} event Change event targetting the text field.
   * @param {String} newValue The new value of the text field.
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
   * @param {String} newValue The new value of the text field.
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
   * Callback function that is fired when the date comparator changes.
   *
   * @param {String} comparator
   */
  handleChangeComparator = comparator => this.setState({ comparator })

  /**
   * Clear the entered date & time values
   */
  handleClear = () => this.setState({ searchField: undefined })

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
        case EnumTemporalComparator.IS :
          query = `${attribute}:${state.searchField.toISOString()}`
          break
        case EnumTemporalComparator.NOT :
          query = `${attribute}:!${state.searchField.toISOString()}`
          break
        default :
          console.error('Unavailable comparator')
      }
    }

    return query
  }

  parseOpenSearchQuery = (parameterName, openSearchQuery) => {
    console.log('TemporalCriteriaComponent::parseOpenSearchQuery')
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
    console.log('TemporalCriteriaComponent::render')
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
        <ClearButton onTouchTap={this.handleClear} displayed={clearButtonDisplayed}/>
      </div>
    )
  }
}

export default TemporalCriteriaComponent
