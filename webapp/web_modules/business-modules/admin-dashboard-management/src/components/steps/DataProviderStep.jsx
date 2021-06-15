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
import map from 'lodash/map'
import { browserHistory } from 'react-router'
import { IngestDomain } from '@regardsoss/domain'
import { ConfirmDialogComponent, ConfirmDialogComponentTypes } from '@regardsoss/components'
import { AdminShapes } from '@regardsoss/shape'
import Dialog from 'material-ui/Dialog'
import { ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { DATA_PROVIDER_PROPERTIES } from '../../domain/dataProviderProperties'
import DisplayProductsComponent from '../DisplayProductsComponent'

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
    relaunchProducts(sessionStep.source, sessionStep.session)
    this.toggleRetryErrorsDialog()
  }

  onSeeWaiting = () => {
    const { project } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/oais/featureManager?display=requests&state=${IngestDomain.AIP_REQUEST_STATUS_ENUM.WAITING_VERSIONING_MODE}`)
  }

  displayListItem = (property) => {
    const { sessionStep } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        selectedSessionStyle: {
          listItemStyle,
        },
      },
    } = this.context
    const propValue = get(sessionStep, `properties.${property}`, false)
    if (propValue) {
      return (
        <ListItem
          key={property}
          primaryText={formatMessage({ id: `dashboard.selectedsession.referencing.dp.${property}` }, { value: propValue })}
          disabled
          style={listItemStyle}
        />
      )
    }
    return null
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
    if (isRetryErrorsDialogOpen) {
      return (
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.CONFIRM}
          title={formatMessage({ id: 'dashboard.selectedsession.dialog.retry.title' })}
          onConfirm={this.onRetryErrors}
          onClose={this.toggleRetryErrorsDialog}
        />
      )
    }
    return null
  }

  renderProductDialog = () => {
    const { intl: { formatMessage } } = this.context
    const { productDialogOpen } = this.state
    const { sessionStep } = this.props
    return (<Dialog
      open={productDialogOpen}
      title={formatMessage({ id: 'dashboard.selectedsession.acquisition.dp.dialog.title' })}
      actions={<>
        <RaisedButton
          key="close"
          label={formatMessage({ id: 'dashboard.selectedsession.acquisition.dp.dialog.button.close' })}
          primary
          onClick={this.toggleProductDialog}
        />
      </>}
      modal
    >
      <DisplayProductsComponent
        sessionName={sessionStep.session}
      />
    </Dialog>)
  }

  render() {
    const { sessionStep } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        selectedSessionStyle: {
          raisedListStyle, cardContentStyle, cardButtonStyle, listItemStyle,
        },
      },
    } = this.context
    const nbErrors = get(sessionStep, 'state.errors', 0)
    const nbWaiting = get(sessionStep, 'state.waiting', 0)
    return <div style={cardContentStyle}>
      <div>
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.acquisition.dp.in' }, { nbIn: sessionStep.in })}
          disabled
          style={listItemStyle}
        />
        {
          map(DATA_PROVIDER_PROPERTIES, (property) => (this.displayListItem(property)))
        }
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.acquisition.dp.acquired' }, { nbAcquired: sessionStep.out })}
          disabled
          style={listItemStyle}
        />
      </div>
      <div style={cardButtonStyle}>
        <RaisedButton
          onClick={this.onSeeReferenced}
          label={formatMessage({ id: 'dashboard.selectedsession.referencing.dp.button.see-referenced' })}
          primary
          style={raisedListStyle}
        />
        {
          nbWaiting !== 0
            ? <RaisedButton
                onClick={this.onSeeWaiting}
                label={formatMessage({ id: 'dashboard.selectedsession.referencing.dp.button.see-waiting' })}
                primary
                style={raisedListStyle}
            /> : null
        }
        {
          nbErrors !== 0
            ? <div style={cardButtonStyle}>
              <RaisedButton
                onClick={this.onSeeErrors}
                label={formatMessage({ id: 'dashboard.selectedsession.referencing.dp.button.see-errors' })}
                primary
                style={raisedListStyle}
              />
              <RaisedButton
                onClick={this.toggleRetryErrorsDialog}
                label={formatMessage({ id: 'dashboard.selectedsession.referencing.dp.button.retry-errors' })}
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
