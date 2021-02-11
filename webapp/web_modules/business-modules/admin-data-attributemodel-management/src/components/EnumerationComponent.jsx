/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { FormattedMessage } from 'react-intl'
import { RenderTextField, RenderCheckbox, Field } from '@regardsoss/form-utils'
import { DataManagementShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import get from 'lodash/get'
import forEach from 'lodash/forEach'
import TextField from 'material-ui/TextField'
import map from 'lodash/map'
import IconButton from 'material-ui/IconButton'
import Delete from 'mdi-material-ui/Delete'
import Add from 'mdi-material-ui/PlusCircleOutline'
import FlatButton from 'material-ui/FlatButton'

/**
 * Handle enumeration restriction
 * Deprecated: Use FormUtils.EnumInputs instead
 */
export class EnumerationComponent extends React.Component {
  static propTypes = {
    currentAttrModel: DataManagementShapes.AttributeModel,
    // redux form
    change: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  state = {
    acceptableValues: map(get(this.props.currentAttrModel, 'content.restriction.acceptableValues', []), (value) => ({
      value,
      deleted: false,
    })),
    newValue: '',
  }

  onTextFieldChange = (event) => {
    this.props.change('restriction.ENUMERATION.active', true)
    this.setState({
      newValue: event.target.value,
    })
  }

  handleCreate = () => {
    const { acceptableValues, newValue } = this.state
    acceptableValues.push({ value: newValue, deleted: false })
    this.setState({
      acceptableValues,
      newValue: '',
    })
    const idForm = acceptableValues.length - 1
    this.props.change(`restriction.ENUMERATION.inputs.input${idForm}`, newValue)
  }

  handleDelete = (id) => {
    const { acceptableValues } = this.state
    acceptableValues[id].deleted = true
    acceptableValues[id].value = ''
    this.setState({
      acceptableValues,
    })
    this.props.change(`restriction.ENUMERATION.inputs.input${id}`, '')
  }

  render() {
    const { acceptableValues, newValue } = this.state
    const styleBtn = {
      display: 'flex',
      alignItems: 'flex-end',
    }
    return (
      <div>
        <Field
          name="restriction.ENUMERATION.active"
          component={RenderCheckbox}
          label={this.context.intl.formatMessage({ id: 'attrmodel.form.restriction.ENUMERATION.active' })}
          alwaysShowError
        />
        {map(acceptableValues, (restriction, id) => {
          if (!restriction.deleted) {
            return (
              <div
                className="row"
                style={styleBtn}
                key={id}
              >
                <Field
                  name={`restriction.ENUMERATION.inputs.input${id}`}
                  component={RenderTextField}
                  type="text"
                  fullWidth
                  label={this.context.intl.formatMessage({ id: 'attrmodel.form.restriction.ENUMERATION.value' })}
                />
                <IconButton onClick={() => this.handleDelete(id)}>
                  <Delete />
                </IconButton>
              </div>
            )
          }
          return null
        })}
        <hr />
        <div><FormattedMessage id="attrmodel.form.restriction.ENUMERATION.add" /></div>
        <div className="row" style={styleBtn}>
          <TextField
            name="restriction.ENUMERATION.addinput"
            type="text"
            fullWidth
            value={newValue}
            onChange={this.onTextFieldChange}
            label={this.context.intl.formatMessage({ id: 'attrmodel.form.restriction.ENUMERATION.addinput' })}
          />

          <FlatButton
            onClick={this.handleCreate}
            secondary
            icon={<Add />}
          />
        </div>
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
export function initializeEnumerationForm(initialValues, currentAttrModel) {
  const formValues = initialValues
  formValues.restriction.ENUMERATION = {}
  formValues.restriction.ENUMERATION.active = true
  formValues.restriction.ENUMERATION.inputs = {}
  forEach(currentAttrModel.content.restriction.acceptableValues, (value, key) => {
    formValues.restriction.ENUMERATION.inputs[`input${key}`] = value
  })
  return formValues
}

export default EnumerationComponent
