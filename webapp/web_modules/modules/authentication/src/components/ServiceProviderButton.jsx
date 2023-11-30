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
import isEmpty from 'lodash/isEmpty'
import { Link } from 'react-router'
import { UIDomain } from '@regardsoss/domain'
import { themeContextType } from '@regardsoss/theme'
import { CommonShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import RaisedButton from 'material-ui/RaisedButton'

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

  /**
   * Retrieve a service provider description depending on locale used
   */
   getServiceDescription = (serviceProvider) => {
     const { intl: { locale } } = this.context
     return locale === UIDomain.LOCALES_ENUM.fr ? get(serviceProvider, 'content.descriptionFr', '') : get(serviceProvider, 'content.descriptionEn', '')
   }

   render() {
     const { serviceProvider, unlockStep } = this.props
     const { moduleTheme } = this.context
     const description = this.getServiceDescription(serviceProvider)
     return (
       <Link to={{ pathname: serviceProvider.content.authUrl }} target="_blank">
         <RaisedButton
           label={this.context.intl.formatMessage({ id: unlockStep ? 'authentication.external.button.unlock.label' : 'authentication.external.button.label' }, { name: serviceProvider.content.name })}
           style={moduleTheme.serviceProviderButton}
           buttonStyle={moduleTheme.serviceProviderButtonStyle}
           overlayStyle={moduleTheme.overlayAltStyle}
           labelStyle={moduleTheme.labelStyle}
           primary
         >
           {
            !isEmpty(description)
              ? <div style={moduleTheme.serviceProviderDescriptionStyle}>
                {description}
              </div> : null
}
         </RaisedButton>

       </Link>
     )
   }
}
export default ServiceProviderButton
