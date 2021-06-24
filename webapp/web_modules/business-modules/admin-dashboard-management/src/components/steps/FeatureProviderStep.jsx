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
import { FemDomain } from '@regardsoss/domain'
import { ConfirmDialogComponent, ConfirmDialogComponentTypes } from '@regardsoss/components'
import { AdminShapes } from '@regardsoss/shape'
import { ListItem } from 'material-ui/List'
import RaisedButton from 'material-ui/RaisedButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { FEATURE_PROVIDER_REQUESTS_PROPERTIES, FEATURE_PROVIDER_REQUESTS_PROPERTIES_ENUM, FEATURE_PROVIDER_PRODUCTS_PROPERTIES } from '../../domain/featureProviderProperties'
import { ICON_TYPE_ENUM } from '../../domain/iconType'

/**
 * FeatureProviderStep
 * @author Théo Lasserre
 */
class FeatureProviderStep extends React.Component {
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

  onSeeReferenced = () => {
    const { project, selectedSession } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/featuremanager/monitor/${FemDomain.REQUEST_TYPES_ENUM.EXTRACTION}?session=${selectedSession.content.name}&source=${selectedSession.content.source}`)
  }

  onSeeErrors = () => {
    const { project, selectedSession } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/featuremanager/monitor/${FemDomain.REQUEST_TYPES_ENUM.EXTRACTION}?session=${selectedSession.content.name}&source=${selectedSession.content.source}&state=${FemDomain.REQUEST_STATUS_ENUM.ERROR}`)
  }

  toggleRetryErrorsDialog = () => {
    const { isRetryErrorsDialogOpen } = this.state
    this.setState({
      isRetryErrorsDialogOpen: !isRetryErrorsDialogOpen,
    })
  }

  renderRetryErrorsDialog = (type) => {
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

  onRetryErrors = () => {
    const { sessionStep, retryRequests } = this.props
    retryRequests({
      filters: {
        session: sessionStep.session,
        source: sessionStep.source,
      },
      requestIdSelectionMode: 'EXCLUDE',
      requestIds: [],
    }, FemDomain.REQUEST_TYPES_ENUM.EXTRACTION)
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
    const propValue = get(sessionStep, `properties.${property}`, false)
    let style = listItemNoValueStyle
    if (propValue > 0) {
      style = listItemStyle
    }
    if (property === FEATURE_PROVIDER_REQUESTS_PROPERTIES_ENUM.REQUESTS_ERRORS) {
      style = propValue > 0 ? listItemErrorStyle : listItemNoValueStyle
    }
    return (
      <ListItem
        key={property}
        primaryText={formatMessage({ id: `dashboard.selectedsession.acquisition.fp.${property}` }, { value: propValue || 0 })}
        disabled
        style={style}
      />
    )
  }

  render() {
    const { sessionStep } = this.props
    const {
      intl: { formatMessage }, moduleTheme: {
        selectedSessionStyle: {
          cardContentStyle, cardButtonStyle, listItemDivStyle, propertiesTitleStyle, propertiesDivStyle, propertiesTitleStyleAlt,
          propertiesDivStyleAlt, raisedListStyle,
        },
      },
    } = this.context
    const nbErrors = get(sessionStep, `state.${ICON_TYPE_ENUM.ERRORS}`, 0)
    return <div style={cardContentStyle}>
      <div style={listItemDivStyle}>
        <div style={propertiesTitleStyle}>
          <div style={propertiesDivStyleAlt}>
            {formatMessage({ id: 'dashboard.selectedsession.acquisition.fp.properties.requests.title' })}
          </div>
          {
            map(FEATURE_PROVIDER_REQUESTS_PROPERTIES, (property) => (this.displayListItem(property)))
          }
        </div>
        <div style={propertiesTitleStyleAlt}>
          <div style={propertiesDivStyle}>
            {formatMessage({ id: 'dashboard.selectedsession.acquisition.fp.properties.products.title' })}
          </div>
          {
            map(FEATURE_PROVIDER_PRODUCTS_PROPERTIES, (property) => (this.displayListItem(property)))
          }
        </div>
      </div>
      <div style={cardButtonStyle}>
        <RaisedButton
          onClick={this.onSeeReferenced}
          label={formatMessage({ id: 'dashboard.selectedsession.acquisition.fp.button.see-referenced' })}
          primary
          style={raisedListStyle}
        />
        {
          nbErrors !== 0
            ? (<div style={cardButtonStyle}>
              <RaisedButton
                onClick={this.onSeeErrors}
                label={formatMessage({ id: 'dashboard.selectedsession.acquisition.fp.button.see-errors' })}
                primary
                style={raisedListStyle}
              />
              <RaisedButton
                onClick={this.toggleRetryErrorsDialog}
                label={formatMessage({ id: 'dashboard.selectedsession.acquisition.fp.button.retry-errors' })}
                primary
                style={raisedListStyle}
              />
            </div>)
            : null
        }
      </div>
      {this.renderRetryErrorsDialog()}
    </div>
  }
}
export default FeatureProviderStep
