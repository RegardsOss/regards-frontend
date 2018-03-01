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
import isNil from 'lodash/isNil'
import Checkbox from 'material-ui/Checkbox'
import { themeContextType } from '@regardsoss/theme'

export default class RenderCheckbox extends React.Component {
  static contextTypes = {
    ...themeContextType,
  }

  static propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    input: PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
      name: PropTypes.string,
      onChange: PropTypes.func,
    }),
    className: PropTypes.string,
    meta: PropTypes.shape({
      error: PropTypes.string,
      touched: PropTypes.bool,
    }),
    intl: PropTypes.shape({
      formatMessage: PropTypes.func,
    }),
    alwaysShowError: PropTypes.bool, // bypass touched to show some automatic errors
    disabled: PropTypes.bool,
    defaultValue: PropTypes.bool,
  }

  static defaultProps = {
    defaultValue: false,
  }

  static STYLES = {
    rootStyles: {
      marginTop: 24,
    },
    labelStyles: {
      width: 'auto',
    },
  }

  componentDidMount() {
    const { defaultValue, input } = this.props
    if (isNil(input.value) || input.value === '') {
      input.onChange(defaultValue)
    }
  }

  onChange = () => {
    const { input } = this.props
    // switch the value
    input.onChange(!input.value)
  }

  render() {
    const {
      alwaysShowError, input, className, label, disabled, meta: { touched, error }, intl,
    } = this.props
    const { muiTheme } = this.context
    const checked = !!input.value
    return (
      <div>
        <Checkbox
          style={RenderCheckbox.STYLES.rootStyles}
          labelStyle={RenderCheckbox.STYLES.labelStyles}
          className={className}
          label={label}
          checked={checked}
          onCheck={this.onChange}
          disabled={disabled}
        />
        {(alwaysShowError || touched) && error && (<span style={{ color: muiTheme.textField.errorColor }}>{intl.formatMessage({ id: error })}</span>)}
      </div>
    )
  }
}

