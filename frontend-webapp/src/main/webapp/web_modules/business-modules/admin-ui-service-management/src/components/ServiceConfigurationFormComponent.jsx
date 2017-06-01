/**
 * LICENSE_PLACEHOLDER
 **/
import map from 'lodash/map'
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { reduxForm } from 'redux-form'
import { Plugin as UIPlugin, PluginConf as UIPluginConfiguration } from '@regardsoss/model'
import { RenderTextField, RenderCheckbox, Field, ValidationHelpers } from '@regardsoss/form-utils'
import { CardActionsComponent } from '@regardsoss/components'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'

/**
 * React component to list connections.
 *
 * @author Léo Mieulet
 */
export class ServiceConfigurationFormComponent extends React.Component {

  static propTypes = {
    uiPluginConfiguration: PropTypes.shape({
      content: UIPluginConfiguration,
    }),
    plugin: UIPlugin,
    isCreating: PropTypes.bool.isRequired,
    isDuplicating: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    initialize: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  componentDidMount() {
    this.handleInitialize()
  }

  getStaticFieldValidation = (input) => {
    if (input.required) {
      return [ValidationHelpers.validRequiredString]
    }
    return []
  }

  getTitle = () => {
    let title
    if (this.props.isCreating) {
      title = this.context.intl.formatMessage({ id: 'service.form.create.title' })
    } else if (this.props.isDuplicating) {
      title = this.context.intl.formatMessage({ id: 'service.form.duplicate.title' }, { name: this.props.uiPluginConfiguration.content.conf.label })
    } else {
      title = this.context.intl.formatMessage({ id: 'service.form.edit.title' }, { name: this.props.uiPluginConfiguration.content.conf.label })
    }
    return title
  }

  /**
   * Initialize form fields
   */
  handleInitialize = () => {
    let initialValues = {}
    if (!this.props.isCreating) {
      const { uiPluginConfiguration } = this.props
      initialValues = {
        isDefault: uiPluginConfiguration.content.default,
        isActive: uiPluginConfiguration.content.active,
        label: uiPluginConfiguration.content.conf.label,
        dynamic: uiPluginConfiguration.content.conf.dynamic,
        static: uiPluginConfiguration.content.conf.static,
      }
    } else {
      initialValues = {
        isActive: true,
        isDefault: false,
      }
    }
    this.props.initialize(initialValues)
  }


  render() {
    const { plugin, submitting, invalid, backUrl } = this.props
    const title = this.getTitle()
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          <CardTitle
            title={title}
            subtitle={this.context.intl.formatMessage({ id: 'service.form.subtitle' })}
          />
          <CardText>
            <Field
              name="label"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'service.form.label' })}
              validate={[ValidationHelpers.validRequiredString]}
            />
            {map(plugin.info.conf.static, (input, id) => (
              <Field
                key={id}
                name={`static.${id}`}
                fullWidth
                component={RenderTextField}
                type="text"
                label={<FormattedMessage
                  id="service.form.staticField"
                  values={{
                    name: id,
                  }}
                />}
                validate={this.getStaticFieldValidation(input)}
              />
            ))}
            {map(plugin.info.conf.dynamic, (input, id) => (
              <Field
                key={id}
                name={`dynamic.${id}`}
                fullWidth
                component={RenderTextField}
                type="text"
                label={this.context.intl.formatMessage({ id: 'service.form.dynamicField' }, { name: id })}
              />
            ))}
            <br />
            <br />
            <Field
              name="isActive"
              fullWidth
              component={RenderCheckbox}
              label={this.context.intl.formatMessage({ id: 'service.form.isActive' })}
            />
            <Field
              name="isDefault"
              fullWidth
              component={RenderCheckbox}
              label={this.context.intl.formatMessage({ id: 'service.form.isDefault' })}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.context.intl.formatMessage({ id: 'service.form.action.save' })}
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'service.form.action.back' })}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}


export default reduxForm({
  form: 'service-form',
})(ServiceConfigurationFormComponent)

