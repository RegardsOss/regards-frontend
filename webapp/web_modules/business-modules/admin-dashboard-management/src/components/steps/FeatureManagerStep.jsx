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
import map from 'lodash/map'
import get from 'lodash/get'
import forEach from 'lodash/forEach'
import { browserHistory } from 'react-router'
import { FemDomain } from '@regardsoss/domain'
import { ConfirmDialogComponent, ConfirmDialogComponentTypes } from '@regardsoss/components'
import { AdminShapes } from '@regardsoss/shape'
import { ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { FEM_REQUESTS_PROPERTIES, FEM_PRODUCTS_PROPERTIES, FEM_REQUESTS_PROPERTIES_ENUM } from '../../domain/femProperties'
import { ICON_TYPE_ENUM } from '../../domain/iconType'

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
    browserHistory.push(`/admin/${project}/data/acquisition/featuremanager/monitor/${FemDomain.REQUEST_TYPES_ENUM.CREATION}?session=${selectedSession.content.name}&source=${selectedSession.content.source}&state=${FemDomain.REQUEST_STATUS_ENUM.ERROR}`)
  }

  onSeeReferenced = () => {
    const { project, selectedSession } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/featuremanager/monitor?session=${selectedSession.content.name}&source=${selectedSession.content.source}`)
  }

  onRetryErrors = () => {
    const { sessionStep, retryRequests } = this.props
    const tasks = []
    forEach(FemDomain.REQUEST_TYPES, (reqType) => {
      if (reqType !== FemDomain.REQUEST_TYPES_ENUM.REFERENCES
        && reqType !== FemDomain.REQUEST_TYPES_ENUM.EXTRACTION) {
        tasks.push(retryRequests({
          filters: {
            session: sessionStep.session,
            source: sessionStep.source,
          },
          requestIdSelectionMode: 'EXCLUDE',
          requestIds: [],
        }, reqType))
      }
      return null
    })
    return Promise.resolve(tasks)
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
    if (property === FEM_REQUESTS_PROPERTIES_ENUM.REQUESTS_ERRORS) {
      propValue = +get(sessionStep, 'properties.inErrorReferencingRequests', 0) + +get(sessionStep, 'properties.inErrorDeleteRequests', 0) + +get(sessionStep, 'properties.inErrorUpdateRequests', 0) + +get(sessionStep, 'properties.inErrorNotifyRequests', 0)
      style = propValue > 0 ? listItemErrorStyle : listItemNoValueStyle
    }
    return (
      <ListItem
        key={property}
        primaryText={formatMessage({ id: `dashboard.selectedsession.referencing.fem.${property}` }, { value: propValue || 0 })}
        title={formatMessage({ id: `dashboard.selectedsession.referencing.fem.${property}.tooltip` }, { value: propValue || 0 })}
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
    return (
      <ConfirmDialogComponent
        dialogType={ConfirmDialogComponentTypes.CONFIRM}
        title={formatMessage({ id: 'dashboard.selectedsession.referencing.fem.dialog.retry.title' })}
        message={formatMessage({ id: 'dashboard.selectedsession.referencing.fem.dialog.retry.message' })}
        onConfirm={this.onRetryErrors}
        onClose={this.toggleRetryErrorsDialog}
        open={isRetryErrorsDialogOpen}
      />
    )
  }

  render() {
    const { sessionStep } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        selectedSessionStyle: {
          raisedListStyle, cardContentStyle, cardButtonStyle, listItemDivStyle,
          propertiesTitleStyle, propertiesDivStyle, propertiesTitleStyleAlt, propertiesDivStyleAlt,
        },
      },
    } = this.context
    const nbErrors = get(sessionStep, `state.${ICON_TYPE_ENUM.ERRORS}`, 0)
    return <div style={cardContentStyle}>
      <div style={listItemDivStyle}>
        <div style={propertiesTitleStyle}>
          <div style={propertiesDivStyleAlt}>
            {formatMessage({ id: 'dashboard.selectedsession.referencing.fem.properties.requests.title' })}
          </div>
          {
            map(FEM_REQUESTS_PROPERTIES, (property) => (this.displayListItem(property)))
          }
        </div>
        <div style={propertiesTitleStyleAlt}>
          <div style={propertiesDivStyle}>
            {formatMessage({ id: 'dashboard.selectedsession.referencing.fem.properties.products.title' })}
          </div>
          {
            map(FEM_PRODUCTS_PROPERTIES, (property) => (this.displayListItem(property)))
          }
        </div>
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
