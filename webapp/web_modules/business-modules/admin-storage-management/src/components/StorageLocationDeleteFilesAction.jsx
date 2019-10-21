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
import DeleteFiles from 'mdi-material-ui/FileExcel'
import { StorageShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import IconButton from 'material-ui/IconButton'
import { withResourceDisplayControl } from '@regardsoss/display-control'
import { RequestVerbEnum } from '@regardsoss/store-utils'
import { storageLocationActions } from '../clients/StorageLocationClient'

const IconButtonWithResources = withResourceDisplayControl(IconButton)
/**
 * Delete Storage Files Button
 * @author Kévin Picart
 */
class StorageLocationDeleteFilesAction extends React.Component {
  static propTypes = {
    entity: StorageShapes.StorageLocation,
    onDeleteFiles: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static iconStyle = { height: 23, width: 23 }

  static buttonStyle = { padding: 0, height: 30, width: 30 }

  render() {
    const { intl: { formatMessage } } = this.context
    const { entity } = this.props
    return (
      <IconButtonWithResources
        title={formatMessage({ id: 'storage.location.list.delete-files.button' })}
        iconStyle={StorageLocationDeleteFilesAction.iconStyle}
        style={StorageLocationDeleteFilesAction.buttonStyle}
        onClick={() => this.props.onDeleteFiles(entity)}
        resourceDependencies={storageLocationActions.getDependency(RequestVerbEnum.POST)}
        hideDisabled={false}
      >
        <DeleteFiles />
      </IconButtonWithResources>
    )
  }
}
export default StorageLocationDeleteFilesAction
