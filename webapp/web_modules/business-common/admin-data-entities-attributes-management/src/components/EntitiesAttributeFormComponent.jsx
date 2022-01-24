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
import isNil from 'lodash/isNil'
import isEmpty from 'lodash/isEmpty'
import has from 'lodash/has'
import map from 'lodash/map'
import MenuItem from 'material-ui/MenuItem'
import { TableRow, TableRowColumn } from 'material-ui/Table'
import { DamDomain } from '@regardsoss/domain'
import { DataManagementShapes } from '@regardsoss/shape'
import {
  RenderTextField,
  RenderCheckbox,
  RenderDateTimeField,
  RenderSelectField,
  Field,
  ValidationHelpers,
  FieldArray,
} from '@regardsoss/form-utils'
import { ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { getFullQualifiedAttributeName, MODEL_ATTR_TYPES } from '@regardsoss/domain/dam'
import ParameterArrayAttributeComponent from './ParameterArrayAttributeComponent'
import isRestrictedWithEnum from '../utils/isRestrictedWithEnum'

/**
 * Form component to edit datasets/collection attributes that the admin has to define.
 */
export class EntitiesAttributeFormComponent extends React.Component {
  static propTypes = {
    modelAttribute: DataManagementShapes.ModelAttribute,
    isEditing: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static styleTableRow = {
    height: '95px',
  }

  static getComplexRestriction(restriction) {
    const restrictions = []
    if (restriction) {
      switch (restriction.type) {
        case DamDomain.ATTRIBUTE_MODEL_RESTRICTIONS_ENUM.PATTERN:
          restrictions.push(ValidationHelpers.matchRegex(restriction.pattern))
          break
        case DamDomain.ATTRIBUTE_MODEL_RESTRICTIONS_ENUM.INTEGER_RANGE:
        case DamDomain.ATTRIBUTE_MODEL_RESTRICTIONS_ENUM.LONG_RANGE:
        case DamDomain.ATTRIBUTE_MODEL_RESTRICTIONS_ENUM.DOUBLE_RANGE:
          restrictions.push(ValidationHelpers.isInNumericRange(restriction.min, restriction.max, restriction.minExcluded, restriction.maxExcluded))
          break
        default:
        // Nothing to do
      }
    }
    return restrictions
  }

  static getRestrictions(modelAttribute) {
    const complexRestriction = EntitiesAttributeFormComponent.getComplexRestriction(modelAttribute.content.attribute.restriction)

    switch (modelAttribute.content.attribute.type) {
      case MODEL_ATTR_TYPES.STRING:
      case MODEL_ATTR_TYPES.STRING_ARRAY:
        if (!modelAttribute.content.attribute.optional) {
          return [ValidationHelpers.string, ValidationHelpers.required, ...complexRestriction]
        }
        return [ValidationHelpers.string]
      case MODEL_ATTR_TYPES.DOUBLE:
      case MODEL_ATTR_TYPES.LONG:
      case MODEL_ATTR_TYPES.INTEGER:
      case MODEL_ATTR_TYPES.INTEGER_ARRAY:
      case MODEL_ATTR_TYPES.DOUBLE_ARRAY:
      case MODEL_ATTR_TYPES.LONG_ARRAY:
        if (!modelAttribute.content.attribute.optional) {
          return [ValidationHelpers.validRequiredNumber, ...complexRestriction]
        }
        return complexRestriction
      case MODEL_ATTR_TYPES.URL:
        if (!modelAttribute.content.attribute.optional) {
          return [ValidationHelpers.string, ValidationHelpers.required, ...complexRestriction]
        }
        return complexRestriction
      case MODEL_ATTR_TYPES.BOOLEAN:
      case MODEL_ATTR_TYPES.DATE:
      case MODEL_ATTR_TYPES.DATE_ARRAY:
      case MODEL_ATTR_TYPES.INTEGER_INTERVAL:
      case MODEL_ATTR_TYPES.DOUBLE_INTERVAL:
      case MODEL_ATTR_TYPES.DATE_INTERVAL:
      case MODEL_ATTR_TYPES.LONG_INTERVAL:
      default:
        return complexRestriction
    }
  }

  /** Initial state */
  state = {
    restrictions: EntitiesAttributeFormComponent.getRestrictions(this.props.modelAttribute),
  }

  getField = (modelAttribute) => {
    switch (modelAttribute.content.attribute.type) {
      case MODEL_ATTR_TYPES.STRING:
        if (isRestrictedWithEnum(modelAttribute)) {
          return this.getFieldSelect(modelAttribute)
        }
        return this.getFieldTextField(modelAttribute, 'text')

      case MODEL_ATTR_TYPES.DOUBLE:
      case MODEL_ATTR_TYPES.LONG:
      case MODEL_ATTR_TYPES.INTEGER:
        return this.getFieldTextField(modelAttribute, 'number')
      case MODEL_ATTR_TYPES.URL:
        return this.getFieldTextField(modelAttribute, 'url')
      case MODEL_ATTR_TYPES.BOOLEAN:
        return this.getFieldCheckbox(modelAttribute)
      case MODEL_ATTR_TYPES.DATE_ISO8601:
        return this.getFieldDateTime(modelAttribute)
      case MODEL_ATTR_TYPES.STRING_ARRAY:
        if (isRestrictedWithEnum(modelAttribute)) {
          return this.getEnumTextArrayField(modelAttribute)
        }
        return this.getFieldTextFieldWithValuesArray(modelAttribute, 'text')
      case MODEL_ATTR_TYPES.INTEGER_ARRAY:
      case MODEL_ATTR_TYPES.DOUBLE_ARRAY:
      case MODEL_ATTR_TYPES.LONG_ARRAY:
        return this.getFieldTextFieldWithValuesArray(modelAttribute, 'number')
      case MODEL_ATTR_TYPES.DATE_ARRAY:
      case MODEL_ATTR_TYPES.INTEGER_INTERVAL:
      case MODEL_ATTR_TYPES.DOUBLE_INTERVAL:
      case MODEL_ATTR_TYPES.DATE_INTERVAL:
      case MODEL_ATTR_TYPES.LONG_INTERVAL:
      default:
        return (<span>No render field for that attribute type</span>)
    }
  }

  getFieldTextField = (modelAttribute, type) => (
    <Field
      className={`selenium-fill-${modelAttribute.content.attribute.fragment.name}-${modelAttribute.content.attribute.name}`}
      name={`properties.${modelAttribute.content.attribute.fragment.name}.${modelAttribute.content.attribute.name}`}
      fullWidth
      component={RenderTextField}
      type={type}
      label={this.context.intl.formatMessage({ id: 'entities-attributes.form.table.input' })}
      validate={this.state.restrictions}
      disabled={this.isDisabled()}
      parse={(value, name) => isNil(value) || isEmpty(value) ? null : value}
    />
  )

  getFieldCheckbox = (modelAttribute) => (
    <Field
      className={`selenium-pick-${modelAttribute.content.attribute.fragment.name}-${modelAttribute.content.attribute.name}`}
      name={`properties.${modelAttribute.content.attribute.fragment.name}.${modelAttribute.content.attribute.name}`}
      component={RenderCheckbox}
      disabled={this.isDisabled()}
    />
  )

  getFieldDateTime = (modelAttribute) => (
    <Field
      className={`selenium-pick-${modelAttribute.content.attribute.fragment.name}-${modelAttribute.content.attribute.name}`}
      name={`properties.${modelAttribute.content.attribute.fragment.name}.${modelAttribute.content.attribute.name}`}
      component={RenderDateTimeField}
      validate={this.state.restrictions}
      disabled={this.isDisabled()}
    />
  )

  getFieldSelect = (modelAttribute) => (
    <Field
      className={`selenium-pick-${modelAttribute.content.attribute.fragment.name}-${modelAttribute.content.attribute.name}`}
      name={`properties.${modelAttribute.content.attribute.fragment.name}.${modelAttribute.content.attribute.name}`}
      fullWidth
      component={RenderSelectField}
      validate={this.state.restrictions}
      disabled={this.isDisabled()}
      label={this.context.intl.formatMessage({ id: 'entities-attributes.form.table.input' })}
    >
      {map(modelAttribute.content.attribute.restriction.acceptableValues, (acceptableValue, id) => (
        <MenuItem
          className={`selenium-value-${modelAttribute.content.attribute.fragment.name}-${modelAttribute.content.attribute.name}-${acceptableValue}`}
          value={acceptableValue}
          key={acceptableValue}
          primaryText={acceptableValue}
        />
      ))}
    </Field>
  )

  getFieldTextFieldWithValuesArray = (modelAttribute, type) => (
    <div
      className={`selenium-array-${modelAttribute.content.attribute.fragment.name}-${modelAttribute.content.attribute.name}`}
    >
      <FieldArray
        name={`properties.${modelAttribute.content.attribute.fragment.name}.${modelAttribute.content.attribute.name}`}
        component={ParameterArrayAttributeComponent}
        modelAttribute={modelAttribute}
        type={type}
        constraints={this.state.restrictions}
      />
    </div>)

  getEnumTextArrayField = (modelAttribute) => (
    <div>
      <Field
        className={`selenium-pick-${modelAttribute.content.attribute.fragment.name}-${modelAttribute.content.attribute.name}`}
        name={`properties.${modelAttribute.content.attribute.fragment.name}.${modelAttribute.content.attribute.name}`}
        fullWidth
        component={RenderSelectField}
        label={this.context.intl.formatMessage({ id: 'entities-attributes.form.table.input.multiple' })}
        multiple
      >
        {map(modelAttribute.content.attribute.restriction.acceptableValues, (acceptableValue, id) => (
          <MenuItem
            className={`selenium-value-${modelAttribute.content.attribute.fragment.name}-${modelAttribute.content.attribute.name}-${acceptableValue}`}
            value={acceptableValue}
            key={acceptableValue}
            primaryText={acceptableValue}
          />
        ))}
      </Field>
    </div>
  )

  showStarIfInputRequired = (modelAttribute) => {
    if (!modelAttribute.optional) {
      return ' (*)'
    }
    return null
  }

  isDisabled = () => {
    const { modelAttribute, isEditing } = this.props
    return !modelAttribute.content.attribute.alterable && isEditing
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
        <TableRowColumn style={EntitiesAttributeFormComponent.styleTableRow}>
          <ShowableAtRender show={!has(modelAttribute.content, 'computationConf')}>
            {this.getField(modelAttribute)}
          </ShowableAtRender>
        </TableRowColumn>
      </TableRow>
    )
  }
}

export default EntitiesAttributeFormComponent
