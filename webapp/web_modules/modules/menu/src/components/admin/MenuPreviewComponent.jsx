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
import isEqual from 'lodash/isEqual'
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
    previewModule: null,
  }

  /**
  * Lifecycle method: component will mount. Used here to detect first properties change and update local state
  */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
  * Lifecycle method: component receive props. Used here to detect properties change and update local state
  * @param {*} nextProps next component properties
  */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
  * Properties change detected: update local state
  * @param oldProps previous component properties
  * @param newProps next component properties
  */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { project, moduleConfiguration, roleList } = newProps
    if (!isEqual(oldProps.project, project)
    || !isEqual(oldProps.moduleConfiguration, moduleConfiguration)
    || !isEqual(oldProps.roleList, roleList)) {
      this.onPreviewContextChanged(this.state.previewRole, project, moduleConfiguration, roleList)
    }
  }

  /**
   * User call back: new preview role selected
   * @param {*} evt dispatched event
   * @param {number} index selected element index
   * @param {string} newRole selected element
   */
  onPreviewRoleChanged = (evt, index, newRole) => {
    const { project, moduleConfiguration, roleList } = this.props
    this.onPreviewContextChanged(newRole, project, moduleConfiguration, roleList)
  }

  /**
   *
   * @param {*} previewRole
   * @param {*} project
   * @param {*} moduleConfiguration
   * @param {*} roleList
   */
  onPreviewContextChanged = (previewRole, project, moduleConfiguration, roleList) => {
    this.setState({
      previewRole,
      previewModule: {
        type: modulesManager.VisibleModuleTypes.MENU,
        active: true,
        conf: {
          ...moduleConfiguration,
          displayMode: UIDomain.MENU_DISPLAY_MODES_ENUM.PREVIEW,
          previewRole, // role to use for preview
          roleList, // provide pre-fetched role list
        },
      },
    })
  }

  render() {
    const {
      appName, project, roleList,
    } = this.props
    const { previewRole, previewModule } = this.state
    const { intl: { formatMessage }, moduleTheme: { admin: { previewRoleStyle, previewStyle } } } = this.context
    return (
      <div>
        {/* 1. Preview role selector, when not in portal mode */
        appName === UIDomain.APPLICATIONS_ENUM.PORTAL ? null : (
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
          </div>)
          }
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
