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
 * */
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { RenderTextField, Field } from '@regardsoss/form-utils'
import { IFrameURLContentDisplayer } from '@regardsoss/components'
import ModuleConfigurationShape from '../models/ModuleConfigurationShape'


/**
 * React component to display module administration module.
 * @author Sébastien Binda
 */
class AdminContainer extends React.Component {

  static propTypes = {
    // Application name
    appName: PropTypes.string,
    // Project name
    project: PropTypes.string,
    // Form parameters
    adminForm: PropTypes.shape({
      // Function to change a field value
      changeField: PropTypes.func,
      // Current values of the form
      form: ModuleConfigurationShape,
    }).isRequired,
    // Default values of the module configuration
    moduleConf: ModuleConfigurationShape.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  renderHTML() {
    if (this.props.adminForm.form.conf && this.props.adminForm.form.conf.htmlUrl) {
      return (
        <div>
          <IFrameURLContentDisplayer
            contentURL={this.props.adminForm.form.conf.htmlUrl}
            style={{
              width: this.props.adminForm.form.conf.cssWidth || '100%',
              height: this.props.adminForm.form.conf.cssHeight || 100,

            }}
          />
        </div>
      )
    }
    return null
  }

  render() {
    const { intl } = this.context
    return (
      <div>
        <Field
          name="conf.cssHeight"
          fullWidth
          component={RenderTextField}
          type="text"
          label={intl.formatMessage({ id: 'admin.css.height.label' })}
        />
        <Field
          name="conf.cssWidth"
          fullWidth
          component={RenderTextField}
          type="text"
          label={intl.formatMessage({ id: 'admin.css.width.label' })}
        />
        <Field
          name="conf.htmlUrl"
          fullWidth
          component={RenderTextField}
          type="text"
          label={intl.formatMessage({ id: 'admin.html.url' })}
        />
        {this.renderHTML()}
      </div>
    )
  }
}

export default AdminContainer
