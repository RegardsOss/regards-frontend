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
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import get from 'lodash/get'
import { AccessDomain, UIDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import { ModuleIcon } from './ModuleIcon'
import ModuleTitleText from './ModuleTitleText'
import styles from './styles'

/**
 * Default module title component: shows module title (localized) and icon
 * @author Raphaël Mechali
 */
export class DefaultModuleTitleComponent extends React.Component {
  static propTypes = {
    // module type (from Module fields)
    type: PropTypes.string.isRequired,
    // optional module description
    description: PropTypes.string,
    // module page (from module fields)
    page: AccessShapes.ModulePage,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      type, description, page,
    } = this.props
    const { moduleTheme: { module: { moduleTitle } } } = this.context
    return (
      <div style={moduleTitle.style}>
        <div style={moduleTitle.iconContainer}>
          <ModuleIcon
            iconDisplayMode={get(page, 'iconType', AccessDomain.PAGE_MODULE_ICON_TYPES_ENUM.DEFAULT)}
            defaultIconURL={UIDomain.getModuleDefaultIconURL(type)}
            customIconURL={get(page, 'customIconURL')}
            style={moduleTitle.iconStyle}
          />
        </div>
        <div style={moduleTitle.labelStyle}>
          <ModuleTitleText
            title={get(page, 'title')}
            description={description}
          />
        </div>
      </div>
    )
  }
}

export default withModuleStyle(styles)(DefaultModuleTitleComponent)
