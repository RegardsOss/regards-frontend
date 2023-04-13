/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import FlatButton from 'material-ui/FlatButton'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * @author Théo Lasserre
 */
class DateMenuComponent extends React.Component {
  static propTypes = {}

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static DATE_OPTIONS = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZone: 'utc',
  }

  state = {
    time: Date.now(),
  }

  componentDidMount() {
    setInterval(() => this.setState({ time: Date.now() }), 1000)
  }

  render() {
    const { time } = this.state
    const { intl: { formatDate }, moduleTheme: { user: { dateStyle } } } = this.context
    return (
      <FlatButton
        label={`${formatDate(time, DateMenuComponent.DATE_OPTIONS)} UTC`}
        disabled
        labelStyle={dateStyle}
      />
    )
  }
}
export default DateMenuComponent
