/**
 * LICENSE_PLACEHOLDER
 **/
import { FormattedMessage } from 'react-intl'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { RenderTextField, Field, ValidationHelpers, reduxForm } from '@regardsoss/form-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import moduleStyles from '../../styles/styles'

const { validRequiredString } = ValidationHelpers

/**
 * Display edit and create fragment form
 *
 * @author Xavier-Alexandre Brochard
 */
export class ThemeCreateComponent extends React.Component {

  static propTypes = {
    open: React.PropTypes.bool,
    onRequestClose: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    // from reduxForm
    submitting: React.PropTypes.bool,
    invalid: React.PropTypes.bool,
    handleSubmit: React.PropTypes.func.isRequired,
    reset: React.PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  onSubmit = (values) => {
    const { onSubmit, onRequestClose, reset } = this.props
    Promise.resolve(onSubmit(values)).then((actionResult) => {
      if (!actionResult.error) {
        onRequestClose()
        reset()
      }
    })
  }

  /**
   * Returns React component
   *
   * @returns {XML}
   */
  render() {
    const { open, onSubmit, onRequestClose, submitting, invalid, handleSubmit } = this.props
    const { muiTheme, intl } = this.context
    const styles = moduleStyles(muiTheme).theme

    const actions = (
      <div style={styles.form.actionsWrapper}>
        <FlatButton
          label={<FormattedMessage id="application.theme.create.form.cancel" />}
          primary
          onTouchTap={onRequestClose}
        />
        <FlatButton
          type="submit"
          disabled={submitting || invalid}
          label={<FormattedMessage id="application.theme.create.form.submit" />}
          primary
          keyboardFocused
        />
      </div>
    )

    return (
      <Dialog
        title={intl.formatMessage({ id: 'application.theme.create.form.title' })}
        modal={false}
        open={open}
        onRequestClose={onRequestClose}
      >
        <form onSubmit={handleSubmit(values => Promise.resolve(onSubmit(values)).then(onRequestClose))}>
          <Field
            name="name"
            component={RenderTextField}
            type="text"
            validate={validRequiredString}
            label={<FormattedMessage id="application.theme.create.form.name" />}
          />
          {/* <Field*/}
          {/* name="active"*/}
          {/* component={Toggle}*/}
          {/* type="boolean"*/}
          {/* style={styles.form.toggle}*/}
          {/* label={<FormattedMessage id="application.theme.create.form.active"/>}*/}
          {/* />*/}
          {actions}
        </form>
      </Dialog>
    )
  }
}

export default reduxForm({
  form: 'theme-create',
  initialValues: {
    name: '',
    active: false,
    configuration: {},
  },
})(ThemeCreateComponent)

