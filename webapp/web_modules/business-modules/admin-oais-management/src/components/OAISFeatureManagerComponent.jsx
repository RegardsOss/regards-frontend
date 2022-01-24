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
import values from 'lodash/values'
import lowerCase from 'lodash/lowerCase'
import { browserHistory } from 'react-router'
import { Card, CardTitle, CardActions } from 'material-ui/Card'
import { Breadcrumb, CardActionsComponent } from '@regardsoss/components'
import PageView from 'mdi-material-ui/CardSearch'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import OAISFeatureManagerFiltersContainer from '../containers/OAISFeatureManagerFiltersContainer'
import OAISPackageManagerContainer from '../containers/packages/OAISPackageManagerContainer'
import OAISRequestManagerContainer from '../containers/requests/OAISRequestManagerContainer'
import OAISSwitchTables from './OAISSwitchTables'

/**
 * OAIS Feature manager component.
 * @author Simon MILHAU
 */
class OAISFeatureManagerComponent extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string,
      session: PropTypes.string,
      aip: PropTypes.string,
    }),
    clearAIPSelection: PropTypes.func.isRequired,
    clearRequestSelection: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static OPEN_PANE = {
    PACKAGES: 'PACKAGES',
    REQUESTS: 'REQUESTS',
  }

  state = {
    openedPane: OAISFeatureManagerComponent.OPEN_PANE.PACKAGES,
    featureManagerFilters: OAISFeatureManagerFiltersContainer.extractStateFromURL(),
    productFilters: OAISPackageManagerContainer.extractStateFromURL(),
    requestFilters: OAISRequestManagerContainer.extractStateFromURL(),
  }

  UNSAFE_componentWillMount = () => {
    const { query } = browserHistory.getCurrentLocation()
    if (values(query).length > 0) {
      const { display } = query
      let openedPane
      let productFilters = {}
      let requestFilters = {}
      if (display) {
        switch (display) {
          case lowerCase(OAISFeatureManagerComponent.OPEN_PANE.PACKAGES):
            openedPane = OAISFeatureManagerComponent.OPEN_PANE.PACKAGES
            productFilters = OAISPackageManagerContainer.extractStateFromURL()
            break
          case lowerCase(OAISFeatureManagerComponent.OPEN_PANE.REQUESTS):
            openedPane = OAISFeatureManagerComponent.OPEN_PANE.REQUESTS
            requestFilters = OAISRequestManagerContainer.extractStateFromURL()
            break
          default:
            productFilters = OAISPackageManagerContainer.extractStateFromURL()
            requestFilters = OAISRequestManagerContainer.extractStateFromURL()
            break
        }
      }
      this.setState({
        openedPane,
        productFilters,
        requestFilters,
      })
    }
  }

  onBack = (level) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/board`
    browserHistory.push(url)
  }

  onSwitchToPackages = () => {
    const { clearRequestSelection } = this.props
    clearRequestSelection()
    this.setState({
      openedPane: OAISFeatureManagerComponent.OPEN_PANE.PACKAGES,
    })
  }

  onSwitchToRequests = () => {
    const { clearAIPSelection } = this.props
    clearAIPSelection()
    this.setState({
      openedPane: OAISFeatureManagerComponent.OPEN_PANE.REQUESTS,
    })
  }

  renderBreadCrumb = () => {
    const { intl: { formatMessage } } = this.context
    const elements = [formatMessage({ id: 'oais.session.title' })]
    return (
      <Breadcrumb
        rootIcon={<PageView />}
        elements={elements}
        labelGenerator={(label) => label}
        onAction={this.onBack}
      />
    )
  }

  updateStateFromFeatureManagerFilters = (filterKey, filterValue) => {
    const { clearAIPSelection, clearRequestSelection } = this.props
    clearAIPSelection()
    clearRequestSelection()
    this.setState({
      featureManagerFilters: {
        ...this.state.featureManagerFilters,
        [filterKey]: filterValue,
      },
    })
  }

  updateStateFromPackageManager = (newFilters) => {
    const { clearAIPSelection } = this.props
    clearAIPSelection()
    this.setState({
      productFilters: {
        ...this.state.productFilters,
        ...newFilters,
      },
    })
  }

  updateStateFromRequestManager = (newFilters) => {
    const { clearRequestSelection } = this.props
    clearRequestSelection()
    this.setState({
      requestFilters: {
        ...this.state.requestFilters,
        ...newFilters,
      },
    })
  }

  render() {
    const { intl: { formatMessage }, moduleTheme: { displayBlock, displayNone } } = this.context
    const { params } = this.props
    const {
      openedPane, featureManagerFilters, productFilters, requestFilters,
    } = this.state
    return (
      <div>
        <Card>
          <CardTitle
            title={this.renderBreadCrumb()}
          />
          <OAISFeatureManagerFiltersContainer
            featureManagerFilters={featureManagerFilters}
            updateStateFromFeatureManagerFilters={this.updateStateFromFeatureManagerFilters}
          />
          <OAISSwitchTables
            params={params}
            onSwitchToRequests={this.onSwitchToRequests}
            onSwitchToPackages={this.onSwitchToPackages}
            openedPane={openedPane}
            featureManagerFilters={featureManagerFilters}
            productFilters={productFilters}
            requestFilters={requestFilters}
          />
          <div>
            <div style={openedPane === OAISFeatureManagerComponent.OPEN_PANE.PACKAGES ? displayBlock : displayNone}>
              <OAISPackageManagerContainer
                key={`package-manager-${openedPane}`}
                updateStateFromFeatureManagerFilters={this.updateStateFromFeatureManagerFilters}
                updateStateFromPackageManager={this.updateStateFromPackageManager}
                featureManagerFilters={featureManagerFilters}
                productFilters={productFilters}
                params={params}
              />
            </div>
            <div style={openedPane === OAISFeatureManagerComponent.OPEN_PANE.REQUESTS ? displayBlock : displayNone}>
              <OAISRequestManagerContainer
                key={`request-manager-${openedPane}`}
                updateStateFromRequestManager={this.updateStateFromRequestManager}
                featureManagerFilters={featureManagerFilters}
                requestFilters={requestFilters}
                params={params}
              />
            </div>
          </div>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={formatMessage({ id: 'oais.button.back' })}
              mainButtonClick={this.onBack}
            />
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default OAISFeatureManagerComponent
