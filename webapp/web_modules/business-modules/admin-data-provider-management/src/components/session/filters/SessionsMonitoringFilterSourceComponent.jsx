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

import TextField from 'material-ui/TextField'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/**
 * Source filter
 * @author Kévin Picart
 */
export class SessionsMonitoringFilterSourceComponent extends React.Component {
  static propTypes = {
    onChangeSource: PropTypes.func.isRequired,
    source: PropTypes.string.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { onChangeSource, source } = this.props
    const { intl: { formatMessage }, moduleTheme } = this.context
    return (
      <TextField
      // style={filter.fieldStyle}
        hintText={formatMessage({ id: 'acquisition-sessions.filters.source' })}
        onChange={onChangeSource}
        defaultValue={source}
      />
    )
  }
}
