/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import WordTagIcon from 'mdi-material-ui/AlphaTBox'
import PrivateDataIcon from 'mdi-material-ui/Cancel'
import { UIShapes } from '@regardsoss/shape'
import { CatalogDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { EntityTypeIcon } from '@regardsoss/entities-common'
import ApplyingCriterionComponent from './ApplyingCriterionComponent'
import { TagLabelHelper } from '../../common/TagLabelHelper'

/**
 * Shows an applying tag filter
 *
 * @author Raphaël Mechali
 */
class TagCriterionComponent extends React.Component {
  static propTypes = {
    tagCriterion: UIShapes.TagCriterion.isRequired,
    settings: UIShapes.UISettings.isRequired,
    onUnselectTagFilter: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** Icon for selected entity criterion */
  static TAG_TYPE_TO_ICON = CatalogDomain.TAG_TYPES.reduce((acc, tagType) => {
    let IconConstructor = null
    switch (tagType) {
      case CatalogDomain.TAG_TYPES_ENUM.WORD:
        IconConstructor = WordTagIcon
        break
      case CatalogDomain.TAG_TYPES_ENUM.COLLECTION:
      case CatalogDomain.TAG_TYPES_ENUM.DATA:
      case CatalogDomain.TAG_TYPES_ENUM.DATASET:
        IconConstructor = EntityTypeIcon.ICON_CONSTRUCTOR_BY_TYPE[tagType]
        break
      case CatalogDomain.TAG_TYPES_ENUM.UNRESOLVED:
      default:
        IconConstructor = PrivateDataIcon
    }
    return {
      ...acc,
      [tagType]: <IconConstructor />,
    }
  })

  render() {
    const { tagCriterion, settings, onUnselectTagFilter } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <ApplyingCriterionComponent
        label={TagLabelHelper.getLabel(formatMessage, tagCriterion, settings)}
        selectedCriterion={tagCriterion}
        onUnselectCriterion={onUnselectTagFilter}
        error={tagCriterion.type === CatalogDomain.TAG_TYPES_ENUM.UNRESOLVED}
        filterIcon={TagCriterionComponent.TAG_TYPE_TO_ICON[tagCriterion.type]}
      />
    )
  }
}
export default TagCriterionComponent
