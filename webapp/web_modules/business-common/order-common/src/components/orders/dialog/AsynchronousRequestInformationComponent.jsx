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
import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Shows an asynchronous request information message
* @author Raphaël Mechali
*/
class AsynchronousRequestInformationComponent extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { visible, onClose } = this.props

    return (
      <Dialog
        title={formatMessage({ id: 'order.list.options.aynschronous.request.title' })}
        actions={<>
          <FlatButton
            key="close.button"
            label={formatMessage({ id: 'order.list.options.aynschronous.request.close.button.label' })}
            onClick={onClose}
            primary
          />
        </>}
        modal={false}
        open={visible}
        onRequestClose={onClose}
      >
        {formatMessage({ id: 'order.list.options.aynschronous.request.message' })}
      </Dialog>)
  }
}
export default AsynchronousRequestInformationComponent
