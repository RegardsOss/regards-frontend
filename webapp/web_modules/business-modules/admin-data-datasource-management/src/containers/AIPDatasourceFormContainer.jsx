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
import { browserHistory } from 'react-router'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import forEach from 'lodash/forEach'
import { connect } from '@regardsoss/redux'
import { DataManagementShapes } from '@regardsoss/shape'
import { I18nProvider } from '@regardsoss/i18n'
import { getFormValues } from 'redux-form'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { IAIPDatasourceParamsEnum } from '@regardsoss/domain/dam'
import { PluginConfParamsUtils } from '@regardsoss/domain/common'
import AIPDatasourceFormComponent from '../components/AIPDatasourceFormComponent'
import { modelAttributesActions, modelAttributesSelectors } from '../clients/ModelAttributesClient'
import { modelSelectors, modelActions } from '../clients/ModelClient'
import messages from '../i18n'
import { datasourceSelectors, datasourceActions } from './../clients/DatasourceClient'

const { findParam } = PluginConfParamsUtils


/**
 * Show the AIP datasource form
 */
export class AIPDatasourceFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      datasourceId: PropTypes.string,
    }),

    // from mapStateToProps
    modelAttributeList: DataManagementShapes.ModelAttributeList,
    modelList: DataManagementShapes.ModelList,
    currentDatasource: DataManagementShapes.Datasource,
    // eslint-disable-next-line react/forbid-prop-types
    formValues: PropTypes.object,

    // from mapDispatchToProps
    fetchModelAttributeList: PropTypes.func,
    fetchDatasource: PropTypes.func,
    fetchModelList: PropTypes.func,
    flushModelAttribute: PropTypes.func,
    createDatasource: PropTypes.func,
    updateDatasource: PropTypes.func,
  }

  static mapStateToProps = (state, ownProps) => ({
    currentDatasource: ownProps.params.datasourceId ? datasourceSelectors.getById(state, ownProps.params.datasourceId) : null,
    modelList: modelSelectors.getList(state),
    modelAttributeList: modelAttributesSelectors.getList(state),
    formValues: getFormValues('aip-datasource-form')(state),
  })

  static mapDispatchToProps = dispatch => ({
    fetchDatasource: id => dispatch(datasourceActions.fetchEntity(id)),
    fetchModelAttributeList: modelName => dispatch(modelAttributesActions.fetchEntityList({ modelName })),
    flushModelAttribute: () => dispatch(modelAttributesActions.flush()),
    fetchModelList: () => dispatch(modelActions.fetchEntityList({}, { type: 'DATA' })),
    createDatasource: values => dispatch(datasourceActions.createEntity(values)),
    updateDatasource: (id, values) => dispatch(datasourceActions.updateEntity(id, values)),
  })

  constructor(props) {
    super(props)
    const isCreating = props.params.datasourceId === undefined

    this.state = {
      isCreating,
      isEditing: !isCreating,
      isLoading: true,
    }
  }

  componentDidMount() {
    const { isEditing } = this.state
    const tasks = [
      this.props.fetchModelList(),
      this.props.flushModelAttribute(),
    ]
    if (isEditing) {
      tasks.push(this.props.fetchDatasource(this.props.params.datasourceId))
      Promise.all(tasks)
        .then((actionResult) => {
          if (!actionResult[2].error) {
            const currentEditingDatasource = actionResult[2].payload.entities.datasource[actionResult[2].payload.result]
            const modelName = get(findParam(currentEditingDatasource, IAIPDatasourceParamsEnum.MODEL), 'value')
            this.props.fetchModelAttributeList(modelName)
              .then(() => {
                this.setState({
                  isLoading: false,
                })
              })
          }
        })
    } else {
      Promise.all(tasks)
        .then(() => {
          this.setState({
            isLoading: false,
          })
        })
    }
  }

  getBackURL = () => {
    const { params: { project } } = this.props
    const { isEditing } = this.state
    if (isEditing) {
      return `/admin/${project}/data/acquisition/datasource/list`
    }
    return `/admin/${project}/data/acquisition/datasource/create/interface`
  }

  getForm = () => {
    const {
      currentDatasource, modelAttributeList, modelList, formValues,
    } = this.props
    const {
      isEditing, isCreating,
    } = this.state
    return (<AIPDatasourceFormComponent
      currentDatasource={currentDatasource}
      formValues={formValues}
      modelAttributeList={modelAttributeList}
      modelList={modelList}
      onModelSelected={this.handleModelSelected}
      onSubmit={this.handleSave}
      backUrl={this.getBackURL()}
      isEditing={isEditing}
      isCreating={isCreating}
    />)
  }

  /**
   * The mapping defined in the form use the caracter @ instead of .
   * This function just replaces that token foreach value
   * @param values form values
   */
  computeMappings = (values) => {
    const result = {}
    forEach(values.mapping, (value, key) => {
      if (value) {
        result[key.replace(/@/g, '.')] = value
      }
    })
    return result
  }

  /**
   * Fetch model attributes
   * @param modelName the model the user clicked o
   */
  handleModelSelected = (modelName) => {
    this.props.fetchModelAttributeList(modelName)
  }


  redirectToList = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/datasource/list`
    browserHistory.push(url)
  }

  /**
   * Called by handleSave to save the updatedDatasource
   * @param updatedDatasource
   */
  handleUpdate = (updatedDatasource) => {
    Promise.resolve(this.props.updateDatasource(updatedDatasource.id, updatedDatasource))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.redirectToList()
        }
      })
  }

  /**
   * Called by handleSave to save the newDatasource
   * @param newDatasource
   */
  handleCreate = (newDatasource) => {
    Promise.resolve(this.props.createDatasource(newDatasource))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.redirectToList()
        }
      })
  }

  handleSave = (values) => {
    const { isCreating } = this.state
    const mappings = this.computeMappings(values)
    const parameters = [
      {
        name: IAIPDatasourceParamsEnum.BINDMAP_MAP,
        value: mappings,
      },
      {
        name: IAIPDatasourceParamsEnum.MODEL,
        value: values.model,
      },
      {
        name: IAIPDatasourceParamsEnum.REFRESH_RATE,
        value: parseInt(values.refreshRate, 10),
        dynamic: false,
        dynamicsValues: [],
      },
      {
        name: IAIPDatasourceParamsEnum.TAGS,
        value: values.tags,
        dynamic: false,
        dynamicsValues: [],
      },
      {
        name: IAIPDatasourceParamsEnum.SUBSETTING_TAGS,
        value: values.subsettingTags,
        dynamic: false,
        dynamicsValues: [],
      },
    ]
    if (!isEmpty(values.attributeFileSize)) {
      parameters.push(
        {
          name: IAIPDatasourceParamsEnum.ATTRIBUTE_FILE_SIZE,
          value: values.attributeFileSize,
        },
      )
    }
    if (isCreating) {
      const datasource = {
        label: values.label,
        pluginClassName: 'fr.cnes.regards.modules.datasources.plugins.AipDataSourcePlugin',
        pluginId: 'aip-storage-datasource',
        interfaceNames: ['fr.cnes.regards.modules.datasources.domain.plugins.IDBDataSourcePlugin'],
        parameters,
      }
      this.handleCreate(datasource)
    } else {
      const updatedDatasource = {
        ...this.props.currentDatasource.content,
        label: values.label,
        parameters,
      }
      this.handleUpdate(updatedDatasource)
    }
  }

  render() {
    const { isLoading } = this.state
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {this.getForm}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

export default connect(AIPDatasourceFormContainer.mapStateToProps, AIPDatasourceFormContainer.mapDispatchToProps)(AIPDatasourceFormContainer)
