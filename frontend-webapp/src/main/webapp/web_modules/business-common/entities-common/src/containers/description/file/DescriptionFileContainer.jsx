/**
* LICENSE_PLACEHOLDER
**/
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'
import { CatalogShapes } from '@regardsoss/shape'
import { DataManagementClient } from '@regardsoss/client'
import { authenticationSelectors } from '../../../clients/AuthenticationClient'
import DownloadDescriptionClient from '../../../clients/DownloadDescriptionClient'
import { AuthenticationParametersSelectors } from '@regardsoss/authentication-manager'
import DescriptionFileComponent from '../../../components/description/file/DescriptionFileComponent'

/**
* Description container: resolves and provide the description to corresponding component
*/
export class DescriptionFileContainer extends React.Component {

  static mapStateToProps = (state, { downloadDescriptionClient }) => {
    const { downloadCollectionDescriptionSelectors, downloadDatasetDescriptionSelectors } = downloadDescriptionClient
    return {
      // loading: is currently loading any description data? (attributes or description file)
      loading: downloadCollectionDescriptionSelectors.isFetching(state) || downloadDatasetDescriptionSelectors.isFetching(state),
      // dispatching fetched data, the component will select the right one and store it in state
      fetchedCollectionDescriptionResult: downloadCollectionDescriptionSelectors.getResult(state),
      fetchedDatasetDescriptionResult: downloadDatasetDescriptionSelectors.getResult(state),
      accessToken: get(authenticationSelectors.getAuthentication(state), 'result.access_token', null), // map the token for direct download
      scope: AuthenticationParametersSelectors.getProject(state),
    }
  }

  static mapDispatchToProps = (dispatch, { downloadDescriptionClient }) => ({
    dispatchFetchDescription: (entityId, entityType) => {
      // use right fetch actions for entity types
      switch (entityType) {
        case ENTITY_TYPES_ENUM.COLLECTION:
          dispatch(downloadDescriptionClient.downloadCollectionDescriptionActions.downloadEntityDescription(entityId))
          break
        case ENTITY_TYPES_ENUM.DATASET:
          dispatch(downloadDescriptionClient.downloadDatasetDescriptionActions.downloadEntityDescription(entityId))
          break
        default:
        // no entity description, dispatch nothing
      }
    },
  })

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    entity: CatalogShapes.Entity,
    // required client for file description download
    // eslint-disable-next-line react/no-unused-prop-types
    downloadDescriptionClient: PropTypes.instanceOf(DownloadDescriptionClient).isRequired,
    // from mapStateToProps
    loading: PropTypes.bool.isRequired, // is currently loading
    // eslint-disable-next-line react/no-unused-prop-types
    accessToken: PropTypes.string,
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
  }

  /** Locally handled content types */
  static DOWNLOAD_CONTENT_TYPES = [DataManagementClient.DownloadDescriptionDefinitions.MARKDOWN_MIMETYPE]

  static DEFAULT_STATE = {
    description: { // description state: should show, how to show (if both showable attributes are null then description is empty)
      url: null, // not null when description can be accessed through an URL (local or external)
      localContent: null, // not null when description content is available here, described as {contentType, content}
    },
  }
  componentWillMount = () => this.onPropertiesChanges({}, this.props)

  componentWillReceiveProps = nextProps => this.onPropertiesChanges(this.props, nextProps)

  /**
   * On properties changed
   * @param oldProps old properties
   * @param newProps new properties
   */
  onPropertiesChanges = (oldProps, {
    entity: newEntity,
    fetchedDatasetDescriptionResult: nextDatasetDescription,
    fetchedCollectionDescriptionResult: nextCollectionDescription,
    accessToken,
    scope,
    dispatchFetchDescription,
  }) => {
    const oldState = this.state
    const newState = { ...DescriptionFileContainer.DEFAULT_STATE }

    // 1 - detect entity change
    if (!isEqual(oldProps.entity, newEntity)) {
      if (newEntity) {
        // Check if entity has description and if it should be downloaded
        const { content: { ipId: entityId, entityType, descriptionFile } } = newEntity
        if ([ENTITY_TYPES_ENUM.COLLECTION, ENTITY_TYPES_ENUM.DATASET].includes(entityType) &&
          descriptionFile && DescriptionFileContainer.DOWNLOAD_CONTENT_TYPES.includes(get(descriptionFile, 'type'))) {
          // entity is a collection or dataset and its content should be download
          dispatchFetchDescription(entityId, entityType)
        }
      }
    }

    // 2 - resolve description
    newState.description = this.resolveDescription(newEntity, nextCollectionDescription, nextDatasetDescription, accessToken, scope)

    // 3 - set state if any change is detected
    if (!isEqual(oldState, newState)) {
      this.setState(newState)
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
  resolveDescription = (newEntity, nextCollectionDesc, nextDatasetDesc, accessToken, scope) => {
    const nextDescription = { ...DescriptionFileContainer.DEFAULT_STATE.description }
    if (newEntity) {
      const { content: { ipId, entityType, descriptionFile } } = newEntity
      // Only collection and dataset can have description
      if ([ENTITY_TYPES_ENUM.COLLECTION, ENTITY_TYPES_ENUM.DATASET].includes(entityType)) {
        const { type: fileType, url } = (descriptionFile || {}) // initialize found file type and URL
        if (url) { // Case 1: description as external URL
          nextDescription.url = url
        } else if (fileType) { // Case 2: locally stored file
          if (DescriptionFileContainer.DOWNLOAD_CONTENT_TYPES.includes(fileType)) {
            // Case 2a: locally downloaded file
            if (entityType === ENTITY_TYPES_ENUM.COLLECTION && nextCollectionDesc && nextCollectionDesc.entityId === ipId) {
              // a collection description
              nextDescription.localContent = nextCollectionDesc
            } else if (entityType === ENTITY_TYPES_ENUM.DATASET && nextDatasetDesc && nextDatasetDesc.entityId === ipId) {
              // a dataset description
              nextDescription.localContent = nextDatasetDesc
            }
          } else {
            // Case 2b: local file addressed as external URL
            nextDescription.url = DataManagementClient.DownloadDescriptionDefinitions.getDirectDownloadURL(entityType, ipId, accessToken, scope)
          }
        }
      }
    }
    // All cases: return gathered description state
    return nextDescription
  }

  render() {
    const { loading } = this.props
    const { description: { url, localContent } } = this.state
    // provide URL or local content to child (only one can be non null at a given time)
    return (
      <DescriptionFileComponent
        loading={loading}
        descriptionFileURL={url}
        descriptionFile={localContent}
      />
    )
  }
}
export default connect(
  DescriptionFileContainer.mapStateToProps,
  DescriptionFileContainer.mapDispatchToProps)(DescriptionFileContainer)
