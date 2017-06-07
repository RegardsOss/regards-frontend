/**
 * LICENSE_PLACEHOLDER
 **/
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { RenderTextField, Field, ValidationHelpers, reduxForm } from '@regardsoss/form-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import moduleStyles from '../../../styles/styles'

const { validRequiredString } = ValidationHelpers

/**
 * Modal asking the user to enter a value in order to create a new dynamic value for a plugin parameter
 *
 * @author Xavier-Alexandre Brochard
 */
export class DynamicValueCreateComponent extends React.Component {

  static propTypes = {
    open: PropTypes.bool,
    onRequestClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  onSubmit = (values) => {
    const { onSubmit, onRequestClose, reset } = this.props
    Promise.resolve(onSubmit(values)).then(() => {
      onRequestClose()
      reset()
    })
  }

  /**
   * Returns React component
   *
   * @returns {XML}
   */
  render() {
    const { open, onRequestClose, submitting, invalid, handleSubmit } = this.props
    const { muiTheme, intl } = this.context
    const styles = moduleStyles(muiTheme)

    const actions = (
      <div style={styles.dynamicValue.createdialogbuttons}>
        <FlatButton
          label={intl.formatMessage({ id: 'microservice-management.plugin.parameter.dynamicvalue.dialog.cancel' })}
          primary
          onTouchTap={onRequestClose}
        />
        <FlatButton
          type="submit"
          disabled={submitting || invalid}
          label={intl.formatMessage({ id: 'microservice-management.plugin.parameter.dynamicvalue.dialog.submit' })}
          primary
          keyboardFocused
        />
      </div>
    )

    return (
      <Dialog
        title={intl.formatMessage({ id: 'microservice-management.plugin.parameter.dynamicvalue.dialog.title' })}
        open={open}
        modal={false}
        onRequestClose={onRequestClose}
      >
        <form onSubmit={handleSubmit(values => this.onSubmit(values))}>
          <Field
            name="value"
            component={RenderTextField}
            type="text"
            validate={validRequiredString}
            label={intl.formatMessage({ id: 'microservice-management.plugin.parameter.dynamicvalue.dialog.placeholder' })}
          />
          {actions}
        </form>
      </Dialog>
    )
  }
}

export default reduxForm({
  form: 'dynamic-value-create',
  destroyOnUnmount: true,
  initialValues: {
    value: '',
  },
})(DynamicValueCreateComponent)

