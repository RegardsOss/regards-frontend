/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import isNaN from 'lodash/isNaN'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { selectUnit } from '@formatjs/intl-utils'

/**
 * Component to display Date values group value
 * Note: this component API is compatible with a ValuesRenderCell, in infinite tables
 *
 * @author Sébastien binda
 */
class DateRelativeValueRender extends React.Component {
  /**
   * Formats a date using intl and date text
   * @param {formatMessage: function, formatRelativeTime: function} intl intl context, with formatMessage,
   * formatDate and formatTime
   * @param dateText date text
   * @return formatted date text if valid or null if invalid
   */
  static getFormattedDate({ formatMessage, formatRelativeTime }, dateText, displayOnlyFutureDate) {
    if (!dateText) {
      return null
    }
    const dateWrapper = new Date(dateText)
    if (!isNaN(dateWrapper.getDate()) && (!displayOnlyFutureDate || (dateWrapper > Date.now()))) {
      const { value, unit } = selectUnit(dateWrapper)
      return formatRelativeTime(value, unit)
    }
    return null
  }

  static propTypes = {
    value: PropTypes.string,
    // should diplay using multiple lines? (false by default)
    multilineDisplay: PropTypes.bool,
    displayOnlyFutureDate: PropTypes.bool,
  }

  static defaultProps = {
    multilineDisplay: false,
    displayOnlyFutureDate: false,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    toDisplay: null,
  }

  setTimeOut = () => {
    this.timeOut = setTimeout(this.updateRelativeDate, 1000)
  }

  updateRelativeDate = () => {
    const { value, displayOnlyFutureDate } = this.props
    const { intl } = this.context
    this.setState({
      toDisplay: DateRelativeValueRender.getFormattedDate(intl, value, displayOnlyFutureDate) || intl.formatMessage({ id: 'value.render.no.value.label' }),
    }, this.setTimeOut)
  }

  UNSAFE_componentWillMount = () => {
    this.updateRelativeDate()
  }

  componentWillUnmount = () => {
    if (this.timeOut) {
      clearTimeout(this.timeOut)
    }
  }

  render() {
    const { multilineDisplay } = this.props
    const { moduleTheme: { textRenderCell, multilineTextRenderCell } } = this.context
    const { toDisplay } = this.state
    return (
      <div style={multilineDisplay ? multilineTextRenderCell : textRenderCell} title={toDisplay}>
        {toDisplay}
      </div>)
  }
}

export default DateRelativeValueRender
