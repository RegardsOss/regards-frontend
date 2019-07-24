/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import TextField from 'material-ui/TextField'
import map from 'lodash/map'
import fill from 'lodash/fill'
import { i18nContextType } from '@regardsoss/i18n'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import Add from 'material-ui/svg-icons/content/add-circle-outline'
import FlatButton from 'material-ui/FlatButton'
import Field from '../Field'
import RenderTextField from '../render/RenderTextField'

/**
 * Handle enumeration restriction
 */
export class EnumInputsComponent extends React.Component {
  static propTypes = {
    nbIntialFields: PropTypes.number,
    inputName: PropTypes.string.isRequired,
    // redux form
    change: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static addIcon = (<Add />)

  constructor(props) {
    super(props)
    // Create a form input for each value
    const enumValues = fill(Array(props.nbIntialFields), { deleted: false }, 0, props.nbIntialFields)
    this.state = {
      enumValues,
      newValue: '',
    }
  }

  onTextFieldChange = (event) => {
    this.setState({
      newValue: event.target.value,
    })
  }

  handleCreate = () => {
    const { inputName, change } = this.props
    const { enumValues, newValue } = this.state
    enumValues.push({ deleted: false })
    this.setState({
      enumValues,
      newValue: '',
    })
    const idForm = enumValues.length - 1
    change(`enumform.${inputName}.inputs.input${idForm}`, newValue)
  }


  handleDelete = (id) => {
    const { inputName, change } = this.props
    const { enumValues } = this.state
    enumValues[id].deleted = true
    this.setState({
      enumValues,
    })
    change(`enumform.${inputName}.inputs.input${id}`, '')
  }


  render() {
    const { enumValues, newValue } = this.state
    const { inputName } = this.props
    const styleBtn = {
      display: 'flex',
      alignItems: 'flex-end',
    }
    return (
      <div>
        {(() => {
          const fields = map(enumValues, (enumValue, id) => {
            if (!enumValue.deleted) {
              return (
                <div
                  className="row"
                  style={styleBtn}
                  key={id}
                >
                  <Field
                    name={`enumform.${inputName}.inputs.input${id}`}
                    component={RenderTextField}
                    type="text"
                    label={this.context.intl.formatMessage({ id: 'form-utils.enumform.valueinput' })}
                  />
                  <IconButton onClick={() => this.handleDelete(id)}>
                    <Delete />
                  </IconButton>
                </div>
              )
            }
            return null
          })
          if (fields.length === 0) {
            return (<i><FormattedMessage id="form-utils.enumform.novalue" /></i>)
          }
          return (fields)
        })()}
        <hr />
        <div><FormattedMessage id="form-utils.enumform.add" /></div>
        <div className="row" style={styleBtn}>
          <TextField
            name={`enumform.${inputName}.addvalue`}
            type="text"
            value={newValue}
            onChange={this.onTextFieldChange}
            label={this.context.intl.formatMessage({ id: 'form-utils.enumform.addinput' })}
          />

          <FlatButton
            onClick={this.handleCreate}
            secondary
            icon={EnumInputsComponent.addIcon}
          />
        </div>
      </div>
    )
  }
}


export default EnumInputsComponent
