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

  static MODES = {
    ALL:'ALL',
    RETRY_ONLY:'RETRY',
    RESTART_ONLY:'RESTART',
    NONE:'NONE',
  }
  
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

   renderModeAllText =() => {
     return (
       <div>
         {this.context.intl.formatMessage({id: 'order.list.option.cell.retry.mode.selection.dialog.ALL.info'})}
         <ul>
           <li>{this.renderModeRetryText()}</li>
           <li>{this.renderModeRestartText()}</li>
         </ul>
       </div>
     )
   }

   renderModeRetryText = () => {
     return this.context.intl.formatMessage({id: 'order.list.option.cell.retry.mode.selection.dialog.RETRY.info'})
   }

   renderModeRestartText = () => {
    return this.context.intl.formatMessage({id: 'order.list.option.cell.retry.mode.selection.dialog.RESTART.info'})
   }

   renderModeNoneText = () => {
     return this.context.intl.formatMessage({id: 'order.list.option.cell.retry.mode.selection.dialog.NONE.info'})
   }

   renderActions = () => {
    const { intl: { formatMessage } } = this.context
    const { canRetry, canRestart, onClose, onModeSelected } = this.props
    const newOrderLabel = "Polopop !!!"
    const onSuccessfullUrl = "pilipipi !!!"
     return (
      <>
        { canRetry ? <FlatButton
          key="restart.button"
          label={formatMessage({ id: 'order.list.option.cell.retry.mode.selection.dialog.restart.button.label' })}
          onClick={ () => onModeSelected(RetryOrderSelectionModeComponent.RESTART_MODE, newOrderLabel, onSuccessfullUrl)}
          primary
        /> : null }
        { canRestart ? <FlatButton
          key="retry.button"
          label={formatMessage({ id: 'order.list.option.cell.retry.mode.selection.dialog.retry.button.label' })}
          onClick={ () => onModeSelected(RetryOrderSelectionModeComponent.RETRY_ERRORS_MODE, null, null)}
          primary
        /> : null }
        <FlatButton
          key="close.button"
          label={formatMessage({ id: 'order.list.option.cell.retry.mode.selection.dialog.close.button.label' })}
          onClick={onClose}
          primary
        />
      </>
     )
   }

   renderText =(mode) => {
     switch(mode) {
       case RetryOrderSelectionModeComponent.MODES.ALL :
          return this.renderModeAllText()
       case RetryOrderSelectionModeComponent.MODES.RETRY_ONLY : 
          return this.renderModeRetryText()
        case RetryOrderSelectionModeComponent.MODES.RESTART_ONLY : 
          return this.renderModeRestartText()
        case RetryOrderSelectionModeComponent.MODES.NONE : 
          return this.renderModeNoneText()
     }
   }
 
   render() {
     const { intl: { formatMessage } } = this.context
     const { canRetry, canRestart, visible, onClose, orderLabel } = this.props

     let mode
     if (canRetry && canRestart) {
       mode = RetryOrderSelectionModeComponent.MODES.ALL
     } else if (canRetry) {
       mode = RetryOrderSelectionModeComponent.MODES.RETRY_ONLY
     } else if (canRestart) {
       mode = RetryOrderSelectionModeComponent.MODES.RESTART_ONLY
     } else {
       mode = RetryOrderSelectionModeComponent.MODES.NONE
     }
 
     return (
      <Dialog
        title={formatMessage({ id: 'order.list.option.cell.retry.mode.selection.dialog.title' }, {name: orderLabel})}
        actions={this.renderActions()}
        modal={false}
        open={visible}
        onRequestClose={onClose}
      >
        {this.renderText(mode)}
    </Dialog>)
   }
 }
 export default RetryOrderSelectionModeComponent
 