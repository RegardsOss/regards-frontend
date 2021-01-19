/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import find from 'lodash/find'
import { connect } from '@regardsoss/redux'
import { PluginMetaDataConfiguration } from '@regardsoss/api'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { pluginMetadataActions } from '../clients/PluginMetadataClient'
import PluginListComponent from '../components/PluginListComponent'

/**
 * Container to connect with server informations to display a PluginListComponent
 * @author Sébastien Binda
 */
export class PluginListContainer extends React.Component {
  /**
  * Redux: map dispatch to props function
  * @param {*} dispatch: redux dispatch function
  * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
  * @return {*} list of actions ready to be dispatched in the redux store
  */
  static mapDispatchToProps = (dispatch) => ({
    fetchPlugins: (microserviceName, pluginType) => dispatch(pluginMetadataActions.fetchEntityList({ microserviceName }, { pluginType })),
  })

  static propTypes = {
    title: PropTypes.string,
    selectLabel: PropTypes.string,
    microserviceName: PropTypes.string.isRequired,
    pluginType: PropTypes.string.isRequired,
    selectedPluginId: PropTypes.string,
    handleSelect: PropTypes.func.isRequired,
    errorText: PropTypes.string,
    disabled: PropTypes.bool,
    displayMoreInfoButton: PropTypes.bool,
    // Set by connect
    fetchPlugins: PropTypes.func.isRequired,
  }

  state = {
    pluginList: {},
    isLoading: true,
  }

  componentDidMount() {
    // Retrieve all pluginMetadatas for the required plugin type
    this.props.fetchPlugins(this.props.microserviceName, this.props.pluginType)
      .then(this.updatePluginList)
  }

  /**
   * Update the list of current pluginList into the state with the given ones.
   */
  updatePluginList = (actionResult) => {
    // After response is received if there is no error, set the pluginMetaData list into the state
    // and set the selected one to the given one from the props.
    if (!actionResult.error && get(actionResult, 'payload.entities', null)) {
      const pluginList = actionResult.payload.entities[PluginMetaDataConfiguration.normalizrKey]
      this.setState({
        pluginList,
        isLoading: false,
      })
      if (this.props.selectedPluginId) {
        const plugin = find(pluginList, (p) => p.content.pluginId === this.props.selectedPluginId)
        if (plugin) {
          this.props.handleSelect(plugin.content, true)
        }
      }
    } else {
      this.setState({
        isLoading: false,
      })
    }
  }

  /**
   * Display the PluginListComponent with fetched informations
   */
  render() {
    return (
      <LoadableContentDisplayDecorator
        isLoading={this.state.isLoading}
      >
        <PluginListComponent
          title={this.props.title}
          selectLabel={this.props.selectLabel}
          onChange={this.props.handleSelect}
          pluginList={this.state.pluginList}
          defaultSelectedPluginId={this.props.selectedPluginId}
          disabled={this.props.disabled}
          errorText={this.props.errorText}
          displayMoreInfoButton={this.props.displayMoreInfoButton}
        />
      </LoadableContentDisplayDecorator>
    )
  }
}

export default connect(null, PluginListContainer.mapDispatchToProps)(PluginListContainer)
