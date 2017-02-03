/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { reduxForm } from 'redux-form'
import { CardActionsComponent } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { Field, TextAreaField, ErrorTypes } from '@regardsoss/form-utils'
import { Layout } from '@regardsoss/model'
import { ReduxConnectedForm } from '@regardsoss/redux'

/**
 * React component to display and configure a given layout
 * @author Sébastien binda
 */
class ApplicationLayoutComponent extends React.Component {

  static propTypes = {
    layout: Layout,
    onSubmit: React.PropTypes.func,
    // from reduxForm
    submitting: React.PropTypes.bool,
    pristine: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  componentDidMount() {
    this.handleInitialize()
  }

  handleInitialize = () => {
    try {
      this.props.initialize({
        layout: JSON.stringify(this.props.layout, null, 4),
      })
    } catch (e) {
      console.error('Invalid JSON format', e)
      this.props.initialize({
        layout: this.props.layout,
      })
    }
  }

  render() {
    const { pristine, submitting } = this.props
    return (
      <ReduxConnectedForm
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
        i18nMessagesDir="modules/admin-ui-configuration/src/i18n"
      >
        <Card>
          <CardTitle
            title={<FormattedMessage id="layout.title" />}
            subtitle={<FormattedMessage id="layout.subtitle" />}
          />
          <CardText style={{ width: '100%' }} >
            <Field
              name="layout"
              component={TextAreaField}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={<FormattedMessage id="layout.submit" />}
              mainButtonType="submit"
              isMainButtonDisabled={pristine || submitting}
            />
          </CardActions>
        </Card>
      </ReduxConnectedForm>
    )
  }
}

function validate(values) {
  const errors = {}
  if (values.layout) {
    try {
      JSON.parse(values.layout)
    } catch (e) {
      errors.layout = ErrorTypes.INVLID_JSON_FORMAT
    }
  }
  return errors
}

export default reduxForm({
  form: 'app-layout-form',
  validate,
})(ApplicationLayoutComponent)
