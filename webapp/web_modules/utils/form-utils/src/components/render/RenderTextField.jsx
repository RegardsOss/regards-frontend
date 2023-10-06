/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import TextField from 'material-ui/TextField'
import RenderHelper from './RenderHelper'
import styles from '../../styles'

class renderTextField extends React.Component {
  static propTypes = {
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
    // Define label when you want a default value for hintText AND floatingLabelText
    // But label will be overridden if you specify hintText or floatingLabelText
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
    // fullWidth: PropTypes.bool,
    type: PropTypes.string,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func,
    }),
    // Define one of the following when you want to override the label behaviour
    hintText: PropTypes.string,
    floatingLabelText: PropTypes.string,
  }

  static contextTypes = {
    ...themeContextType,
  }

  render() {
    const {
      input, label, hintText, floatingLabelText, type, meta: { touched, error }, intl, ...rest
    } = this.props
    const { moduleTheme: { textField: { floatingStyle } } } = this.context
    const errorMessage = RenderHelper.getErrorMessage(touched, error, intl)
    const labelTextFloating = floatingLabelText || label
    return (
      <TextField
        hintText={hintText || label}
        title={labelTextFloating}
        floatingLabelText={labelTextFloating}
        errorText={errorMessage}
        // mandatory since material ui doesn't manage long labels. If label too long it will be displayed over field value
        floatingLabelStyle={floatingStyle}
        onWheel={(event) => event.currentTarget.blur()}
        {...input}
        type={type}
        {...rest}
      />
    )
  }
}

export default withModuleStyle(styles)(renderTextField)
