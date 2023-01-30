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
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { IngestDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CommonShapes } from '@regardsoss/shape'
import { TableFilterSortingAndVisibilityContainer } from '@regardsoss/components'
import FlatButton from 'material-ui/FlatButton'
import clientByPane from '../domain/ClientByPane'

/**
 * Switch between the two tables
 * @author Simon MILHAU
 */
export class OAISSwitchTables extends React.Component {
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
    fetchAIPPage: (pageIndex, pageSize, pathParams, queryParams, bodyParams) => dispatch(clientByPane[IngestDomain.REQUEST_TYPES_ENUM.AIP].actions.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, queryParams, bodyParams)),
    fetchRequestsPage: (pageIndex, pageSize, pathParams, queryParams, bodyParams) => dispatch(clientByPane[IngestDomain.REQUEST_TYPES_ENUM.REQUEST].actions.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, queryParams, bodyParams)),
  })

  /**
 * Redux: map state to props function
 * @param {*} state: current redux state
 * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
 * @return {*} list of component properties extracted from redux state
 */
  static mapStateToProps(state) {
    return {
      aipsMeta: clientByPane[IngestDomain.REQUEST_TYPES_ENUM.AIP].selectors.getMetaData(state),
      requestsMeta: clientByPane[IngestDomain.REQUEST_TYPES_ENUM.REQUEST].selectors.getMetaData(state),
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
    bodyParameters: TableFilterSortingAndVisibilityContainer.REQUEST_PARAMETERS_PROP_TYPE,
    openedPane: PropTypes.string,
    // from mapDistpathToProps
    // eslint-disable-next-line react/no-unused-prop-types
    fetchAIPPage: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    fetchRequestsPage: PropTypes.func.isRequired,
    // from mapStateToProps
    aipsMeta: CommonShapes.PageMetadata,
    requestsMeta: CommonShapes.PageMetadata,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static defaultProps = {
    aipsMeta: OAISSwitchTables.DEFAULT_PAGE_META,
    requestsMeta: OAISSwitchTables.DEFAULT_PAGE_META,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => {
    const {
      fetchAIPPage, fetchRequestsPage, bodyParameters,
    } = this.props
    fetchAIPPage(0, TableFilterSortingAndVisibilityContainer.PAGE_SIZE, {}, {}, bodyParameters)
    fetchRequestsPage(0, TableFilterSortingAndVisibilityContainer.PAGE_SIZE, {}, {}, bodyParameters)
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
      fetchAIPPage, fetchRequestsPage, bodyParameters, paneType,
    } = newProps

    if (!isEqual(oldProps.bodyParameters, bodyParameters) && paneType !== oldProps.paneType) {
      fetchAIPPage(0, TableFilterSortingAndVisibilityContainer.PAGE_SIZE, {}, {}, bodyParameters)
      fetchRequestsPage(0, TableFilterSortingAndVisibilityContainer.PAGE_SIZE, {}, {}, bodyParameters)
    }
  }

  changeToPackages = () => {
    const { onSwitchToPane } = this.props
    onSwitchToPane(IngestDomain.REQUEST_TYPES_ENUM.AIP)
  }

  changeToRequests = () => {
    const { onSwitchToPane } = this.props
    onSwitchToPane(IngestDomain.REQUEST_TYPES_ENUM.REQUEST)
  }

  render() {
    const { intl: { formatMessage }, moduleTheme: { switchButton, switchTable } } = this.context
    const { aipsMeta, requestsMeta, openedPane } = this.props
    return (
      <div style={switchTable}>
        <FlatButton
          label={formatMessage({ id: 'oais.requests.switch-to.products.label' }, { productsNb: aipsMeta ? aipsMeta.totalElements : 0 })}
          title={formatMessage({ id: 'oais.requests.switch-to.products.title' })}
          onClick={this.changeToPackages}
          style={openedPane === IngestDomain.REQUEST_TYPES_ENUM.AIP ? switchButton : null}
          disabled={openedPane === IngestDomain.REQUEST_TYPES_ENUM.AIP}
        />
        <FlatButton
          label={formatMessage({ id: 'oais.packages.switch-to.requests.label' }, { requestsNb: requestsMeta ? requestsMeta.totalElements : 0 })}
          title={formatMessage({ id: 'oais.packages.switch-to.requests.title' })}
          onClick={this.changeToRequests}
          style={openedPane === IngestDomain.REQUEST_TYPES_ENUM.REQUEST ? switchButton : null}
          disabled={openedPane === IngestDomain.REQUEST_TYPES_ENUM.REQUEST}
        />

      </div>
    )
  }
}

export default connect(OAISSwitchTables.mapStateToProps, OAISSwitchTables.mapDispatchToProps)(OAISSwitchTables)
