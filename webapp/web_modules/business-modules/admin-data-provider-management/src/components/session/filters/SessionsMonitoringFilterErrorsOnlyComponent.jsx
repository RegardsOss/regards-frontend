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

import { TableHeaderCheckbox } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Filter ErrorOnly
 * @author Kévin Picart
 */
export class SessionsMonitoringFilterErrorsOnlyComponent extends React.Component {
  static propTypes = {
    onToggleErrorsOnly: PropTypes.func.isRequired,
    errorsOnly: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { onToggleErrorsOnly, errorsOnly } = this.props
    const { intl: { formatMessage }, moduleTheme: { sessionsStyles: { filters: { checkboxLabel } } } } = this.context

    return (
      <TableHeaderCheckbox
        label={formatMessage({ id: 'acquisition-sessions.filters.errors-only' })}
        onCheck={onToggleErrorsOnly}
        checked={errorsOnly}
        labelStyle={checkboxLabel}
      />
    )
  }
}
