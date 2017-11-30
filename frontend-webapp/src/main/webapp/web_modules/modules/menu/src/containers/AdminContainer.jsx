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
 * React component to display module administration module.
 * @author Sébastien binda
 */
class AdminContainer extends React.Component {
  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  static validateOptionalEmail = value => value && ValidationHelpers.email(value)
  static validateOptionalUrl = value => value && ValidationHelpers.url(value)

  render() {
    const { intl, moduleTheme: { admin } } = this.context
    return (
      <div style={admin.rootStyle}>
        <Field
          name="conf.title"
          fullWidth
          component={RenderTextField}
          type="text"
          label={intl.formatMessage({ id: 'menu.form.title' })}
        />
        <Field
          name="conf.contacts"
          fullWidth
          component={RenderTextField}
          type="text"
          label={intl.formatMessage({ id: 'menu.form.contacts' })}
          validate={AdminContainer.validateOptionalEmail}
        />
        <Field
          name="conf.projectAboutPage"
          fullWidth
          component={RenderTextField}
          label={intl.formatMessage({ id: 'menu.form.projectpage' })}
          validate={AdminContainer.validateOptionalUrl}
        />
        <Field
          name="conf.displayAuthentication"
          component={RenderCheckbox}
          label={intl.formatMessage({ id: 'menu.form.displayauthentication' })}
        />
        <Field
          name="conf.displayCartSelector"
          component={RenderCheckbox}
          label={intl.formatMessage({ id: 'menu.form.displaycart' })}
        />
        <Field
          name="conf.displayLocaleSelector"
          component={RenderCheckbox}
          label={intl.formatMessage({ id: 'menu.form.displaylocale' })}
        />
        <Field
          name="conf.displayThemeSelector"
          component={RenderCheckbox}
          label={intl.formatMessage({ id: 'menu.form.displaytheme' })}
        />
      </div>
    )
  }
}

export default AdminContainer
