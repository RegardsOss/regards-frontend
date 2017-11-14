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
import { browserHistory } from 'react-router'
import forEach from 'lodash//forEach'
import keys from 'lodash/keys'
import { connect } from '@regardsoss/redux'
import { DataManagementShapes } from '@regardsoss/shape'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { unregisterField } from 'redux-form'
import { extractParametersFromFormValues } from '@regardsoss/admin-data-entities-attributes-management'
import { getAbstractEntityDescription, ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'
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
    createCollection: PropTypes.func,
    updateCollection: PropTypes.func,
    fetchCollection: PropTypes.func,
    fetchModelList: PropTypes.func,
    fetchModelAttributeList: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isCreating: props.params.collectionId === undefined,
      isEditing: props.params.collectionId !== undefined && props.params.mode === 'edit',
      isDuplicating: props.params.collectionId !== undefined && props.params.mode === 'duplicate',
    }
  }

  componentDidMount() {
    this.props.fetchModelList()
    if (this.state.isCreating === false) {
      Promise.resolve(this.props.fetchCollection(this.props.params.collectionId))
        .then((actionResult) => {
          // We receive here the action
          if (!actionResult.error) {
            // We extract the collection id from the action
            const collection = this.extractCollectionFromActionResult(actionResult)
            this.props.fetchModelAttributeList(collection.model.id)
          }
        })
    }
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/collections/collection/list`
  }

  redirectToLinksPage = (collectionId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/collections/collection/${collectionId}/links`
    browserHistory.push(url)
  }

  handleUpdate = (values) => {
    const properties = extractParametersFromFormValues(values, this.props.modelAttributeList)
    const descriptionFile = getAbstractEntityDescription(values.descriptionFileContent, values.descriptionUrl)
    const updatedCollection = Object.assign({}, this.props.currentCollection.content, {
      label: values.label,
      geometry: values.geometry,
      properties,
    })
    // Update the descriptionFile object if the user changed that value
    if (descriptionFile) {
      updatedCollection.descriptionFile = descriptionFile
    }
    const files = {}
    if (values.descriptionFileContent) {
      files.file = values.descriptionFileContent
    }
    const apiValues = {
      collection: updatedCollection,
    }
    Promise.resolve(this.props.updateCollection(this.props.currentCollection.content.id, apiValues, files))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.redirectToLinksPage(this.props.params.collectionId)
        }
      })
  }


  extractCollectionFromActionResult = actionResult => actionResult.payload.entities.collection[keys(actionResult.payload.entities.collection)[0]].content

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
    const descriptionFile = getAbstractEntityDescription(values.descriptionFileContent, values.descriptionUrl)
    const files = {}
    // Send the file if there is
    if (values.descriptionFileContent) {
      files.file = values.descriptionFileContent
    }
    const apiValues = {
      collection: Object.assign({}, defaultValues, {
        label: values.label,
        geometry: values.geometry,
        descriptionFile,
        model,
        properties,
        entityType: ENTITY_TYPES_ENUM.COLLECTION,
      }),
    }
    Promise.resolve(this.props.createCollection(apiValues, files))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          // We extract the collection id from the action
          const collectionId = actionResult.payload.result
          this.redirectToLinksPage(collectionId)
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
    const { isFetchingCollection, currentCollection, modelList, modelAttributeList, isFetchingModel, isFetchingModelAttribute } = this.props
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
          />)
          }
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

const mapDispatchToProps = dispatch => ({
  fetchCollection: id => dispatch(collectionActions.fetchEntity(id)),
  createCollection: (values, files) => dispatch(collectionActions.createEntityUsingMultiPart(values, files)),
  updateCollection: (id, values, files) => dispatch(collectionActions.updateEntityUsingMultiPart(id, values, files)),
  fetchModelList: () => dispatch(modelActions.fetchEntityList({}, { type: ENTITY_TYPES_ENUM.COLLECTION })),
  fetchModelAttributeList: id => dispatch(modelAttributesActions.fetchEntityList({ pModelId: id })),
  unregisterField: (form, name) => dispatch(unregisterField(form, name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(CollectionFormContainer)
