import { FormattedMessage } from 'react-intl'
import TextField from 'material-ui/TextField'
import { map, fill } from 'lodash'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import Add from 'material-ui/svg-icons/content/add-circle-outline'
import FlatButton from 'material-ui/FlatButton'
import Field from '../Field'
import RenderTextField from '../RenderTextField'

/**
 * Handle enumeration restriction
 */
export class EnumInputsComponent extends React.Component {

  static propTypes = {
    nbIntialFields: React.PropTypes.number,
    inputName: React.PropTypes.string.isRequired,
    // redux form
    change: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    // Create a form input for each value
    const enumValues = fill(Array(props.nbIntialFields), {deleted: false}, 0, props.nbIntialFields)
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
                    label={<FormattedMessage id="form-utils.enumform.valueinput" />}
                  />
                  <IconButton onTouchTap={() => this.handleDelete(id)}>
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
            label={<FormattedMessage id="form-utils.enumform.addinput" />}
          />

          <FlatButton
            onTouchTap={this.handleCreate}
            secondary
            icon={<Add />}
          />
        </div>
      </div>
    )
  }
}


export default EnumInputsComponent
