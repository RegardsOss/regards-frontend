/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import find from 'lodash/find'
import reject from 'lodash/reject'
import get from 'lodash/get'
import forEach from 'lodash/forEach'
import cloneDeep from 'lodash/cloneDeep'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { DataManagementShapes, CommonShapes } from '@regardsoss/shape'
import { IDBDatasourceParamsEnum } from '@regardsoss/domain/dam'
import { PluginFormUtils } from '@regardsoss/microservice-plugin-configurator'
import { PluginConfParamsUtils } from '@regardsoss/domain/common'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { CommonDomain, DamDomain } from '@regardsoss/domain'
import StaticAttributeListDB from '../../domain/db/StaticAttributeListDB'
import { datasourceSelectors, datasourceActions } from '../../clients/DatasourceClient'
import { pluginMetaDataActions, pluginMetaDataSelectors } from '../../clients/PluginMetaDataClient'
import DBDatasourceFormAttributesContainer from './DBDatasourceFormAttributesContainer'
import DBDatasourceFormMappingContainer from './DBDatasourceFormMappingContainer'
import messages from '../../i18n'

const { findParam } = PluginConfParamsUtils

const states = {
  FORM_ATTRIBUTE: 'FORM_ATTRIBUTE',
  FORM_MAPPING_CONNECTION: 'FORM_MAPPING_CONNECTION',
}
/**
 * Show the datasource form
 */
export class DBDatasourceFormContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, ownProps) {
    return {
      currentDatasource: ownProps.params.datasourceId ? datasourceSelectors.getByBusinessId(state, ownProps.params.datasourceId) : null,
      pluginMetaDataList: pluginMetaDataSelectors.getList(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps(dispatch) {
    return {
      fetchDatasource: (id) => dispatch(datasourceActions.fetchEntity(id)),
      createDatasource: (values) => dispatch(datasourceActions.createEntity(values)),
      updateDatasource: (id, values) => dispatch(datasourceActions.updateEntity(id, values)),
      fetchPluginMetaDataList: () => dispatch(pluginMetaDataActions.fetchEntityList(
        {
          microserviceName: 'rs-dam',
        }, {
          pluginType: 'fr.cnes.regards.modules.dam.domain.datasources.plugins.IDBDataSourcePlugin',
        },
      )),
    }
  }

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
    createDatasource: PropTypes.func.isRequired,
    updateDatasource: PropTypes.func.isRequired,
    fetchDatasource: PropTypes.func.isRequired,
    fetchPluginMetaDataList: PropTypes.func.isRequired,
  }

  state = {
    isCreating: this.props.params.datasourceId === undefined,
    isEditing: this.props.params.datasourceId !== undefined,
    isLoading: true,
    state: states.FORM_ATTRIBUTE,
    currentDatasource: null,
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

  UNSAFE_componentWillReceiveProps(nextProps) {
    if ((this.state.currentDatasource == null || this.props.currentDatasource == null) && nextProps.currentDatasource != null) {
      this.setState({
        currentDatasource: cloneDeep(nextProps.currentDatasource),
      })
    }
  }

  getCurrentPluginMetaData = () => {
    const { currentDatasource } = this.state
    const { pluginMetaDataList } = this.props
    return find(pluginMetaDataList, (pluginMetaData) => pluginMetaData.content.pluginId === currentDatasource.content.pluginId)
  }

  getFormAttributeBackUrl = () => {
    const { params: { project } } = this.props
    const { isEditing } = this.state
    if (isEditing) {
      return `/admin/${project}/data/acquisition/datasource/list`
    }
    return `/admin/${project}/data/acquisition/datasource/db/create/connection`
  }

  /**
   * Check if the fragment if the none one
   */
  getNamespaceUsingFragmentName = (modelAttr) => {
    if (modelAttr.content.attribute.fragment.name !== DamDomain.DEFAULT_FRAGMENT) {
      return modelAttr.content.attribute.fragment.name
    }
    return ''
  }

  redirectToList = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/datasource/list`
    browserHistory.push(url)
  }

  /**
   * Called by saveMapping to save the updatedDatasource
   * @param newDatasource
   */
  handleUpdate = (updatedDatasource) => {
    Promise.resolve(this.props.updateDatasource(updatedDatasource.content.businessId, PluginFormUtils.formatPluginConf(updatedDatasource.content)))
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
    Promise.resolve(this.props.createDatasource(PluginFormUtils.formatPluginConf(newDatasource.content)))
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
          pluginId: values.pluginId,
          parameters: [
            {
              name: IDBDatasourceParamsEnum.CONNECTION,
              type: CommonDomain.PluginParameterTypes.PLUGIN,
              value: this.props.params.connectionId,
            },
            {
              name: IDBDatasourceParamsEnum.MODEL,
              type: CommonDomain.PluginParameterTypes.STRING,
              value: values.model,
            },
            {
              name: IDBDatasourceParamsEnum.REFRESH_RATE,
              type: CommonDomain.PluginParameterTypes.INTEGER,
              value: parseInt(values.refreshRate, 10),
            },
            {
              name: IDBDatasourceParamsEnum.TAGS,
              type: CommonDomain.PluginParameterTypes.COLLECTION,
              clazz: 'java.lang.String',
              value: values.tags,
            },
          ],
        },
      }
      this.setState({
        state: states.FORM_MAPPING_CONNECTION,
        currentDatasource: newValues,
      })
    } else {
      // Recompute the parameters array, without refreshRate nor tags
      const parametersWithNewRefreshRate = reject(currentDatasource.content.parameters, (parameter) => (
        parameter.name === IDBDatasourceParamsEnum.REFRESH_RATE || parameter.name === IDBDatasourceParamsEnum.TAGS
      ))
      // Add the refresh rate
      parametersWithNewRefreshRate.push({
        name: IDBDatasourceParamsEnum.REFRESH_RATE,
        type: CommonDomain.PluginParameterTypes.INTEGER,
        value: parseInt(values.refreshRate, 10),
      })
      // Add tags list
      parametersWithNewRefreshRate.push({
        name: IDBDatasourceParamsEnum.TAGS,
        type: CommonDomain.PluginParameterTypes.COLLECTION,
        value: values.tags,
      })
      this.setState({
        currentDatasource: {
          content: {
            ...currentDatasource.content,
            parameters: parametersWithNewRefreshRate,
            label: values.label,
          },
        },
        state: states.FORM_MAPPING_CONNECTION,
      })
    }
  }

  /**
   * Runned by DatasourceFormMappingContainer when the user saves his form
   * This function saves the entity on the server
   * @param values
   */
  saveMapping = (formValuesSubset, modelAttributeList) => {
    const { currentDatasource } = this.state
    const attributesMapping = []
    const newParameters = []
    newParameters.push(findParam(currentDatasource, IDBDatasourceParamsEnum.CONNECTION))
    newParameters.push(findParam(currentDatasource, IDBDatasourceParamsEnum.REFRESH_RATE))
    newParameters.push(findParam(currentDatasource, IDBDatasourceParamsEnum.TAGS))
    newParameters.push(findParam(currentDatasource, IDBDatasourceParamsEnum.MODEL))
    forEach(formValuesSubset.attributes, (attribute, attributeName) => {
      const modelAttr = find(modelAttributeList, (modelAttribute) => modelAttribute.content.attribute.name === attributeName)
      // Is this a static attribute ?
      const modelAttrStatic = find(StaticAttributeListDB, (modelAttribute) => modelAttribute.content.attribute.name === attributeName)

      const newAttributeMapping = {
        name: attributeName,
        type: modelAttr.content.attribute.type,
        namespace: this.getNamespaceUsingFragmentName(modelAttr),
        // Add the Java type ¯\_(ツ)_/¯
        attributeType: modelAttrStatic ? 'STATIC' : 'DYNAMIC',
      }
      if (attribute.sql && attribute.sql.length > 0) {
        newAttributeMapping.nameDS = attribute.sql
        attributesMapping.push(newAttributeMapping)
      } else if (attribute.tableAttribute && attribute.tableAttribute.length > 0) {
        newAttributeMapping.nameDS = attribute.tableAttribute
        attributesMapping.push(newAttributeMapping)
      }
    })
    if (formValuesSubset.table) {
      newParameters.push({
        name: IDBDatasourceParamsEnum.TABLE,
        type: CommonDomain.PluginParameterTypes.STRING,
        value: formValuesSubset.table,
        dynamic: false,
        dynamicsValues: [],
      })
    } else if (formValuesSubset.fromClause) {
      newParameters.push({
        name: IDBDatasourceParamsEnum.FROM_CLAUSE,
        type: CommonDomain.PluginParameterTypes.STRING,
        value: formValuesSubset.fromClause,
        dynamic: false,
        dynamicsValues: [],
      })
    }
    newParameters.push({
      name: IDBDatasourceParamsEnum.MAPPING,
      type: CommonDomain.PluginParameterTypes.COLLECTION,
      value: attributesMapping,
      dynamic: false,
      dynamicsValues: [],
    })
    currentDatasource.content.parameters = newParameters
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
    const { params: { connectionId }, pluginMetaDataList } = this.props
    const {
      isEditing, isCreating, state, currentDatasource,
    } = this.state

    switch (state) {
      case states.FORM_ATTRIBUTE:
        return (<DBDatasourceFormAttributesContainer
          pluginMetaDataList={pluginMetaDataList}
          currentDatasource={currentDatasource}
          currentConnectionId={isCreating ? connectionId : get(findParam(currentDatasource, IDBDatasourceParamsEnum.CONNECTION), 'value')}
          handleSave={this.saveAttributes}
          backUrl={this.getFormAttributeBackUrl()}
        />)
      case states.FORM_MAPPING_CONNECTION:
        return (<DBDatasourceFormMappingContainer
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
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {this.renderSubContainer}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

export default connect(DBDatasourceFormContainer.mapStateToProps, DBDatasourceFormContainer.mapDispatchToProps)(DBDatasourceFormContainer)
