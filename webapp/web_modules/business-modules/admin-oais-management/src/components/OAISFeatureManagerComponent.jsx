/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { Card, CardTitle } from 'material-ui/Card'
import { Breadcrumb } from '@regardsoss/components'
import PageView from 'material-ui/svg-icons/action/pageview'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import OAISFeatureManagerFiltersComponent from './OAISFeatureManagerFiltersComponent'
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
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    isPackageManagerVisible: true,
    featureManagerFilters: {},
  }

  onSwitch = () => {
    this.setState({
      isPackageManagerVisible: !this.state.isPackageManagerVisible,
    })
  }

  onBreadcrumbAction = (element, index) => {
  }

  renderBreadCrumb = () => {
    const { intl: { formatMessage } } = this.context
    const elements = [formatMessage({ id: 'oais.session.title' })]
    return (
      <Breadcrumb
        rootIcon={<PageView />}
        elements={elements}
        labelGenerator={label => label}
        onAction={this.onBreadcrumbAction}
      />
    )
  }

  updateStateFromFeatureManagerFilters = ({ lastUpdate, ...newFilters }) => {
    //TODO SAVE IN URL
    this.setState({
      featureManagerFilters: {
        ...this.state.featureManagerFilters,
        ...newFilters,
        lastUpdate: {
          ...this.state.featureManagerFilters.lastUpdate,
          ...lastUpdate,
        },
      },
    })
  }

  render() {
    const { moduleTheme: { displayBlock, displayNone } } = this.context
    const { params } = this.props
    const { isPackageManagerVisible, featureManagerFilters } = this.state

    return (
      <div>
        <Card>
          <CardTitle
            title={this.renderBreadCrumb()}
          />
          <OAISFeatureManagerFiltersComponent
            featureManagerFilters={featureManagerFilters}
            updateStateFromFeatureManagerFilters={this.updateStateFromFeatureManagerFilters}
          />
          <OAISSwitchTables onSwitch={this.onSwitch} isPackageManagerVisible={isPackageManagerVisible} />
          <div>
            <div style={isPackageManagerVisible ? displayBlock : displayNone}>
              <OAISPackageManagerContainer
                key={`package-manager-${isPackageManagerVisible}`}
                featureManagerFilters={featureManagerFilters}
                params={params}
              />
            </div>
            <div style={isPackageManagerVisible ? displayNone : displayBlock}>
              <OAISRequestManagerContainer
                key={`request-manager-${isPackageManagerVisible}`}
                featureManagerFilters={featureManagerFilters}
                params={params}
              />
            </div>
          </div>
        </Card>
      </div>
    )
  }
}

export default OAISFeatureManagerComponent
