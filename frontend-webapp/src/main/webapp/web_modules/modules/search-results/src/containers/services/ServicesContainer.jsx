/**
* LICENSE_PLACEHOLDER
**/
import { connect } from '@regardsoss/redux'
import { AccessProjectClient, CatalogClient } from '@regardsoss/client'

/**
* Container that resolves available services for results.
* Note that :
* 1 - There are two plugins backends (business services) : rs-dam and rs-access (front end services)
* 2 - There are there types of plugin : Plugins for a complete dataset, plugins for selected dataobjects and plugins for
* a single dataobject.
*/
class ServicesContainerContainer extends React.Component {

  static mapStateToProps = state => ({

  })

  static mapDispatchToProps = dispatch => ({
    fetchOneDatasetBusinessServices: datasetId => dispatch(oneDatasetBusinessServiceActions.fetchServices(datasetId)),
    fetchManyDataobjectsBusinessServices: datasetId => dispatch(manyDataobjectsBusinessServiceActions.fetchServices(datasetId)),
    fetchOneDataobjetBusinessServices: datasetId => dispatch(oneDataobjectBusinessServiceActions.fetchServices(datasetId)),
    fetchUIServices: datasetId => dispatch(uiServicesActions.fetchServices(datasetId)),
  })

  static propTypes = {
    // from mapStateToProps
    // from mapDispatchToProps
  }

  render() {
    return (
      <ServicesContainerComponent />
    )
  }
}
export default connect(
  ServicesContainerContainer.mapStateToProps,
  ServicesContainerContainer.mapDispatchToProps)(ServicesContainerContainer)
