/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import join from 'lodash/join'
import split from 'lodash/split'
import { FormattedMessage } from 'react-intl'
import MenuItem from 'material-ui/MenuItem'
import { CardActionsComponent } from '@regardsoss/components'
import { RenderTextField, RenderSelectField, Field, RenderCheckbox, reduxForm, ValidationHelpers } from '@regardsoss/form-utils'
import { I18nProvider } from '@regardsoss/i18n'
import ContainerShape from '../model/ContainerShape'
import containerTypes from '../default/containerTypes'

/**
 * REact container to edit a container configuration
 */
class ContainerConfigurationComponent extends React.Component {

  static propTypes = {
    container: ContainerShape,
    onCancel: PropTypes.func.isRequired,
    onSubmit: PropTypes.func,
    // from reduxForm
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
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

  errors.id = ValidationHelpers.validRequiredString(values.id)
  if (!errors.id) {
    errors.id = ValidationHelpers.validAlphaNumericUnderscore(values.id)
  }
  errors.type = ValidationHelpers.validRequiredString(values.type)

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
