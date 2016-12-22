import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { RenderTextField, RenderCheckbox, RenderSelectField, Field } from '@regardsoss/form-utils'
import { reduxForm } from 'redux-form'
import { AttributeModel } from '@regardsoss/model'
import TextField from 'material-ui/TextField'
import { map, remove } from 'lodash'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import Add from 'material-ui/svg-icons/content/add-circle-outline'
import FlatButton from 'material-ui/FlatButton'

/**
 * Handle enumeration restriction
 */
export class EnumerationComponent extends React.Component {

  static propTypes = {
    currentAttrModel: AttributeModel,
    // redux form
    change: React.PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props)
    const currentValues = (props.currentAttrModel && props.currentAttrModel.content && props.currentAttrModel.content.restriction && props.currentAttrModel.content.restriction.acceptableValues) || []
    const acceptableValues = []
    currentValues.forEach((value) => {
      acceptableValues.push({
        value,
        deleted: false,
      })
    })
    this.state = {
      acceptableValues,
      newValue: '',
    }
  }

  handleCreate = () => {
    let { acceptableValues, newValue } = this.state
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

  onTextFieldChange = (event) => {
    this.setState({
      newValue: event.target.value,
    })
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
          label={<FormattedMessage id="attrmodel.form.restriction.ENUMERATION.active" />}
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
                  label={<FormattedMessage id="attrmodel.form.restriction.ENUMERATION.value" />}
                />
                <IconButton onTouchTap={() => this.handleDelete(id)}>
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
            value={newValue}
            onChange={this.onTextFieldChange}
            label={<FormattedMessage id="attrmodel.form.restriction.ENUMERATION.addinput" />}
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

/**
 *
 * @param initialValues values provided to the form
 * @param currentAttrModel object received from the API
 * @returns {*} object sent to redux-form to correctly initialize form inputs
 */
export function initializeEnumerationForm(initialValues, currentAttrModel) {
  initialValues.restriction.ENUMERATION = {}
  initialValues.restriction.ENUMERATION.active = true
  initialValues.restriction.ENUMERATION.inputs = {}
  map(currentAttrModel.content.restriction.acceptableValues, (value, key) => {
    initialValues.restriction.ENUMERATION.inputs[`input${key}`] = value
  })
  console.log('initialValues', initialValues)
  return initialValues
}

export default EnumerationComponent

