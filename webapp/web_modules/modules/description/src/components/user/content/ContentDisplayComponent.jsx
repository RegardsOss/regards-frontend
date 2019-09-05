/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isNil from 'lodash/isNil'
import { DescriptionEntity } from '../../../shapes/DescriptionState'
import LoadingComponent from './feedback/LoadingComponent'
import { BROWSING_SECTIONS_ENUM } from '../../../domain/BrowsingSections'
import FilePageContainer from '../../../containers/user/content/file/FilePageContainer'
import ParametersSectionComponent from './parameters/ParametersSectionComponent'
import TagsSectionPageComponent from './list/tag/TagsSectionPageComponent'
import EntitiesSectionPageComponent from './list/entity/EntitiesSectionPageComponent'
import FilesSectionPageComponent from './list/file/FilesSectionPageComponent'
import NoDataMessageComponent from './feedback/NoDataMessageComponent'

/**
 * Main component to display content area: shows loading / errors / content according with selected tree entry
 * @author Raphaël Mechali
 */
class ContentDisplayComponent extends React.Component {
  static propTypes = {
    descriptionEntity: DescriptionEntity.isRequired,
    // is description allowed function, like (entity: CatalogShapes.Entity) => (boolean)
    isDescriptionAllowed: PropTypes.func.isRequired,
    // Callback: user selected an inner link. (section:BROWSING_SECTION_ENUM, child: number) => ()
    onSelectInnerLink: PropTypes.func.isRequired,
    // Callback: user selected an entity link. (entity:CalaogShapes.Entity) => ()
    onSelectEntityLink: PropTypes.func.isRequired,
    // Callback: user searched for a word tag (tag:string) => ()
    onSearchWord: PropTypes.func.isRequired,
    // Callback: user searched for an entity tag (tag:CalaogShapes.Entity) => ()
    onSearchEntity: PropTypes.func.isRequired,
  }

  render() {
    const {
      descriptionEntity, isDescriptionAllowed,
      onSelectInnerLink, onSelectEntityLink, onSearchWord, onSearchEntity,
    } = this.props
    // loading
    if (descriptionEntity.loading) {
      return <LoadingComponent type={LoadingComponent.LOADING_TYPES_ENUM.MAIN} />
    }
    // invalid entity type for current configuration (message)
    if (descriptionEntity.invalid) {
      return <NoDataMessageComponent type={NoDataMessageComponent.NO_DATA_TYPE_ENUM.INVALID_ENTITY} />
    }
    // model retrieval failed for entity (message)
    if (descriptionEntity.modelRetrievalFailed) {
      return <NoDataMessageComponent type={NoDataMessageComponent.NO_DATA_TYPE_ENUM.MODEL_RETRIEVAL_FAILED} />
    }
    // Show content on current path
    const {
      selectedTreeEntry: { section, child },
      displayModel: {
        thumbnail, attributesGroups,
        descriptionFiles, quicklookFiles, otherFiles,
        wordTags, couplingTags, linkedEntities, linkedDocuments,
      },
    } = descriptionEntity
    switch (section) {
      case BROWSING_SECTIONS_ENUM.PARAMETERS:
        return <ParametersSectionComponent thumbnail={thumbnail} attributesGroups={attributesGroups} />
      case BROWSING_SECTIONS_ENUM.QUICKLOOKS:
        // TODO
        return null
      case BROWSING_SECTIONS_ENUM.SIMPLE_TAGS:
        return <TagsSectionPageComponent tags={wordTags} onSearchWord={onSearchWord} />
      case BROWSING_SECTIONS_ENUM.COUPLED_TAGS:
        return <TagsSectionPageComponent tags={couplingTags} onSearchWord={onSearchWord} />
      case BROWSING_SECTIONS_ENUM.LINKED_ENTITIES:
        return <EntitiesSectionPageComponent
          entities={linkedEntities}
          isDescriptionAllowed={isDescriptionAllowed}
          onSearchEntity={onSearchEntity}
          onSelectEntityLink={onSelectEntityLink}
        />
      case BROWSING_SECTIONS_ENUM.LINKED_DOCUMENTS:
        return (
          <EntitiesSectionPageComponent
            entities={linkedDocuments}
            isDescriptionAllowed={isDescriptionAllowed}
            onSearchEntity={onSearchEntity}
            onSelectEntityLink={onSelectEntityLink}
          />)
      case BROWSING_SECTIONS_ENUM.INFORMATION:
        return isNil(child) ? (
          <FilesSectionPageComponent
            section={section}
            files={descriptionFiles}
            onSelectInnerLink={onSelectInnerLink}
          />) : <FilePageContainer file={descriptionFiles[child]} />
      case BROWSING_SECTIONS_ENUM.FILES:
        return isNil(child) ? (
          <FilesSectionPageComponent
            section={section}
            files={otherFiles}
            onSelectInnerLink={onSelectInnerLink}
          />) : <FilePageContainer file={otherFiles[child]} />
      default:
        throw new Error(`Unknown browsing section ${section}`)
    }
  }
}
export default ContentDisplayComponent
