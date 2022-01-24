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

import { Link } from 'react-router'
import { themeContextType } from '@regardsoss/theme'
import { CommonShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import RaisedButton from 'material-ui/RaisedButton/RaisedButton'

/**
 * Comment Here
 * @author Théo Lasserre
 */
export class ServiceProviderButton extends React.Component {
  static propTypes = {
    unlockStep: PropTypes.bool,
    serviceProvider: CommonShapes.ServiceProvider.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { serviceProvider, unlockStep } = this.props
    const { moduleTheme } = this.context
    return (
      <Link to={{ pathname: serviceProvider.content.authUrl }} target="_blank">
        <RaisedButton
          label={this.context.intl.formatMessage({ id: unlockStep ? 'authentication.external.button.unlock.label' : 'authentication.external.button.label' }, { name: serviceProvider.content.name })}
          style={moduleTheme.serviceProviderButton}
          buttonStyle={moduleTheme.buttonStyle}
          overlayStyle={moduleTheme.overlayStyle}
          labelStyle={moduleTheme.labelStyle}
          primary
        />
      </Link>
    )
  }
}
export default ServiceProviderButton
