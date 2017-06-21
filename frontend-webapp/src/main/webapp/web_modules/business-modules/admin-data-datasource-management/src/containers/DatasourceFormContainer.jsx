/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import find from 'lodash/find'
import forEach from 'lodash/forEach'
import cloneDeep from 'lodash/cloneDeep'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { DataManagementShapes, CommonShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { datasourceSelectors, datasourceActions } from './../clients/DatasourceClient'
import DatasourceFormAttributesContainer from './DatasourceFormAttributesContainer'
import DatasourceFormMappingContainer from './DatasourceFormMappingContainer'
import { pluginMetaDataActions, pluginMetaDataSelectors } from './../clients/PluginMetaDataClient'
import { fragmentSelectors } from './../clients/FragmentClient'

const states = {
  FORM_ATTRIBUTE: 'FORM_ATTRIBUTE',
  FORM_MAPPING_CONNECTION: 'FORM_MAPPING_CONNECTION',
}
/**
 * Show the datasource form
 */
export class DatasourceFormContainer extends React.Component {

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      datasourceId: PropTypes.string,
      connectionId: PropTypes.string,
    }),
    // from mapStateToProps
    currentDatasource: DataManagementShapes.Datasource,
    pluginMetaDataList: CommonShapes.PluginMetaDataList,
    // from mapDispatchToProps
    createDatasource: PropTypes.func,
    updateDatasource: PropTypes.func,
    fetchDatasource: PropTypes.func,
    fetchPluginMetaDataList: PropTypes.func,
  }

  constructor(props) {
    super(props)
    const isCreating = props.params.datasourceId === undefined
    this.state = {
      isCreating,
      isEditing: props.params.datasourceId !== undefined,
      isLoading: true,
      state: states.FORM_ATTRIBUTE,
      currentDatasource: null,
    }
  }


  componentDidMount() {
    const tasks = [
      this.props.fetchPluginMetaDataList(),
    ]
    if (this.state.isEditing) {
      tasks.push(this.props.fetchDatasource(this.props.params.datasourceId))
    }
    Promise.all(tasks)
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  componentWillReceiveProps(nextProps) {
    if ((this.state.currentDatasource == null || this.props.currentDatasource == null) && nextProps.currentDatasource != null) {
      this.setState({
        currentDatasource: cloneDeep(nextProps.currentDatasource),
      })
    }
  }
  getCurrentPluginMetaData = () => {
    const { currentDatasource } = this.state
    const { pluginMetaDataList } = this.props
    return find(pluginMetaDataList, pluginMetaData => (
      pluginMetaData.content.pluginClassName === currentDatasource.content.pluginClassName
    ))
  }

  getFormAttributeBackUrl = () => {
    const { params: { project } } = this.props
    const { isEditing } = this.state
    if (isEditing) {
      return `/admin/${project}/data/datasource/list`
    }
    return `/admin/${project}/data/datasource/create/connection`
  }

  /**
   * Check if the fragment if the none one
   */
  getNamespaceUsingFragmentName = (modelAttr) => {
    if (modelAttr.content.attribute.fragment.name !== fragmentSelectors.noneFragmentName) {
      return modelAttr.content.attribute.fragment.name
    }
    return ''
  }

  redirectToList = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/datasource/list`
    browserHistory.push(url)
  }

  /**
   * Called by saveMapping to save the updatedDatasource
   * @param newDatasource
   */
  handleUpdate = (updatedDatasource) => {
    Promise.resolve(this.props.updateDatasource(updatedDatasource.content.pluginConfigurationId, updatedDatasource.content))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.redirectToList()
        }
      })
  }

  /**
   * Called by saveMapping to save the newDatasource
   * @param newDatasource
   */
  handleCreate = (newDatasource) => {
    Promise.resolve(this.props.createDatasource(newDatasource.content))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.redirectToList()
        }
      })
  }

  /**
   * Runned by DatasourceFormAttributesContainer when the user saves his form
   * This does not save the entity on the server but in the state of the container
   * @param values
   */
  saveAttributes = (values) => {
    const { isCreating, currentDatasource } = this.state
    if (isCreating) {
      const newValues = {
        content: {
          label: values.label,
          pluginConfigurationConnectionId: this.props.params.connectionId,
          pluginClassName: values.pluginClassName,
          mapping: {
            model: values.model,
          },
        },
      }
      this.setState({
        state: states.FORM_MAPPING_CONNECTION,
        currentDatasource: newValues,
      })
    } else {
      currentDatasource.content.label = values.label
      this.setState({
        currentDatasource,
        state: states.FORM_MAPPING_CONNECTION,
      })
    }
  }

  /**
   * Runned by DatasourceFormMappingContainer when the user saves his form
   * This function saves the entity on the server
   * @param values
   */
  saveMapping = (formValuesSubset, modelAttributeList, tableAttributeList) => {
    const attributesMapping = []
    forEach(formValuesSubset.attributes, (attribute, attributeName) => {
      const modelAttr = find(modelAttributeList, modelAttribute => modelAttribute.content.attribute.name === attributeName)
      const newAttributeMapping = {
        name: attributeName,
        type: modelAttr.content.attribute.type,
        namespace: this.getNamespaceUsingFragmentName(modelAttr),
      }
      if (attribute.sql && attribute.sql.length > 0) {
        newAttributeMapping.nameDS = attribute.sql
      } else if (attribute.tableAttribute && attribute.tableAttribute.length > 0) {
        newAttributeMapping.nameDS = attribute.tableAttribute
      }
      attributesMapping.push(newAttributeMapping)
    })
    const { currentDatasource } = this.state
    if (formValuesSubset.table) {
      currentDatasource.content.tableName = formValuesSubset.table
      currentDatasource.content.fromClause = null
    } else if (formValuesSubset.fromClause) {
      currentDatasource.content.fromClause = formValuesSubset.fromClause
      currentDatasource.content.tableName = null
    }
    currentDatasource.content.mapping.attributesMapping = attributesMapping
    this.setState({
      currentDatasource,
    })
    if (this.state.isEditing) {
      currentDatasource.content.pluginConfigurationId = this.props.params.datasourceId
      this.handleUpdate(currentDatasource)
    } else {
      this.handleCreate(currentDatasource)
    }
  }


  handleFormMappingBack = () => {
    this.setState({
      state: states.FORM_ATTRIBUTE,
    })
  }

  renderSubContainer = () => {
    const { params: { connectionId }, pluginMetaDataList } = this.props
    const { isEditing, isCreating, state, currentDatasource } = this.state
    switch (state) {
      case states.FORM_ATTRIBUTE:
        return (<DatasourceFormAttributesContainer
          pluginMetaDataList={pluginMetaDataList}
          currentDatasource={currentDatasource}
          currentConnectionId={isCreating ? parseInt(connectionId, 10) : currentDatasource.content.pluginConfigurationConnectionId}
          handleSave={this.saveAttributes}
          backUrl={this.getFormAttributeBackUrl()}
        />)
      case states.FORM_MAPPING_CONNECTION:
        return (<DatasourceFormMappingContainer
          currentPluginMetaData={this.getCurrentPluginMetaData()}
          currentDatasource={currentDatasource}
          isEditing={isEditing}
          isCreating={isCreating}
          handleSave={this.saveMapping}
          handleBack={this.handleFormMappingBack}
        />)
      default:
        return null
    }
  }
  render() {
    const { isLoading } = this.state
    return (
      <I18nProvider messageDir="business-modules/admin-data-datasource-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {this.renderSubContainer}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentDatasource: ownProps.params.datasourceId ? datasourceSelectors.getById(state, ownProps.params.datasourceId) : null,
  pluginMetaDataList: pluginMetaDataSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchDatasource: id => dispatch(datasourceActions.fetchEntity(id)),
  createDatasource: values => dispatch(datasourceActions.createEntity(values)),
  updateDatasource: (id, values) => dispatch(datasourceActions.updateEntity(id, values)),
  fetchPluginMetaDataList: () => dispatch(pluginMetaDataActions.fetchEntityList({
    microserviceName: 'rs-dam',
  }, {
    pluginType: 'fr.cnes.regards.modules.datasources.plugins.interfaces.IDataSourcePlugin',
  })),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasourceFormContainer)
