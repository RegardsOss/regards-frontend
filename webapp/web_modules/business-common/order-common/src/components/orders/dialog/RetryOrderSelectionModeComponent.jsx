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
import get from 'lodash/get'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import TextField from 'material-ui/TextField'
import { i18nContextType } from '@regardsoss/i18n'
import { ErrorDecoratorComponent } from '@regardsoss/components'

/**
 * Retry order selection mode component
 * @author Sébastien Binda
 */
class RetryOrderSelectionModeComponent extends React.Component {
  static RETRY_ERRORS_MODE = 'RETRY'

  static RESTART_MODE = 'RESTART'

  static MODES = {
    ALL: 'ALL',
    RETRY_ONLY: 'RETRY',
    RESTART_ONLY: 'RESTART',
    NONE: 'NONE',
  }

  /** Formatting options for selection date */
  static SELECTION_DATE_OPTIONS = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  }

  static MAX_ORDER_LABEL_LENGTH = 50

  static propTypes = {
    project: PropTypes.string.isRequired,
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

  state = {
    error: null,
    step: 0,
    orderNewLabel: null,
    submitting: false,
  }

  close = () => {
    this.setState({
      error: null, step: 0, orderNewLabel: null, submitting: false,
    })
    this.props.onClose()
  }

  /**
  * Generate the URL that will be used in the mail sent by the server to the user
  */
  getOnSucceedOrderURL = () => {
    const {
      project,
    } = this.props
    return `/user/${project}/redirect?module=order-history`
  }

  goToNextStep = () => this.setState({ step: this.state.step + 1 })

  goToPreviousStep = () => this.setState({ step: this.state.step - 1, orderNewLabel: null, error: null })

  handleChangeOrderNewValue = (event) => {
    this.setState({
      orderNewLabel: event.target.value,
    })
  }

  renderModeAllText = () => (
    <div>
      {this.context.intl.formatMessage({ id: 'order.list.option.cell.retry.mode.selection.dialog.ALL.info' })}
      <ul>
        <li>{this.renderModeRetryText()}</li>
        <li>{this.renderModeRestartText()}</li>
      </ul>
    </div>
  )

  renderModeRetryText = () => this.context.intl.formatMessage({ id: 'order.list.option.cell.retry.mode.selection.dialog.RETRY.info' })

  renderModeRestartText = () => this.context.intl.formatMessage({ id: 'order.list.option.cell.retry.mode.selection.dialog.RESTART.info' })

  renderModeNoneText = () => this.context.intl.formatMessage({ id: 'order.list.option.cell.retry.mode.selection.dialog.NONE.info' })

  onModeSelected = (mode, orderNewLabel, defaultOrderLabel, onSuccessfullUrl) => {
    if (mode === RetryOrderSelectionModeComponent.RESTART_MODE && this.state.step === 0) {
      this.goToNextStep()
    } else {
      this.setState({ submitting: true })
      Promise.resolve(this.props.onModeSelected(mode, orderNewLabel || defaultOrderLabel, onSuccessfullUrl)).then(({ error, payload, ...otherFields }) => {
        if (error) {
          const { intl: { formatMessage } } = this.context
          const errorType = get(payload, 'response.messages[0]', null)
          let messageId
          switch (errorType) {
            case 'LABEL_NOT_UNIQUE_FOR_OWNER':
              messageId = 'order.list.option.cell.retry.mode.selection.dialog.restart.error.unique.label'
              break
            case 'TOO_MANY_CHARACTERS_IN_LABEL':
              messageId = 'order.list.option.cell.retry.mode.selection.dialog.restart.error.too.long.label'
              break
            default:
              messageId = 'order.list.option.cell.retry.mode.selection.dialog.restart.error'
              break
          }
          this.setState({ error: formatMessage({ id: messageId }), submitting: false })
        } else {
          this.close()
        }
      })
    }
  }

  renderActions = (step, orderNewLabel, defaultOrderLabel, disabled) => {
    const { intl: { formatMessage } } = this.context
    const { canRetry, canRestart } = this.props
    const onSuccessfullUrl = this.getOnSucceedOrderURL()
    return (
      <>
        {canRestart && !(orderNewLabel && orderNewLabel.length > RetryOrderSelectionModeComponent.MAX_ORDER_LABEL_LENGTH) ? <FlatButton
          key="restart.button"
          label={formatMessage({ id: 'order.list.option.cell.retry.mode.selection.dialog.restart.button.label' })}
          onClick={() => this.onModeSelected(RetryOrderSelectionModeComponent.RESTART_MODE, orderNewLabel, defaultOrderLabel, onSuccessfullUrl)}
          disabled={disabled}
          primary
        /> : null}
        {canRetry && step === 0 ? <FlatButton
          key="retry.button"
          label={formatMessage({ id: 'order.list.option.cell.retry.mode.selection.dialog.retry.button.label' })}
          onClick={() => this.onModeSelected(RetryOrderSelectionModeComponent.RETRY_ERRORS_MODE, null, null, null)}
          disabled={disabled}
          primary
        /> : null}
        {step === 1 ? <FlatButton
          key="back.button"
          label={formatMessage({ id: 'order.list.option.cell.retry.mode.selection.dialog.restart.back.button.label' })}
          onClick={this.goToPreviousStep}
          disabled={disabled}
          primary
        /> : null}
        <FlatButton
          key="close.button"
          label={formatMessage({ id: 'order.list.option.cell.retry.mode.selection.dialog.close.button.label' })}
          onClick={this.close}
          disabled={disabled}
          primary
        />
      </>
    )
  }

  renderStep0 = (mode) => {
    switch (mode) {
      case RetryOrderSelectionModeComponent.MODES.ALL:
        return this.renderModeAllText()
      case RetryOrderSelectionModeComponent.MODES.RETRY_ONLY:
        return this.renderModeRetryText()
      case RetryOrderSelectionModeComponent.MODES.RESTART_ONLY:
        return this.renderModeRestartText()
      case RetryOrderSelectionModeComponent.MODES.NONE:
      default:
        return this.renderModeNoneText()
    }
  }

  renderStep1 = (orderNewLabel, defaultOrderLabel) => {
    const { intl: { formatMessage } } = this.context
    return (
      <div>
        <p>{formatMessage({ id: 'order.list.option.cell.retry.mode.selection.dialog.restart.order.new.label.info' })}</p>
        <TextField
          id="order-new-label"
          value={orderNewLabel || ''}
          hintText={defaultOrderLabel}
          errorText={orderNewLabel && orderNewLabel.length > RetryOrderSelectionModeComponent.MAX_ORDER_LABEL_LENGTH
            ? formatMessage({ id: 'order.list.option.cell.retry.mode.selection.dialog.restart.order.new.label.too.long' }, { size: RetryOrderSelectionModeComponent.MAX_ORDER_LABEL_LENGTH }) : null}
          onChange={this.handleChangeOrderNewValue}
          fullWidth
        />
      </div>
    )
  }

  renderStep = (mode, step, orderNewLabel, defaultOrderLabel) => step === 0 ? this.renderStep0(mode) : this.renderStep1(orderNewLabel, defaultOrderLabel)

  render() {
    const { intl: { formatDate, formatMessage } } = this.context
    const {
      canRetry, canRestart, visible, onClose, orderLabel,
    } = this.props
    const {
      error, step, orderNewLabel, submitting,
    } = this.state

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

    const defaultOrderLabel = formatDate(Date.now(), RetryOrderSelectionModeComponent.SELECTION_DATE_OPTIONS)

    return (
      <Dialog
        title={formatMessage({ id: 'order.list.option.cell.retry.mode.selection.dialog.title' }, { name: orderLabel })}
        actions={this.renderActions(step, orderNewLabel, defaultOrderLabel, submitting)}
        modal
        open={visible}
        onRequestClose={onClose}
      >
        <ErrorDecoratorComponent>{error}</ErrorDecoratorComponent>
        {this.renderStep(mode, step, orderNewLabel, defaultOrderLabel)}
      </Dialog>)
  }
}
export default RetryOrderSelectionModeComponent
