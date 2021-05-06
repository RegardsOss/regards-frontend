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
import { FemDomain } from '@regardsoss/domain'
import { ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import { themeContextType } from '@regardsoss/theme'
import { AdminShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import Dialog from 'material-ui/Dialog'
import DisplayProductsComponent from './DisplayProductsComponent'
import { IMPL_TYPE_ENUM } from '../domain/implTypes'
import DisplayIconsComponent from './DisplayIconsComponent'
import { DISPLAY_ICON_TYPE_ENUM } from '../domain/displayIconTypes'

/**
 * AcquisitionComponent
 * @author Théo Lasserre
 */
class AcquisitionComponent extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
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
  }

  handleOpenProductDialog = () => this.setState({ productDialogOpen: true })

  handleCloseProductDialog = () => this.setState({ productDialogOpen: false })

  displayProductDialog = () => {
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
    const { project } = this.props
    switch (type) {
      case IMPL_TYPE_ENUM.FEM:
        browserHistory.push(`/admin/${project}/data/acquisition/featuremanager/monitor/EXTRACTION?state=ERROR`)
        break
      case IMPL_TYPE_ENUM.DP:
        this.handleOpenProductDialog()
        break
      default:
    }
  }

  onRetryErrors = (type) => {
    const { relaunchProducts, sessionStep, retryRequests } = this.props
    switch (type) {
      case IMPL_TYPE_ENUM.FEM:
        retryRequests({
          filters: {
            session: sessionStep.session,
            source: sessionStep.source,
          },
          requestIdSelectionMode: 'EXCLUDE',
          requestIds: [],
        }, FemDomain.REQUEST_TYPES_ENUM.REFERENCES)
        break
      case IMPL_TYPE_ENUM.DP:
        relaunchProducts(sessionStep.source, sessionStep.session)
        break
      default:
    }
  }

  // Case FeatureManager
  displayFEM = (nbErrors) => {
    const { sessionStep } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        selectedSession: {
          raisedListStyle, listItemStyle, cardContentStyle, cardButtonStyle,
        },
      },
    } = this.context
    return <div style={cardContentStyle}>
      <div>
        <ListItem
          primaryText={formatMessage({ id: 'dashboard.selectedsession.acquisition.fem.in' }, { nbIn: sessionStep.in })}
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
          primaryText={formatMessage({ id: 'dashboard.selectedsession.acquisition.fem.acquired' }, { nbAcquired: sessionStep.out })}
          disabled
          style={listItemStyle}
        />
      </div>
      {
        nbErrors !== 0
          ? <div style={cardButtonStyle}>
            <RaisedButton
              onClick={() => this.onSeeErrors(IMPL_TYPE_ENUM.FEM)}
              label={formatMessage({ id: 'dashboard.selectedsession.acquisition.fem.button.see-errors' })}
              primary
              style={raisedListStyle}
            />
            <RaisedButton
              onClick={() => this.onRetryErrors(IMPL_TYPE_ENUM.FEM)}
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
        selectedSession: {
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
              onClick={() => this.onSeeErrors(IMPL_TYPE_ENUM.DP)}
              label={formatMessage({ id: 'dashboard.selectedsession.acquisition.dp.button.see-errors' })}
              primary
              style={raisedListStyle}
            />
            <RaisedButton
              onClick={() => this.onRetryErrors(IMPL_TYPE_ENUM.DP)}
              label={formatMessage({ id: 'dashboard.selectedsession.acquisition.dp.button.retry-errors' })}
              primary
              style={raisedListStyle}
            />
          </div>
          : null
      }
    </div>
  }

  render() {
    const { sessionStep } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        selectedSession: {
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
            {sessionStep.stepId === '0' ? this.displayFEM(nbErrors) : this.displayDP(nbErrors)}
          </CardText>
          {this.displayProductDialog()}
        </Card> : null
    )
  }
}
export default AcquisitionComponent
