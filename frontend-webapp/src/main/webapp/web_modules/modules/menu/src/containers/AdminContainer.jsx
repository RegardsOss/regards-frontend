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
import { RenderTextField, RenderCheckbox, Field } from '@regardsoss/form-utils'

/**
 * React component to display module administration module.
 * @author Sébastien binda
 */
class AdminContainer extends React.Component {

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const { intl } = this.context
    return (
      <div>
        <Field
          name="conf.title"
          fullWidth
          component={RenderTextField}
          type="text"
          label={intl.formatMessage({ id: 'menu.form.title' })}
        />
        <Field
          name="conf.displayAuthentication"
          component={RenderCheckbox}
          label={intl.formatMessage({ id: 'menu.form.displayauthentication' })}
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
