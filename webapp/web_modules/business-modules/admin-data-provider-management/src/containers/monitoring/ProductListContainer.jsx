/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import values from 'lodash/values'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { DataProviderShapes } from '@regardsoss/shape'
import { ProductSelectors, ProductActions } from '../../clients/ProductClient'
import { AcquisitionProcessingChainActions, AcquisitionProcessingChainSelectors } from '../../clients/AcquisitionProcessingChainClient'
import ProductListComponent from '../../components/monitoring/product/ProductListComponent'

/**
* Container to list all products for a given acquisition processing chain
* @author Sébastien Binda
*/
export class ProductListContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, ownProps) {
    return {
      meta: ProductSelectors.getMetaData(state),
      entitiesLoading: ProductSelectors.isFetching(state),
      chain: AcquisitionProcessingChainSelectors.getById(state, ownProps.params.chainId),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch) {
    return {
      fetchAcquisitionProcessingChain: chainId => dispatch(AcquisitionProcessingChainActions.fetchEntity(chainId)),
      fetchPage: (pageIndex, pageSize, requestParams) => dispatch(ProductActions.fetchPagedEntityList(pageIndex, pageSize, {}, requestParams)),
    }
  }

  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string,
      chainId: PropTypes.string,
    }),
    // from mapStateToProps
    meta: PropTypes.shape({ // use only in onPropertiesUpdate
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    entitiesLoading: PropTypes.bool.isRequired,
    chain: DataProviderShapes.AcquisitionProcessingChain,
    // from mapDispatchToProps
    fetchPage: PropTypes.func.isRequired,
    fetchAcquisitionProcessingChain: PropTypes.func.isRequired,
  }

  static defaultProps = {
    meta: {
      totalElements: 0,
    },
  }

  static PAGE_SIZE = 100

  state = {
    initialFilters: {},
    contextFilters: {},
  }

  componentWillMount() {
    this.props.fetchAcquisitionProcessingChain(this.props.params.chainId)
    this.initializeContextFilters()
    this.initializeFiltersFromURL()
  }

  /**
   * Callback to return to the acquisition board
   */
  onBack = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/dataprovider/monitoring/chains`
    browserHistory.push(url)
  }

  onRefresh = (filters) => {
    const { meta, fetchPage } = this.props
    const curentPage = get(meta, 'number', 0)
    return fetchPage(0, ProductListContainer.PAGE_SIZE * (curentPage + 1), filters)
  }

  initializeFiltersFromURL = () => {
    const { query } = browserHistory.getCurrentLocation()
    if (values(query).length > 0) {
      this.setState({ initialFilters: query })
    }
  }

  initializeContextFilters = () => {
    const { params: { chainId } } = this.props
    const contextFilters = {}
    if (chainId) {
      contextFilters.chainId = chainId
    }
    return this.setState({ contextFilters })
  }

  render() {
    const {
      params: { project }, meta, entitiesLoading, chain,
    } = this.props
    const { initialFilters, contextFilters } = this.state
    return (
      <ProductListComponent
        project={project}
        chain={chain}
        initialFilters={initialFilters}
        contextFilters={contextFilters}
        onRefresh={this.onRefresh}
        onBack={this.onBack}
        pageSize={ProductListContainer.PAGE_SIZE}
        resultsCount={meta.totalElements}
        entitiesLoading={entitiesLoading}
      />
    )
  }
}
export default connect(
  ProductListContainer.mapStateToProps,
  ProductListContainer.mapDispatchToProps)(ProductListContainer)
