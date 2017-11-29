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
import EmptyIcon from 'material-ui/svg-icons/file/folder-open'
import { NoContentComponent } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Simple no data component (to be statically rendered by DatasetFilesComponent)
 * @author Raphaël Mechali
 */
class NoOrderComponent extends React.Component {

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { intl: { formatMessage } } = this.context
    return (
      <NoContentComponent
        Icon={EmptyIcon}
        title={formatMessage({ id: 'files.list.no.file.information.title' })}
        message={formatMessage({ id: 'files.list.no.file.information.message' })}
      />
    )
  }
}
export default NoOrderComponent
