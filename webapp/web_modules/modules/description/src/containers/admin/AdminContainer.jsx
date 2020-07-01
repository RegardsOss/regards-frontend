/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { connect } from '@regardsoss/redux'
import { DamDomain } from '@regardsoss/domain'
import { AccessShapes, DataManagementShapes, UIShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { collectionAttributeModelActions, collectionAttributeModelSelectors } from '../../clients/CollectionAttributeModelClient'
import { dataAttributeModelActions, dataAttributeModelSelectors } from '../../clients/DataobjectAttributeModelClient'
import { datasetAttributeModelActions, datasetAttributeModelSelectors } from '../../clients/DatasetAttributeModelClient'
import AdminFormComponent from '../../components/admin/AdminFormComponent'
import { uiSettingsActions, uiSettingsSelectors } from '../../clients/UISettingsClient'
import { attributeModelSelectors, attributeModelActions } from '../../clients/AttributeModelClient'

/**
 * Module container for admin interface display (configuration)
 * @author Raphaël Mechali
 */
export class AdminContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      collectionAttributeModels: collectionAttributeModelSelectors.getList(state),
      dataAttributeModels: dataAttributeModelSelectors.getList(state),
      datasetAttributeModels: datasetAttributeModelSelectors.getList(state),
      documentAttributeModels: attributeModelSelectors.getList(state),
      uiSettings: uiSettingsSelectors.getSettings(state),
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
      fetchAllDocumentAttributes: (modelNames) => dispatch(attributeModelActions.fetchEntityList(null, { modelNames })),
      fetchAllCollectionAttributes: () => dispatch(collectionAttributeModelActions.fetchEntityList({ modelType: DamDomain.ENTITY_TYPES_ENUM.COLLECTION })),
      fetchAllDataAttributes: () => dispatch(dataAttributeModelActions.fetchEntityList({ modelType: DamDomain.ENTITY_TYPES_ENUM.DATA })),
      fetchAllDatasetModelsAttributes: () => dispatch(datasetAttributeModelActions.fetchEntityList({ modelType: DamDomain.ENTITY_TYPES_ENUM.DATASET })),
      fetchUISettings: () => dispatch(uiSettingsActions.getSettings()),
    }
  }

  static propTypes = {
    // default module properties
    ...AccessShapes.runtimeConfigurationModuleFields,
    // Set by mapStateToProps
    documentAttributeModels: DataManagementShapes.AttributeModelList,
    collectionAttributeModels: DataManagementShapes.AttributeModelList,
    dataAttributeModels: DataManagementShapes.AttributeModelList,
    datasetAttributeModels: DataManagementShapes.AttributeModelList,
    uiSettings: UIShapes.UISettings,
    // Set by mapDispatchToProps
    fetchAllCollectionAttributes: PropTypes.func.isRequired,
    fetchAllDataAttributes: PropTypes.func.isRequired,
    fetchAllDatasetModelsAttributes: PropTypes.func.isRequired,
    fetchAllDocumentAttributes: PropTypes.func.isRequired,
    fetchUISettings: PropTypes.func.isRequired,
  }

  /** Initial state */
  state = {
    loading: true,
  }

  /**
   * Lifecycle method: component did mount. Used here to fetch data then update state as loaded
   */
  componentDidMount() {
    const {
      fetchAllCollectionAttributes,
      fetchAllDataAttributes,
      fetchAllDatasetModelsAttributes,
      fetchAllDocumentAttributes,
      fetchUISettings,
    } = this.props
    Promise.all([
      fetchAllCollectionAttributes(),
      fetchAllDataAttributes(),
      fetchAllDatasetModelsAttributes(),
      // Document attributes: first pull the document model names
      fetchUISettings().then(() => {
        // Then pull document model (Resolved by promise.all)
        const { uiSettings: { documentModels } } = this.props
        if (!documentModels.length) {
          return true // Immediate resolution: no document model => no document attribute
        }
        return fetchAllDocumentAttributes(documentModels)
      }),
    ]).then(() => this.setState({ loading: false }))
  }

  render() {
    const { loading } = this.state
    const {
      collectionAttributeModels,
      dataAttributeModels,
      datasetAttributeModels,
      documentAttributeModels,
      adminForm: {
        form = {}, currentNamespace, changeField, isCreating,
      },
    } = this.props
    return (
      <LoadableContentDisplayDecorator
        isLoading={loading}
      >
        <AdminFormComponent
          currentNamespace={currentNamespace}
          currentFormValues={get(form, currentNamespace)}
          changeField={changeField}
          isCreating={isCreating}

          collectionAttributeModels={collectionAttributeModels}
          dataAttributeModels={dataAttributeModels}
          datasetAttributeModels={datasetAttributeModels}
          documentAttributeModels={documentAttributeModels}
        />
      </LoadableContentDisplayDecorator>
    )
  }
}

export default connect(
  AdminContainer.mapStateToProps,
  AdminContainer.mapDispatchToProps)(AdminContainer)
