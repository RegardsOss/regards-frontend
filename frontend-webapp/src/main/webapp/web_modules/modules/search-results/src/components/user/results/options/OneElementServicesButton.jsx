/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import omit from 'lodash/omit'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import OptionsIcon from 'material-ui/svg-icons/action/settings'
import { AccessShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { DropDownButton } from '@regardsoss/components'

/** Constructor wrapper to use the IconButton within a DropDownButton */
const IconButtonConstructorWrapper = props => (
  <IconButton {...(omit(props, ['label', 'labelPosition']))}>
    <OptionsIcon />
  </IconButton>)

/**
* Shows one element services (shared between both list and table views)
* @author Raphaël Mechali
*/
class OneElementServicesButton extends React.Component {

  static propTypes = {
    tooltip: PropTypes.string.isRequired,
    services: AccessShapes.PluginServiceWithContentArray,
    onServiceStarted: PropTypes.func.isRequired,
    // other properties are reported to the drop down button
  }

  static contextTypes = {
    ...themeContextType,
  }

  static NO_LABEL_FUNCTION = () => ''

  render() {
    const { services, tooltip, onServiceStarted, ...otherButtonProperties } = this.props
    const { muiTheme } = this.context
    return (
      <DropDownButton
        title={tooltip}
        getLabel={OneElementServicesButton.NO_LABEL_FUNCTION}
        onChange={onServiceStarted}
        disabled={!services || !services.length}
        ButtonConstructor={IconButtonConstructorWrapper}
        {...otherButtonProperties}
      >
        {
          (services || []).map(service => (
            <MenuItem
              key={`${service.content.type}-${service.content.configId}`}
              value={service}
              leftIcon={service.content.iconUrl ?
                // render the icon only when service has one
                <img src={service.content.iconUrl} alt="" width={muiTheme.spacing.iconSize} height={muiTheme.spacing.iconSize} />
                : null}
              primaryText={service.content.label}
            />))
        }
      </DropDownButton>

    )
  }
}
export default OneElementServicesButton
