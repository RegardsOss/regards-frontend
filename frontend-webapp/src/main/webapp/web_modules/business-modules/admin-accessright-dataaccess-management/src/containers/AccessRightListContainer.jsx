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
import { browserHistory } from 'react-router'
import { DataManagementShapes, CommonShapes } from '@regardsoss/shape'
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
    accessGroup: DataManagementShapes.AccessGroup.isRequired,
    // Access rights for the given access group
    accessRights: DataManagementShapes.AccessRightList,
    // Availables plugin configuration for custom access rights delegated to plugins
    pluginConfigurationList: CommonShapes.PluginConfigurationList.isRequired,
    // Availables plugin definitions for custom access rights delegated to plugins
    pluginMetaDataList: CommonShapes.PluginMetaDataList.isRequired,
    // Callback to delete an AccessRight
    deleteAccessRight: PropTypes.func.isRequired,
    // Callback to submit AccessRight(s) configuration (updates and creation)
    submitAccessRights: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    selectedDatasets: PropTypes.objectOf(PropTypes.object).isRequired,
  }

  navigateToCreateDataset = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/collections/dataset/create/datasource`
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
