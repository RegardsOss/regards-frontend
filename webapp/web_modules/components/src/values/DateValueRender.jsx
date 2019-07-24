/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

const DATE_OPTIONS = {
  timeZone: 'utc',
}

const TIME_OPTIONS = {
  timeZone: 'utc',
}

/**
 * Formats a date using intl and date text
 * @param {formatMessage: function, formatDate: function, formatTime: function} intl intl context, with formatMessage,
 * formatDate and formatTime
 * @param dateText date text
 * @return formatted date text if valid or null if invalid
 */
export const getFormattedDate = ({ formatMessage, formatDate, formatTime }, dateText) => {
  if (!dateText) {
    return null
  }
  const dateWrapper = new Date(dateText)
  if (!isNaN(dateWrapper.getDate())) {
    return formatMessage({ id: 'value.render.date.value' }, {
      date: formatDate(dateWrapper, DATE_OPTIONS),
      time: formatTime(dateWrapper, TIME_OPTIONS),
    })
  }
  return null
}

/**
 * Component to display Date values group value
 * Note: this component API is compatible with a ValuesRenderCell, in infinite tables
 *
 * @author Sébastien binda
 */
class DateValueRender extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    // should diplay using multiple lines? (false by default)
    multilineDisplay: PropTypes.bool,
  }

  static defaultProps = {
    multilineDisplay: false,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { value, multilineDisplay } = this.props
    const { intl, moduleTheme: { textRenderCell, multilineTextRenderCell } } = this.context
    const textValue = getFormattedDate(intl, value) || intl.formatMessage({ id: 'value.render.no.value.label' })
    return (
      <div style={multilineDisplay ? multilineTextRenderCell : textRenderCell} title={textValue}>
        {textValue}
      </div>)
  }
}

export default DateValueRender
