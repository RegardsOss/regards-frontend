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
import forEach from 'lodash/forEach'
import has from 'lodash/has'
import { connect } from '@regardsoss/redux'
import { DataManagementShapes } from '@regardsoss/shape'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { unregisterField } from 'redux-form'
import { extractParametersFromFormValues } from '@regardsoss/admin-data-entities-attributes-management'
import DatasetFormAttributesComponent from '../components/DatasetFormAttributesComponent'
import { modelSelectors, modelActions } from '../clients/ModelClient'
import { modelAttributesActions, modelAttributesSelectors } from '../clients/ModelAttributesClient'
import { datasourceSelectors, datasourceActions } from './../clients/DatasourceClient'

/**
 * Show the dataset form
 */
export class DatasetFormAttributesContainer extends React.Component {

  static propTypes = {
    currentDataset: DataManagementShapes.Dataset,
    currentDatasourceId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    backUrl: PropTypes.string.isRequired,
    handleSave: PropTypes.func.isRequired,
    isEditing: PropTypes.bool.isRequired,
    // from redux-form
    unregisterField: PropTypes.func,
    // from mapStateToProps
    modelAttributeList: DataManagementShapes.ModelAttributeList,
    modelList: DataManagementShapes.ModelList,
    currentDatasource: DataManagementShapes.Datasource,
    // from mapDispatchToProps
    fetchModelList: PropTypes.func,
    fetchModelAttributeList: PropTypes.func,
    fetchDatasource: PropTypes.func,
  }


  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
    }
  }

  componentDidMount() {
    const tasks = [
      this.props.fetchModelList(),
      this.props.fetchDatasource(this.props.currentDatasourceId),
    ]
    if (has(this.props.currentDataset, 'content.model.id')) {
      tasks.push(this.props.fetchModelAttributeList(this.props.currentDataset.content.model.id))
    }
    Promise.all(tasks)
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  onSubmit = (values) => {
    const datasourceObjectModelId = this.props.currentDatasource.content.mapping.model
    const properties = extractParametersFromFormValues(values, this.props.modelAttributeList)
    this.props.handleSave(values.label, values.geometry, values.model, properties, datasourceObjectModelId, values.descriptionFileContent, values.descriptionUrl)
  }


  /**
   * Used when the user change the value of the model selected
   * In charge to fetch new list of model attributes
   * @param modelId
   */
  handleUpdateModel = (modelId) => {
    // Remove any value defined in the current form if modelAttributeList existed
    forEach(this.props.modelAttributeList, (modelAttribute) => {
      this.props.unregisterField('dataset-attributes-form', `properties.${modelAttribute.content.attribute.fragment.name}.${modelAttribute.content.attribute.name}`)
    })
    this.props.fetchModelAttributeList(modelId)
  }

  render() {
    const { backUrl, currentDataset, modelList, modelAttributeList, currentDatasource, isEditing } = this.props
    const { isLoading } = this.state
    return (
      <I18nProvider messageDir="business-modules/admin-data-dataset-management/src/i18n">
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {() => (<DatasetFormAttributesComponent
            modelList={modelList}
            modelAttributeList={modelAttributeList}
            currentDataset={currentDataset}
            currentDatasource={currentDatasource}
            onSubmit={this.onSubmit}
            handleUpdateModel={this.handleUpdateModel}
            backUrl={backUrl}
            isEditing={isEditing}
            isCreatinguUsingDatasetValues={!isEditing && has(currentDataset, 'content.label')}
          />)
          }
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  modelAttributeList: modelAttributesSelectors.getList(state),
  modelList: modelSelectors.getList(state),
  currentDatasource: datasourceSelectors.getById(state, ownProps.currentDatasourceId),
})

const mapDispatchToProps = dispatch => ({
  fetchModelList: () => dispatch(modelActions.fetchEntityList({}, { type: 'DATASET' })),
  fetchModelAttributeList: id => dispatch(modelAttributesActions.fetchEntityList({ pModelId: id })),
  unregisterField: (form, name) => dispatch(unregisterField(form, name)),
  fetchDatasource: id => dispatch(datasourceActions.fetchEntity(id)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DatasetFormAttributesContainer)
