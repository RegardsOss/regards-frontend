/**
 * LICENSE_PLACEHOLDER
 **/
import { reduxForm } from 'redux-form'

/**
 * Redefine the {@link reduxForm} decorator by forcing the configuration option {@code pure} to {@code false}.
 *
 * Why?
 *
 * By default, it is set to true.
 * When the option {@code pure} is {@code true}, the generated component (called {@link Form}) ONLY re-renders when some
 * props (or its state) change, but not all props; certainly for otpimization purposes.
 *
 * Because of this, the {@link Form} and its children refuse to update on theme or language change when using HOCs like
 * {@link MuiThemeProvider} or {@link IntlProvider}.
 * Using {@code pure : false} solves this issue.
 *
 * @author Xavier-Alexandre Brochard
 */
const impureReduxForm = config => reduxForm(Object.assign({}, config, { pure: false }))
export default impureReduxForm
