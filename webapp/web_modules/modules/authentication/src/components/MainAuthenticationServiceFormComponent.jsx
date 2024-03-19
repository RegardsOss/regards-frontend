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
import { Link } from 'react-router'
import find from 'lodash/find'
import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import isEqual from 'lodash/isEqual'
import StarIcon from 'mdi-material-ui/Star'
import RaisedButton from 'material-ui/RaisedButton'
import {
  Card, CardActions, CardTitle, CardText,
} from 'material-ui/Card'
import { UIDomain } from '@regardsoss/domain'
import { PictureLinkComponent } from '@regardsoss/components'
import { CommonShapes, UIShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * Display the main authentication service provider form selected by admin
 * @author Théo Lasserre
 */
class MainAuthenticationServiceFormComponent extends React.Component {
  static propTypes = {
    // form title
    title: PropTypes.string.isRequired,
    // selected main auth service provider configuration to be used in priority by users
    // eslint-disable-next-line react/no-unused-prop-types
    selectedMainService: UIShapes.ServiceProviderConfiguration.isRequired,
    // enable to switch to default authentication form
    setDefaultForm: PropTypes.func.isRequired,
    // service provider list
    // eslint-disable-next-line react/no-unused-prop-types
    serviceProviderList: CommonShapes.ServiceProviderList.isRequired,
    // show cancel button?
    showCancel: PropTypes.bool.isRequired,
    // on cancel button callback, or none if behavior not available
    onCancelAction: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    selectedServiceProvider: null,
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
    const { serviceProviderList, selectedMainService } = newProps
    if (!isEqual(oldProps.serviceProviderList, serviceProviderList)) {
      const selectedServiceProvider = find(serviceProviderList, (serviceProvider) => get(serviceProvider, 'content.name') === get(selectedMainService, 'serviceId'))
      this.setState({
        selectedServiceProvider,
      })
    }
  }

  /**
   * Retrieve a service provider description depending on locale used
   */
  getServiceDescription = () => {
    const { selectedServiceProvider } = this.state
    const { intl: { locale } } = this.context
    return locale === UIDomain.LOCALES_ENUM.fr ? get(selectedServiceProvider, 'content.descriptionFr', '') : get(selectedServiceProvider, 'content.descriptionEn', '')
  }

  render() {
    const {
      title, onCancelAction, showCancel, setDefaultForm, selectedMainService,
    } = this.props
    const { moduleTheme, intl: { formatMessage, locale } } = this.context
    const { selectedServiceProvider } = this.state
    let cancelButtonElt
    if (showCancel) {
      cancelButtonElt = (
        <RaisedButton
          label={this.context.intl.formatMessage({ id: 'authentication.cancel' })}
          style={moduleTheme.cancelButton}
          buttonStyle={moduleTheme.buttonStyle}
          overlayStyle={moduleTheme.overlayStyle}
          labelStyle={moduleTheme.labelStyle}
          onClick={onCancelAction}
        />
      )
    }
    const serviceDescription = this.getServiceDescription()
    return (
      <Card style={moduleTheme.cardSelectedAuthStyle}>
        <CardTitle
          title={selectedMainService.serviceTitle[locale] || title}
          subtitle={selectedMainService.showSubtitle ? formatMessage({ id: 'session.selected.auth.service.subtitle' }) : null}
          style={moduleTheme.cardTitleAuthStyle}
        />
        <CardText>
          <div style={moduleTheme.mainAuthServiceStyle.mainDivStyle}>
            <div style={!isEmpty(serviceDescription) ? moduleTheme.mainAuthServiceStyle.textMainDivStyle : moduleTheme.mainAuthServiceStyle.textMainDivAltStyle}>
              <div style={moduleTheme.mainAuthServiceStyle.titleDivStyle}>
                {formatMessage({ id: 'session.selected.auth.service.name' }, { value: selectedServiceProvider.content.name })}
              </div>
              {
                !isEmpty(serviceDescription)
                  ? <div style={moduleTheme.mainAuthServiceStyle.mainDescriptionDivStyle}>
                    <div title={serviceDescription} style={moduleTheme.mainAuthServiceStyle.descriptionStyle}>
                      {serviceDescription}
                    </div>
                  </div> : null
              }
            </div>
            <CardActions style={!isEmpty(serviceDescription) ? moduleTheme.mainAuthServiceStyle.cardActionsStyle : moduleTheme.mainAuthServiceStyle.cardActionsAltStyle}>
              <Link style={moduleTheme.mainAuthServiceStyle.buttonLinkStyle} to={{ pathname: selectedServiceProvider.content.authUrl }} target="_blank">
                <RaisedButton
                  label={this.context.intl.formatMessage({ id: 'authentication.button' })}
                  type="submit"
                  style={moduleTheme.connectButton}
                  buttonStyle={moduleTheme.buttonStyle}
                  overlayStyle={moduleTheme.overlayStyle}
                  labelStyle={moduleTheme.labelStyle}
                  secondary
                />
              </Link>
              <div style={moduleTheme.mainAuthServiceStyle.buttonLinkStyle}>
                {cancelButtonElt}
              </div>
            </CardActions>
          </div>
          <div style={moduleTheme.mainAuthServiceStyle.linksBar}>
            <div style={moduleTheme.mainAuthServiceStyle.linkButtonStyle}>
              <PictureLinkComponent
                IconComponent={StarIcon}
                text={formatMessage({ id: 'authentication.goto.standard.connexion' })}
                onAction={setDefaultForm}
              />
            </div>
          </div>
        </CardText>
      </Card>
    )
  }
}
export default MainAuthenticationServiceFormComponent
