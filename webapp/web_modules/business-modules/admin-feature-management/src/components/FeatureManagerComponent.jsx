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
import includes from 'lodash/includes'
import { browserHistory } from 'react-router'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import { Breadcrumb, CardActionsComponent } from '@regardsoss/components'
import { FemDomain } from '@regardsoss/domain'
import PageView from 'mdi-material-ui/CardSearch'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import throttle from 'lodash/throttle'
import ReferencesManagerContainer from '../containers/ReferencesManagerContainer'
import RequestManagerContainer from '../containers/RequestManagerContainer'
import FeatureManagerFiltersComponent from './filters/FeatureManagerFiltersComponent'
import SwitchTables from '../containers/SwitchTables'
import clientByPane from '../domain/ClientByPane'

/**
* Feature manager component.
* @author Théo Lasserre
*/
class FeatureManagerComponent extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string,
      type: PropTypes.string,
    }),
    clearReferencesSelection: PropTypes.func.isRequired,
    clearCreationSelection: PropTypes.func.isRequired,
    clearDeleteSelection: PropTypes.func.isRequired,
    clearNotificationSelection: PropTypes.func.isRequired,
    clearUpdateSelection: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    openedPane: FemDomain.REQUEST_TYPES_ENUM.REFERENCES,
    featureManagerFilters: FeatureManagerFiltersComponent.extractFiltersFromURL(),
  }

  UNSAFE_componentWillMount = () => {
    const { params: { type } } = this.props
    if (includes(FemDomain.REQUEST_TYPES, type)) {
      this.setState({
        openedPane: type,
      })
    }
  }

  onBack = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/board`
    browserHistory.push(url)
  }

  onApplyFilters = throttle((featureManagerFilters) => {
    this.setState({ featureManagerFilters: FeatureManagerFiltersComponent.buildRequestParameters(featureManagerFilters) })
  }, 1000, { leading: true, trailing: true })

  clearAllSelections = () => {
    const {
      clearReferencesSelection,
      clearCreationSelection,
      clearDeleteSelection,
      clearNotificationSelection,
      clearUpdateSelection,
    } = this.props
    clearReferencesSelection()
    clearCreationSelection()
    clearDeleteSelection()
    clearNotificationSelection()
    clearUpdateSelection()
  }

  /**
  * Update state with pane type and clear all selection except choosen pane
  * @param {*} paneType see FeatureManagerComponent.PANES for values
  */
  onSwitchToPane = (paneType) => {
    this.clearAllSelections()
    this.setState({
      openedPane: paneType,
    })
  }

  renderBreadCrumb = () => {
    const { intl: { formatMessage } } = this.context
    const elements = [formatMessage({ id: 'feature.references.title' })]
    return (
      <Breadcrumb
        rootIcon={<PageView />}
        elements={elements}
        labelGenerator={(label) => label}
        onAction={this.onBack}
      />
    )
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { params } = this.props
    const {
      openedPane, featureManagerFilters,
    } = this.state
    return (
      <div>
        <Card>
          <CardTitle
            title={this.renderBreadCrumb()}
          />
          <FeatureManagerFiltersComponent
            onApplyFilters={this.onApplyFilters}
            featureManagerFilters={featureManagerFilters}
            openedPane={openedPane}
          />
          <SwitchTables
            params={params}
            onSwitchToPane={this.onSwitchToPane}
            featureManagerFilters={featureManagerFilters}
            openedPane={openedPane}
          />
          <div>
            {
              openedPane === FemDomain.REQUEST_TYPES_ENUM.REFERENCES
                ? (<ReferencesManagerContainer
                    key={`feature-manager-${openedPane}`}
                    featureManagerFilters={featureManagerFilters}
                    params={params}
                    paneType={openedPane}
                />)
                : (
                  <RequestManagerContainer
                    featureManagerFilters={featureManagerFilters}
                    paneType={openedPane}
                    clients={clientByPane[openedPane]}
                  />
                )
            }
          </div>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={formatMessage({ id: 'feature.button.back' })}
              mainButtonClick={this.onBack}
            />
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default FeatureManagerComponent
