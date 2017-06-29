import { browserHistory } from 'react-router'
import { AccessGroup, AccessRight, PluginConfiguration, PluginMetaData } from '@regardsoss/model'
import { connect } from '@regardsoss/redux'
import TableClient from '../clients/TableClient'
import AccessRightListComponent from '../components/AccessRightListComponent'

class AccessRightListContainer extends React.Component {

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // Access group to configure.
    accessGroup: AccessGroup.isRequired,
    // Access rights for the given access group
    accessRights: PropTypes.objectOf(AccessRight),
    // Availables plugin configuration for custom access rights delegated to plugins
    pluginConfigurationList: PropTypes.objectOf(PluginConfiguration).isRequired,
    // Availables plugin definitions for custom access rights delegated to plugins
    pluginMetaDataList: PropTypes.objectOf(PluginMetaData).isRequired,
    // Callback to delete an AccessRight
    deleteAccessRight: PropTypes.func.isRequired,
    // Callback to submit AccessRight(s) configuration (updates and creation)
    submitAccessRights: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    selectedDatasets: PropTypes.objectOf(PropTypes.object).isRequired,
  }

  navigateToCreateDataset = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/dataset/create/datasource`
    browserHistory.push(url)
  }

  render() {
    return (
      <AccessRightListComponent
        accessGroup={this.props.accessGroup}
        accessRights={this.props.accessRights}
        pluginConfigurationList={this.props.pluginConfigurationList}
        pluginMetaDataList={this.props.pluginMetaDataList}
        deleteAccessRight={this.props.deleteAccessRight}
        submitAccessRights={this.props.submitAccessRights}
        selectedDatasets={this.props.selectedDatasets}
        navigateToCreateDataset={this.navigateToCreateDataset}
      />
    )
  }

}

const mapStateToProps = (state, ownProps) => ({
  selectedDatasets: TableClient.tableSelectors.getToggledElements(state),
})

export default connect(mapStateToProps)(AccessRightListContainer)
