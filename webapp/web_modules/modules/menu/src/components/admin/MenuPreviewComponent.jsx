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
import map from 'lodash/map'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { UIDomain } from '@regardsoss/domain'
import { AccessShapes, AdminShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { LazyModuleComponent, modulesManager } from '@regardsoss/modules'

/** Default public role */
const PUBLIC_ROLE = 'PUBLIC'


/**
 * Menu preview component
 * @author Raphaël Mechali
 */
class MenuPreviewComponent extends React.Component {
  static propTypes = {
    appName: PropTypes.string,
    project: PropTypes.string,
    moduleConfiguration: AccessShapes.Module,
    roleList: AdminShapes.RoleList.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    previewRole: PUBLIC_ROLE,
  }

  /**
   * User call back: new preview role selected
   * @param {*} evt dispatched event
   * @param {number} index selected element index
   * @param {string} newRole selected element
   */
  onPreviewRoleChanged = (evt, index, newRole) => {
    this.setState({ previewRole: newRole })
  }

  render() {
    const {
      appName, project, moduleConfiguration, roleList,
    } = this.props
    const { previewRole } = this.state
    const { intl: { formatMessage }, moduleTheme: { admin: { previewRoleStyle, previewStyle } } } = this.context
    const previewModule = {
      type: modulesManager.VisibleModuleTypes.MENU,
      active: true,
      conf: {
        ...moduleConfiguration,
        displayMode: UIDomain.MENU_DISPLAY_MODES_ENUM.PREVIEW,
        previewRole, // role to use for preview
        roleList, // provide pre-fetched role list
      },
    }
    return (
      <div>
        {/* 1. Preview role selector */}
        <div style={previewRoleStyle}>
          <SelectField
            floatingLabelText={formatMessage({ id: 'user.menu.form.preview.role.field' })}
            value={previewRole}
            onChange={this.onPreviewRoleChanged}
            autoWidth
          >
            { /** Retrieved possible roles */
              map(roleList, ({ content: { name } }) => (
                <MenuItem
                  key={name}
                  primaryText={name}
                  value={name}
                />))
            }
          </SelectField>
        </div>
        <div style={previewStyle}>
          <LazyModuleComponent
            project={project}
            appName={appName}
            module={previewModule}
            admin={false}
          />
        </div>
      </div>
    )
  }
}
export default MenuPreviewComponent
