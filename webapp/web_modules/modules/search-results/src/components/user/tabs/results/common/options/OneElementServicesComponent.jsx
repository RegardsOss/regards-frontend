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
import omit from 'lodash/omit'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import OptionsIcon from 'mdi-material-ui/Cog'
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { DropDownButton, URLPictureResolver } from '@regardsoss/components'

/** Constructor wrapper to use the IconButton within a DropDownButton */
const IconButtonConstructorWrapper = (props) => (
  <IconButton {...(omit(props, ['label', 'labelPosition']))}>
    <OptionsIcon />
  </IconButton>)

/**
 * Option to shows one element services (shared between both list and table views)
 * @author Raphaël Mechali
 */
class OneElementServicesComponent extends React.Component {
  static propTypes = {
    services: AccessShapes.PluginServiceWithContentArray,
    onServiceStarted: PropTypes.func.isRequired, // (service) => ()
    // other properties are reported to the drop down button
  }

  static contextTypes = { ...i18nContextType, ...themeContextType }

  render() {
    const { services, onServiceStarted, ...otherButtonProperties } = this.props
    const { intl: { formatMessage } } = this.context
    return (
      <DropDownButton
        title={formatMessage({ id: 'show.entity.services.tooltip' })}
        onChange={onServiceStarted}
        disabled={!services || !services.length}
        ButtonConstructor={IconButtonConstructorWrapper}
        {...otherButtonProperties}
      >
        {
          (services || []).map((service) => (
            <MenuItem
              key={`${service.content.type}-${service.content.configId}`}
              value={service}
              leftIcon={
                // render the icon only when service has one
                service.content.iconUrl
                  ? <URLPictureResolver url={service.content.iconUrl} />
                  : null
}
              primaryText={service.content.label}
            />))
        }
      </DropDownButton>

    )
  }
}
export default OneElementServicesComponent
