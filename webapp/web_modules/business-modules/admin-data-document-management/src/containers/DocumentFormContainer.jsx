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
import forEach from 'lodash//forEach'
import keys from 'lodash/keys'
import { connect } from '@regardsoss/redux'
import { DataManagementShapes } from '@regardsoss/shape'
import { I18nProvider } from '@regardsoss/i18n'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { unregisterField } from 'redux-form'
import { extractParametersFromFormValues } from '@regardsoss/admin-data-entities-attributes-management'
import { ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'
import { documentActions, documentSelectors } from '../clients/DocumentClient'
import DocumentFormComponent from '../components/DocumentFormComponent'
import { modelSelectors, modelActions } from '../clients/ModelClient'
import { modelAttributesSelectors, modelAttributesActions } from '../clients/ModelAttributesClient'
import messages from '../i18n'

/**
 * Show the document form
 */
export class DocumentFormContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      documentId: PropTypes.string,
      mode: PropTypes.string,
    }),
    // from redux-form
    unregisterField: PropTypes.func,
    // from mapStateToProps
    currentDocument: DataManagementShapes.Document,
    modelAttributeList: DataManagementShapes.ModelAttributeList,
    isFetchingDocument: PropTypes.bool,
    modelList: DataManagementShapes.ModelList,
    isFetchingModelAttribute: PropTypes.bool,
    isFetchingModel: PropTypes.bool,
    // from mapDispatchToProps
    createDocument: PropTypes.func,
    updateDocument: PropTypes.func,
    fetchDocument: PropTypes.func,
    fetchModelList: PropTypes.func,
    fetchModelAttributeList: PropTypes.func,
  }

  constructor(props) {
    super(props)
    this.state = {
      isCreating: props.params.documentId === undefined,
      isEditing: props.params.documentId !== undefined && props.params.mode === 'edit',
      isDuplicating: props.params.documentId !== undefined && props.params.mode === 'duplicate',
    }
  }

  componentDidMount() {
    this.props.fetchModelList()
    if (this.state.isCreating === false) {
      Promise.resolve(this.props.fetchDocument(this.props.params.documentId))
        .then((actionResult) => {
          // We receive here the action
          if (!actionResult.error) {
            const document = this.extractDocumentFromActionResult(actionResult)
            this.props.fetchModelAttributeList(document.model.name)
          }
        })
    }
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/acquisition/document/list`
  }

  getComponent = () => {
    const { currentDocument, modelList, modelAttributeList } = this.props
    const { isEditing, isDuplicating } = this.state
    return (<DocumentFormComponent
      modelList={modelList}
      modelAttributeList={modelAttributeList}
      currentDocument={currentDocument}
      isDuplicating={isDuplicating}
      onSubmit={isEditing ? this.handleUpdate : this.handleCreate}
      handleUpdateModel={this.handleUpdateModel}
      backUrl={this.getBackUrl()}
    />)
  }

  redirectToFilesPage = (documentId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/document/${documentId}/files`
    browserHistory.push(url)
  }

  handleUpdate = (values) => {
    const properties = extractParametersFromFormValues(values, this.props.modelAttributeList)
    const updatedDocument = Object.assign({}, this.props.currentDocument.content, {
      feature: {
        ...this.props.currentDocument.content.feature,
        label: values.label,
        geometry: values.geometry,
        properties,
      },
    })
    Promise.resolve(this.props.updateDocument(this.props.currentDocument.content.id, updatedDocument))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          this.redirectToFilesPage(this.props.params.documentId)
        }
      })
  }

  /**
   * @return document retrieved from action result payload
   */
  extractDocumentFromActionResult = actionResult => actionResult.payload.entities.document[keys(actionResult.payload.entities.document)[0]].content

  /**
   * Handle form submission on duplication / creation
   * Create a new document
   * @param values
   */
  handleCreate = (values) => {
    const model = this.props.modelList[values.model].content
    const properties = extractParametersFromFormValues(values, this.props.modelAttributeList)
    const defaultValues = {}
    if (this.state.isDuplicating) {
      defaultValues.tags = this.props.currentDocument.content.tags
    }
    const newDocument = Object.assign({}, defaultValues, {
      entityType: ENTITY_TYPES_ENUM.DOCUMENT,
      model,
      feature: {
        label: values.label,
        model: values.model,
        providerId: values.providerId,
        geometry: values.geometry,
        properties,
        entityType: ENTITY_TYPES_ENUM.DOCUMENT,
        type: 'Feature',
      },
    })
    Promise.resolve(this.props.createDocument(newDocument))
      .then((actionResult) => {
        // We receive here the action
        if (!actionResult.error) {
          // We extract the document id from the action
          const documentId = actionResult.payload.result
          this.redirectToFilesPage(documentId)
        }
      })
  }

  /**
   * Used when the user change the value of the model selected
   * In charge to fetch new list of model attributes
   * @param modelName
   */
  handleUpdateModel = (modelName) => {
    // Remove any value defined in the current form if modelAttributeList existed
    forEach(this.props.modelAttributeList, (modelAttribute) => {
      this.props.unregisterField('document-form', `properties.${modelAttribute.content.attribute.fragment.name}.${modelAttribute.content.attribute.name}`)
    })
    this.props.fetchModelAttributeList(modelName)
  }

  render() {
    const {
      isFetchingDocument, modelAttributeList, isFetchingModel, isFetchingModelAttribute,
    } = this.props
    const { isEditing, isDuplicating } = this.state
    const isLoading = ((isEditing || isDuplicating) && (isFetchingDocument || (isFetchingModelAttribute && Object.keys(modelAttributeList).length === 0) || isFetchingModel)) || isFetchingModel
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {this.getComponent}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentDocument: ownProps.params.documentId ? documentSelectors.getById(state, ownProps.params.documentId) : null,
  isFetchingDocument: documentSelectors.isFetching(state),
  modelAttributeList: modelAttributesSelectors.getList(state),
  modelList: modelSelectors.getList(state),
  isFetchingModel: modelSelectors.isFetching(state),
  isFetchingModelAttribute: modelAttributesSelectors.isFetching(state),
})

const mapDispatchToProps = dispatch => ({
  fetchDocument: id => dispatch(documentActions.fetchEntity(id)),
  createDocument: values => dispatch(documentActions.createEntity(values)),
  updateDocument: (id, values) => dispatch(documentActions.updateEntity(id, values)),
  fetchModelList: () => dispatch(modelActions.fetchEntityList({}, { type: ENTITY_TYPES_ENUM.DOCUMENT })),
  fetchModelAttributeList: modelName => dispatch(modelAttributesActions.fetchEntityList({ modelName })),
  unregisterField: (form, name) => dispatch(unregisterField(form, name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentFormContainer)
