/**
 * LICENSE_PLACEHOLDER
 **/
import {map,join,split} from 'lodash'
import {reduxForm} from 'redux-form'
import {FormattedMessage} from 'react-intl'
import MenuItem from 'material-ui/MenuItem'
import { CardActionsComponent } from '@regardsoss/components'
import {ReduxConnectedForm} from '@regardsoss/redux'
import {RenderTextField, RenderSelectField, Field, RenderCheckbox, ErrorTypes} from '@regardsoss/form-utils'
import ContainerShape from '../model/ContainerShape'
import containerTypes from '../default/containerTypes'

/**
 * REact container to edit a container configuration
 */
class ContainerConfigurationComponent extends React.Component {

  static propTypes = {
    container: ContainerShape,
    onCancel: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func,
    // from reduxForm
    submitting: React.PropTypes.bool,
    pristine: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
  }

  componentDidMount() {
    this.handleInitialize()
  }

  handleInitialize = () => {
    console.log("plop",this.props.container)
    this.props.initialize({ ...this.props.container })
  }

  selectContainerType = (event, index, value, input) => {
    input.onChange(value)
  }

  render() {
    const { pristine, submitting } = this.props
    return (
      <ReduxConnectedForm
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
        i18nMessagesDir="utils/layout/src/i18n"
      >
        <div>
          <Field
            name="id"
            fullWidth
            component={RenderTextField}
            type="text"
            disabled={this.props.container !== null}
            label={<FormattedMessage id="container.form.id"/>}
          />
          <Field
            name="type"
            fullWidth
            component={RenderSelectField}
            type="text"
            onSelect={this.selectContainerType}
            label={<FormattedMessage id="container.form.type"/>}
          >
            {map(containerTypes, (type, typeName) => (
              <MenuItem
                value={typeName}
                key={typeName}
                primaryText={typeName}
              />
            ))}
          </Field>
          <Field
            name="classes"
            format={(values, name) => join(values,',')}
            parse={(value, name) => split(value,',')}
            fullWidth
            component={RenderTextField}
            type="text"
            label={<FormattedMessage id="container.form.classes"/>}
          />
          <Field
            name="styles"
            format={(values, name) => JSON.stringify(values)}
            parse={(values, name) => JSON.parse(values)}
            fullWidth
            component={RenderTextField}
            type="text"
            label={<FormattedMessage id="container.form.styles"/>}
          />
          <Field
            name="dynamicContent"
            component={RenderCheckbox}
            label={<FormattedMessage id="container.form.dynamicContent"/>}
          />
          <CardActionsComponent
            mainButtonLabel={<FormattedMessage
              id={this.props.container ? 'container.form.update.button' : 'container.form.submit.button'}
            />}
            mainButtonType="submit"
            isMainButtonDisabled={pristine || submitting}
            secondaryButtonLabel={<FormattedMessage id="container.form.cancel.button"/>}
            secondaryButtonTouchTap={this.props.onCancel}
          />
        </div>
      </ReduxConnectedForm>
    )
  }

}

function validate(values) {
  const errors = {}
  /*if (values.name === '') {
   errors.name = ErrorTypes.REQUIRED
   }
   if (values.description === '') {
   errors.description = ErrorTypes.REQUIRED
   }*/
  return errors
}

const UnconnectedContainerConfigurationComponent = ContainerConfigurationComponent
export {
  ContainerConfigurationComponent,
}

export default reduxForm({
  form: 'edit-layout-container-form',
  validate,
})(ContainerConfigurationComponent)
