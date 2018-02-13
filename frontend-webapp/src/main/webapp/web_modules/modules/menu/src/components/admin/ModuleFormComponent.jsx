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
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { RenderTextField, RenderCheckbox, Field, ValidationHelpers } from '@regardsoss/form-utils'

/**
 * Module form component
 * @author Raphaël Mechali
 */
class ModuleFormComponent extends React.Component {
  static propTypes = {
    // current form namespace
    currentNamespace: PropTypes.string,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static validateOptionalEmail = value => value && ValidationHelpers.email(value)
  static validateOptionalUrl = value => value && ValidationHelpers.url(value)

  constructor(props) {
    super(props)
    this.CONF_TITLE = `${props.currentNamespace}.title`
    this.CONF_CONTACTS = `${props.currentNamespace}.contacts`
    this.CONF_ABOUT_PAGE = `${props.currentNamespace}.projectAboutPage`
    this.CONF_AUTH = `${props.currentNamespace}.displayAuthentication`
    this.CONF_NOTIF = `${props.currentNamespace}.displayNotificationsSelector`
    this.CONF_LOCALE = `${props.currentNamespace}.displayLocaleSelector`
    this.CONF_THEME = `${props.currentNamespace}.displayThemeSelector`
  }

  render() {
    const { intl, moduleTheme: { admin } } = this.context
    return (
      <div style={admin.rootStyle}>
        <Field
          name={this.CONF_TITLE}
          fullWidth
          component={RenderTextField}
          type="text"
          label={intl.formatMessage({ id: 'menu.form.title' })}
        />
        <Field
          name={this.CONF_CONTACTS}
          fullWidth
          component={RenderTextField}
          type="text"
          label={intl.formatMessage({ id: 'menu.form.contacts' })}
          validate={ModuleFormComponent.validateOptionalEmail}
        />
        <Field
          name={this.CONF_ABOUT_PAGE}
          fullWidth
          component={RenderTextField}
          label={intl.formatMessage({ id: 'menu.form.projectpage' })}
          validate={ModuleFormComponent.validateOptionalUrl}
        />
        <Field
          name={this.CONF_AUTH}
          component={RenderCheckbox}
          label={intl.formatMessage({ id: 'menu.form.displayauthentication' })}
        />
        <Field
          name={this.CONF_CART}
          component={RenderCheckbox}
          label={intl.formatMessage({ id: 'menu.form.displaycart' })}
        />
        <Field
          name={this.CONF_NOTIF}
          component={RenderCheckbox}
          label={intl.formatMessage({ id: 'menu.form.displaynotifications' })}
        />
        <Field
          name={this.CONF_LOCALE}
          component={RenderCheckbox}
          label={intl.formatMessage({ id: 'menu.form.displaylocale' })}
        />
        <Field
          name={this.CONF_THEME}
          component={RenderCheckbox}
          label={intl.formatMessage({ id: 'menu.form.displaytheme' })}
        />
      </div>
    )
  }
}
export default ModuleFormComponent
