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
import Close from 'mdi-material-ui/Close'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Clear filters renderer
 * @author Kévin Picart
 */
export class SessionsMonitoringFilterClearComponent extends React.Component {
  static propTypes = {
    onClearFilters: PropTypes.func.isRequired,
    canEmptyFilters: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { onClearFilters, canEmptyFilters } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <FlatButton
        label={formatMessage({ id: 'acquisition-sessions.filters.reset' })}
        icon={<Close />}
        disabled={!canEmptyFilters}
        // disabled={!this.state.filters.id && !this.state.filters.to && !this.state.filters.from}
        onClick={onClearFilters}
      />
    )
  }
}
