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
import { themeContextType } from '@regardsoss/theme'
import { CatalogShapes } from '@regardsoss/shape'
import { DataManagementClient } from '@regardsoss/client'
import { BasicListSelectors } from '@regardsoss/store-utils'
import DescriptionLevelActions from '../../../model/description/DescriptionLevelActions'
import { DescriptionLevelSelectors } from '../../../model/description/DescriptionLevelSelectors'
import AttributesContainer from '../../../containers/description/properties/attributes/AttributesContainer'
import TagsContainer from '../../../containers/description/properties/tags/TagsContainer'

/**
* The properties tab content
*/
class PropertiesTabComponent extends React.Component {
  static propTypes = {
    entity: CatalogShapes.Entity,
    onSearchTag: PropTypes.func,
    fetchModelAttributesActions: PropTypes.instanceOf(DataManagementClient.ModelAttributesActions).isRequired,
    fetchModelAttributesSelectors: PropTypes.instanceOf(BasicListSelectors).isRequired,
    levelActions: PropTypes.instanceOf(DescriptionLevelActions).isRequired,
    levelSelectors: PropTypes.instanceOf(DescriptionLevelSelectors).isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      entity, onSearchTag,
      fetchModelAttributesActions, fetchModelAttributesSelectors, levelActions, levelSelectors,
    } = this.props
    const { rootStyle } = this.context.moduleTheme.descriptionDialog.card.media.tabs.tab.propertiesTab
    return (
      <div style={rootStyle}>
        <AttributesContainer
          entity={entity}
          fetchModelAttributesActions={fetchModelAttributesActions}
          fetchModelAttributesSelectors={fetchModelAttributesSelectors}
        />
        <TagsContainer
          entity={entity}
          onSearchTag={onSearchTag}
          levelActions={levelActions}
          levelSelectors={levelSelectors}
        />
      </div>
    )
  }
}
export default PropertiesTabComponent
