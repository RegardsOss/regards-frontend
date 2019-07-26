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
 * along w
 * ith REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import CollectionsIcon from 'mdi-material-ui/FileTree'
import DatasetsIcon from 'mdi-material-ui/Archive'
import WordTagIcon from 'mdi-material-ui/AlphaTbox'
import DataIcon from 'mdi-material-ui/FileDocument'
import { UIShapes } from '@regardsoss/shape'
import { CatalogDomain } from '@regardsoss/domain'
import ApplyingCriterionComponent from './ApplyingCriterionComponent'

/**
 * Shows an applying tag filter
 *
 * @author Raphaël Mechali
 */
class TagCriterionComponent extends React.Component {
  static propTypes = {
    tagCriterion: UIShapes.TagCriterion.isRequired,
    onUnselectTagFilter: PropTypes.func.isRequired,
  }

  /** Icon for selected geometry criterion */
  static TAG_TYPE_TO_ICON = {
    [CatalogDomain.TAG_TYPES_ENUM.COLLECTION]: <CollectionsIcon />,
    [CatalogDomain.TAG_TYPES_ENUM.DATA]: <DataIcon />,
    [CatalogDomain.TAG_TYPES_ENUM.DATASET]: <DatasetsIcon />,
    [CatalogDomain.TAG_TYPES_ENUM.WORD]: <WordTagIcon />,

  }

  render() {
    const { tagCriterion, onUnselectTagFilter } = this.props
    return (
      <ApplyingCriterionComponent
        label={tagCriterion.label}
        selectedCriterion={tagCriterion}
        onUnselectCriterion={onUnselectTagFilter}
        filterIcon={TagCriterionComponent.TAG_TYPE_TO_ICON[tagCriterion.type]}
      />
    )
  }
}
export default TagCriterionComponent
