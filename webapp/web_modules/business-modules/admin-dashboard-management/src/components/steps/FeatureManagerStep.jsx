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
import forEach from 'lodash/forEach'
import get from 'lodash/get'
import map from 'lodash/map'
import { browserHistory } from 'react-router'
import { FemDomain } from '@regardsoss/domain'
import { ConfirmDialogComponent, ConfirmDialogComponentTypes } from '@regardsoss/components'
import { AdminShapes } from '@regardsoss/shape'
import { ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { FEM_PROPERTIES, FEM_PROPERTIES_ENUM } from '../../domain/femProperties'

/**
  * FeatureManagerStep
  * @author Théo Lasserre
  */
class FeatureManagerStep extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    sessionStep: AdminShapes.SessionStep,
    selectedSession: AdminShapes.Session,
    retryRequests: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    isRetryErrorsDialogOpen: false,
  }

  onSeeErrors = () => {
    const { project, selectedSession } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/featuremanager/monitor/${FemDomain.REQUEST_TYPES_ENUM.CREATION}?session=${selectedSession.content.name}&state=${FemDomain.REQUEST_STATUS_ENUM.ERROR}`)
  }

  onSeeReferenced = () => {
    const { project, selectedSession } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/featuremanager/monitor?session=${selectedSession.content.name}`)
  }

  onRetryErrors = () => {
    const { sessionStep, retryRequests } = this.props
    forEach(FemDomain.REQUEST_TYPES, (reqType) => {
      if (reqType !== FemDomain.REQUEST_TYPES_ENUM.REFERENCES
        || reqType !== FemDomain.REQUEST_TYPES_ENUM.EXTRACTION) {
        retryRequests({
          filters: {
            session: sessionStep.session,
            source: sessionStep.source,
          },
          requestIdSelectionMode: 'EXCLUDE',
          requestIds: [],
        }, reqType)
      }
    })
    this.toggleRetryErrorsDialog()
  }

  displayListItem = (property) => {
    const { sessionStep } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        selectedSessionStyle: {
          listItemStyle, listItemNoValueStyle, listItemErrorStyle,
        },
      },
    } = this.context
    let propValue = get(sessionStep, `properties.${property}`, false)
    let style = listItemNoValueStyle
    if (propValue > 0) {
      style = listItemStyle
    }
    if (property === FEM_PROPERTIES_ENUM.REQUESTS_ERRORS) {
      propValue = get(sessionStep, 'properties.inErrorReferencingRequests', 0) + get(sessionStep, 'properties.inErrorDeleteRequests', 0) + get(sessionStep, 'properties.inErrorUpdateRequests', 0) + get(sessionStep, 'properties.inErrorNotifyRequests', 0)
      style = listItemErrorStyle
    }
    return (
      <ListItem
        key={property}
        primaryText={formatMessage({ id: `dashboard.selectedsession.referencing.fem.${property}` }, { value: propValue || 0 })}
        disabled
        style={style}
      />
    )
  }

  toggleRetryErrorsDialog = () => {
    const { isRetryErrorsDialogOpen } = this.state
    this.setState({
      isRetryErrorsDialogOpen: !isRetryErrorsDialogOpen,
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

  render() {
    const { sessionStep } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        selectedSessionStyle: {
          raisedListStyle, cardContentStyle, cardButtonStyle, listItemDivStyle,
        },
      },
    } = this.context
    const nbErrors = get(sessionStep, 'state.errors', 0)
    return <div style={cardContentStyle}>
      <div style={listItemDivStyle}>
        {
          map(FEM_PROPERTIES, (property) => (this.displayListItem(property)))
        }
      </div>
      <div style={cardButtonStyle}>
        <RaisedButton
          onClick={this.onSeeReferenced}
          label={formatMessage({ id: 'dashboard.selectedsession.referencing.fem.button.see-referenced' })}
          primary
          style={raisedListStyle}
        />
        {
          nbErrors !== 0
            ? <div style={cardButtonStyle}>
              <RaisedButton
                onClick={this.onSeeErrors}
                label={formatMessage({ id: 'dashboard.selectedsession.referencing.fem.button.see-errors' })}
                primary
                style={raisedListStyle}
              />
              <RaisedButton
                onClick={this.toggleRetryErrorsDialog}
                label={formatMessage({ id: 'dashboard.selectedsession.referencing.fem.button.retry-errors' })}
                primary
                style={raisedListStyle}
              />
            </div>
            : null
        }
      </div>
      {this.renderRetryErrorsDialog()}
    </div>
  }
}
export default FeatureManagerStep
