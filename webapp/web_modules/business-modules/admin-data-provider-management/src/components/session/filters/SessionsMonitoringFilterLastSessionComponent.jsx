/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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

import { TableHeaderCheckbox } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
/**
 * Filter render for Last Session Only
 * @author Kévin Picart
 */
export class SessionsMonitoringFilterLastSessionComponent extends React.Component {
  static propTypes = {
    onToggleLastSession: PropTypes.func.isRequired,
    lastSession: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { onToggleLastSession, lastSession } = this.props
    const { intl: { formatMessage }, moduleTheme: { sessionsStyles: { filters: { checkboxLabel } } } } = this.context
    return (
      <TableHeaderCheckbox
        label={formatMessage({ id: 'acquisition-sessions.filters.last-session' })}
        onCheck={onToggleLastSession}
        checked={lastSession}
        labelStyle={checkboxLabel}
      />
    )
  }
}
