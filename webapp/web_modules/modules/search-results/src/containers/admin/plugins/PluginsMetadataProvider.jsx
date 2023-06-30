/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import keys from 'lodash/keys'
import isEqual from 'lodash/isEqual'
import values from 'lodash/values'
import { AccessDomain, DamDomain } from '@regardsoss/domain'
import { DataManagementShapes, AccessShapes } from '@regardsoss/shape'
import { connect } from '@regardsoss/redux'
import { StringComparison } from '@regardsoss/form-utils'
import { HOCUtils } from '@regardsoss/display-control'
import { loadPlugin, PLUGIN_LOADED } from '@regardsoss/plugins'
import { uiPluginDefinitionActions, uiPluginDefinitionSelectors } from '../../../clients/UIPluginDefinitionClient'
import { uiPluginMetaPartitionActions, uiPluginMetaPartitionSelectors } from '../../../clients/UIPluginMetaPartitionClient'
import { PluginMeta } from '../../../shapes/form/PluginMeta'

/**
 * HOC that resolves plugin definition and plugin-info as PluginMeta. It provide the properties:
 * - pluginsFetching: boolean
 * - pluginsMetadata: array of PluginMeta
 * Nota: it also filters plugin for which the attributes cannot be retrieved
 * @author Raphaël Mechali
 */
export class PluginsMetadataProvider extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      pluginsFetching: uiPluginDefinitionSelectors.isFetching(state),
      pluginsDefinition: uiPluginDefinitionSelectors.getList(state),
      pluginMetaPartitions: uiPluginMetaPartitionSelectors.uncombineStore(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return { // We assert here that there should never be more than 2000 criteria plugins definitions
      fetchPluginsDefinition: () => dispatch(uiPluginDefinitionActions.fetchPagedEntityList(0, 2000, null, {
        type: AccessDomain.UI_PLUGIN_INFO_TYPES_ENUM.CRITERIA,
      })),
      clearMetadata: () => dispatch(uiPluginMetaPartitionActions.flush()),
      markAllMetaLoading: (pluginIds) => dispatch(uiPluginMetaPartitionActions.onManyLoadingStart(pluginIds)),
      markMetaLoaded: (pluginId, metadata) => dispatch(uiPluginMetaPartitionActions.onDataLoadingDone(pluginId, metadata)),
      markMetaInError: (pluginId, error) => dispatch(uiPluginMetaPartitionActions.onDataLoadingFailed(pluginId, error)),
    }
  }

  static propTypes = {
    dataAttributeModels: DataManagementShapes.AttributeModelList,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.node,
    ]),
    // from mapStateToProps
    pluginsFetching: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    pluginsDefinition: AccessShapes.UIPluginDefinitionList, // used in UNSAFE_componentWillReceiveProps
    pluginMetaPartitions: PropTypes.objectOf(PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      hasError: PropTypes.bool.isRequired,
      data: PluginMeta,
    })),
    // from mapDispatchToProps
    fetchPluginsDefinition: PropTypes.func.isRequired,
    clearMetadata: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    markAllMetaLoading: PropTypes.func.isRequired, // used in UNSAFE_componentWillReceiveProps
    markMetaLoaded: PropTypes.func.isRequired,
    markMetaInError: PropTypes.func.isRequired,
  }

  /** initial state (empty to avoid undefined errors) **/
  state = {
    fetchingMetadata: true,
    pluginsMetadata: [],
    children: null,
  }

  /**
   * Life cycle method: component will mount. Used here to:
   * - clear previous data
   * - fetch plugin definitions
   * - ensure initial state
   */
  UNSAFE_componentWillMount() {
    const { children, clearMetadata, fetchPluginsDefinition } = this.props
    clearMetadata()
    fetchPluginsDefinition()
    this.onStateUpdate(children, true, [], true)
  }

  /**
   * Life cycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => {
    const {
      pluginsFetching, pluginsDefinition,
      dataAttributeModels, children,
      pluginMetaPartitions, markAllMetaLoading,
    } = nextProps
    if (this.props.pluginsFetching && !pluginsFetching) {
      // 1 - When detecting plugins definitions loading is performed, initialize plugins metadata partitions
      // and start loading metadata
      markAllMetaLoading(keys(pluginsDefinition))
      this.resolveAllPluginMeta(pluginsDefinition)
    } else if (!isEqual(this.props.pluginMetaPartitions, pluginMetaPartitions)
    || !isEqual(this.props.dataAttributeModels, dataAttributeModels)
    || this.props.children !== children) {
      // 2 - Whenever plugins
      this.onMetaComputingUpdate(children, pluginMetaPartitions, dataAttributeModels, pluginsFetching,
        this.props.children !== children)
    }
  }

  /**
   * Called whenever children, meta data partitions content or attribute models change, that method
   * updates inner state using new data. It produces no plugin meta while loading
   * @param {[*]} children from props
   * @param {{*}} pluginMetaPartitions from props
   * @param {[*]} dataAttributeModels from props
   * @param {boolean} pluginsFetching from props
   * @param {boolean} childrenUpdated were children updated (forces children list rebuild in that case)
   */
  onMetaComputingUpdate = (children, pluginMetaPartitions, dataAttributeModels, pluginsFetching, childrenUpdated) => {
    // A - Compute if plugins definitions or any partition content are fetchingMetadata: provide empty list in that case
    const allPartitions = values(pluginMetaPartitions)
    const isFetching = pluginsFetching || allPartitions.some((partition) => partition.loading)
    // B - Prepare currently available attribute types
    const allAttributeTypes = [...values(dataAttributeModels), ...values(DamDomain.AttributeModelController.standardAttributesAsModel)]
      .reduce((acc, { content: { type } }) => acc.includes(type) ? acc : [...acc, type], [])
    // C - Compute available meta, when not fetchingMetadata
    const pluginsMetadata = isFetching ? [] : allPartitions.reduce((acc, { hasError, data }) => {
      // C.1 - Filter errors
      if (hasError) {
        return acc
      }
      // C.2 - Filter criteria that have, for a given configuration attribute, no matching attribute type (currently available types
      // are computed at B)
      const requiredAttributeTypes = values(data.configuration.attributes).map((attrConf) => attrConf.attributeType)
      const hasMissingType = requiredAttributeTypes.some((attrTypes) => !attrTypes // can find at least one type for that attribute?
        .some((aPossibleType) => allAttributeTypes.includes(aPossibleType)))
      return hasMissingType ? acc : [...acc, data]
    }, [])
      .sort((m1, m2) => StringComparison.compare(m1.name, m2.name)) // finally sort it on name
    // D - Delegate state update
    this.onStateUpdate(children, isFetching, pluginsMetadata, childrenUpdated)
  }

  /**
   * Updates children list when fetchingMetadata state or plugins metadata change
   * @param {[*]} children from props
   * @param {boolean} fetchingMetadata is currently fetching metadata?
   * @param {[*]} pluginsMetadata matching PropTypes.arrayOf(PluginMeta).isRequired
   * @param {boolean} rebuildChildren should force children rebuilding? (occurs at initialization or when
   * list children change)
   */
  onStateUpdate = (children, fetchingMetadata, pluginsMetadata, rebuildChildren) => {
    // Update state on change or when not yet
    if (this.state.fetchingMetadata !== fetchingMetadata
        || !isEqual(this.state.pluginsMetadata, pluginsMetadata)
        || rebuildChildren) {
      this.setState({
        fetchingMetadata,
        pluginsMetadata,
        children: HOCUtils.cloneChildrenWith(children, {
          fetchingMetadata,
          pluginsMetadata,
        }),
      })
    }
  }

  /**
   * Starts all plugins information resolution
   * @param {*} pluginsDefinitions criteria plugins definitions as normalized
   * @return {[Promise]} resolution promises
   */
  resolveAllPluginMeta = (pluginsDefinitions) => values(pluginsDefinitions)
    .map(({ content: { id, sourcePath } }) => this.resolvePluginMeta(id, sourcePath))

  /**
   * Resolve a single plugin meta
   * @param {number} pluginId
   * @param {string} sourcePath
   * @return {Promise} resolution promise
   */
  resolvePluginMeta = (pluginId, sourcePath) => new Promise((resolve, reject) => {
    function onError() {
      reject()
    }
    function onDone({ type, info }) {
      if (type === PLUGIN_LOADED) {
        resolve({
          pluginId,
          name: info.name,
          version: info.version,
          author: info.author,
          description: info.description,
          configuration: info.conf,
        })
      }
    }
    loadPlugin(sourcePath, onError, onDone)
  }).then((meta) => this.props.markMetaLoaded(pluginId, meta)) // commit result
    .catch(() => this.props.markMetaInError(pluginId, `Failed loading plugin content for ${pluginId}`))

  render() {
    const { children } = this.state
    return HOCUtils.renderChildren(children)
  }
}
export default connect(
  PluginsMetadataProvider.mapStateToProps,
  PluginsMetadataProvider.mapDispatchToProps)(PluginsMetadataProvider)
