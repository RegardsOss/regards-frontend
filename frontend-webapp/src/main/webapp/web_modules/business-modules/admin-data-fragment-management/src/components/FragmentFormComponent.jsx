/*
 * LICENSE_PLACEHOLDER
 */
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import { FormattedMessage } from 'react-intl'
import { RenderTextField, RenderFileField, Field, ValidationHelpers, ErrorTypes, reduxForm } from '@regardsoss/form-utils'
import { themeContextType } from '@regardsoss/theme'
import { Fragment } from '@regardsoss/model'
import { i18nContextType } from '@regardsoss/i18n'


/**
 * Form component to edit and create fragment
 *
 * @author Léo Mieulet
 */
export class FragmentFormComponent extends React.Component {

  static propTypes = {
    currentFragment: Fragment,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    isCreating: PropTypes.bool.isRequired,
    // from reduxForm
    submitting: PropTypes.bool,
    pristine: PropTypes.bool,
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

  /**
   * Initialize form fields
   */
  handleInitialize = () => {
    if (!this.props.isCreating) {
      const { currentFragment } = this.props
      const initialValues = {
        description: currentFragment.content.description,
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
    const title = this.props.isCreating ? <FormattedMessage id="fragment.create.title" /> :
      (<FormattedMessage
        id="fragment.edit.title"
        values={{
          name: this.props.currentFragment.content.name,
        }}
      />)
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          <CardTitle
            title={title}
          />
          <CardText>
            <ShowableAtRender show={this.props.isCreating}>
              <Field
                name="name"
                fullWidth
                component={RenderTextField}
                type="text"
                label={this.context.intl.formatMessage({ id: 'fragment.form.name' })}
              />
            </ShowableAtRender>
            <Field
              name="description"
              fullWidth
              component={RenderTextField}
              type="text"
              label={this.context.intl.formatMessage({ id: 'fragment.form.description' })}
            />
            <ShowableAtRender show={this.props.isCreating}>
              <div>
                <hr />
                <br />
                <FormattedMessage id="fragment.form.file" />
                <Field
                  name="file"
                  fullWidth
                  component={RenderFileField}
                  accept=".xml"
                />
              </div>
            </ShowableAtRender>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.context.intl.formatMessage({ id: 'fragment.form.action.submit' })}
              mainButtonType="submit"
              isMainButtonDisabled={pristine || submitting || invalid}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'fragment.form.action.cancel' })}
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
function validate(values) {
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
  form: 'fragment-form',
  validate,
})(FragmentFormComponent)

