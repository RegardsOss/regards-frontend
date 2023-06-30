/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { fieldArrayFieldsPropTypes } from 'redux-form'
import Delete from 'mdi-material-ui/Close'
import Add from 'mdi-material-ui/PlusCircleOutline'
import FlatButton from 'material-ui/FlatButton'
import { RenderTextField, Field } from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import IconButton from 'material-ui/IconButton'

/**
 * Form component to edit datasets/collection attributes that the admin has to define.
 */
export class ParameterArrayAttributeComponent extends React.Component {
  static propTypes = {
    type: PropTypes.string.isRequired,
    constraints: PropTypes.arrayOf(PropTypes.any),
    // from redux form
    // the selected value as fields object (holds selected levels IDs)
    fields: PropTypes.shape(fieldArrayFieldsPropTypes).isRequired, // fields given by FieldArray from redux-form
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static lineStyle = {
    display: 'flex',
    alignItems: 'flex-end',
  }

  static formStyle = {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
  }

  static iconAdd = <Add />

  addNewValue = () => {
    const { fields } = this.props
    fields.push({})
  }

  renderExistingValues = (member, index, fields) => {
    const { type, constraints } = this.props
    return (
      <div key={index} style={ParameterArrayAttributeComponent.lineStyle}>
        <Field
          className={`selenium-fill-${index}`}
          name={`${member}.value`}
          type={type}
          component={RenderTextField}
          label={this.context.intl.formatMessage({ id: 'entities-attributes.form.table.input' })}
          validate={constraints}
        />
        <IconButton
          className="selenium-removeValue"
          title={this.context.intl.formatMessage({ id: 'entities-attributes.form.table.stringarray.action.remove' })}
          onClick={() => fields.remove(index)}
        >
          <Delete />
        </IconButton>
      </div>
    )
  }

  render() {
    const { fields } = this.props
    return (
      <div style={ParameterArrayAttributeComponent.formStyle}>
        {fields.map(this.renderExistingValues)}
        <FlatButton
          className="selenium-addValue"
          icon={ParameterArrayAttributeComponent.iconAdd}
          onClick={this.addNewValue}
          label={this.context.intl.formatMessage({ id: 'entities-attributes.form.table.stringarray.action.add' })}
        />
      </div>)
  }
}

export default ParameterArrayAttributeComponent
