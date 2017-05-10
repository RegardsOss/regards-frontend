/**
 * LICENSE_PLACEHOLDER
 **/
import { browserHistory } from 'react-router'
import { find, forEach, cloneDeep } from 'lodash'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { Datasource } from '@regardsoss/model'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { datasourceSelectors, datasourceActions } from './../client/DatasourceClient'
import DatasourceFormAttributesContainer from './DatasourceFormAttributesContainer'
import DatasourceFormMappingContainer from './DatasourceFormMappingContainer'

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
    params: React.PropTypes.shape({
      project: React.PropTypes.string,
      datasourceId: React.PropTypes.string,
      connectionId: React.PropTypes.string,
    }),
    // from mapStateToProps
    currentDatasource: Datasource,
    // from mapDispatchToProps
    createDatasource: React.PropTypes.func,
    updateDatasource: React.PropTypes.func,
    fetchDatasource: React.PropTypes.func,
  }

  constructor(props) {
    super(props)
    const isCreating = props.params.datasourceId === undefined
    this.state = {
      isCreating,
      isEditing: props.params.datasourceId !== undefined,
      isLoading: !isCreating,
      state: states.FORM_ATTRIBUTE,
      currentDatasource: null,
    }
  }


  componentDidMount() {
    if (this.state.isEditing) {
      Promise.resolve(this.props.fetchDatasource(this.props.params.datasourceId))
        .then(() => {
          this.setState({
            isLoading: false,
          })
        })
    }
  }
  componentWillReceiveProps(nextProps) {
    if ((this.state.currentDatasource == null || this.props.currentDatasource == null) && nextProps.currentDatasource != null) {
      this.setState({
        currentDatasource: cloneDeep(nextProps.currentDatasource),
      })
    }
  }

  getFormAttributeBackUrl = () => {
    const { params: { project } } = this.props
    const { isEditing } = this.state
    if (isEditing) {
      return `/admin/${project}/data/datasource/list`
    }
    return `/admin/${project}/data/datasource/create/connection`
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
    Promise.resolve(this.props.updateDatasource(updatedDatasource.content.id, updatedDatasource.content))
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
        nameSpace: modelAttr.content.attribute.fragment.name,
        isPrimaryKey: attribute.pk === true,
      }
      if (attribute.sql && attribute.sql.length > 0) {
        newAttributeMapping.nameDS = attribute.sql
      } else if (attribute.tableAttribute && attribute.tableAttribute.length > 0) {
        // Retrieve the corresponding table attribute
        const tableAttr = find(tableAttributeList, tableAttribute => tableAttribute.name === attribute.tableAttribute)
        newAttributeMapping.typeDS = tableAttr.javaSqlType
        newAttributeMapping.nameDS = attribute.tableAttribute
      }
      attributesMapping.push(newAttributeMapping)
    })
    const { currentDatasource } = this.state
    if (formValuesSubset.table) {
      currentDatasource.content.tableName = formValuesSubset.table
      currentDatasource.content.fromClause = ''
    } else if (formValuesSubset.fromClause) {
      currentDatasource.content.fromClause = formValuesSubset.fromClause
      currentDatasource.content.tableName = ''
    }
    currentDatasource.content.mapping.attributesMapping = attributesMapping
    this.setState({
      currentDatasource,
    })
    if (this.state.isEditing) {
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
    const { params: { connectionId } } = this.props
    const { isEditing, isCreating, state, currentDatasource } = this.state
    switch (state) {
      case states.FORM_ATTRIBUTE:
        return (<DatasourceFormAttributesContainer
          currentDatasource={currentDatasource}
          currentConnectionId={isCreating ? connectionId : currentDatasource.content.pluginConfigurationConnectionId}
          handleSave={this.saveAttributes}
          backUrl={this.getFormAttributeBackUrl()}
        />)
      case states.FORM_MAPPING_CONNECTION:
        return (<DatasourceFormMappingContainer
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
})

const mapDispatchToProps = dispatch => ({
  fetchDatasource: id => dispatch(datasourceActions.fetchEntity(id)),
  createDatasource: values => dispatch(datasourceActions.createEntity(values)),
  updateDatasource: (id, values) => dispatch(datasourceActions.updateEntity(id, values)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasourceFormContainer)
