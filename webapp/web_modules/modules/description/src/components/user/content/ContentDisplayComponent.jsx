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
import { DescriptionEntity } from '../../../shapes/DescriptionState'
import InvalidEntityMessageComponent from './InvalidEntityMessageComponent'
import LoadingComponent from './LoadingComponent'
import ModelRetrievalFailedMessageComponent from './ModelRetrievalFailedMessageComponent'
import { BROWSING_SECTIONS_ENUM } from '../../../domain/BrowsingSections'
import TagsSectionPageComponent from './list/tag/TagsSectionPageComponent'
import EntitiesSectionPageComponent from './list/entity/EntitiesSectionPageComponent'

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
      return <LoadingComponent />
    }
    // invalid entity type for current configuration (message)
    if (descriptionEntity.invalid) {
      return <InvalidEntityMessageComponent />
    }
    // model retrieval failed for entity (message)
    if (descriptionEntity.modelRetrievalFailed) {
      return <ModelRetrievalFailedMessageComponent />
    }
    // Show content on current path
    // TODO
    const {
      selectedTreeEntry: { section, child },
      displayModel: {
        attributesGroups,
        descriptionFiles, quicklookFiles, otherFiles,
        wordTags, couplingTags, linkedEntities, linkedDocuments,
      },
    } = descriptionEntity
    switch (section) {
      case BROWSING_SECTIONS_ENUM.PARAMETERS:
        // TODO
        return null
      case BROWSING_SECTIONS_ENUM.INFORMATION:
        // TODO
        return null
      case BROWSING_SECTIONS_ENUM.QUICKLOOKS:
        // TODO
        return null
      case BROWSING_SECTIONS_ENUM.SIMPLE_TAGS:
        return <TagsSectionPageComponent
          tags={[
            'Temp: fake tag -> a1',
            'Temp: fake tag -> a2',
            'Temp: fake tag -> a3',
            'Temp: fake tag -> a4',
            'Temp: fake tag -> a5',
            'Temp: fake tag -> a6',
            'Temp: fake tag -> a7',
            'Temp: fake tag -> a8',
            'Temp: fake tag -> a9',
            'Temp: fake tag -> b1',
            'Temp: fake tag -> b2',
            'Temp: fake tag -> b3',
            'Temp: fake tag -> b4',
            'Temp: fake tag -> b5',
            'Temp: fake tag -> b6',
            'Temp: fake tag -> b7',
            'Temp: fake tag -> b8',
            'Temp: fake tag -> b9',
            'Temp: fake tag -> c1',
            'Temp: fake tag -> c2',
            'Temp: fake tag -> c3',
            'Temp: fake tag -> c4',
            'Temp: fake tag -> c5',
            'Temp: fake tag -> c6',
            'Temp: fake tag -> c7',
            'Temp: fake tag -> c8',
            'Temp: fake tag -> c9',
            'Temp: fake tag -> d1',
            'Temp: fake tag -> d2',
            'Temp: fake tag -> d3',
            'Temp: fake tag -> d4',
            'Temp: fake tag -> d5',
            'Temp: fake tag -> d6',
            'Temp: fake tag -> d7',
            'Temp: fake tag -> d8',
            'Temp: fake tag -> d9',
            'Temp: fake tag -> e1',
            'Temp: fake tag -> e2',
            'Temp: fake tag -> e3',
            'Temp: fake tag -> e4',
            'Temp: fake tag -> e5',
            'Temp: fake tag -> e6',
            'Temp: fake tag -> e7',
            'Temp: fake tag -> e8',
            'Temp: fake tag -> e9',
            'Temp: fake tag -> f1',
            'Temp: fake tag -> f2',
            'Temp: fake tag -> f3',
            'Temp: fake tag -> f4',
            'Temp: fake tag -> f5',
            'Temp: fake tag -> f6',
            'Temp: fake tag -> f7',
            'Temp: fake tag -> f8',
            'Temp: fake tag -> f9',
            'Temp: fake tag -> g1',
            'Temp: fake tag -> g2',
            'Temp: fake tag -> g3',
            'Temp: fake tag -> g4',
            'Temp: fake tag -> g5',
            'Temp: fake tag -> g6',
            'Temp: fake tag -> g7',
            'Temp: fake tag -> g8',
            'Temp: fake tag -> g9',
          ]}
          onSearchWord={onSearchWord}
        />
      case BROWSING_SECTIONS_ENUM.COUPLED_TAGS:
        return <TagsSectionPageComponent tags={couplingTags} onSearchWord={onSearchWord} />
      case BROWSING_SECTIONS_ENUM.LINKED_ENTITIES:
        return <EntitiesSectionPageComponent
          entities={
        [
          'Temp: fake tag -> a1',
          'Temp: fake tag -> a2',
          'Temp: fake tag -> a3',
          'Temp: fake tag -> a4',
          'Temp: fake tag -> a5',
          'Temp: fake tag -> a6',
          'Temp: fake tag -> a7',
          'Temp: fake tag -> a8',
          'Temp: fake tag -> a9',
          'Temp: fake tag -> b1',
          'Temp: fake tag -> b2',
          'Temp: fake tag -> b3',
          'Temp: fake tag -> b4',
          'Temp: fake tag -> b5',
          'Temp: fake tag -> b6',
          'Temp: fake tag -> b7',
          'Temp: fake tag -> b8',
          'Temp: fake tag -> b9',
          'Temp: fake tag -> c1',
          'Temp: fake tag -> c2',
          'Temp: fake tag -> c3',
          'Temp: fake tag -> c4',
          'Temp: fake tag -> c5',
          'Temp: fake tag -> c6',
          'Temp: fake tag -> c7',
          'Temp: fake tag -> c8',
          'Temp: fake tag -> c9',
          'Temp: fake tag -> d1',
          'Temp: fake tag -> d2',
          'Temp: fake tag -> d3',
          'Temp: fake tag -> d4',
          'Temp: fake tag -> d5',
          'Temp: fake tag -> d6',
          'Temp: fake tag -> d7',
          'Temp: fake tag -> d8',
          'Temp: fake tag -> d9',
          'Temp: fake tag -> e1',
          'Temp: fake tag -> e2',
          'Temp: fake tag -> e3',
          'Temp: fake tag -> e4',
          'Temp: fake tag -> e5',
          'Temp: fake tag -> e6',
          'Temp: fake tag -> e7',
          'Temp: fake tag -> e8',
          'Temp: fake tag -> e9',
          'Temp: fake tag -> f1',
          'Temp: fake tag -> f2',
          'Temp: fake tag -> f3',
          'Temp: fake tag -> f4',
          'Temp: fake tag -> f5',
          'Temp: fake tag -> f6',
          'Temp: fake tag -> f7',
          'Temp: fake tag -> f8',
          'Temp: fake tag -> f9',
          'Temp: fake tag -> g1',
          'Temp: fake tag -> g2',
          'Temp: fake tag -> g3',
          'Temp: fake tag -> g4',
          'Temp: fake tag -> g5',
          'Temp: fake tag -> g6',
          'Temp: fake tag -> g7',
          'Temp: fake tag -> g8',
          'Temp: fake tag -> g9',
        ].map(text => ({
          content: {
            id: `URN:DATASET:${text}`,
            model: 'myModel',
            providerId: text,
            label: text,
            entityType: 'DATASET',
            files: {},
            properties: {},
            tags: [],
          },
        }))}
          isDescriptionAllowed={isDescriptionAllowed}
          onSearchEntity={onSearchEntity}
          onSelectEntityLink={onSelectEntityLink}
        />
      case BROWSING_SECTIONS_ENUM.LINKED_DOCUMENTS:
        // TODO
        return (
          <EntitiesSectionPageComponent
            entities={linkedDocuments}
            isDescriptionAllowed={isDescriptionAllowed}
            onSearchEntity={onSearchEntity}
            onSelectEntityLink={onSelectEntityLink}
          />)
      case BROWSING_SECTIONS_ENUM.FILES:
        // TODO
        return null
      default:
        throw new Error(`Unknown browsing section ${section}`)
    }
  }
}
export default ContentDisplayComponent
