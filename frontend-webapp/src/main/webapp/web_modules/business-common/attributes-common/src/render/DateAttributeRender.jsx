/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import compose from 'lodash/fp/compose'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import messages from '../i18n'
import styles from '../styles'

/**
 * Formats a date using intl and date text
 * @param {formatMessage: function, formatDate: function, formatTime: function} intl intl context, with formatMessage,
 * formatDate and formatTime
 * @param dateText date text
 * @return formatted date text if valid or null if invalid
 */
export const getFormattedDate = ({ formatMessage, formatDate, formatTime }, dateText) => {
  const dateWrapper = new Date(dateText)
  if (!isNaN(dateWrapper.getDate())) {
    return formatMessage({ id: 'attribute.render.date.value' }, {
      date: formatDate(dateWrapper),
      time: formatTime(dateWrapper),
    })
  }
  return null
}

/**
 * Component to display Date attributes group value
 *
 * @author Sébastien binda
 */
class DateAttributeRender extends React.Component {

  static propTypes = {
    value: PropTypes.string,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const { value } = this.props
    const { intl, moduleTheme: { textRenderCell } } = this.context
    const textValue = getFormattedDate(intl, value) || intl.formatMessage({ id: 'attribute.render.no.value.label' })
    return (
      <div style={textRenderCell} title={textValue}>
        {textValue}
      </div>)
  }

}

export default compose(withModuleStyle(styles, true), withI18n(messages, true))(DateAttributeRender)
