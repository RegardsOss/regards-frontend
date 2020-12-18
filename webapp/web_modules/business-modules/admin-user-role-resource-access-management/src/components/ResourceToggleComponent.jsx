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
import IconButton from 'material-ui/IconButton'
import Toggle from 'material-ui/Toggle'
import { AdminShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { HateoasKeys } from '@regardsoss/display-control'
import { HateoasIconAction, HateoasToggle } from '@regardsoss/components'

/**
 * Resource toggle component
 * @author Raphaël Mechali
 */
class ResourceToggleComponent extends React.Component {
  static propTypes = {
    resource: AdminShapes.Resource,
    roleResource: AdminShapes.Resource,
    // callback like (resource, enabled) => ()
    onToggleResourceAccess: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  /**
   * User callback: toggle resource access
   */
  onToggleResourceAccess = () => {
    const { resource, roleResource, onToggleResourceAccess } = this.props
    console.error('Toggle resource')
    onToggleResourceAccess(resource, !!roleResource)
    return false
  }

  render() {
    const { roleResource } = this.props
    const { moduleTheme } = this.context
    if (roleResource) {
      return (
        <HateoasIconAction
          disableInsteadOfHide
          style={moduleTheme.resourceIconStyle}
          onClick={this.onToggleResourceAccess}
          entityLinks={roleResource.links}
          hateoasKey={HateoasKeys.DELETE}
        >
          <HateoasToggle
            entityLinks={roleResource.links}
            hateoasKey={HateoasKeys.DELETE}
            toggled
            value="on"
          />
        </HateoasIconAction>
      )
    }
    return (
      <IconButton
        style={moduleTheme.resourceIconStyle}
        onClick={this.onToggleResourceAccess}
      >
        <Toggle
          toggled={false}
          value="off"
        />
      </IconButton>)
  }
}
export default ResourceToggleComponent
