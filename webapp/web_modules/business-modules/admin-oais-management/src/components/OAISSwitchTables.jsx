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
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CommonShapes } from '@regardsoss/shape'
import { FlatButton } from 'material-ui'
import {
  aipCountSelectors,
  aipCountActions,
} from '../clients/AIPCountClient'
import {
  requestCountSelectors,
  requestCountActions,
} from '../clients/RequestCountClient'

/**
 * Switch between the two tables
 * @author Simon MILHAU
 */
export class OAISSwitchTables extends React.Component {
  /**
  * Redux: map state to props function
  * @param {*} state: current redux state
  * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
  * @return {*} list of component properties extracted from redux state
  */
  static mapStateToProps(state) {
    return {
      aipsMeta: aipCountSelectors.getMetaData(state),
      requestsMeta: requestCountSelectors.getMetaData(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps = dispatch => ({
    fetchAipPage: (pageIndex, pageSize, pathParams, bodyParams) => dispatch(aipCountActions.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, null, bodyParams)),
    fetchRequestPage: (pageIndex, pageSize, pathParams, bodyParams) => dispatch(requestCountActions.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, null, bodyParams)),
  })

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      session: PropTypes.string,
      aip: PropTypes.string,
    }),
    aipsMeta: CommonShapes.PageMetadata,
    requestsMeta: CommonShapes.PageMetadata,
    onSwitchToRequests: PropTypes.func.isRequired,
    onSwitchToPackages: PropTypes.func.isRequired,
    openedPane: PropTypes.string,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => {
    this.onPropertiesUpdated({}, this.props)
  }

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = (nextProps) => {
    this.onPropertiesUpdated(this.props, nextProps)
  }

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    if (!isEqual(oldProps.featureManagerFilters, newProps.featureManagerFilters) || !isEqual(oldProps.productFilters, newProps.productFilters) || !isEqual(oldProps.requestFilters, newProps.requestFilters)) {
      const { fetchAipPage, fetchRequestPage } = newProps
      fetchAipPage(0, 20, {}, {
        ...newProps.featureManagerFilters,
        ...newProps.productFilters,
        lastUpdate: {
          from: newProps.featureManagerFilters.from || null,
          to: newProps.featureManagerFilters.to || null,
        },
        providerIds: newProps.featureManagerFilters.providerId ? [newProps.featureManagerFilters.providerId] : [],
      })
      fetchRequestPage(0, 20, {}, {
        ...newProps.featureManagerFilters,
        ...newProps.requestFilters,
        creationDate: {
          from: newProps.featureManagerFilters.from || null,
          to: newProps.featureManagerFilters.to || null,
        },
        providerIds: newProps.featureManagerFilters.providerId ? [newProps.featureManagerFilters.providerId] : [],
      })
    }
  }

  changeToPackages = () => {
    const { onSwitchToPackages } = this.props
    onSwitchToPackages()
  }

  changeToRequests = () => {
    const { onSwitchToRequests } = this.props
    onSwitchToRequests()
  }

  render() {
    const { intl: { formatMessage }, moduleTheme: { switchButton } } = this.context
    const { aipsMeta, requestsMeta, openedPane } = this.props
    return (
      <React.Fragment>
        <FlatButton
          label={formatMessage({ id: 'oais.requests.switch-to.products.label' }, { productsNb: aipsMeta ? aipsMeta.totalElements : 0 })}
          title={formatMessage({ id: 'oais.requests.switch-to.products.title' })}
          onClick={this.changeToPackages}
          style={openedPane === 'PACKAGES' ? switchButton : null}
          disabled={openedPane === 'PACKAGES'}
        />
        <FlatButton
          label={formatMessage({ id: 'oais.packages.switch-to.requests.label' }, { requestsNb: requestsMeta ? requestsMeta.totalElements : 0 })}
          title={formatMessage({ id: 'oais.packages.switch-to.requests.title' })}
          onClick={this.changeToRequests}
          style={openedPane === 'REQUESTS' ? switchButton : null}
          disabled={openedPane === 'REQUESTS'}
        />

      </React.Fragment>
    )
  }
}

export default connect(OAISSwitchTables.mapStateToProps, OAISSwitchTables.mapDispatchToProps)(OAISSwitchTables)
