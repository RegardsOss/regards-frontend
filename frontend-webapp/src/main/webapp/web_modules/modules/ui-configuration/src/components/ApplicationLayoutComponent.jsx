/**
 * LICENSE_PLACEHOLDER
 **/
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { FormattedMessage } from 'react-intl'
import { reduxForm } from 'redux-form'
import { CardActionsComponent } from '@regardsoss/components'
import { i18nContextType } from '@regardsoss/i18n'
import { Field, TextAreaField, ErrorTypes } from '@regardsoss/form-utils'
import { LayoutShape } from '@regardsoss/layout'

/**
 * React component to display and configure a given layout
 */
class ApplicationLayoutComponent extends React.Component {

  static propTypes = {
    layout: LayoutShape,
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
      <form onSubmit={this.props.handleSubmit(this.props.onSubmit)}>
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
      </form>
    )
  }
}

function validate(values) {
  const errors = {}
  if (values.layout) {
    console.log(values, errors)
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
