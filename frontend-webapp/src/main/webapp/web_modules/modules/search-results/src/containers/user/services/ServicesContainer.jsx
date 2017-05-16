/**
* LICENSE_PLACEHOLDER
**/
import isEqual from 'lodash/isEqual'
import map from 'lodash/map'
import { connect } from '@regardsoss/redux'
import { BusinessPluginConfiguration, PluginConf as UIPluginConfiguratIon } from '@regardsoss/model'
import OneDatasetBusinessServiceClient from '../../../client/OneDatasetBusinessServiceClient'
import OneDataobjectBusinessServiceClient from '../../../client/OneDataobjectBusinessServiceClient'
import ManyDataobjectsBusinessServiceClient from '../../../client/ManyDataobjectsBusinessServiceClient'
import UIServiceClient from '../../../client/UIServiceClient'
import BusinessService from '../../../service/BusinessService'
import UIService from '../../../service/UIService'

/**
* Container that resolves available services for results.
* Note that :
* - There are two plugins backends (business services) : rs-catalog and rs-access (front end services)
* - There are three types of plugin : Plugins for a complete dataset, plugins for selected dataobjects and plugins for
* a single dataobject.
*  rs-catalog plugins must be fetched by type
* - rs-access plugins must be fetched at once
* - So far, services are only fetched when there is a
*/
class ServicesContainer extends React.Component {

  static mapStateToProps = state => ({
    isLoading: // is loading any data?
    (OneDatasetBusinessServiceClient.selectors.isFetching(state) ||
      OneDataobjectBusinessServiceClient.selectors.isFetching(state) ||
      ManyDataobjectsBusinessServiceClient.selectors.isFetching(state) ||
      UIServiceClient.selectors.isFetching(state)),
    oneDatasetBusinessServices: OneDatasetBusinessServiceClient.selectors.getList(state) || {},
    oneDataobjetBusinessServices: OneDataobjectBusinessServiceClient.selectors.getList(state) || {},
    manyDataobjectsBusinessServices: ManyDataobjectsBusinessServiceClient.selectors.getList(state) || {},
    uiServices: UIServiceClient.selectors.getList(state),
  })

  static mapDispatchToProps = dispatch => ({
    fetchOneDatasetBusinessServices: datasetId => dispatch(OneDatasetBusinessServiceClient.actions.fetchServices(datasetId)),
    fetchOneDataobjetBusinessServices: datasetId => dispatch(OneDataobjectBusinessServiceClient.actions.fetchServices(datasetId)),
    fetchManyDataobjectsBusinessServices: datasetId => dispatch(ManyDataobjectsBusinessServiceClient.actions.fetchServices(datasetId)),
    fetchUIServices: datasetId => dispatch(UIServiceClient.actions.fetchServices(datasetId)),
  })

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    selectedDatasetIpId: React.PropTypes.string, // selected dataset ip id (none when not a single dataset)

    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    isLoading: React.PropTypes.bool.isRequired, // is loading any data?
    // eslint-disable-next-line react/no-unused-prop-types
    oneDatasetBusinessServices: React.PropTypes.objectOf(BusinessPluginConfiguration),
    // eslint-disable-next-line react/no-unused-prop-types
    oneDataobjetBusinessServices: React.PropTypes.objectOf(BusinessPluginConfiguration),
    // eslint-disable-next-line react/no-unused-prop-types
    manyDataobjectsBusinessServices: React.PropTypes.objectOf(BusinessPluginConfiguration),
    // eslint-disable-next-line react/no-unused-prop-types
    uiServices: React.PropTypes.objectOf(UIPluginConfiguratIon),

    // from mapDispatchToProps
    fetchOneDatasetBusinessServices: React.PropTypes.func.isRequired,
    fetchOneDataobjetBusinessServices: React.PropTypes.func.isRequired,
    fetchManyDataobjectsBusinessServices: React.PropTypes.func.isRequired,
    fetchUIServices: React.PropTypes.func.isRequired,
  }

  static DEFAULT_STATE = {
    datasetServices: [],
    dataobjectServices: [],
    selectedDataobjectsServices: [],
  }

  componentWillMount = () => this.onPropertiesChanged(this.props)

  componentWillReceiveProps = nextProps => this.onPropertiesChanged(nextProps, this.props)

  /**
   * Updates the component on properties changes (starts fetching, converts data, update state...)
   * @param newProperties new properties
   * @param oldProperties old properties
   */
  onPropertiesChanged = (newProperties, oldProperties = {}) => {
    const newSelectedDatasetIpId = newProperties.selectedDatasetIpId

    const previousState = this.state
    let nextState = { ...(previousState || ServicesContainer.DEFAULT_STATE) }

    if (newSelectedDatasetIpId !== oldProperties.selectedDatasetIpId) {
      // A - Reload services definitions when dataset changes
      if (newSelectedDatasetIpId) {
        // A.1 - run fetching, conversion will be performed in B
        this.fetchServices(newSelectedDatasetIpId)
      } else {
        // A.2 - no selected dataset ip id, reinit state now
        nextState = ServicesContainer.DEFAULT_STATE
      }
    } else if (!newProperties.isLoading && oldProperties.isLoading !== newProperties.isLoading && newSelectedDatasetIpId) {
      // B - Update services when loding finished (consequence of A.1 case)
      const services = this.convertToServicesPartitions(newSelectedDatasetIpId,
        newProperties.oneDatasetBusinessServices,
        newProperties.oneDataobjetBusinessServices,
        newProperties.manyDataobjectsBusinessServices,
        newProperties.uiServices)
      nextState = { ...services } // keep partitioned services in next state
    }

    // update state when different
    if (!isEqual(previousState, nextState)) {
      this.setState(nextState)
    }
  }

  /**
   * Fetches all services
   */
  fetchServices = (datasetId) => {
    const { fetchOneDatasetBusinessServices, fetchOneDataobjetBusinessServices,
      fetchManyDataobjectsBusinessServices, fetchUIServices } = this.props
    fetchOneDatasetBusinessServices(datasetId)
    fetchOneDataobjetBusinessServices(datasetId)
    fetchManyDataobjectsBusinessServices(datasetId)
    fetchUIServices(datasetId)
  }

  /**
   * Returns services parititions from fetched data
   */
  convertToServicesPartitions = (oneDatasetBusinessServices,
    oneDataobjetBusinessServices, manyDataobjectsBusinessServices, uiServices) => {
    // TODO SHAPE for UI service target type
    const { uiDatasetServices, uiDataobjectServices, uiSelectedDataobjectsService } = UIService.convert(uiServices)
    const datasetServices = [...uiDatasetServices, ...map(oneDatasetBusinessServices, service => new BusinessService(service))]
    const dataobjectServices = [...uiDataobjectServices, ...map(oneDataobjetBusinessServices, service => new BusinessService(service))]
    const selectedDataobjectsServices = [...uiSelectedDataobjectsService, ...map(manyDataobjectsBusinessServices, service => new BusinessService(service))]
    return { datasetServices, dataobjectServices, selectedDataobjectsServices }
  }

  render() {
    return (
      <div />
    )
  }

}
export default connect(
  ServicesContainer.mapStateToProps,
  ServicesContainer.mapDispatchToProps)(ServicesContainer)
