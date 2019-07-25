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
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { StorageShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Shows confirmation dialog for deletion on some storages
 * @author Raphaël Mechali
 */
class ConfirmDeleteOnSomeStoragesDialogComponent extends React.Component {
  static propTypes = {
    selectedStorages: PropTypes.arrayOf(StorageShapes.PrioritizedDataStorageContent).isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * @return {[React.ReactElement]}  rendered actions
   */
  renderActions = () => {
    const { onCancel, onConfirm } = this.props
    const { intl: { formatMessage } } = this.context
    return [
      <FlatButton
        key="cancel"
        id="confirm.dialog.cancel"
        label={formatMessage({ id: 'oais.aip.cancel.delete' })}
        primary
        keyboardFocused
        onClick={onCancel}
      />,
      <FlatButton
        key="deleteAIP"
        className="selenium-confirmDialogButton"
        label={formatMessage({ id: 'oais.aip.confirm.delete.aip' })}
        onClick={onConfirm}
      />,
    ]
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { selectedStorages } = this.props
    // compute list label
    const datastorages = selectedStorages.map(({ dataStorageConfiguration: { label } }) => label).join(formatMessage({ id: 'oais.aip.delete.on.selected.storages.label.separator' }))
    return (
      <Dialog
        title={formatMessage({ id: 'oais.aip.confirm.delete.title' })}
        actions={this.renderActions()}
        modal
        open
      >
        {formatMessage({ id: 'oais.aip.delete.on.selected.storages.messages' }, { datastorages }) }
      </Dialog>

    )
  }
}
export default ConfirmDeleteOnSomeStoragesDialogComponent
