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
import { Link } from 'react-router'
import get from 'lodash/get'
import RaisedButton from 'material-ui/RaisedButton'
import { UIDomain, DataProviderDomain } from '@regardsoss/domain'
import { AdminShapes } from '@regardsoss/shape'
import {
  ConfirmDialogComponent, ConfirmDialogComponentTypes, PositionedDialog,
} from '@regardsoss/components'
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

  getSeeChainsURL = () => {
    const { project, sessionStep: { source } } = this.props
    return UIDomain.FiltersPaneHelper.buildLocationDescriptorObject(DataProviderDomain.AcquisitionProcessingChainFilters.builder(source).build(), [],
      `/admin/${project}/data/acquisition/dataprovider/chains`)
  }

  onRetryErrors = () => {
    const { relaunchProducts, sessionStep } = this.props
    return relaunchProducts({
      source: sessionStep.source,
      session: sessionStep.session,
    })
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
    const { intl: { formatMessage } } = this.context
    const { isProductDialogOpen } = this.state
    const { sessionStep } = this.props
    return (
      <PositionedDialog
        dialogWidthPercent={75}
        dialogHeightPercent={55}
        title={formatMessage({ id: 'dashboard.selectedsession.ACQUISITION.dp.dialog.title' })}
        open={isProductDialogOpen}
        actions={<>
          <RaisedButton
            key="close"
            label={formatMessage({ id: 'dashboard.selectedsession.ACQUISITION.dp.dialog.button.close' })}
            primary
            onClick={this.toggleProductDialog}
          />
        </>}
      >
        <DisplayProductsComponent
          sessionName={sessionStep.session}
        />
      </PositionedDialog>
    )
  }

  render() {
    const { sessionStep } = this.props
    const nbErrors = get(sessionStep, `state.${ICON_TYPE_ENUM.ERRORS}`, 0)
    const {
      intl: { formatMessage }, moduleTheme: {
        stepStyle: {
          raisedListStyle, cardButtonStyle, raisedListLabelStyle,
        },
      },
    } = this.context
    return (
      <div style={cardButtonStyle}>
        <Link to={this.getSeeChainsURL}>
          <RaisedButton
            label={formatMessage({ id: 'dashboard.selectedsession.ACQUISITION.dp.button.see-chains' })}
            primary
            style={raisedListStyle}
            labelStyle={raisedListLabelStyle}
          />
        </Link>
        {
          nbErrors !== 0
            ? <div style={cardButtonStyle}>
              <RaisedButton
                onClick={this.toggleProductDialog}
                label={formatMessage({ id: 'dashboard.selectedsession.ACQUISITION.dp.button.see-errors' })}
                primary
                style={raisedListStyle}
                labelStyle={raisedListLabelStyle}
              />
              <RaisedButton
                onClick={this.toggleRetryErrorsDialog}
                label={formatMessage({ id: 'dashboard.selectedsession.ACQUISITION.dp.button.retry-errors' })}
                primary
                style={raisedListStyle}
                labelStyle={raisedListLabelStyle}
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
