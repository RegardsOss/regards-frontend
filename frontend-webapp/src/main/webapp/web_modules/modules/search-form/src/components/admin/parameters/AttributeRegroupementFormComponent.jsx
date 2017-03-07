/**
 * LICENSE_PLACEHOLDER
 **/
import { FormattedMessage } from 'react-intl'
import { Card, CardActions, CardTitle, CardText } from 'material-ui/Card'
import { reduxForm, RenderTextField, Field } from '@regardsoss/form-utils'
import { CardActionsComponent } from '@regardsoss/components'
import { AttributeModel } from '@regardsoss/model'
import AttributesRegroupementConfiguration from '../../../models/attributes/AttributesRegroupementConfiguration'

/**
 * Component to display an attributes regroupement form.
 * @author Sébastien binda
 */
class AttributeRegroupementFormComponent extends React.Component {

  static propTypes = {
    onClose: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    attributesRegrp: AttributesRegroupementConfiguration,
    // Available Attributes for configuration
    selectableAttributes: React.PropTypes.objectOf(AttributeModel).isRequired,
    // from reduxForm
    submitting: React.PropTypes.bool,
    pristine: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    initialize: React.PropTypes.func.isRequired,
    error: React.PropTypes.string,
  }

  render() {
    const { pristine, submitting, error } = this.props
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          <CardTitle
            title={<FormattedMessage
              id="form.attributes.regroupement.form.title"
            />}
          />
          <CardText>
            {error && <strong>{error}</strong>}
            <Field
              name="label"
              fullWidth
              component={RenderTextField}
              type="text"
              disabled={this.props.attributesRegrp !== null}
              label={<FormattedMessage id="form.attributes.regroupement.form.label" />}
            />
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={<FormattedMessage id="form.attributes.regroupement.form.save" />}
              mainButtonType="submit"
              isMainButtonDisabled={pristine || submitting}
              secondaryButtonLabel={<FormattedMessage id="form.attributes.regroupement.form.cancel" />}
              secondaryButtonTouchTap={this.props.onClose}
            />
          </CardActions>
        </Card>
      </form>
    )
  }

}

function validate(values) {
  const errors = {}
  if (values && values.label && values.label.length === 0) {
    errors.label = 'Label is required'
  }
  return errors
}

export default reduxForm({
  form: 'search-form-attr-grp-form',
  validate,
})(AttributeRegroupementFormComponent)
