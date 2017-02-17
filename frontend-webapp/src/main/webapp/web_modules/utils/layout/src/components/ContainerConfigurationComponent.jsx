/**
 * LICENSE_PLACEHOLDER
 **/
import { map, join, split } from 'lodash'
import { FormattedMessage } from 'react-intl'
import MenuItem from 'material-ui/MenuItem'
import { CardActionsComponent } from '@regardsoss/components'
import { RenderTextField, RenderSelectField, Field, RenderCheckbox, reduxForm } from '@regardsoss/form-utils'
import { I18nProvider } from '@regardsoss/i18n'
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
    this.props.initialize({ ...this.props.container })
  }

  selectContainerType = (event, index, value, input) => {
    input.onChange(value)
  }

  render() {
    const { pristine, submitting } = this.props
    return (
      <I18nProvider messageDir="utils/layout/src/i18n">
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <div>
          <Field
            name="id"
            fullWidth
            component={RenderTextField}
            type="text"
            disabled={this.props.container !== null}
            label={<FormattedMessage id="container.form.id" />}
          />
          <Field
            name="type"
            fullWidth
            component={RenderSelectField}
            type="text"
            onSelect={this.selectContainerType}
            label={<FormattedMessage id="container.form.type" />}
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
            format={(values, name) => join(values, ',')}
            parse={(value, name) => split(value, ',')}
            fullWidth
            component={RenderTextField}
            type="text"
            label={<FormattedMessage id="container.form.classes" />}
          />
          <Field
            name="styles"
            format={(values, name) => JSON.stringify(values)}
            parse={(values, name) => JSON.parse(values)}
            fullWidth
            component={RenderTextField}
            type="text"
            label={<FormattedMessage id="container.form.styles" />}
          />
          <Field
            name="dynamicContent"
            component={RenderCheckbox}
            label={<FormattedMessage id="container.form.dynamicContent" />}
          />
          <CardActionsComponent
            mainButtonLabel={<FormattedMessage
              id={this.props.container ? 'container.form.update.button' : 'container.form.submit.button'}
            />}
            mainButtonType="submit"
            isMainButtonDisabled={pristine || submitting}
            secondaryButtonLabel={<FormattedMessage id="container.form.cancel.button" />}
            secondaryButtonTouchTap={this.props.onCancel}
          />
        </div>
      </form>
      </I18nProvider>
    )
  }

}

function validate(values) {
  const errors = {}
  /* if (values.name === '') {
   errors.name = ErrorTypes.REQUIRED
   }
   if (values.description === '') {
   errors.description = ErrorTypes.REQUIRED
   }*/
  return errors
}

const UnconnectedContainerConfigurationComponent = ContainerConfigurationComponent
export {
  UnconnectedContainerConfigurationComponent,
}

export default reduxForm({
  form: 'edit-layout-container-form',
  validate,
})(ContainerConfigurationComponent)
