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
import TextField from 'material-ui/TextField'

/**
 * Redux-form component to display a text-area
 */
class TextareaInput extends React.Component {

  static propTypes = {
    input: PropTypes.shape({
      value: PropTypes.string,
      name: PropTypes.string,
    }),
    meta: PropTypes.shape({
      touched: PropTypes.bool,
      error: PropTypes.string,
    }),
    intl: PropTypes.shape({
      formatMessage: PropTypes.func,
    }),
  }

  render() {
    const { input, meta: { touched, error }, intl } = this.props
    return (
      <TextField
        multiLine
        fullWidth
        errorText={touched && error && intl.formatMessage({ id: error })}
        {...input}
      />
    )
  }
}

export default TextareaInput
