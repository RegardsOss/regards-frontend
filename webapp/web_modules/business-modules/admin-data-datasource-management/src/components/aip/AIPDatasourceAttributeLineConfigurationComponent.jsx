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
import { TableRow, TableRowColumn } from 'material-ui/Table'
import { DataManagementShapes } from '@regardsoss/shape'
import {
  RenderTextField,
  Field,
  ValidationHelpers,
} from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { getFullQualifiedAttributeName, MODEL_ATTR_TYPES } from '@regardsoss/domain/dam'
import { DamDomain } from '@regardsoss/domain'

const requiredString = [ValidationHelpers.required]
/**
 * Form component to edit AIP datasource mapping.
 */
export class AIPDatasourceAttributeLineConfigurationComponent extends React.Component {
  static propTypes = {
    modelAttribute: DataManagementShapes.ModelAttribute,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static styleTableRow = {
    height: '95px',
  }

  getField = (modelAttribute) => {
    switch (modelAttribute.content.attribute.type) {
      case MODEL_ATTR_TYPES.STRING:
      case MODEL_ATTR_TYPES.DOUBLE:
      case MODEL_ATTR_TYPES.LONG:
      case MODEL_ATTR_TYPES.INTEGER:
      case MODEL_ATTR_TYPES.URL:
      case MODEL_ATTR_TYPES.BOOLEAN:
      case MODEL_ATTR_TYPES.DATE_ISO8601:
      case MODEL_ATTR_TYPES.STRING_ARRAY:
      case MODEL_ATTR_TYPES.INTEGER_ARRAY:
      case MODEL_ATTR_TYPES.DOUBLE_ARRAY:
      case MODEL_ATTR_TYPES.LONG_ARRAY:
      case MODEL_ATTR_TYPES.DATE_ARRAY:
        return this.getFieldTextField(modelAttribute)
      case MODEL_ATTR_TYPES.INTEGER_INTERVAL:
      case MODEL_ATTR_TYPES.DOUBLE_INTERVAL:
      case MODEL_ATTR_TYPES.DATE_INTERVAL:
      case MODEL_ATTR_TYPES.LONG_INTERVAL:
        return this.getFieldIntervalField(modelAttribute)
      default:
        return (<span>No render field for that attribute type</span>)
    }
  }

  getFieldName = (modelAttribute) => {
    // Static attributes
    if (!modelAttribute.content.attribute.fragment.name && modelAttribute.content.attribute.fragment.name !== DamDomain.DEFAULT_FRAGMENT) {
      return `mapping.${modelAttribute.content.attribute.name}`
    }
    // Dynamic attributes with fragment
    if (modelAttribute.content.attribute.fragment.name !== DamDomain.DEFAULT_FRAGMENT) {
      return `mapping.properties@${modelAttribute.content.attribute.fragment.name}@${modelAttribute.content.attribute.name}`
    }
    // Dynamic attributes without fragment
    return `mapping.properties@${modelAttribute.content.attribute.name}`
  }

  getFieldTextField = (modelAttribute) => (
    <Field
      className={`selenium-fill-${modelAttribute.content.attribute.fragment.name}-${modelAttribute.content.attribute.name}`}
      name={this.getFieldName(modelAttribute)}
      fullWidth
      component={RenderTextField}
      type="text"
      label={this.context.intl.formatMessage({ id: 'aip.datasource.form.table.input' })}
      validate={this.getValidation(modelAttribute.content.attribute)}
    />
  )

  getFieldIntervalField = (modelAttribute) => ([
    <Field
      key="lower"
      className={`selenium-fill-${modelAttribute.content.attribute.fragment.name}-${modelAttribute.content.attribute.name}`}
      name={`${this.getFieldName(modelAttribute)}@lowerBound`}
      fullWidth
      component={RenderTextField}
      type="text"
      label={this.context.intl.formatMessage({ id: 'aip.datasource.form.table.lowerBound' })}
      validate={this.getValidation(modelAttribute.content.attribute)}
    />,
    <br key="have-a-nice-day" />,
    <Field
      key="upper"
      className={`selenium-fill-${modelAttribute.content.attribute.fragment.name}-${modelAttribute.content.attribute.name}`}
      name={`${this.getFieldName(modelAttribute)}@upperBound`}
      fullWidth
      component={RenderTextField}
      type="text"
      label={this.context.intl.formatMessage({ id: 'aip.datasource.form.table.upperBound' })}
      validate={this.getValidation(modelAttribute.content.attribute)}
    />,
  ])

  getValidation = (attributeModel) => {
    if (!attributeModel.optional) {
      return requiredString
    }
    return []
  }

  showStarIfInputRequired = (attributeModel) => {
    if (!attributeModel.optional) {
      return ' (*)'
    }
    return null
  }

  render() {
    const { modelAttribute } = this.props
    return (
      <TableRow>
        <TableRowColumn
          title={modelAttribute.content.attribute.description}
        >
          {modelAttribute.content.attribute.label}
          {this.showStarIfInputRequired(modelAttribute.content.attribute)}
          <br />
          {getFullQualifiedAttributeName(modelAttribute.content.attribute)}
        </TableRowColumn>
        <TableRowColumn
          className={`selenium-type-${modelAttribute.content.attribute.fragment.name}-${modelAttribute.content.attribute.name}`}
        >
          {modelAttribute.content.attribute.type}
        </TableRowColumn>
        <TableRowColumn style={AIPDatasourceAttributeLineConfigurationComponent.styleTableRow}>
          {this.getField(modelAttribute)}
        </TableRowColumn>
      </TableRow>
    )
  }
}

export default AIPDatasourceAttributeLineConfigurationComponent
