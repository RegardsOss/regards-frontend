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
import Dialog from 'material-ui/Dialog'
import FlatButton from 'material-ui/FlatButton'
import { RenderTextField, Field, ValidationHelpers, reduxForm } from '@regardsoss/form-utils'
import { CommonShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import moduleStyles from '../../styles/styles'

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
    pluginParameterType: CommonShapes.PluginParameterType,
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

  getFieldType = (pluginParameterType) => {
    switch (pluginParameterType.type) {
      case 'java.lang.Byte':
      case 'java.lang.Integer':
      case 'java.lang.Long':
      case 'java.lang.Float':
      case 'java.lang.Double':
      case 'java.lang.Short':
        return 'number'
      default:
        return 'text'
    }
  }

  /**
   * Returns React component
   *
   * @returns {XML}
   */
  render() {
    const {
      open, onRequestClose, submitting, invalid, handleSubmit, pluginParameterType,
    } = this.props
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
            type={this.getFieldType(pluginParameterType)}
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

