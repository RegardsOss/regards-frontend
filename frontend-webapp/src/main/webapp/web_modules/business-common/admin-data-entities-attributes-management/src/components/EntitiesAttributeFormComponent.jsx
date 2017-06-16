/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import forEach from 'lodash/forEach'
import has from 'lodash/has'
import keys from 'lodash/keys'
import isNil from 'lodash/isNil'
import isObject from 'lodash/isObject'
import get from 'lodash/get'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import { FormattedMessage } from 'react-intl'
import { reduxForm } from 'redux-form'
import { DataManagementShapes } from '@regardsoss/shape'
import { RenderTextField, RenderSelectField, RenderFileField, RenderCheckbox, Field, ErrorTypes } from '@regardsoss/form-utils'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
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

  getField = (modelAttribute) => {
    console.log(modelAttribute.content.attribute.type, MODEL_ATTR_TYPES.STRING)
    switch (modelAttribute.content.attribute.type) {
      case MODEL_ATTR_TYPES.STRING:
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
        return (<span>Can't render a Field for that attribute type</span>)
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

  getRestriction = modelAttribute => []

  render() {
    const { modelAttribute } = this.props
    console.log(modelAttribute)
    return (
      <TableRow>
        <TableRowColumn>{getFullQualifiedAttributeName(modelAttribute.content.attribute)}</TableRowColumn>
        <TableRowColumn>{modelAttribute.content.attribute.type}</TableRowColumn>
        <TableRowColumn>
          <ShowableAtRender show={!has(modelAttribute.content, 'computationConf')}>
            {this.getField(modelAttribute)}
          </ShowableAtRender>
        </TableRowColumn>
      </TableRow>
    )
  }
}


export default EntitiesAttributeFormComponent
