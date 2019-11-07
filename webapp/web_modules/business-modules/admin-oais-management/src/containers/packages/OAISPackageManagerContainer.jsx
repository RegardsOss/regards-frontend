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
import get from 'lodash/get'
import values from 'lodash/values'
import { connect } from '@regardsoss/redux'
import { browserHistory } from 'react-router'
import { processingChainActions, processingChainSelectors } from '../../clients/ProcessingChainClient'
import { aipSelectors, aipActions } from '../../clients/AIPClient'
import { aipSignalActions } from '../../clients/AIPSignalClient'
import { aipTableSelectors, aipTableActions } from '../../clients/AIPTableClient'
import { aipTagActions } from '../../clients/AIPTagClient'
import OAISPackageManagerComponent from '../../components/packages/OAISPackageManagerComponent'
import OAISCriterionShape from '../../shapes/OAISCriterionShape'

/**
 * Displays the list of OAIS packages
 * @author Simon MILHAU
 */
class OAISPackageManagerContainer extends React.Component {
  /**
  * Redux: map state to props function
  * @param {*} state: current redux state
  * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
  * @return {*} list of component properties extracted from redux state
  */
  static mapStateToProps(state) {
    return {
      meta: aipSelectors.getMetaData(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps = dispatch => ({
    fetchProcessingChains: file => dispatch(processingChainActions.fetchPagedEntityList(0, 1000)),
    fetchPage: (pageIndex, pageSize, pathParams, bodyParams) => dispatch(aipActions.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, bodyParams)),
    clearSelection: () => dispatch(aipTableActions.unselectAll()),
    onRetry: aip => dispatch(aipTagActions.storeRetry(aip.aip.id)),
  })

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      session: PropTypes.string,
      aip: PropTypes.string,
    }),
    meta: PropTypes.shape({ // use only in onPropertiesUpdate
      number: PropTypes.number,
      size: PropTypes.number,
      totalElements: PropTypes.number,
    }),
    // from mapDistpathToProps
    fetchProcessingChains: PropTypes.func.isRequired,
    fetchPage: PropTypes.func.isRequired,
    clearSelection: PropTypes.func.isRequired,
    onRetry: PropTypes.func.isRequired,
    // from mapStateToProps
    featureManagerFilters: OAISCriterionShape,
  }

  static defaultProps = {
    meta: {
      totalElements: 0,
    },
  }

  static PAGE_SIZE = 20

  state = {
    contextFilters: {},
    urlFilters: {},
  }

  componentWillMount() {
    this.initializeFiltersFromURL()
    this.initializeContextFilters(this.props)
  }

  componentDidMount() {
    this.props.fetchProcessingChains()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.aip !== this.props.params.aip) {
      this.initializeFiltersFromURL()
      this.initializeContextFilters(nextProps)
    }
  }

  initializeContextFilters = (props) => {
    const { params: { aip } } = props
    const contextFilters = {}
    if (aip) {
      contextFilters.providerId = aip
    }
    this.setState({ contextFilters })
  }

  initializeFiltersFromURL = () => {
    const { query } = browserHistory.getCurrentLocation()
    if (values(query).length > 0) {
      this.setState({ urlFilters: query })
    }
  }

  /**
   * Callback: on refresh AIP table
   */
  onRefresh = () => {
    const { meta, fetchPage, clearSelection } = this.props
    const { currentFilters } = this.state
    const curentPage = get(meta, 'number', 0)
    clearSelection()
    fetchPage(0, OAISPackageManagerContainer.PAGE_SIZE * (curentPage + 1), currentFilters)
  }

  /**
   * User callback: retry AIP sroage
   */
  onRetryAIPStorage = (aip) => {
    const { onRetry } = this.props
    Promise.resolve(onRetry(aip)).then((results) => {
      if (!results.error) {
        this.onRefresh()
      }
    })
  }

  render() {
    const { urlFilters, contextFilters } = this.state
    const { featureManagerFilters } = this.props

    return (
      <OAISPackageManagerComponent
        pageSize={OAISPackageManagerContainer.PAGE_SIZE}
        contextFilters={contextFilters}
        initialFilters={urlFilters}
        featureManagerFilters={featureManagerFilters}
        onRetryAIPStorage={this.onRetryAIPStorage}
        onRefresh={this.onRefresh}
      />
    )
  }
}

export default connect(OAISPackageManagerContainer.mapStateToProps, OAISPackageManagerContainer.mapDispatchToProps)(OAISPackageManagerContainer)
