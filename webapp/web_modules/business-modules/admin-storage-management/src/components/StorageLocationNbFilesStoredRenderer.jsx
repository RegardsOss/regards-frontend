/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import get from 'lodash/get'
import { StorageShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import InfoIcon from 'mdi-material-ui/Information'
import IconButton from 'material-ui/IconButton'

/**
 * Show number of files stored
 * @author Théo Lasserre
 */
class StorageLocationNbFilesStoredRenderer extends React.Component {
  static propTypes = {
    entity: StorageShapes.StorageLocation,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { entity } = this.props
    const { intl: { formatMessage }, moduleTheme: { storageTable: { nbFilesStoredStyle: { container, iconStyle } } } } = this.context
    const nbFilesStoredWithPendingActionRemaining = get(entity, 'content.nbFilesStoredWithPendingActionRemaining', 0)
    const pendingActionRemaining = get(entity, 'content.pendingActionRemaining', false)
    const { nbFilesStored } = entity.content

    let message = nbFilesStoredWithPendingActionRemaining > 0
      ? `${formatMessage({ id: 'storage.location.list.column.nbFiles.pending' }, { storePendingCount: nbFilesStoredWithPendingActionRemaining })}. ` : ''
    message += pendingActionRemaining ? formatMessage({ id: 'storage.location.list.column.pendingActionRemaining' }) : ''

    return (
      <div style={container}>
        {nbFilesStored}
        {
          (nbFilesStoredWithPendingActionRemaining > 0 || pendingActionRemaining) && <IconButton
            title={message}
            iconStyle={iconStyle}
          >
            <InfoIcon />
          </IconButton>
        }
      </div>
    )
  }
}
export default StorageLocationNbFilesStoredRenderer
