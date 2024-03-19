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
 */
import get from 'lodash/get'
import has from 'lodash/has'
import compose from 'lodash/fp/compose'
import map from 'lodash/map'
import isEqual from 'lodash/isEqual'
import find from 'lodash/find'
import IconButton from 'material-ui/IconButton'
import Palette from 'mdi-material-ui/Palette'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
// cannot import our connect method here, cyclic dependencies
import { connect } from 'react-redux'
import { AccessShapes, AdminShapes } from '@regardsoss/shape'
import { AdminDomain } from '@regardsoss/domain'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import {
  withModuleStyle, themeContextType, getCurrentTheme, setCurrentTheme, ThemeSelectors,
} from '@regardsoss/theme'
import messages from '../i18n'
import styles from '../styles'

/**
 * Selector allowing the user to change the app's theme.
 *
 * @author Xavier-Alexandre Brochard
 */
export class SelectThemeContainer extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/no-unused-prop-types
    roleList: AdminShapes.RoleList,
    currentTheme: AccessShapes.Theme,
    currentRole: PropTypes.string,
    // eslint-disable-next-line react/no-unused-prop-types
    authenticationName: PropTypes.string,
    themeList: AccessShapes.ThemeList,
    onChange: PropTypes.func,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static iconButtonElement = (<IconButton><Palette /></IconButton>)

  static anchorOriginStyle = { horizontal: 'left', vertical: 'bottom' }

  static targetOriginStyle = { horizontal: 'middle', vertical: 'bottom' }

  state = {
    isUserAdministrator: false,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount() {
    this.onPropertiesUpdated({}, this.props)
  }

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    this.onPropertiesUpdated(this.props, nextProps)
  }

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { authenticationName, roleList } = newProps
    // when authentication changes, check user role to filter displayed themes
    if (!isEqual(oldProps.authenticationName, authenticationName)
      || !isEqual(oldProps.roleList, roleList)) {
      this.verifyUserPrivileges(roleList)
    }
  }

  verifyUserPrivileges = (roleList) => {
    const { currentRole } = this.props
    const relatedCurrentRole = find(roleList, (role) => role.content.name === currentRole)
    if (relatedCurrentRole && this.isRoleAdminRelated(relatedCurrentRole.content)) {
      this.setState({
        isUserAdministrator: true,
      })
    }
  }

  isRoleAdminRelated = (role) => {
    let ret = false
    if (role.name === AdminDomain.DEFAULT_ROLES_ENUM.ADMIN) {
      ret = true
    } else if (has(role, 'parentRole')) {
      ret = this.isRoleAdminRelated(role.parentRole)
    }
    return ret
  }

  /**
   * Theme selected
   * @param {*} event
   * @param {number} value selected theme id
   */
  onChange = (event, value) => {
    const { onChange } = this.props
    onChange(value)
  }

  render() {
    const { currentTheme, themeList } = this.props
    const { intl: { formatMessage } } = this.context
    const { isUserAdministrator } = this.state
    const items = map(themeList, (item) => (
      isUserAdministrator || get(item, 'content.visible', true) ? <MenuItem value={item.content.id} key={item.content.id} primaryText={item.content.name} /> : null
    ))
    return (
      <div title={formatMessage({ id: 'select.theme.tooltip' })}>
        <IconMenu
          iconButtonElement={SelectThemeContainer.iconButtonElement}
          anchorOrigin={SelectThemeContainer.anchorOriginStyle}
          targetOrigin={SelectThemeContainer.targetOriginStyle}
          value={currentTheme.content.id}
          onChange={this.onChange}
        >
          {items}
        </IconMenu>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  currentTheme: getCurrentTheme(state),
  themeList: ThemeSelectors.getList(state),
})
const mapDispatchToProps = (dispatch) => ({
  onChange: (themeId) => dispatch(setCurrentTheme(themeId)),
})

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  withI18n(messages), withModuleStyle(styles),
)(SelectThemeContainer)
