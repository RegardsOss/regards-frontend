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
import { i18nContextType } from '@regardsoss/i18n'
import { StorageShapes } from '@regardsoss/shape'

/**
* Component to display a dialog containing errors during AIP deletion.
 * @author Léo Mieulet
*/
class AIPDeletionErrorDialog extends React.Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    errors: StorageShapes.AIPDeletionErrorsArray.isRequired,
    onClose: PropTypes.func.isRequired, // close callback: () => {}
  }

  static contextTypes = {
    ...i18nContextType,
  }

  renderActions = () => {
    const { onClose } = this.props
    const { intl: { formatMessage } } = this.context
    return [
      <FlatButton
        key="cancel"
        id="confirm.dialog.cancel"
        label={formatMessage({ id: 'aip.delete.error.dialog.close' })}
        primary
        keyboardFocused
        onClick={onClose}
      />,
    ]
  }

  render() {
    const { show, errors } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <Dialog
        title={formatMessage({ id: 'aip.delete.error.title' })}
        actions={this.renderActions()}
        modal={false}
        open={show}
      >
        <ul>
          { // Present each error as a bullet
            errors.map(({ aipId, reason }) => (
              <li key={aipId}>
                { formatMessage({ id: 'aip.delete.error.format.reason' }, { aipId, reason }) }
              </li>))
          }
        </ul>
      </Dialog>

    )
  }
}
export default AIPDeletionErrorDialog
