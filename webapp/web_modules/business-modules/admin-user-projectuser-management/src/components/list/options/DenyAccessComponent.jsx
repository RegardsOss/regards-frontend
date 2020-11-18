/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import DenyIcon from 'mdi-material-ui/AccountRemove'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { HateoasKeys } from '@regardsoss/display-control'

/**
 * Shows the access deny options for current user state (as there can be only one for a given state)
 * @author Raphaël Mechali
 */
class DenyAccessComponent extends React.Component {
  static propTypes = {
    entity: AccessShapes.ProjectUser.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onDeny: PropTypes.func.isRequired,
    onDisable: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** Options keys, used by callback on click to select the right parent callback */
  static OPTIONS_ENUM = {
    DENY: 'DENY',
    DISABLE: 'DISABLE',
  }

  /** Available access change options */
  static AVAILABLE_ACCESS_OPTION = [{ // disable access for an existing user previously allowed
    optionKey: DenyAccessComponent.OPTIONS_ENUM.DISABLE,
    tooltipKey: 'projectUser.list.table.action.disable',
    icon: <DenyIcon />,
    className: 'selenium-disableUser',
    hateoasKey: HateoasKeys.INACTIVE,
  }, { // deny access to a new user
    optionKey: DenyAccessComponent.OPTIONS_ENUM.DENY,
    tooltipKey: 'projectUser.list.table.action.deny',
    className: 'selenium-denyUser',
    icon: <DenyIcon />,
    hateoasKey: HateoasKeys.DENY,
  }]

  /**
   * User callback: option was clicked
   * @param {string} optionKey current option key
   */
  onClick = (optionKey) => {
    const {
      onDeny, onDisable, entity,
    } = this.props
    const userId = entity.content.id
    const currentOption = this.getCurrentOption()
    switch (currentOption.optionKey) {
      case DenyAccessComponent.OPTIONS_ENUM.DENY:
        onDeny(userId)
        break
      case DenyAccessComponent.OPTIONS_ENUM.DISABLE:
        onDisable(userId)
        break
      default:
        throw new Error(`Unkown option key ${optionKey}`)
    }
  }

  /**
   * @returns {*} current option if any
   */
  getCurrentOption = () => {
    const { entity } = this.props
    return DenyAccessComponent.AVAILABLE_ACCESS_OPTION.find(
      (accessOption) => entity.links.some((link) => link.rel === accessOption.hateoasKey))
  }

  render() {
    const { isLoading } = this.props
    const { intl: { formatMessage } } = this.context

    // 1 - retrieve the currently available option
    let currentOption = this.getCurrentOption()
    const noOptionAvailable = !currentOption
    if (noOptionAvailable) {
      // No option: render any option disabled
      currentOption = DenyAccessComponent.AVAILABLE_ACCESS_OPTION[0]
    }

    // 2 - Render the current options
    return (
      <IconButton
        disabled={noOptionAvailable || isLoading}
        title={formatMessage({ id: currentOption.tooltipKey })}
        onClick={this.onClick}
        className={currentOption.className}
      >
        {currentOption.icon}
      </IconButton>
    )
  }
}
export default DenyAccessComponent
