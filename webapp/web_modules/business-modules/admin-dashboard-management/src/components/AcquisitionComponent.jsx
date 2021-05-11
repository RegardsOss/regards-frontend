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
import { Card, CardTitle, CardText } from 'material-ui/Card'
import { ConfirmDialogComponent, ConfirmDialogComponentTypes } from '@regardsoss/components'
import { FemDomain } from '@regardsoss/domain'
import { ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import { themeContextType } from '@regardsoss/theme'
import { AdminShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import Dialog from 'material-ui/Dialog'
import DisplayProductsComponent from './DisplayProductsComponent'
import DisplayIconsComponent from './DisplayIconsComponent'
import { DISPLAY_ICON_TYPE_ENUM } from '../domain/displayIconTypes'

const ACQUISITION_TYPE = {
  EXTRACT: 'extract',
  SCAN: 'scan',
}

/**
 * AcquisitionComponent
 * @author Théo Lasserre
 */
class AcquisitionComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    selectedSession: AdminShapes.Session,
    sessionStep: AdminShapes.SessionStep,
    relaunchProducts: PropTypes.func.isRequired,
    retryRequests: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    productDialogOpen: false,
    isRetryErrorsDialogOpen: false,
  }

  handleOpenProductDialog = () => this.setState({ productDialogOpen: true })

  handleCloseProductDialog = () => this.setState({ productDialogOpen: false })

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
          onClick={this.handleCloseProductDialog}
        />
      </>}
      modal
    >
      <DisplayProductsComponent
        sessionName={sessionStep.session}
      />
    </Dialog>)
  }

  onSeeErrors = (type) => {
    const { project, selectedSession } = this.props
    switch (type) {
      case ACQUISITION_TYPE.EXTRACT:
        browserHistory.push(`/admin/${project}/data/acquisition/featuremanager/monitor/EXTRACTION?display=packages&session=${selectedSession.content.name}&state=ERROR`)
        break
      case ACQUISITION_TYPE.SCAN:
        this.handleOpenProductDialog()
        break
      default:
    }
  }

  onRetryErrors = (type) => {
    const { relaunchProducts, sessionStep, retryRequests } = this.props
    switch (type) {
      case ACQUISITION_TYPE.EXTRACT:
        retryRequests({
          filters: {
            session: sessionStep.session,
            source: sessionStep.source,
          },
          requestIdSelectionMode: 'EXCLUDE',
          requestIds: [],
        }, FemDomain.REQUEST_TYPES_ENUM.REFERENCES)
        break
      case ACQUISITION_TYPE.SCAN:
        relaunchProducts(sessionStep.source, sessionStep.session)
        break
      default:
    }
    this.closeRetryErrorsDialog()
  }

  // Case FeatureManager
  displayFEM = (nbErrors) => {
    const { sessionStep } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        selectedSessionStyle: {
          raisedListStyle, listItemStyle, cardContentStyle, cardButtonStyle,
        },
      },
    } = this.context
    return <div style={cardContentStyle}>
      <div>
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.acquisition.fem.in' }, { nbIn: sessionStep.inputRelated })}
          disabled
          style={listItemStyle}
        />
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.acquisition.fem.refused' }, { nbRefused: -1 })}
          disabled
          style={listItemStyle}
        />
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.acquisition.fem.error' }, { nbError: -1 })}
          disabled
          style={listItemStyle}
        />
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.acquisition.fem.acquired' }, { nbAcquired: sessionStep.outputRelated })}
          disabled
          style={listItemStyle}
        />
      </div>
      {
        nbErrors !== 0
          ? <div style={cardButtonStyle}>
            <RaisedButton
              onClick={() => this.onSeeErrors(ACQUISITION_TYPE.EXTRACT)}
              label={formatMessage({ id: 'dashboard.selectedsession.acquisition.fem.button.see-errors' })}
              primary
              style={raisedListStyle}
            />
            <RaisedButton
              onClick={() => this.openRetryErrorsDialog()}
              label={formatMessage({ id: 'dashboard.selectedsession.acquisition.fem.button.retry-errors' })}
              primary
              style={raisedListStyle}
            />
          </div>
          : null
      }
    </div>
  }

  // Case DataProvider
  displayDP = (nbErrors) => {
    const { sessionStep } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        selectedSessionStyle: {
          raisedListStyle, listItemStyle, cardContentStyle, cardButtonStyle,
        },
      },
    } = this.context
    return <div style={cardContentStyle}>
      <div>
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.acquisition.dp.in' }, { nbIn: sessionStep.in })}
          disabled
          style={listItemStyle}
        />
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.acquisition.dp.incomplete' }, { nbIncomplete: -1 })}
          disabled
          style={listItemStyle}
        />
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.acquisition.dp.invalid' }, { nbInvalid: -1 })}
          disabled
          style={listItemStyle}
        />
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.acquisition.dp.error' }, { nbError: -1 })}
          disabled
          style={listItemStyle}
        />
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.acquisition.dp.acquired' }, { nbAcquired: sessionStep.out })}
          disabled
          style={listItemStyle}
        />
      </div>
      {
        nbErrors !== 0
          ? <div style={cardButtonStyle}>
            <RaisedButton
              onClick={() => this.onSeeErrors(ACQUISITION_TYPE.SCAN)}
              label={formatMessage({ id: 'dashboard.selectedsession.acquisition.dp.button.see-errors' })}
              primary
              style={raisedListStyle}
            />
            <RaisedButton
              onClick={() => this.openRetryErrorsDialog()}
              label={formatMessage({ id: 'dashboard.selectedsession.acquisition.dp.button.retry-errors' })}
              primary
              style={raisedListStyle}
            />
          </div>
          : null
      }
    </div>
  }

  openRetryErrorsDialog = () => {
    this.setState({
      isRetryErrorsDialogOpen: true,
    })
  }

  closeRetryErrorsDialog = () => {
    this.setState({
      isRetryErrorsDialogOpen: false,
    })
  }

  renderRetryErrorsDialog = (type) => {
    const { intl: { formatMessage } } = this.context
    const { isRetryErrorsDialogOpen } = this.state
    if (isRetryErrorsDialogOpen) {
      return (
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.CONFIRM}
          title={formatMessage({ id: 'dashboard.selectedsessionZ.dialog.retry.title' })}
          onConfirm={() => this.onRetryErrors(type)}
          onClose={() => this.closeDeleteDialog()}
        />
      )
    }
    return null
  }

  render() {
    const { sessionStep } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        selectedSessionStyle: {
          cardStyle, cardTitleDivStyle, cardTitleStyle, cardTitleTextStyle,
        },
      },
    } = this.context
    const nbErrors = get(sessionStep, 'state.errors', 0)
    return (
      sessionStep
        ? <Card style={cardStyle}>
          <div style={cardTitleDivStyle}>
            <CardTitle
              title={formatMessage({ id: 'dashboard.selectedsession.acquisition.title' })}
              style={cardTitleStyle}
              titleStyle={cardTitleTextStyle}
            />
            <DisplayIconsComponent
              entity={sessionStep}
              displayIconType={DISPLAY_ICON_TYPE_ENUM.NO_COUNT}
            />
          </div>
          <CardText>
            {sessionStep.stepId === ACQUISITION_TYPE.EXTRACT ? this.displayFEM(nbErrors) : this.displayDP(nbErrors)}
          </CardText>
          {this.renderProductDialog()}
          {this.renderRetryErrorsDialog(sessionStep.stepId)}
        </Card> : null
    )
  }
}
export default AcquisitionComponent
