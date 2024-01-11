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
import get from 'lodash/get'
import reject from 'lodash/reject'
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { DataManagementShapes } from '@regardsoss/shape'
import { I18nProvider } from '@regardsoss/i18n'
import { PluginFormUtils } from '@regardsoss/microservice-plugin-configurator'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { IAIPDatasourceParamsEnum } from '@regardsoss/domain/dam'
import { CommonDomain } from '@regardsoss/domain'
import FeatureDatasourceFormComponent from '../../components/feature/FeatureDatasourceFormComponent'
import { modelSelectors, modelActions } from '../../clients/ModelClient'
import messages from '../../i18n'
import { datasourceSelectors, datasourceActions } from '../../clients/DatasourceClient'
/**
 * Show the AIP datasource form
 */
export class FeatureDatasourceFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      datasourceId: PropTypes.string,
    }),

    // from mapStateToProps
    modelList: DataManagementShapes.ModelList,
    currentDatasource: DataManagementShapes.Datasource,

    // from mapDispatchToProps
    fetchDatasource: PropTypes.func,
    fetchModelList: PropTypes.func,
    createDatasource: PropTypes.func,
    updateDatasource: PropTypes.func,
  }

  static mapStateToProps = (state, ownProps) => ({
    currentDatasource: ownProps.params.datasourceId ? datasourceSelectors.getById(state, ownProps.params.datasourceId) : null,
    modelList: modelSelectors.getList(state),
  })

  static mapDispatchToProps = (dispatch) => ({
    fetchDatasource: (id) => dispatch(datasourceActions.fetchEntity(id)),
    fetchModelList: () => dispatch(modelActions.fetchEntityList({}, { type: 'DATA' })),
    createDatasource: (values) => dispatch(datasourceActions.createEntity(values)),
    updateDatasource: (id, values) => dispatch(datasourceActions.updateEntity(id, values)),
  })

  state = {
    isCreating: this.props.params.datasourceId === undefined,
    isEditing: this.props.params.datasourceId !== undefined,
    isLoading: true,
  }

  componentDidMount() {
    const { isEditing } = this.state
    const tasks = [
      this.props.fetchModelList(),
    ]
    if (isEditing) {
      tasks.push(this.props.fetchDatasource(this.props.params.datasourceId))
    }
    Promise.all(tasks)
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
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
      currentDatasource, modelList,
    } = this.props
    const {
      isEditing, isCreating,
    } = this.state
    return (<FeatureDatasourceFormComponent
      currentDatasource={currentDatasource}
      modelList={modelList}
      onSubmit={this.handleSave}
      backUrl={this.getBackURL()}
      isEditing={isEditing}
      isCreating={isCreating}
    />)
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
    Promise.resolve(this.props.updateDatasource(updatedDatasource.businessId, updatedDatasource))
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
    const { currentDatasource } = this.props
    const { isCreating } = this.state
    // retrieve possible parameters set by microservice conf import
    const currentParameters = get(currentDatasource, 'content.parameters', [])
    // We need to remove previous model parameter to prevent duplication
    const currentParametersWithoutModel = reject(currentParameters, (currentParameter) => currentParameter.name === IAIPDatasourceParamsEnum.MODEL)
    const parameters = [
      ...currentParametersWithoutModel,
      {
        name: IAIPDatasourceParamsEnum.MODEL,
        type: CommonDomain.PluginParameterTypes.STRING,
        value: values.model,
      },
    ]
    if (isCreating) {
      const datasource = {
        pluginId: 'feature-datasource',
        label: values.label,
        parameters,
      }
      this.handleCreate(PluginFormUtils.formatPluginConf(datasource))
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

export default connect(FeatureDatasourceFormContainer.mapStateToProps, FeatureDatasourceFormContainer.mapDispatchToProps)(FeatureDatasourceFormContainer)
