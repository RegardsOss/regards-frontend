/**
* LICENSE_PLACEHOLDER
**/
import isEqual from 'lodash/isEqual'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import map from 'lodash/map'
import { connect } from '@regardsoss/redux'
import { CatalogEntity, CatalogEntityTypes, ModelAttribute, AttributeModelController } from '@regardsoss/model'
import { DataManagementClient } from '@regardsoss/client'
import { BasicListSelectors } from '@regardsoss/store-utils'
import { I18nProvider } from '@regardsoss/i18n'
import { ModuleThemeProvider } from '@regardsoss/modules'
import { getTypeRender } from '@regardsoss/attributes-common'
import DownloadDescriptionClient from '../../clients/DownloadDescriptionClient'
import { authenticationSelectors } from '../../clients/AuthenticationClient'
import DetailViewComponent from '../../components/detail/DetailViewComponent'
import styles from '../../styles/styles'

/** Render constant: module syles  */
const MODULE_STYLES = { styles }

/** Render constant: no tag data  */
const NO_TAG = []

/** Locally handled content types */
const DOWNLOAD_CONTENT_TYPES = [DataManagementClient.DownloadDescriptionDefinitions.MARKDOWN_MIMETYPE]

/**
* Detail view container: fetches entity description with provided actions (to fetch file and attributes)
*/
export class DetailViewContainer extends React.Component {

  static mapStateToProps = (state, { downloadDescriptionClient, fetchModelAttributesSelectors }) => {
    const { downloadCollectionDescriptionSelectors, downloadDatasetDescriptionSelectors } = downloadDescriptionClient
    return {
      // loading: is currently loading any description data? (attributes or description file)
      loading: downloadCollectionDescriptionSelectors.isFetching(state) || downloadDatasetDescriptionSelectors.isFetching(state) ||
      fetchModelAttributesSelectors.isFetching(state),
      fetchedModelAttributes: fetchModelAttributesSelectors.hasError(state) ? {} : fetchModelAttributesSelectors.getList(state),
      // dispatching fetched data, the component will select the right one and store it in state
      fetchedCollectionDescriptionResult: downloadCollectionDescriptionSelectors.getResult(state),
      fetchedDatasetDescriptionResult: downloadDatasetDescriptionSelectors.getResult(state),
      accessToken: (authenticationSelectors.getAuthentication(state).result &&
        authenticationSelectors.getAuthentication(state).result.access_token) || null, // map the token for direct download
    }
  }

  static mapDispatchToProps = (dispatch, { fetchModelAttributesActions, downloadDescriptionClient }) => ({
    dispatchFetchModelAttributes: modelId => dispatch(fetchModelAttributesActions.fetchModelAttributes(modelId)),
    dispatchFetchDescription: (entityId, entityType) => {
      // use right fetch actions for entity types
      switch (entityType) {
        case CatalogEntityTypes.COLLECTION:
          dispatch(downloadDescriptionClient.downloadCollectionDescriptionActions.downloadEntityDescription(entityId))
          break
        case CatalogEntityTypes.DATASET:
          dispatch(downloadDescriptionClient.downloadDatasetDescriptionActions.downloadEntityDescription(entityId))
          break
        default:
        // no entity description, dispatch nothing
      }
    },
  })

  static propTypes = {
    // Component API
    open: PropTypes.bool.isRequired,
    entity: CatalogEntity, // entity, or undefined / null / empty object if not shown
    onClose: PropTypes.func.isRequired, // on close callback
    // Callback to run a new search with given tag
    onSearchTag: PropTypes.func,
    // Component fetch operators
    // model attributes to model association (only for mapDispatchToProps and map states to props)
    // eslint-disable-next-line react/no-unused-prop-types
    fetchModelAttributesActions: PropTypes.instanceOf(DataManagementClient.ModelAttributesActions).isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    fetchModelAttributesSelectors: PropTypes.instanceOf(BasicListSelectors).isRequired,
    // download entity description file content client (used only for local markdown description files, that require a transformation before showing)
    // eslint-disable-next-line react/no-unused-prop-types
    downloadDescriptionClient: PropTypes.instanceOf(DownloadDescriptionClient).isRequired,
    // from mapStateToProps
    loading: PropTypes.bool.isRequired, // is currently loading
    // eslint-disable-next-line react/no-unused-prop-types
    accessToken: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    fetchedModelAttributes: PropTypes.objectOf(ModelAttribute),
    // eslint-disable-next-line react/no-unused-prop-types
    fetchedDatasetDescriptionResult: PropTypes.shape({
      fileContent: PropTypes.string,
    }),
    // eslint-disable-next-line react/no-unused-prop-types
    fetchedCollectionDescriptionResult: PropTypes.shape({
      fileContent: PropTypes.string,
    }),

    // from mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    dispatchFetchDescription: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    dispatchFetchModelAttributes: PropTypes.func.isRequired,
  }

  /**
   * Default component state
   */
  static DEFAULT_STATE = {
    attributes: [], // currently fetched attributes
    description: { // description state: should show, how to show (if both showable attributes are null then description is empty)
      url: null, // not null when description can be accessed through an URL (local or external)
      localContent: null, // not null when description content is available here, described as {contentType, content}
    },
  }

  componentWillMount = () => {
    this.updateState(this.props)
  }

  /**
   * Main lifecycle management:
   * - Loads data and prepares description data when entity changes
   * - Prepares description content, model to attributes assoc for component usage
   */
  componentWillReceiveProps = nextProps => this.updateState(nextProps, this.props)

  /**
   * Handles entity change and returns modified state
   * @param dispatchFetchDescription dispatches action to fetch description
   * @param dispatchFetchModelAttributes dispatches action to fetch model to model attributes associations
   * @param nextEntity next entity, not null or undefined
   * @return partial state change, to be applied in next state
   */
  onEntityChange = (dispatchFetchDescription, dispatchFetchModelAttributes, nextEntity) => {
    const { content: { model: { id: modelId }, ipId: entityId, entityType, descriptionFile } } = nextEntity
    // fetch attributes
    dispatchFetchModelAttributes(modelId)
    // 2 - load description content if needed (for objects with a description where filetype is locally downloaded)
    if ([CatalogEntityTypes.COLLECTION, CatalogEntityTypes.DATASET].includes(entityType) &&
      descriptionFile && DOWNLOAD_CONTENT_TYPES.includes(get(descriptionFile, 'type'))) {
      dispatchFetchDescription(entityId, entityType)
    }
  }

  /** Updates the state
   * @param nextProps -
   * @param previousProps (optional)
   */
  updateState = ({
    entity: nextEntity,
    accessToken,
    fetchedCollectionDescriptionResult: nextCollectionDesc,
    fetchedDatasetDescriptionResult: nextDatasetDesc,
    fetchedModelAttributes: nextModelAttributes,
    dispatchFetchDescription,
    dispatchFetchModelAttributes,
  }, previousProps = {}) => {
    const { entity: currentEntity } = previousProps

    // 1 - detect entity change to load required data
    if (!isEqual(currentEntity, nextEntity) && !isEmpty(nextEntity)) {
      this.onEntityChange(dispatchFetchDescription, dispatchFetchModelAttributes, nextEntity)
    }

    // 2 - compute next state from current state (to collect and transform loaded data)
    let nextState = DetailViewContainer.DEFAULT_STATE // default state: no entity
    if (!isEmpty(nextEntity)) {
      // select next state description
      nextState = {
        attributes: this.resolveEntityAttributes(nextEntity, nextModelAttributes),
        description: this.resolveDescription(nextEntity, nextCollectionDesc, nextDatasetDesc, accessToken),
      }
    }
    // 3 - Update the state, when there is some difference
    if (!isEqual(this.state, nextState)) {
      this.setState(nextState)
    }
  }


  /**
   * Resolves current entity description state based on entity type / file URL / description file type and on the
   * content that was loaded
   * @param entity Entity
   * @param nextCollectionDesc next collection description file (if any)
   * @param nextDatasetDesc next dataset description file (if any)
   * @return description state for this state, with URL or content depending on case
   */
  resolveDescription = ({ content: { ipId, entityType, descriptionFile } }, nextCollectionDesc, nextDatasetDesc, accessToken) => {
    const nextDescription = { ...DetailViewContainer.DEFAULT_STATE.description }
    // Only collection and dataset can have description
    if ([CatalogEntityTypes.COLLECTION, CatalogEntityTypes.DATASET].includes(entityType)) {
      const { type: fileType, url } = (descriptionFile || {}) // initialize found file type and URL
      if (url) { // Case 1: description as external URL
        nextDescription.url = url
      } else if (fileType) { // Case 2: locally stored file
        if (DOWNLOAD_CONTENT_TYPES.includes(fileType)) {
          // Case 2a: locally downloaded file
          if (entityType === CatalogEntityTypes.COLLECTION && nextCollectionDesc && nextCollectionDesc.entityId === ipId) {
            // a collection description
            nextDescription.localContent = nextCollectionDesc
          } else if (entityType === CatalogEntityTypes.DATASET && nextDatasetDesc && nextDatasetDesc.entityId === ipId) {
            // a dataset description
            nextDescription.localContent = nextDatasetDesc
          }
        } else {
          // Case 2b: local file addressed as external URL
          nextDescription.url = DataManagementClient.DownloadDescriptionDefinitions.getDirectDownloadURL(entityType, ipId, accessToken)
        }
      }
    }
    // All cases: return gathered description state
    return nextDescription
  }


  /**
   * Resolves found model attributes in
   */
  resolveEntityAttributes = (nextEntity, nextAttrModelAssoc) => map(nextAttrModelAssoc, ({ content: { attribute: attributeModel } }) => {
    // resolve attribute value in entity (push attribute in content, as it is not normalized )
    const accessPath = AttributeModelController.getAttributeAccessPath({ content: attributeModel })
    console.log('accessPAth', accessPath)
    console.log('next entity', nextEntity)
    const value = AttributeModelController.getEntityAttributeValue(nextEntity, accessPath)
    return {
      id: attributeModel.id,
      label: attributeModel.label,
      renderer: getTypeRender(attributeModel.type),
      // prepare value for render, as expected by the renderers API
      renderValue: value ? { main: value } : null,
    }
  })


  render() {
    const { entity, open, loading, onClose } = this.props
    const { attributes, description: { url, localContent } } = this.state
    return (
      <I18nProvider messageDir="business-common/entities-common/src/i18n">
        <ModuleThemeProvider module={MODULE_STYLES}>
          <DetailViewComponent
            entityLabel={entity ? entity.content.label : null}
            attributes={attributes}
            tags={entity ? entity.content.tags : NO_TAG}
            onSearchTag={this.props.onSearchTag}
            descriptionFileURL={url}
            descriptionFile={localContent}
            open={open}
            loaded={!loading}
            onClose={onClose}
          />
        </ModuleThemeProvider>
      </I18nProvider>
    )
  }
}
export default connect(
  DetailViewContainer.mapStateToProps,
  DetailViewContainer.mapDispatchToProps)(DetailViewContainer)
