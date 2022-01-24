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
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form'
import Toggle from 'material-ui/Toggle'

class renderToggle extends React.Component {
  static propTypes = {
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    defaultToggled: PropTypes.bool,
    // fullWidth: PropTypes.bool,
    type: PropTypes.string,
    meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func,
    }),
  }

  onChange = () => {
    const { input } = this.props
    // switch the value
    input.onChange(!input.value)
  }

  render() {
    // eslint-disable-next-line
    const { input, label, type, meta, intl, ...rest } = this.props
    return (
      <Toggle
        type={type}
        label={label}
        onToggle={this.onChange}
        {...rest}
      />
    )
  }
}

export default renderToggle
