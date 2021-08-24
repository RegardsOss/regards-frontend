/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { browserHistory } from 'react-router'
import { IngestDomain } from '@regardsoss/domain'
import { ConfirmDialogComponent, ConfirmDialogComponentTypes } from '@regardsoss/components'
import { AdminShapes } from '@regardsoss/shape'
import Dialog from 'material-ui/Dialog'
import RaisedButton from 'material-ui/RaisedButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { DATA_PROVIDER_PRODUCTS_PROPERTIES, DATA_PROVIDER_FILES_PROPERTIES } from '../../domain/dataProviderProperties'
import DisplayProductsComponent from '../DisplayProductsComponent'
import DisplayPropertiesComponent from '../DisplayPropertiesComponent'
import { ICON_TYPE_ENUM } from '../../domain/iconType'
import { STEP_SUB_TYPES_ENUM } from '../../domain/stepSubTypes'

/**
  * DataProviderStep
  * @author Théo Lasserre
  */
class DataProviderStep extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    sessionStep: AdminShapes.SessionStep,
    selectedSession: AdminShapes.Session,
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

  onSeeErrors = () => {
    this.toggleProductDialog()
  }

  onSeeReferenced = () => {
    const { project, selectedSession } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/oais/featureManager?display=packages&session=${selectedSession.content.name}`)
  }

  onRetryErrors = () => {
    const { relaunchProducts, sessionStep } = this.props
    return relaunchProducts(sessionStep.source, sessionStep.session)
  }

  onSeeWaiting = () => {
    const { project } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/oais/featureManager?display=requests&state=${IngestDomain.AIP_REQUEST_STATUS_ENUM.WAITING_VERSIONING_MODE}`)
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

  renderRetryErrorsDialog = () => {
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

  renderProductDialog = () => {
    const {
      intl: { formatMessage }, moduleTheme: {
        selectedSessionStyle: {
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
    const {
      intl: { formatMessage }, moduleTheme: {
        selectedSessionStyle: {
          raisedListStyle, cardContentStyle, cardButtonStyle, listItemDivStyle,
          propertiesTitleStyle, propertiesTitleStyleAlt, propertiesDivStyle,
        },
      },
    } = this.context
    const nbErrors = get(sessionStep, `state.${ICON_TYPE_ENUM.ERRORS}`, 0)
    const nbWaiting = get(sessionStep, `state.${ICON_TYPE_ENUM.WAITING}`, 0)
    return <div style={cardContentStyle}>
      <div style={listItemDivStyle}>
        <div style={propertiesTitleStyle}>
          <div style={propertiesDivStyle}>
            {formatMessage({ id: 'dashboard.selectedsession.ACQUISITION.dp.properties.files.title' })}
          </div>
          <DisplayPropertiesComponent
            properties={DATA_PROVIDER_FILES_PROPERTIES}
            sessionStep={sessionStep}
            stepSubType={STEP_SUB_TYPES_ENUM.DATA_PROVIDER}
          />
        </div>
        <div style={propertiesTitleStyleAlt}>
          <div style={propertiesDivStyle}>
            {formatMessage({ id: 'dashboard.selectedsession.ACQUISITION.dp.properties.products.title' })}
          </div>
          <DisplayPropertiesComponent
            properties={DATA_PROVIDER_PRODUCTS_PROPERTIES}
            sessionStep={sessionStep}
            stepSubType={STEP_SUB_TYPES_ENUM.DATA_PROVIDER}
          />
        </div>
      </div>
      <div style={cardButtonStyle}>
        {
          nbWaiting !== 0
            ? <RaisedButton
                onClick={this.onSeeWaiting}
                label={formatMessage({ id: 'dashboard.selectedsession.REFERENCING.ingest.button.see-waiting' })}
                primary
                style={raisedListStyle}
            /> : null
        }
        {
          nbErrors !== 0
            ? <div style={cardButtonStyle}>
              <RaisedButton
                onClick={this.onSeeErrors}
                label={formatMessage({ id: 'dashboard.selectedsession.REFERENCING.ingest.button.see-errors' })}
                primary
                style={raisedListStyle}
              />
              <RaisedButton
                onClick={this.toggleRetryErrorsDialog}
                label={formatMessage({ id: 'dashboard.selectedsession.REFERENCING.ingest.button.retry-errors' })}
                primary
                style={raisedListStyle}
              />
            </div>
            : null
        }
      </div>
      {this.renderProductDialog()}
      {this.renderRetryErrorsDialog()}
    </div>
  }
}
export default DataProviderStep
