/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { AcquisitionFileSelectors, AcquisitionFileActions } from '../../clients/AcquisitionFileClient'
import { AcquisitionProcessingChainSelectors, AcquisitionProcessingChainActions } from '../../clients/AcquisitionProcessingChainClient'
import { ProductActions, ProductSelectors } from '../../clients/ProductClient'
import AcquisitionFileListComponent from '../../components/monitoring/acquisitionFile/AcquisitionFileListComponent'

/**
* Container to list all AcquisitionFiles for a given acquisition processing chain
* @author Sébastien Binda
*/
export class AcquisitionFileListContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, ownProps) {
    return {
      meta: AcquisitionFileSelectors.getMetaData(state),
      entitiesLoading: AcquisitionFileSelectors.isFetching(state),
      chain: get(ownProps, 'params.chainId', false) ? AcquisitionProcessingChainSelectors.getById(state, ownProps.params.chainId) : undefined,
      product: get(ownProps, 'params.productId', false) ? ProductSelectors.getById(state, ownProps.params.productId) : undefined,
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      fetchPage: (pageIndex, pageSize, requestParams) => dispatch(AcquisitionFileActions.fetchPagedEntityList(pageIndex, pageSize, {}, requestParams)),
      fetchChain: id => dispatch(AcquisitionProcessingChainActions.fetchEntity(id)),
      fetchProduct: id => dispatch(ProductActions.fetchEntity(id)),
    }
  }

  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string,
      chainId: PropTypes.string,
      productId: PropTypes.string,
    }),
    // from mapStateToProps
    meta: PropTypes.shape({ // use only in onPropertiesUpdate
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    entitiesLoading: PropTypes.bool.isRequired,
    chain: DataProviderShapes.AcquisitionProcessingChain,
    product: DataProviderShapes.Product,
    // from mapDispatchToProps
    fetchPage: PropTypes.func.isRequired,
    fetchChain: PropTypes.func.isRequired,
    fetchProduct: PropTypes.func.isRequired,
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
    const { params: { chainId, productId }, fetchChain, fetchProduct } = this.props
    this.initializeContextFilters()
    this.initializeFiltersFromURL()
    if (chainId) {
      fetchChain(chainId)
    }
    if (productId) {
      fetchProduct(productId)
    }
  }

  componentWillUnmount = () => {
    clearTimeout(this.timeout)
  }

  /**
   * Callback to return to the acquisition board
   */
  onBackToChains = () => {
    const { params: { project } } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/dataprovider/monitoring/chains`)
  }

  /**
   * Callback to return to the acquisition board
   */
  onBackToProducts = () => {
    const { params: { project, chainId } } = this.props
    browserHistory.push(`/admin/${project}/data/acquisition/dataprovider/monitoring/chains/${chainId}/products`)
  }

  onRefresh = (filters) => {
    const { meta, fetchPage } = this.props
    const curentPage = get(meta, 'number', 0)
    return fetchPage(0, AcquisitionFileListContainer.PAGE_SIZE * (curentPage + 1), filters)
  }

  initializeFiltersFromURL = () => {
    const { query } = browserHistory.getCurrentLocation()
    if (values(query).length > 0) {
      this.setState({ initialFilters: query })
    }
  }

  initializeContextFilters = () => {
    const { params: { productId, chainId } } = this.props
    const contextFilters = {}
    if (productId) {
      contextFilters.productId = productId
    }
    if (chainId) {
      contextFilters.chainId = chainId
    }
    return this.setState({ contextFilters })
  }

  render() {
    const {
      meta, entitiesLoading, chain, product,
    } = this.props
    const { initialFilters, contextFilters } = this.state
    return (
      <AcquisitionFileListComponent
        chain={chain}
        product={product}
        onRefresh={this.onRefresh}
        onBackToChains={this.onBackToChains}
        onBackToProducts={this.onBackToProducts}
        pageSize={AcquisitionFileListContainer.PAGE_SIZE}
        resultsCount={meta.totalElements}
        entitiesLoading={entitiesLoading}
        initialFilters={initialFilters}
        contextFilters={contextFilters}
      />
    )
  }
}
export default connect(
  AcquisitionFileListContainer.mapStateToProps,
  AcquisitionFileListContainer.mapDispatchToProps)(AcquisitionFileListContainer)
