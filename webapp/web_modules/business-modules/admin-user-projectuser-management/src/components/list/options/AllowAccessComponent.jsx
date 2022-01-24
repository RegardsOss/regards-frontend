/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import ValidateIcon from 'mdi-material-ui/AccountCheck'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { HateoasKeys } from '@regardsoss/display-control'

/**
 * Shows the access allow options for current user state (as there can be only one for a given state)
 * @author Raphaël Mechali
 */
class AllowAccessComponent extends React.Component {
  static propTypes = {
    entity: AccessShapes.ProjectUser.isRequired,
    isLoading: PropTypes.bool.isRequired,
    onValidate: PropTypes.func.isRequired,
    onEnable: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** Options keys, used by callback on click to select the right parent callback */
  static OPTIONS_ENUM = {
    ACCEPT: 'ACCEPT',
    ENABLE: 'ENABLE',
  }

  /** Available access change options */
  static AVAILABLE_ACCESS_OPTION = [{ // enable access for an existing user previously denied
    optionKey: AllowAccessComponent.OPTIONS_ENUM.ENABLE,
    tooltipKey: 'projectUser.list.table.action.enable',
    icon: <ValidateIcon />,
    className: 'selenium-enableUser',
    hateoasKey: HateoasKeys.ACTIVE,
  }, { // accept new user
    optionKey: AllowAccessComponent.OPTIONS_ENUM.ACCEPT,
    tooltipKey: 'projectUser.list.table.action.accept',
    className: 'selenium-acceptUser',
    icon: <ValidateIcon />,
    hateoasKey: HateoasKeys.ACCEPT,
  }]

  /**
   * User callback: option was clicked
   */
  onClick = () => {
    const {
      onValidate, onEnable, entity,
    } = this.props
    const userId = entity.content.id
    const currentOption = this.getCurrentOption()
    switch (currentOption.optionKey) {
      case AllowAccessComponent.OPTIONS_ENUM.ACCEPT:
        onValidate(userId)
        break
      case AllowAccessComponent.OPTIONS_ENUM.ENABLE:
        onEnable(userId)
        break
      default:
        throw new Error(`Unkown option key ${currentOption.optionKey}`)
    }
  }

  /**
   * @return {*} current option
   */
  getCurrentOption = () => {
    const { entity } = this.props
    return AllowAccessComponent.AVAILABLE_ACCESS_OPTION.find(
      (accessOption) => entity.links.some((link) => link.rel === accessOption.hateoasKey))
  }

  render() {
    const { isLoading } = this.props
    const { intl: { formatMessage } } = this.context

    // 1 - retrieve the currently available option
    let currentOption = this.getCurrentOption()
    const noOptionAvailable = !currentOption
    if (noOptionAvailable) {
      currentOption = AllowAccessComponent.AVAILABLE_ACCESS_OPTION[0]
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
export default AllowAccessComponent
