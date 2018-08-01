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
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import { connect } from '@regardsoss/redux'
import { ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'
import { CatalogShapes } from '@regardsoss/shape'
import { DataManagementClient } from '@regardsoss/client'
import { MIME_TYPES } from '@regardsoss/mime-types'
import { downloadCollectionDescriptionActions, downloadCollectionDescriptionSelectors } from '../../../clients/DownloadCollectionDescriptionClient'
import { downloadDatasetDescriptionActions, downloadDatasetDescriptionSelectors } from '../../../clients/DownloadDatasetDescriptionClient'
import DescriptionFileComponent from '../../../components/user/file/DescriptionFileComponent'

/**
 * Description container: resolves and provide the description to corresponding component
 * @author Raphaël Mechali
 */
export class DescriptionFileContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      // loading: is currently loading any description data? (attributes or description file)
      loading: downloadCollectionDescriptionSelectors.isFetching(state) || downloadDatasetDescriptionSelectors.isFetching(state),
      // dispatching fetched data, the component will select the right one and store it in state
      fetchedCollectionDescriptionResult: downloadCollectionDescriptionSelectors.getResult(state),
      fetchedDatasetDescriptionResult: downloadDatasetDescriptionSelectors.getResult(state),
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
      dispatchFetchDescription: (entityId, entityType) => {
        // use right fetch actions for entity types
        switch (entityType) {
          case ENTITY_TYPES_ENUM.COLLECTION:
            dispatch(downloadCollectionDescriptionActions.downloadEntityDescription(entityId))
            break
          case ENTITY_TYPES_ENUM.DATASET:
            dispatch(downloadDatasetDescriptionActions.downloadEntityDescription(entityId))
            break
          default:
          // no entity description, dispatch nothing
        }
      },
    }
  }

  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    entity: CatalogShapes.Entity,
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
  static DOWNLOAD_CONTENT_TYPES = [MIME_TYPES.MARKDOWN_MIME_TYPE]

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
    projectName,
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
    newState.description = this.resolveDescription(newEntity, nextCollectionDescription, nextDatasetDescription, accessToken, projectName)

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
  resolveDescription = (newEntity, nextCollectionDesc, nextDatasetDesc, accessToken, projectName) => {
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
            nextDescription.url = DataManagementClient.DownloadDescriptionDefinitions.getDirectDownloadURL(entityType, ipId, accessToken, projectName)
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
  DescriptionFileContainer.mapDispatchToProps,
)(DescriptionFileContainer)