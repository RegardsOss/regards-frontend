/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEqual from 'lodash/isEqual'
import reduce from 'lodash/reduce'
import keys from 'lodash/keys'
import includes from 'lodash/includes'
import pick from 'lodash/pick'
import omit from 'lodash/omit'
import { connect } from '@regardsoss/redux'
import { IngestDomain, UIDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CommonShapes } from '@regardsoss/shape'
import { TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import clientByPane from '../domain/ClientByPane'
import { PACKAGE_COLUMN_KEYS } from '../components/packages/OAISPackageManagerComponent'
import { REQUESTS_COLUMN_KEYS } from '../components/requests/OAISRequestManagerComponent'
import SwitchComponent from '../components/SwitchComponent'

/**
 * Switch between the two tables
 * @author Simon MILHAU
 * @author Théo Lasserre
 */
export class OAISSwitchTablesContainer extends React.Component {
  // Setting PAGE_SIZE to 1 prevent flooding network with unnecessary informations.
  // we juste want to retrieve totalElements, we don't care about results sent by backend server.
  static PAGE_SIZE = 1

  static DEFAULT_PAGE_META = {
    number: 0,
    size: STATIC_CONF.TABLE.PAGE_SIZE || 20,
    totalElements: 0,
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps = (dispatch) => ({
    fetchAIPPage: (pageIndex, pageSize, pathParams, queryParams, bodyParams) => dispatch(clientByPane[IngestDomain.REQUEST_TYPES_ENUM.AIP].countActions.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, queryParams, bodyParams)),
    fetchRequestsPage: (pageIndex, pageSize, pathParams, queryParams, bodyParams) => dispatch(clientByPane[IngestDomain.REQUEST_TYPES_ENUM.REQUEST].countActions.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, queryParams, bodyParams)),
  })

  /**
 * Redux: map state to props function
 * @param {*} state: current redux state
 * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
 * @return {*} list of component properties extracted from redux state
 */
  static mapStateToProps(state) {
    return {
      aipsMeta: clientByPane[IngestDomain.REQUEST_TYPES_ENUM.AIP].countSelectors.getMetaData(state),
      isAipsFetching: clientByPane[IngestDomain.REQUEST_TYPES_ENUM.AIP].countSelectors.isFetching(state),
      requestsMeta: clientByPane[IngestDomain.REQUEST_TYPES_ENUM.REQUEST].countSelectors.getMetaData(state),
      isRequestsFetching: clientByPane[IngestDomain.REQUEST_TYPES_ENUM.REQUEST].countSelectors.isFetching(state),
    }
  }

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      session: PropTypes.string,
      aip: PropTypes.string,
    }),
    onSwitchToPane: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    oaisFilters: TableFilterSortingAndVisibilityContainer.REQUEST_PARAMETERS_PROP_TYPE,
    openedPane: PropTypes.oneOf(IngestDomain.REQUEST_TYPES).isRequired,
    // from mapDistpathToProps
    // eslint-disable-next-line react/no-unused-prop-types
    fetchAIPPage: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    fetchRequestsPage: PropTypes.func.isRequired,
    // from mapStateToProps
    aipsMeta: CommonShapes.PageMetadata,
    requestsMeta: CommonShapes.PageMetadata,
    // eslint-disable-next-line react/no-unused-prop-types
    isAipsFetching: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    isRequestsFetching: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static defaultProps = {
    aipsMeta: OAISSwitchTablesContainer.DEFAULT_PAGE_META,
    requestsMeta: OAISSwitchTablesContainer.DEFAULT_PAGE_META,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => {
    const { openedPane } = this.props
    let defaultFilterState = IngestDomain.AipFilters.buildDefault()
    if (openedPane === IngestDomain.REQUEST_TYPES_ENUM.REQUEST) {
      defaultFilterState = IngestDomain.RequestFilters.buildDefault()
    }
    const oaisFilters = UIDomain.FiltersPaneHelper.extractFiltersFromURL(defaultFilterState)
    this.onPropertiesUpdated({}, { ...this.props, oaisFilters })
  }

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const {
      fetchAIPPage, fetchRequestsPage, oaisFilters, isAipsFetching, isRequestsFetching, openedPane,
    } = newProps

    // Refresh current tab count When applying filter or when changing tab.
    if (!isEqual(oldProps.oaisFilters, oaisFilters) || !isEqual(oldProps.openedPane, openedPane)) {
      const requestParameters = { ...pick(oaisFilters, 'sort') }
      const bodyParameters = { ...omit(oaisFilters, 'sort') }

      if (!isAipsFetching) {
        const aipBodyParameters = this.buildBodyParameters(bodyParameters, IngestDomain.AipFilters.buildDefault())
        const aipRequestParameters = UIDomain.SortingHelper.buildSortingParameters(requestParameters, PACKAGE_COLUMN_KEYS)
        fetchAIPPage(0, OAISSwitchTablesContainer.PAGE_SIZE, {}, aipRequestParameters, aipBodyParameters)
      }

      if (!isRequestsFetching) {
        const requestsBodyParameters = this.buildBodyParameters(bodyParameters, IngestDomain.RequestFilters.buildDefault())
        const requestsRequestsParameters = UIDomain.SortingHelper.buildSortingParameters(requestParameters, REQUESTS_COLUMN_KEYS)
        fetchRequestsPage(0, OAISSwitchTablesContainer.PAGE_SIZE, {}, requestsRequestsParameters, requestsBodyParameters)
      }
    }
  }

  /**
   * Filter bodyParameters to match specified filters state
   * Used to fetch all tabs at once when filters are updated
   * @param {*} bodyParameters
   * @param {*} defaultFiltersState
   */
  buildBodyParameters = (bodyParameters, defaultFiltersState) => {
    const newBodyParameters = reduce(bodyParameters, (acc, value, key) => {
      if (includes(keys(defaultFiltersState), key)) {
        return {
          ...acc,
          [key]: value,
        }
      }
      return acc
    }, {})
    return newBodyParameters
  }

  extractInfos = (meta) => ({
    nbElements: meta ? meta.totalElements : 0,
  })

  isFetching = (pane) => {
    const {
      isAipsFetching, isRequestsFetching,
    } = this.props
    let isFetching = true
    switch (pane) {
      case IngestDomain.REQUEST_TYPES_ENUM.AIP:
        isFetching = isAipsFetching
        break
      case IngestDomain.REQUEST_TYPES_ENUM.REQUEST:
        isFetching = isRequestsFetching
        break
      default:
    }
    return isFetching
  }

  getNbElementsInfos = (pane) => {
    const {
      aipsMeta, requestsMeta,
    } = this.props
    let meta = null
    switch (pane) {
      case IngestDomain.REQUEST_TYPES_ENUM.AIP:
        meta = aipsMeta
        break
      case IngestDomain.REQUEST_TYPES_ENUM.REQUEST:
        meta = requestsMeta
        break
      default:
    }
    return this.extractInfos(meta)
  }

  render() {
    const { moduleTheme: { switchTable: { divStyle } } } = this.context
    const { onSwitchToPane, openedPane } = this.props
    return (
      <div style={divStyle}>
        {map(IngestDomain.REQUEST_TYPES, (pane) => (
          <SwitchComponent
            key={`switch-table-${pane}`}
            loading={this.isFetching(pane)}
            pane={pane}
            paneType={openedPane}
            nbElementsInfos={this.getNbElementsInfos(pane)}
            onSwitchToPane={onSwitchToPane}
          />
        ))}
      </div>
    )
  }
}

export default connect(OAISSwitchTablesContainer.mapStateToProps, OAISSwitchTablesContainer.mapDispatchToProps)(OAISSwitchTablesContainer)
