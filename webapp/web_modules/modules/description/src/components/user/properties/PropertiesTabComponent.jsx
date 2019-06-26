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
import { ModuleConfiguration, DescriptionConfiguration } from '../../../shapes/ModuleConfiguration'
import AttributesContainer from '../../../containers/user/properties/attributes/AttributesContainer'
import TagsContainer from '../../../containers/user/properties/tags/TagsContainer'


/**
 * The properties tab content
 * @author Raphaël Mechali
 */
class PropertiesTabComponent extends React.Component {
  static propTypes = {
    accessToken: PropTypes.string,
    projectName: PropTypes.string,
    moduleConf: ModuleConfiguration.isRequired, // complete module configuration
    typeConfiguration: DescriptionConfiguration.isRequired, // module configuration for current entity type
    entity: CatalogShapes.Entity,
    onSearchTag: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      entity, onSearchTag, moduleConf, typeConfiguration,
      accessToken, projectName,
    } = this.props
    const { rootStyle } = this.context.moduleTheme.user.card.media.tabs.tab.propertiesTab

    return (
      <div style={rootStyle}>
        <AttributesContainer
          accessToken={accessToken}
          projectName={projectName}
          typeConfiguration={typeConfiguration}
          entity={entity}
        />
        <TagsContainer
          moduleConf={moduleConf}
          entity={entity}
          onSearchTag={onSearchTag}
          showTags={typeConfiguration.showTags}
          showLinkedDocuments={typeConfiguration.showLinkedDocuments}
        />
      </div>
    )
  }
}
export default PropertiesTabComponent
