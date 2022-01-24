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
import { AccessShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { RenderTextField, Field } from '@regardsoss/form-utils'
import ModuleConfigurationShape from '../shapes/ModuleConfigurationShape'

/**
 * React component to display module administration module.
 * @author <%= author %>
 */
class AdminContainer extends React.Component {
  static propTypes = {
    // Application name
    appName: PropTypes.string,
    // Project name
    project: PropTypes.string,
    // Form parameters
    ...AccessShapes.runtimeConfigurationModuleFields,
    // Module configuration (overriden in runtimeConfigurationModuleFields to specify it as being THIS module configuration)
    moduleConf: ModuleConfigurationShape.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  render() {
    const { intl } = this.context
    const {
      adminForm: {
        currentNamespace,
        //form,
      },
    } = this.props
    // note: current namespaces point out the form value in adminForm.form
    // Therefore, field current value can be access like form[currentNamespace]
    // we also have to plug form field names on currentNamespace

    return (
      <div>
        <Field
          name={`${currentNamespace}.messageParameter`}
          fullWidth
          component={RenderTextField}
          type="text"
          label={intl.formatMessage({ id: 'admin.message.field.label' })}
        />
      </div>
    )
  }
}

export default AdminContainer
