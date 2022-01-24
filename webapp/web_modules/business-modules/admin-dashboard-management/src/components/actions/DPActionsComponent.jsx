/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { browserHistory } from 'react-router'
import get from 'lodash/get'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import { IngestDomain } from '@regardsoss/domain'
import { AdminShapes } from '@regardsoss/shape'
import { ConfirmDialogComponent, ConfirmDialogComponentTypes } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import DisplayProductsComponent from '../DisplayProductsComponent'
import { ICON_TYPE_ENUM } from '../../domain/iconType'

/**
  * @author Théo Lasserre
  */
class DPActionsComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    sessionStep: AdminShapes.SessionStep,
    relaunchProducts: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    isRetryErrorsDialogOpen: false,
    isProductDialogOpen: false,
  }

  onRetryErrors = () => {
    const { relaunchProducts, sessionStep } = this.props
    return relaunchProducts(sessionStep.source, sessionStep.session)
  }

  onSeeWaiting = () => {
    const { sessionStep, project } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/oais/featureManager?display=requests&sessionOwner=${encodeURIComponent(sessionStep.source)}&session=${encodeURIComponent(sessionStep.session)}&state=${IngestDomain.AIP_REQUEST_STATUS_ENUM.WAITING_VERSIONING_MODE}`)
  }

  toggleRetryErrorsDialog = () => {
    const { isRetryErrorsDialogOpen } = this.state
    this.setState({
      isRetryErrorsDialogOpen: !isRetryErrorsDialogOpen,
    })
  }

  toggleProductDialog = () => {
    const { isProductDialogOpen } = this.state
    this.setState({
      isProductDialogOpen: !isProductDialogOpen,
    })
  }

  renderRetryDPErrorsDialog = () => {
    const { intl: { formatMessage } } = this.context
    const { isRetryErrorsDialogOpen } = this.state
    return (
      <ConfirmDialogComponent
        dialogType={ConfirmDialogComponentTypes.CONFIRM}
        title={formatMessage({ id: 'dashboard.selectedsession.ACQUISITION.dp.dialog.retry.title' })}
        message={formatMessage({ id: 'dashboard.selectedsession.ACQUISITION.dp.dialog.retry.message' })}
        onConfirm={this.onRetryErrors}
        onClose={this.toggleRetryErrorsDialog}
        open={isRetryErrorsDialogOpen}
      />
    )
  }

  renderProductDPDialog = () => {
    const {
      intl: { formatMessage }, moduleTheme: {
        stepStyle: {
          dialogProductErrorStyle, dialogProductErrorMainStyle,
        },
      },
    } = this.context
    const { isProductDialogOpen } = this.state
    const { sessionStep } = this.props
    return (
      <Dialog
        open={isProductDialogOpen}
        title={formatMessage({ id: 'dashboard.selectedsession.ACQUISITION.dp.dialog.title' })}
        actions={<>
          <RaisedButton
            key="close"
            label={formatMessage({ id: 'dashboard.selectedsession.ACQUISITION.dp.dialog.button.close' })}
            primary
            onClick={this.toggleProductDialog}
          />
        </>}
        contentStyle={dialogProductErrorStyle}
        style={dialogProductErrorMainStyle}
      >
        <DisplayProductsComponent
          sessionName={sessionStep.session}
        />
      </Dialog>
    )
  }

  render() {
    const { sessionStep } = this.props
    const nbErrors = get(sessionStep, `state.${ICON_TYPE_ENUM.ERRORS}`, 0)
    const nbWaiting = get(sessionStep, `state.${ICON_TYPE_ENUM.WAITING}`, 0)
    const {
      intl: { formatMessage }, moduleTheme: {
        stepStyle: {
          raisedListStyle, cardButtonStyle,
        },
      },
    } = this.context
    return (
      <div style={cardButtonStyle}>
        {
          nbWaiting !== 0
            ? <RaisedButton
                onClick={this.onSeeWaiting}
                label={formatMessage({ id: 'dashboard.selectedsession.ACQUISITION.dp.button.see-waiting' })}
                primary
                style={raisedListStyle}
            /> : null
        }
        {
          nbErrors !== 0
            ? <div style={cardButtonStyle}>
              <RaisedButton
                onClick={this.toggleProductDialog}
                label={formatMessage({ id: 'dashboard.selectedsession.ACQUISITION.dp.button.see-errors' })}
                primary
                style={raisedListStyle}
              />
              <RaisedButton
                onClick={this.toggleRetryErrorsDialog}
                label={formatMessage({ id: 'dashboard.selectedsession.ACQUISITION.dp.button.retry-errors' })}
                primary
                style={raisedListStyle}
              />
            </div>
            : null
        }
        {this.renderRetryDPErrorsDialog()}
        {this.renderProductDPDialog()}
      </div>
    )
  }
}
export default DPActionsComponent
