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
import React from 'react'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { i18nContextType } from '@regardsoss/i18n'

/**
* Shows a request fail information
* @author Raphaël Mechali
*/
class RequestFailedInformationComponent extends React.Component {
  static propTypes = {
    visible: PropTypes.bool.isRequired,
    // response of failed request (as specified in REDUX api middleware)
    requestResponse: PropTypes.shape({
      // payload as serialized by the backend
      payload: PropTypes.shape({
        reponse: PropTypes.shape({
          messages: PropTypes.arrayOf(PropTypes.string),
        }),
      }).isRequired,
    }),
    onClose: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** Server errors enumeration list */
  static KNOWN_ERROR_TYPES = [
    'ORDER_MUST_BE_PAUSED_BEFORE_BEING_DELETED',
    'ORDER_NOT_COMPLETELY_STOPPED',
    'ORDER_NOT_COMPLETELY_PAUSED',
    'ORDER_MUST_NOT_BE_RUNNING',
    'ORDER_MUST_BE_PENDING_OR_RUNNING',
    'ONLY_PAUSED_ORDER_CAN_BE_RESUMED',
  ]

  static UNKNOWN_TYPE = 'UNKNOWN'

  render() {
    const { intl: { formatMessage } } = this.context
    const { visible, requestResponse, onClose } = this.props
    const errorList = get(requestResponse, 'payload.response.messages')

    // check if the error is part of servers enumerated error on orders
    let consideredErrorType = RequestFailedInformationComponent.UNKNOWN_TYPE
    if (errorList && errorList.length === 1) { // must be only one error
      const error = errorList[0]
      if (RequestFailedInformationComponent.KNOWN_ERROR_TYPES.includes(error)) {
        consideredErrorType = error // can be internationalized
      }
    }

    return (
      <Dialog
        title={formatMessage({ id: 'order.list.option.cell.detail.title' })}
        actions={<>
          <FlatButton
            key="close.button"
            label={formatMessage({ id: 'order.list.options.error.close.button.label' })}
            onClick={onClose}
            primary
          />
        </>}
        modal={false}
        open={visible}
        onRequestClose={onClose}
      >
        {formatMessage({ id: `order.list.options.error.${consideredErrorType}` })}
      </Dialog>)
  }
}
export default RequestFailedInformationComponent
