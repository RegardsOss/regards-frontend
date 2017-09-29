/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import trim from 'lodash/trim'
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { RenderTextField, Field, ValidationHelpers, reduxForm } from '@regardsoss/form-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType, defaultCustomConfiguration } from '@regardsoss/theme'
import moduleStyles from '../styles/styles'

const nameValidator = [ValidationHelpers.required, ValidationHelpers.string]

/**
 * Display edit and create fragment form
 *
 * @author Xavier-Alexandre Brochard
 */
export class ThemeCreateComponent extends React.Component {

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
          label={intl.formatMessage({ id: 'application.theme.create.form.cancel' })}
          primary
          onTouchTap={onRequestClose}
        />
        <FlatButton
          type="submit"
          disabled={submitting || invalid}
          label={intl.formatMessage({ id: 'application.theme.create.form.submit' })}
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
            validate={nameValidator}
            label={intl.formatMessage({ id: 'application.theme.create.form.name' })}
            normalize={trim}
          />
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
    configuration: defaultCustomConfiguration,
  },
})(ThemeCreateComponent)

