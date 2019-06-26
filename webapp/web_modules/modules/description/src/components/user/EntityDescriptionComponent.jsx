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
import { Card, CardMedia, CardTitle } from 'material-ui/Card'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { ModuleConfiguration } from '../../shapes/ModuleConfiguration'
import { TreePath } from '../../shapes/NavigationTree'


/**
 * Main description module component. It show entity description view.
 * @author Raphaël Mechali
 */
class EntityDescriptionComponent extends React.Component {
  static propTypes = {
    // user auth info
    accessToken: PropTypes.string,
    projectName: PropTypes.string.isRequired,
    // configuration (holding runtime data)
    moduleConf: ModuleConfiguration.isRequired,
    selectedPath: TreePath.isRequired,

    // control callback
    setSelectedPath: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
   * Default type configuration (to be used when there is no entity)
   */
  static DEFAULT_TYPE_CONFIGURATION = {
    showDescription: true,
    showTags: true,
    showLinkedDocuments: true,
    showThumbnail: false,
    groups: [],
  }

  /**
   * @return {DescriptionConfiguration} configuration for current entity (or default configuration)
   */
  getCurrentEntityConfiguration = () => {
    const { entity, moduleConf } = this.props
    if (entity) {
      const { entityType } = entity.content
      return moduleConf[entityType]
    }
    return EntityDescriptionComponent.DEFAULT_TYPE_CONFIGURATION
  }

  render() {
    const {
      accessToken, projectName, moduleConf, selectedPath, setSelectedPath,
    } = this.props
    const { moduleTheme: { user } } = this.context
    return ( // TODO no more card, see later!
      <Card style={user.card.style} containerStyle={user.card.containerStyle}>
        <CardTitle
          title="Une description!"
          style={user.card.titleStyle}
        />
        <CardMedia style={user.card.media.rootStyle} mediaStyle={user.card.media.mediaStyle}>
          <div style={user.card.media.tabs.rootStyle}>
             Coucou, je suis
            {' '}
            {moduleConf.runtime.entity.content.label}
          </div>
        </CardMedia>
      </Card>)
  }
}
export default EntityDescriptionComponent
