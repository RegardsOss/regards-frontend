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
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { i18nContextType } from '@regardsoss/i18n'
import { ConfirmDialogComponent, ConfirmDialogComponentTypes } from '@regardsoss/components'
 
 /**
 * Retry order selection mode component
 * @author Sébastien Binda
 */
 class RetryOrderSelectionModeComponent extends React.Component {

  static RETRY_ERRORS_MODE="RETRY"
  static RESTART_MODE="RESTART"
  
   static propTypes = {
    canRetry: PropTypes.bool.isRequired,
    canRestart: PropTypes.bool.isRequired,
    orderLabel: PropTypes.string.isRequired,
    onModeSelected: PropTypes.func.isRequired,
     // is curretnly visible?
    visible: PropTypes.bool.isRequired,
    // on close callback like () => ()
    onClose: PropTypes.func.isRequired,
   }
 
   static contextTypes = {
     ...i18nContextType,
   }
 
   /**
    * User callback: on delete confirmed
    */
   onRetryModeSelected = () => {
   }
 
   render() {
     const { intl: { formatMessage } } = this.context
     const { canRetry, canRestart, visible, onClose, orderLabel,onModeSelected } = this.props


     const newOrderLabel = "Polopop !!!"
     const onSuccessfullUrl = "pilipipi !!!"
 
     // FIXME : Conditions a remettre !!!
     return (
      <Dialog
        title={formatMessage({ id: 'order.list.option.cell.retry.mode.selection.title' }, {name: orderLabel})}
        actions={<>
          { !canRetry ? <FlatButton
            key="restart.button"
            label={formatMessage({ id: 'order.list.options.retry.restart.label' })}
            onClick={ () => onModeSelected(RetryOrderSelectionModeComponent.RESTART_MODE, newOrderLabel, onSuccessfullUrl)}
            primary
          /> : null }
          { !canRestart ? <FlatButton
            key="retry.button"
            label={formatMessage({ id: 'order.list.options.retry.retry.label' })}
            onClick={ () => onModeSelected(RetryOrderSelectionModeComponent.RETRY_ERRORS_MODE, null, null)}
            primary
          /> : null }
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
        Oulala ca fait plaisir !!!!
    </Dialog>)
   }
 }
 export default RetryOrderSelectionModeComponent
 