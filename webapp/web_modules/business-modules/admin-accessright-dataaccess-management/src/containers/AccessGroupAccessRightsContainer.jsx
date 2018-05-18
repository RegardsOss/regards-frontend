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
import { connect } from '@regardsoss/redux'
import { DataManagementShapes, CommonShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import AccessRightListContainer from './AccessRightListContainer'
import { accessGroupActions, accessGroupSelectors } from '../clients/AccessGroupClient'
import { pluginConfigurationActions, pluginConfigurationSelectors } from '../clients/PluginConfigurationClient'
import { pluginMetaDataActions, pluginMetaDataSelectors } from '../clients/PluginMetadataClient'

export class AccessGroupAccessRightsContainer extends React.Component {
  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string,
      accessgroup: PropTypes.string.isRequired,
    }).isRequired,
    // from mapStateToProps
    accessGroup: DataManagementShapes.AccessGroup,
    pluginConfigurationList: CommonShapes.PluginConfigurationList,
    pluginMetaDataList: CommonShapes.PluginMetaDataList,
    // from mapDispatchToProps
    fetchAccessGroup: PropTypes.func,
    fetchPluginConfigurationList: PropTypes.func,
    fetchPluginMetaDataList: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      loading: true,
    }
  }

  componentDidMount() {
    Promise.all([
      this.props.fetchAccessGroup(this.props.params.accessgroup),
      this.props.fetchPluginMetaDataList(),
      this.props.fetchPluginConfigurationList()])
      .then(() => {
        this.setState({
          loading: false,
        })
      })
  }

  render() {
    const {
      params, accessGroup, pluginConfigurationList, pluginMetaDataList,
    } = this.props
    const { loading } = this.state
    return (
      <LoadableContentDisplayDecorator
        isLoading={loading}
        isContentError={!loading && !accessGroup}
      >
        {() => (
          <AccessRightListContainer
            params={params}
            accessGroup={accessGroup}
            pluginConfigurationList={pluginConfigurationList}
            pluginMetaDataList={pluginMetaDataList}
          />
        )}
      </LoadableContentDisplayDecorator>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  accessGroup: accessGroupSelectors.getById(state, ownProps.params.accessgroup),
  pluginConfigurationList: pluginConfigurationSelectors.getList(state),
  pluginMetaDataList: pluginMetaDataSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchPluginConfigurationList: () => dispatch(pluginConfigurationActions.fetchEntityList({
    microserviceName: 'rs-dam',
  }, {
    pluginId: 'fr.cnes.regards.modules.dataaccess.domain.accessright.ICheckDataAccess',
  })),
  fetchAccessGroup: accessGroupName => dispatch(accessGroupActions.fetchEntity(accessGroupName)),
  fetchPluginMetaDataList: microserviceName => dispatch(pluginMetaDataActions.fetchEntityList({
    microserviceName: 'rs-dam',
  }, {
    pluginType: 'fr.cnes.regards.modules.dataaccess.domain.accessright.ICheckDataAccess',
  })),
})

export default connect(mapStateToProps, mapDispatchToProps)(AccessGroupAccessRightsContainer)
