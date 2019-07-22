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
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { CardHeader } from 'material-ui/Card'
import { StorageShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import StorageSelectionCheckbox from './StorageSelectionCheckbox'

/**
 * Dialog component to select storages over which the selected AIPs should be deleted
 * @author Raphaël Mechali
 */
class DeleteAIPOnSomeStoragesDialogComponent extends React.Component {
  static propTypes = {
    // List of storages
    storagesSelectionModel: PropTypes.arrayOf(PropTypes.shape({
      selected: PropTypes.bool.isRequired,
      storage: StorageShapes.PrioritizedDataStorageContent.isRequired,
    })).isRequired,
    // is delete confirmation currently allowed?
    canDelete: PropTypes.bool.isRequired,
    onToggleStorage: PropTypes.func.isRequired, // toggle selection for a storage callback: (storageIndex: number) => ()
    onConfirmDelete: PropTypes.func.isRequired, // confirm delete callback: () => ()
    onClose: PropTypes.func.isRequired, // close dialog callback: () => {}
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }


  /**
   * @return {[React.Node]}  rendered actions for dialog
   */
  renderActions = () => {
    const { canDelete, onClose, onConfirmDelete } = this.props
    const { intl: { formatMessage } } = this.context

    return [
      <FlatButton
        key="cancel"
        id="confirm.dialog.cancel"
        label={formatMessage({ id: 'oais.aip.cancel.delete.on.storages' })}
        primary
        keyboardFocused
        onClick={onClose}
      />,
      <FlatButton
        key="deleteAIPPartially"
        className="selenium-confirmDialogButton"
        label={formatMessage({ id: 'oais.aip.confirm.delete.on.storages' })}
        onClick={onConfirmDelete}
        disabled={!canDelete}
      />,
    ]
  }

  render() {
    const { storagesSelectionModel, onToggleStorage } = this.props
    const { intl: { formatMessage } } = this.context
    const { title: titleStyle, subtitle: subtitleStyle } = this.context.moduleTheme.aips.selectStorageDialog

    return (
      <Dialog
        title={<CardHeader
          title={formatMessage({ id: 'oais.aip.delete.on.storages.title' })}
          titleStyle={titleStyle}
          subtitle={formatMessage({ id: 'oais.aip.delete.on.storages.message' })}
          subtitleStyle={subtitleStyle}
        />}
        actions={this.renderActions()}
        autoDetectWindowHeight
        autoScrollBodyContent
        modal
        open
      >
        <div>
          {
            storagesSelectionModel.map(({ storage, selected }, index) => (
              <StorageSelectionCheckbox
                key={storage.id}
                storage={storage}
                selected={selected}
                index={index}
                onToggleStorage={onToggleStorage}
              />
            ))
          }
        </div>
      </Dialog>
    )
  }
}
export default DeleteAIPOnSomeStoragesDialogComponent
