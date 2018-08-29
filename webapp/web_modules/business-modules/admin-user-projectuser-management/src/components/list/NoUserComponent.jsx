/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { i18nContextType } from '@regardsoss/i18n'
import { NoContentComponent } from '@regardsoss/components'

/**
 * Shows no user message when there is no user to display in project users table
 * @author Raphaël Mechali
 */
class NoUserComponent extends React.Component {
  static propTypes = {
    hasFilter: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { hasFilter } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <NoContentComponent
        title={formatMessage({ id: 'projectUser.list.table.no.content.title' })}
        message={formatMessage({ id: hasFilter ? 'projectUser.list.table.no.content.with.filter.message' : 'projectUser.list.table.no.content.without.filter.message' })}
      />
    )
  }
}
export default NoUserComponent