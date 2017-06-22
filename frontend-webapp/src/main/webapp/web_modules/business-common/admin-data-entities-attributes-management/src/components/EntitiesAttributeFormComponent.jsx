/**
 * LICENSE_PLACEHOLDER
 **/
import has from 'lodash/has'
import map from 'lodash/map'
import MenuItem from 'material-ui/MenuItem'
import { TableRow, TableRowColumn } from 'material-ui/Table'
import { DataManagementShapes } from '@regardsoss/shape'
import { RenderTextField, RenderCheckbox, RenderDateTimeField, RenderSelectField, Field, ValidationHelpers } from '@regardsoss/form-utils'
import { ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { getFullQualifiedAttributeName, MODEL_ATTR_TYPES } from '@regardsoss/domain/dam'


/**
 * Form component to edit datasets/collection attributes that the admin has to define.
 */
export class EntitiesAttributeFormComponent extends React.Component {

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
    console.log(modelAttribute.content.attribute.type, MODEL_ATTR_TYPES.STRING)
    switch (modelAttribute.content.attribute.type) {
      case MODEL_ATTR_TYPES.STRING:
        if (this.isRestrictedWithEnum(modelAttribute)) {
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
      case MODEL_ATTR_TYPES.DATE:
        return this.getFieldDateTime(modelAttribute)
      case MODEL_ATTR_TYPES.INTEGER_ARRAY:
      case MODEL_ATTR_TYPES.DOUBLE_ARRAY:
      case MODEL_ATTR_TYPES.DATE_ARRAY:
      case MODEL_ATTR_TYPES.LONG_ARRAY:
      case MODEL_ATTR_TYPES.STRING_ARRAY:
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
      name={`properties.${modelAttribute.content.attribute.fragment.name}.${modelAttribute.content.attribute.name}`}
      fullWidth
      component={RenderTextField}
      type={type}
      label={this.context.intl.formatMessage({ id: 'entities-attributes.form.table.input' })}
      validate={this.getRestriction(modelAttribute)}
    />
  )

  getFieldCheckbox = modelAttribute => (
    <Field
      name={`properties.${modelAttribute.content.attribute.fragment.name}.${modelAttribute.content.attribute.name}`}
      component={RenderCheckbox}
    />
  )

  getFieldDateTime = modelAttribute => (
    <Field
      name={`properties.${modelAttribute.content.attribute.fragment.name}.${modelAttribute.content.attribute.name}`}
      component={RenderDateTimeField}
    />
  )
  getFieldSelect = modelAttribute => (
    <Field
      name={`properties.${modelAttribute.content.attribute.fragment.name}.${modelAttribute.content.attribute.name}`}
      fullWidth
      component={RenderSelectField}
      validate={this.getRestriction(modelAttribute)}
      label={this.context.intl.formatMessage({ id: 'entities-attributes.form.table.input' })}
    >
      {map(modelAttribute.content.attribute.restriction.acceptableValues, (acceptableValue, id) => (
        <MenuItem
          value={acceptableValue}
          key={acceptableValue}
          primaryText={acceptableValue}
        />
      ))
      }
    </Field>
  )

  getRestriction = (modelAttribute) => {
    switch (modelAttribute.content.attribute.type) {
      case MODEL_ATTR_TYPES.STRING:
        if (!modelAttribute.optional) {
          return [ValidationHelpers.string, ValidationHelpers.required]
        }
        return [ValidationHelpers.string]
      case MODEL_ATTR_TYPES.DOUBLE:
      case MODEL_ATTR_TYPES.LONG:
      case MODEL_ATTR_TYPES.INTEGER:
        if (!modelAttribute.optional) {
          return [ValidationHelpers.validRequiredNumber]
        }
        return []
      case MODEL_ATTR_TYPES.URL:
        if (!modelAttribute.optional) {
          return [ValidationHelpers.string, ValidationHelpers.required]
        }
        return []
      case MODEL_ATTR_TYPES.BOOLEAN:
      case MODEL_ATTR_TYPES.DATE:
      case MODEL_ATTR_TYPES.INTEGER_ARRAY:
      case MODEL_ATTR_TYPES.DOUBLE_ARRAY:
      case MODEL_ATTR_TYPES.DATE_ARRAY:
      case MODEL_ATTR_TYPES.LONG_ARRAY:
      case MODEL_ATTR_TYPES.STRING_ARRAY:
      case MODEL_ATTR_TYPES.INTEGER_INTERVAL:
      case MODEL_ATTR_TYPES.DOUBLE_INTERVAL:
      case MODEL_ATTR_TYPES.DATE_INTERVAL:
      case MODEL_ATTR_TYPES.LONG_INTERVAL:
      default:
        return []
    }
  }

  showStarIfInputRequired = (modelAttribute) => {
    if (!modelAttribute.optional) {
      return ' (*)'
    }
    return null
  }

  isRestrictedWithEnum = (modelAttribute) => {
    console.log('Is restriction ?', modelAttribute, has(modelAttribute, 'content.attribute.restriction.type'))
    if (has(modelAttribute, 'content.attribute.restriction.type')) {
      return modelAttribute.content.attribute.restriction.type === 'ENUMERATION'
    }
    return false
  }

  render() {
    const { modelAttribute } = this.props
    return (
      <TableRow>
        <TableRowColumn
          title={modelAttribute.content.attribute.description}
        >
          {modelAttribute.content.attribute.label}
          {this.showStarIfInputRequired(modelAttribute.content.attribute)}<br />
          {getFullQualifiedAttributeName(modelAttribute.content.attribute)}
        </TableRowColumn>
        <TableRowColumn>{modelAttribute.content.attribute.type}</TableRowColumn>
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
