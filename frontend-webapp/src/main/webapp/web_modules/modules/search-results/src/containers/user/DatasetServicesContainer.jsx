/**
* LICENSE_PLACEHOLDER
**/
import map from 'lodash/map'
import { connect } from '@regardsoss/redux'
import { BusinessPluginConfiguration, FetchedUIPluginConf } from '@regardsoss/model'
import OneDatasetBusinessServiceClient from '../../client/OneDatasetBusinessServiceClient'
import ManyDataobjectsBusinessServiceClient from '../../client/ManyDataobjectsBusinessServiceClient'
import UIServiceClient from '../../client/UIServiceClient'
import navigationContextSelectors from '../../models/navigation/NavigationContextSelectors'
import datasetServicesActions from '../../models/services/DatasetServicesActions'
import NavigationLevel from '../../models/navigation/NavigationLevel'
import BusinessService from '../../definitions/service/BusinessService'
import UIService from '../../definitions/service/UIService'

/**
* Container that resolves available services for a given dataset ie:
* - services to be applied to a dataset
* - services to be applied on selection
* It publishes resolved dataset services to the store
*/
export class DatasetServicesContainer extends React.Component {

  static getSelectedDatasetIpId = (state) => {
    // retrieve the selected dataset IP ID in levels
    const datasetLevel = NavigationLevel.getDatasetLevel(navigationContextSelectors.getLevels(state))
    // return undefined when no dataset level, dataset IP ID otherwise
    return datasetLevel && datasetLevel.levelValue
  }

  static mapStateToProps = state => ({
    selectedDatasetIpId: DatasetServicesContainer.getSelectedDatasetIpId(state),
    isLoading: // is loading any data?
    (OneDatasetBusinessServiceClient.selectors.isFetching(state) ||
      ManyDataobjectsBusinessServiceClient.selectors.isFetching(state) ||
      UIServiceClient.selectors.isFetching(state)),
    oneDatasetBusinessServices: OneDatasetBusinessServiceClient.selectors.getList(state) || {},
    manyDataobjectsBusinessServices: ManyDataobjectsBusinessServiceClient.selectors.getList(state) || {},
    uiServices: UIServiceClient.selectors.getList(state),
  })

  static mapDispatchToProps = dispatch => ({
    fetchOneDatasetBusinessServices: datasetId => dispatch(OneDatasetBusinessServiceClient.actions.fetchServices(datasetId)),
    fetchManyDataobjectsBusinessServices: datasetId => dispatch(ManyDataobjectsBusinessServiceClient.actions.fetchServices(datasetId)),
    fetchUIServices: datasetId => dispatch(UIServiceClient.actions.fetchServices(datasetId)),
    publishDatasetServices: (datasetServices, selectedDataobjectsServices) =>
      dispatch(datasetServicesActions.publishCurrentDatasetServices(datasetServices, selectedDataobjectsServices)),
  })

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    initialDatasetIpId: PropTypes.string, // initial dataset ip id or none
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    selectedDatasetIpId: PropTypes.string, // selected dataset ip id (none when not a single dataset)
    // eslint-disable-next-line react/no-unused-prop-types
    isLoading: PropTypes.bool.isRequired, // is loading any data?
    // eslint-disable-next-line react/no-unused-prop-types
    oneDatasetBusinessServices: PropTypes.objectOf(BusinessPluginConfiguration),
    // eslint-disable-next-line react/no-unused-prop-types
    manyDataobjectsBusinessServices: PropTypes.objectOf(BusinessPluginConfiguration),
    // eslint-disable-next-line react/no-unused-prop-types
    uiServices: PropTypes.objectOf(FetchedUIPluginConf),

    // from mapDispatchToProps
    fetchOneDatasetBusinessServices: PropTypes.func.isRequired,
    fetchManyDataobjectsBusinessServices: PropTypes.func.isRequired,
    fetchUIServices: PropTypes.func.isRequired,
    publishDatasetServices: PropTypes.func.isRequired,
  }

  componentWillMount = () => this.onPropertiesChanged(this.props)

  componentWillReceiveProps = nextProps => this.onPropertiesChanged(nextProps, this.props)

  /**
   * Updates the component on properties changes (starts fetching, converts data, update state...)
   * @param newProperties new properties
   * @param oldProperties old properties
   */
  onPropertiesChanged = (newProperties, oldProperties = {}) => {
    const oldSelectedDatasetIpId = oldProperties.selectedDatasetIpId || oldProperties.initialDatasetIpId
    const newSelectedDatasetIpId = newProperties.selectedDatasetIpId || newProperties.initialDatasetIpId

    if (newSelectedDatasetIpId !== oldSelectedDatasetIpId) {
      // reset services as dataset ip id changed
      newProperties.publishDatasetServices()
      // A - Reload services definitions when dataset changes
      if (newSelectedDatasetIpId) {
        // A.1 - run fetching, conversion will be performed in B
        this.fetchServices(newSelectedDatasetIpId)
      }
    } else if (!newProperties.isLoading && oldProperties.isLoading !== newProperties.isLoading && newSelectedDatasetIpId) {
      // B - Update services when loding finished (consequence of A.1 case)
      const { datasetServices, selectedDataobjectsServices } = this.convertToServicesPartitions(newProperties.oneDatasetBusinessServices,
        newProperties.manyDataobjectsBusinessServices, newProperties.uiServices)
      this.publishServices(datasetServices, selectedDataobjectsServices)
    }
  }

  /**
   * Fetches all services
   */
  fetchServices = (datasetId) => {
    const { fetchOneDatasetBusinessServices, fetchManyDataobjectsBusinessServices, fetchUIServices } = this.props
    fetchOneDatasetBusinessServices(datasetId)
    fetchManyDataobjectsBusinessServices(datasetId)
    fetchUIServices(datasetId)
  }

  publishServices = (datasetServices, selectedDataobjectsServices) => {
    const { publishDatasetServices } = this.props
    publishDatasetServices(datasetServices, selectedDataobjectsServices)
  }

  /**
   * Returns services parititions from fetched data
   */
  convertToServicesPartitions = (oneDatasetBusinessServices, manyDataobjectsBusinessServices, uiServices) => {
    const { uiDatasetServices, uiSelectedDataobjectsService } = UIService.convert(uiServices)
    const datasetServices = [
      ...uiDatasetServices,
      ...map(oneDatasetBusinessServices, service => new BusinessService(service)),
    ]
    const selectedDataobjectsServices = [
      ...uiSelectedDataobjectsService,
      ...map(manyDataobjectsBusinessServices, service => new BusinessService(service)),
    ]
    return { datasetServices, selectedDataobjectsServices }
  }

  render() {
    return null
  }

}
export default connect(
  DatasetServicesContainer.mapStateToProps,
  DatasetServicesContainer.mapDispatchToProps)(DatasetServicesContainer)
