import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { RenderTextField, Field, ValidationHelpers, ErrorTypes } from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import { reduxForm } from 'redux-form'
import { PluginMetaData, PluginConfiguration } from '@regardsoss/model'

/**
 * Display edit and create fragment form
 */
export class PluginConfigurationFormCoponent extends React.Component {

  static propTypes = {
    pluginConfiguration: PluginConfiguration,
    pluginMetaData: PluginMetaData, // optional for additionnal information on form initialization
    onSubmit: React.PropTypes.func.isRequired,
    backUrl: React.PropTypes.string.isRequired,
    // from reduxForm
    submitting: React.PropTypes.bool,
    pristine: React.PropTypes.bool,
    invalid: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
  }

  constructor(props) {
    super(props)
    this.validateProps(props)
    this.state = {
      isCreating: props.pluginConfiguration === undefined,
    }
  }

  validateProps = (props) => {
    const { pluginConfiguration, pluginMetaData } = props

    if(pluginConfiguration && pluginMetaData) {
      if(pluginConfiguration.pluginId)
    }
  }

  componentDidMount() {
    this.handleInitialize()
  }

  /**
   * Initialize form fields
   */
  handleInitialize = () => {
    if (!this.state.isCreating) {
      const { pluginConfiguration } = this.props
      const initialValues = { // TODO: populate initial values
        pluginClassName: pluginConfiguration.content.description,
      }
      this.props.initialize(initialValues)
    }
  }

  /**
   * return react component
   * @returns {XML}
   */
  render() {
    const { pristine, submitting, invalid } = this.props
    const title = this.state.isCreating ? <FormattedMessage id="fragment.create.title"/> :
      (<FormattedMessage
        id="fragment.edit.title"
        values={{
          name: this.props.pluginConfiguration.content.name,
        }}
      />)
    return (
      <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
        <Card>
          <CardTitle
            title={title}
          />
          <CardText>
            <ShowableAtRender show={this.state.isCreating}>
              <Field
                name="name"
                fullWidth
                component={RenderTextField}
                type="text"
                label={<FormattedMessage id="fragment.form.name"/>}
              />
            </ShowableAtRender>
            <Field
              name="description"
              fullWidth
              component={RenderTextField}
              type="text"
              label={<FormattedMessage id="fragment.form.description"/>}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={<FormattedMessage id="fragment.form.action.submit"/>}
              mainButtonType="submit"
              isMainButtonDisabled={pristine || submitting || invalid}
              secondaryButtonLabel={<FormattedMessage id="fragment.form.action.cancel"/>}
              secondaryButtonUrl={this.props.backUrl}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}

/**
 * Form validation
 * @param values
 * @returns {{}} i18n keys
 */
function validate(values) { // TODO: validation
  const errors = {}
  if (values.name) {
    if (!ValidationHelpers.isValidAlphaNumericUnderscore(values.name)) {
      errors.name = ErrorTypes.ALPHA_NUMERIC
    }
    if (values.name.length < 3) {
      errors.name = 'invalid.min_3_carac'
    }
    if (values.name.length > 32) {
      errors.name = 'invalid.max_32_carac'
    }
  }
  return errors
}

export default reduxForm({
  form: 'plugin-configuration-form',
  validate,
})(PluginConfigurationFormCoponent)

