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
import { i18nContextType } from '@regardsoss/i18n'
import { UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM, UI_PLUGIN_CONF_PARAMETER_TYPES } from '@regardsoss/domain/access'
import { ValidationHelpers } from '@regardsoss/form-utils'
import { BooleanParameterField, DateParameterField, TextParameterField } from '@regardsoss/entities-common'

/**
* Field builder component: instantiate the right field for current parameter
* @author Raphaël Mechali
*/
class FieldBuilderComponent extends React.Component {
  /**
   * Used by parent container to retrieve and sort the parameters types
   */
  static TYPE_NAME_PREFIX = {
    STATIC: 'static',
    DYNAMIC: 'dynamic',
  }

  static propTypes = {
    // is parameter a static (true) or a dynamic (false) parameter
    staticParameter: PropTypes.bool.isRequired,
    // parameter name (its key in parameters map)
    name: PropTypes.string.isRequired,
    // parameter (static or dynamic model)
    parameter: PropTypes.shape({
      label: PropTypes.string,
      required: PropTypes.bool,
      type: PropTypes.oneOf(UI_PLUGIN_CONF_PARAMETER_TYPES).isRequired,
    }).isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  getFieldName = () => {
    const { staticParameter, name } = this.props
    return `${staticParameter ? FieldBuilderComponent.TYPE_NAME_PREFIX.STATIC : FieldBuilderComponent.TYPE_NAME_PREFIX.DYNAMIC}.${name}`
  }

  render() {
    const { staticParameter, parameter: { label, required, type }, name } = this.props
    const { intl: { formatMessage } } = this.context

    // compute field name as expected by parent container
    const fieldName = this.getFieldName()
    // compute if field should be mandatory for admin: it should be admin parameter which is required
    const mandatory = staticParameter && required
    // compute field label (add (*) to mark mandatory fields)
    const fieldLabel = mandatory ? formatMessage({ id: 'service.form.mandatory.field' }, { label: label || name }) : label || name

    switch (type) {
      case UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.BOOL:
        return <BooleanParameterField name={fieldName} label={fieldLabel} />
      case UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.CHAR:
        return <TextParameterField name={fieldName} label={fieldLabel} required={mandatory} validator={ValidationHelpers.characterValidator} />
      case UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.DATE:
        return <DateParameterField name={fieldName} label={fieldLabel} required={mandatory} />
      case UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.FLOAT:
        return <TextParameterField name={fieldName} label={fieldLabel} required={mandatory} validator={ValidationHelpers.javaDoubleValidator} />
      case UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.INT:
        return <TextParameterField name={fieldName} label={fieldLabel} required={mandatory} validator={ValidationHelpers.javaLongValidator} />
      case UI_PLUGIN_CONF_PARAMETER_TYPES_ENUM.STRING:
        return <TextParameterField name={fieldName} label={fieldLabel} required={mandatory} validator={null} />
      default:
        throw new Error(`Unknown parameter type ${type}`)
    }
  }
}
export default FieldBuilderComponent
