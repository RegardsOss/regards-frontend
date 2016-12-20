import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { RenderTextField, RenderCheckbox, RenderSelectField, Field } from '@regardsoss/form-utils'
import { reduxForm } from 'redux-form'
import { AttributeModel } from '@regardsoss/model'
import { map } from 'lodash'
import IconButton from 'material-ui/IconButton'
import Delete from 'material-ui/svg-icons/action/delete'
import Add from 'material-ui/svg-icons/content/add-circle-outline'
import FlatButton from 'material-ui/FlatButton'

/**
 * Display edit and create attribute model form
 */
export class EnumerationComponent extends React.Component {

  static propTypes = {
    currentAttrModel: AttributeModel,
  }

  constructor(props) {
    super(props)
    const acceptableValues = (props.currentAttrModel && props.currentAttrModel.content && props.currentAttrModel.content.restriction && props.currentAttrModel.content.restriction.acceptableValues) || []
    this.state = {
      acceptableValues,
    }
  }

  handleCreate = () => {

  }
  handleDelete = (id) => {
    console.log('DELETE', id)
  }

  render() {
    const { acceptableValues } = this.state
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

        {map(acceptableValues, (restriction, id) => (
          <div className="row" style={styleBtn}>
            <Field
              key={id}
              name={`restriction.ENUMERATION.input.${id}`}
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="attrmodel.form.restriction.ENUMERATION.value" />}
            />
            <IconButton onTouchTap={() => this.handleDelete(project.content.name)}>
              <Delete />
            </IconButton>
          </div>
        ))}

        <div className="row" style={styleBtn}>
          <Field
            name="restriction.ENUMERATION.addinput"
            component={RenderTextField}
            type="text"
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

export function initializeEnumerationForm(initialValues, currentAttrModel) {
  initialValues.restriction.ENUMERATION = {}
  initialValues.restriction.ENUMERATION.active = true
  if (currentAttrModel.content.restriction.minInclusive) {
    initialValues.restriction.ENUMERATION.min = currentAttrModel.content.restriction.minInclusive
    initialValues.restriction.ENUMERATION.isMinInclusive = true
  } else if (currentAttrModel.content.restriction.minExclusive) {
    initialValues.restriction.ENUMERATION.min = currentAttrModel.content.restriction.minExclusive
    initialValues.restriction.ENUMERATION.isMinInclusive = false
  }
  if (currentAttrModel.content.restriction.maxInclusive) {
    initialValues.restriction.ENUMERATION.max = currentAttrModel.content.restriction.maxInclusive
    initialValues.restriction.ENUMERATION.isMaxInclusive = true
  } else if (currentAttrModel.content.restriction.maxExclusive) {
    initialValues.restriction.ENUMERATION.max = currentAttrModel.content.restriction.maxExclusive
    initialValues.restriction.ENUMERATION.isMaxInclusive = false
  }
  return initialValues
}

export default EnumerationComponent

