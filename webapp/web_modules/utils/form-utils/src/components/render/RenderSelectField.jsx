/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import SelectField from 'material-ui/SelectField'
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form'
import RenderHelper from './RenderHelper'

/**
 * Form select field render
 * @author Léo Mieulet
 * @author Raphaël Mechali
 */
class RenderSelectField extends React.Component {
  static propTypes = {
    meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    children: PropTypes.node,
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    onSelect: PropTypes.func,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func,
    }),
  }

  /**
   * On select callback
   * @param {*} event
   * @param {number} index selected element index
   * @param {*} value selected element value
   */
  onSelect =(event, index, value) => {
    const { onSelect, input } = this.props
    if (onSelect) {
      return onSelect(event, index, value, input)
    }
    return input.onChange(value)
  }

  render() {
    const {
      input, label, meta: { touched, error },
      fullWidth, children, disabled, intl,
      ...others
    } = this.props
    const errorMessage = RenderHelper.getErrorMessage(touched, error, intl)
    return (
      <SelectField
        floatingLabelText={label}
        errorText={errorMessage}
        {...input}
        fullWidth={fullWidth}
        onChange={this.onSelect}
        disabled={disabled}
        {...others}
      >
        {children}
      </SelectField>)
  }
}
export default RenderSelectField
