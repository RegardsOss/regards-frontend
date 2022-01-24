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
import forEach from 'lodash//forEach'
import keys from 'lodash/keys'
import { connect } from '@regardsoss/redux'
import { DataManagementShapes } from '@regardsoss/shape'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { unregisterField } from 'redux-form'
import { extractParametersFromFormValues } from '@regardsoss/admin-data-entities-attributes-management'
import { ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'
import { collectionActions, collectionSelectors } from '../clients/CollectionClient'
import CollectionFormComponent from '../components/CollectionFormComponent'
import { modelSelectors, modelActions } from '../clients/ModelClient'
import { modelAttributesSelectors, modelAttributesActions } from '../clients/ModelAttributesClient'
import messages from '../i18n'

/**
 * Show the collection form
 */
export class CollectionFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      collectionId: PropTypes.string,
      mode: PropTypes.string,
    }),
    // from redux-form
    unregisterField: PropTypes.func,
    // from mapStateToProps
    currentCollection: DataManagementShapes.Collection,
    modelAttributeList: DataManagementShapes.ModelAttributeList,
    isFetchingCollection: PropTypes.bool,
    modelList: DataManagementShapes.ModelList,
    isFetchingModelAttribute: PropTypes.bool,
    isFetchingModel: PropTypes.bool,
    // from mapDispatchToProps
    createCollection: PropTypes.func.isRequired,
    updateCollection: PropTypes.func.isRequired,
    fetchCollection: PropTypes.func.isRequired,
    fetchModelList: PropTypes.func.isRequired,
    fetchModelAttributeList: PropTypes.func.isRequired,
    clearModelAttributeList: PropTypes.func.isRequired,
  }

  state = {
    isCreating: this.props.params.collectionId === undefined,
    isEditing: this.props.params.collectionId !== undefined && this.props.params.mode === 'edit',
    isDuplicating: this.props.params.collectionId !== undefined && this.props.params.mode === 'duplicate',
  }

  componentDidMount() {
    this.props.fetchModelList()
    if (this.state.isCreating === false) {
      Promise.resolve(this.props.fetchCollection(this.props.params.collectionId))
        .then((actionResult) => {
          // We receive here the action
          if (!actionResult.error) {
            // We extract the collection name from the action
            const collection = this.extractCollectionFromActionResult(actionResult)
            this.props.fetchModelAttributeList(collection.model.name)
          }
        })
    }
  }

  componentWillUnmount() {
    // leave store in blank state for next edition
    this.props.clearModelAttributeList()
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/collections/collection/list`
  }

  redirectToFilesPage = (collectionId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/collections/collection/${collectionId}/files`
    browserHistory.push(url)
  }

  handleUpdate = (values) => {
    const properties = extractParametersFromFormValues(values, this.props.modelAttributeList)
    const updatedCollection = {
      ...this.props.currentCollection.content,
      feature: {
        ...this.props.currentCollection.content.feature,
        label: values.label,
        geometry: values.geometry,
        properties,
      },
    }
    Promise.resolve(this.props.updateCollection(this.props.currentCollection.content.id, updatedCollection))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.redirectToFilesPage(this.props.params.collectionId)
        }
      })
  }

  extractCollectionFromActionResult = (actionResult) => actionResult.payload.entities.collection[keys(actionResult.payload.entities.collection)[0]].content

  /**
   * Handle form submission on duplication / creation
   * Create a new collection
   * @param values
   */
  handleCreate = (values) => {
    const model = this.props.modelList[values.model].content
    const properties = extractParametersFromFormValues(values, this.props.modelAttributeList)
    const defaultValues = {}
    if (this.state.isDuplicating) {
      defaultValues.tags = this.props.currentCollection.content.tags
    }
    const apiValues = {
      ...defaultValues,
      feature: {
        providerId: values.providerId,
        entityType: ENTITY_TYPES_ENUM.COLLECTION,
        model: values.model,
        properties,
        label: values.label,
        geometry: values.geometry,
      },
      // descriptionFile,
      model,
      type: ENTITY_TYPES_ENUM.COLLECTION,
    }

    Promise.resolve(this.props.createCollection(apiValues))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          // We extract the collection id from the action
          const collectionId = actionResult.payload.result
          this.redirectToFilesPage(collectionId)
        }
      })
  }

  /**
   * Used when the user change the value of the model selected
   * In charge to fetch new list of model attributes
   * @param modelId
   */
  handleUpdateModel = (modelId) => {
    // Remove any value defined in the current form if modelAttributeList existed
    forEach(this.props.modelAttributeList, (modelAttribute) => {
      this.props.unregisterField('collection-form', `properties.${modelAttribute.content.attribute.fragment.name}.${modelAttribute.content.attribute.name}`)
    })
    this.props.fetchModelAttributeList(modelId)
  }

  render() {
    const {
      isFetchingCollection, currentCollection, modelList, modelAttributeList, isFetchingModel, isFetchingModelAttribute,
    } = this.props
    const { isEditing, isDuplicating } = this.state
    const isLoading = ((isEditing || isDuplicating) && (isFetchingCollection || (isFetchingModelAttribute && Object.keys(modelAttributeList).length === 0) || isFetchingModel)) || isFetchingModel
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {() => (<CollectionFormComponent
            modelList={modelList}
            modelAttributeList={modelAttributeList}
            currentCollection={currentCollection}
            isDuplicating={isDuplicating}
            onSubmit={isEditing ? this.handleUpdate : this.handleCreate}
            handleUpdateModel={this.handleUpdateModel}
            backUrl={this.getBackUrl()}
            projectName={this.props.params.project}
          />)}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentCollection: ownProps.params.collectionId ? collectionSelectors.getById(state, ownProps.params.collectionId) : null,
  isFetchingCollection: collectionSelectors.isFetching(state),
  modelAttributeList: modelAttributesSelectors.getList(state),
  modelList: modelSelectors.getList(state),
  isFetchingModel: modelSelectors.isFetching(state),
  isFetchingModelAttribute: modelAttributesSelectors.isFetching(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchCollection: (id) => dispatch(collectionActions.fetchEntity(id)),
  createCollection: (values) => dispatch(collectionActions.createEntity(values)),
  updateCollection: (id, values) => dispatch(collectionActions.updateEntity(id, values)),
  fetchModelList: () => dispatch(modelActions.fetchEntityList({}, { type: ENTITY_TYPES_ENUM.COLLECTION })),
  fetchModelAttributeList: (modelName) => dispatch(modelAttributesActions.fetchEntityList({ modelName })),
  clearModelAttributeList: () => dispatch(modelAttributesActions.flush()),
  unregisterField: (form, name) => dispatch(unregisterField(form, name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionFormContainer)
