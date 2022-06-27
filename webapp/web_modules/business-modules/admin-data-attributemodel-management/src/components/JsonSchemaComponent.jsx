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
import get from 'lodash/get'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import {
  RenderJsonCodeEditorField,
  Field,
  FieldArray,
  RenderFieldArray,
  RenderCheckbox,
} from '@regardsoss/form-utils'
import { ELASTIC_CONFIGURATION_TYPES, ELASTIC_CONFIGURATION_TYPES_ENUM } from '../domain/ElasticConfigurationTypes'

/**
 * Handle json schema restriction
 * @author Sébastien Binda
 */
export class JsonSchemaComponent extends React.Component {
  static propTypes = {
    selectedElasticConfig: PropTypes.oneOf(ELASTIC_CONFIGURATION_TYPES).isRequired,
    isRestrictedCheckboxToggled: PropTypes.bool.isRequired,
    // redux form
    change: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  onTextFieldChange = (event) => {
    this.props.change('restriction.JSON_SCHEMA.active', true)
  }

  render() {
    const {
      selectedElasticConfig, isRestrictedCheckboxToggled,
    } = this.props
    return (
      <div>
        <Field
          name="restriction.JSON_SCHEMA.jsonSchema"
          fullWidth
          component={RenderJsonCodeEditorField}
          onChange={this.onTextFieldChange}
          asString
          label={this.context.intl.formatMessage({ id: 'attrmodel.form.restriction.JSON_SCHEMA.schema' })}
        />
        {
          selectedElasticConfig === ELASTIC_CONFIGURATION_TYPES_ENUM.SIMPLE
            && <div>
              <Field
                name="restriction.JSON_SCHEMA.restrict"
                component={RenderCheckbox}
                label={this.context.intl.formatMessage({ id: 'attrmodel.form.config.elastic.type.SIMPLE.restrict' })}
              />
              {
                isRestrictedCheckboxToggled
                  ? <FieldArray
                      name="restriction.JSON_SCHEMA.indexableFields"
                      fullWidth
                      component={RenderFieldArray}
                      canBeEmpty
                      title={this.context.intl.formatMessage({ id: 'attrmodel.form.config.elastic.type.SIMPLE.restrict.fields.title' })}
                      warningText={this.context.intl.formatMessage({ id: 'attrmodel.form.config.elastic.type.SIMPLE.restrict.fields.add.warn' })}
                      alreadyExistText={this.context.intl.formatMessage({ id: 'attrmodel.form.config.elastic.type.SIMPLE.restrict.fields.add.exist' })}
                      floatingLabelText={this.context.intl.formatMessage({ id: 'attrmodel.form.config.elastic.type.SIMPLE.restrict.fields.hint' })}
                  />
                  : null
              }
            </div>
        }
      </div>
    )
  }
}

/**
 *
 * @param initialValues values provided to the form
 * @param currentAttrModel object received from the API
 * @returns {*} object sent to redux-form to correctly initialize form inputs
 */
export function initializeJsonSchemaForm(initialValues, currentAttrModel) {
  const formValues = initialValues
  formValues.restriction.JSON_SCHEMA = {}
  formValues.restriction.JSON_SCHEMA.active = true
  formValues.restriction.JSON_SCHEMA.jsonSchema = currentAttrModel.content.restriction.jsonSchema
  formValues.restriction.JSON_SCHEMA.indexableFields = currentAttrModel.content.restriction.indexableFields || []
  formValues.restriction.JSON_SCHEMA.restrict = !!get(currentAttrModel, 'content.restriction.indexableFields', false)
  return formValues
}

export default JsonSchemaComponent
