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
import isNil from 'lodash/isNil'
import ErrorMessageIcon from 'mdi-material-ui/EmoticonSadOutline'
import { themeContextType } from '@regardsoss/theme'
import { ContentLoadingComponent, URIContentDisplayer, NoContentComponent } from '@regardsoss/components'
import { DescriptionEntity } from '../../../shapes/DescriptionState'
import { BROWSING_SECTIONS_ENUM } from '../../../domain/BrowsingSections'
import ParametersSectionComponent from './parameters/ParametersSectionComponent'
import TagsSectionPageComponent from './list/tag/TagsSectionPageComponent'
import EntitiesSectionPageComponent from './list/entity/EntitiesSectionPageComponent'
import FilesSectionPageComponent from './list/file/FilesSectionPageComponent'
import QuicklookViewComponent from './quicklook/QuicklookViewComponent'
import VersionSectionPageComponent from './list/version/VersionSectionPageComponent'

/**
 * Main component to display content area: shows loading / errors / content according with selected tree entry
 * @author Raphaël Mechali
 */
class ContentDisplayComponent extends React.Component {
  static propTypes = {
    allowSearching: PropTypes.bool,
    descriptionEntity: DescriptionEntity.isRequired,
    // is description allowed function, like (entity: CatalogShapes.Entity) => (boolean)
    isDescriptionAllowed: PropTypes.func.isRequired,
    // Callback: user selected an inner link. (section:BROWSING_SECTION_ENUM, child: number) => ()
    onSelectInnerLink: PropTypes.func.isRequired,
    // Callback: user selected an entity link. (entity:CatalogShapes.Entity) => ()
    onSelectEntityLink: PropTypes.func.isRequired,
    // Callback: user searched for a word tag (tag:string) => ()
    onSearchWord: PropTypes.func.isRequired,
    // Callback: user searched for an entity tag (tag:CatalogShapes.Entity) => ()
    onSearchEntity: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      descriptionEntity, isDescriptionAllowed, allowSearching,
      onSelectInnerLink, onSelectEntityLink, onSearchWord, onSearchEntity,
    } = this.props
    // loading
    if (descriptionEntity.loading) {
      return <ContentLoadingComponent /> //style={growingCenterArea}
    }
    // invalid entity type for current configuration (message)
    if (descriptionEntity.invalid) {
      return (
        <NoContentComponent
          titleKey="module.description.invalid.entity.title"
          messageKey="module.description.invalid.entity.message"
          Icon={ErrorMessageIcon}
        />)
    }
    // model retrieval failed for entity (message)
    if (descriptionEntity.modelRetrievalFailed) {
      return (
        <NoContentComponent
          titleKey="module.description.model.retrieval.failed.title"
          messageKey="module.description.model.retrieval.failed.message"
          Icon={ErrorMessageIcon}
        />)
    }
    // Show content on current path
    const {
      selectedTreeEntry: { section, child },
      displayModel: {
        thumbnail, attributesGroups, descriptionFiles, quicklookFiles,
        otherFiles, wordTags, couplingTags, linkedEntities,
        linkedDocuments, otherVersions,
      },
    } = descriptionEntity

    switch (section) {
      case BROWSING_SECTIONS_ENUM.PARAMETERS:
        return <ParametersSectionComponent thumbnail={thumbnail} attributesGroups={attributesGroups} />
      case BROWSING_SECTIONS_ENUM.QUICKLOOKS:
        return <QuicklookViewComponent quicklookFiles={quicklookFiles} />
      case BROWSING_SECTIONS_ENUM.SIMPLE_TAGS:
        return <TagsSectionPageComponent
          tags={wordTags}
          allowSearching={allowSearching}
          onSearchWord={onSearchWord}
        />
      case BROWSING_SECTIONS_ENUM.COUPLED_TAGS:
        return <TagsSectionPageComponent
          tags={couplingTags}
          allowSearching={allowSearching}
          onSearchWord={onSearchWord}
        />
      case BROWSING_SECTIONS_ENUM.LINKED_ENTITIES:
        return <EntitiesSectionPageComponent
          entities={linkedEntities}
          isDescriptionAllowed={isDescriptionAllowed}
          allowSearching={allowSearching}
          onSearchEntity={onSearchEntity}
          onSelectEntityLink={onSelectEntityLink}
        />
      case BROWSING_SECTIONS_ENUM.LINKED_DOCUMENTS:
        return (
          <EntitiesSectionPageComponent
            entities={linkedDocuments}
            isDescriptionAllowed={isDescriptionAllowed}
            allowSearching={allowSearching}
            onSearchEntity={onSearchEntity}
            onSelectEntityLink={onSelectEntityLink}
          />)
      case BROWSING_SECTIONS_ENUM.INFORMATION:
        return isNil(child) ? (
          <FilesSectionPageComponent
            section={section}
            files={descriptionFiles}
            onSelectInnerLink={onSelectInnerLink}
          />) : <URIContentDisplayer uri={descriptionFiles[child].uri} />
      case BROWSING_SECTIONS_ENUM.FILES:
        return isNil(child) ? (
          <FilesSectionPageComponent
            section={section}
            files={otherFiles}
            onSelectInnerLink={onSelectInnerLink}
          />) : <URIContentDisplayer uri={otherFiles[child].uri} />
      case BROWSING_SECTIONS_ENUM.OTHER_VERSIONS:
        return (
          <VersionSectionPageComponent
            entities={otherVersions}
            onSelectEntityLink={onSelectEntityLink}
          />
        )
      default:
        throw new Error(`Unknown browsing section ${section}`)
    }
  }
}
export default ContentDisplayComponent
