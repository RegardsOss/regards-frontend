/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { fieldInputPropTypes, fieldMetaPropTypes } from 'redux-form'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import styles from '../../styles'

export class RenderCheckbox extends React.Component {
  static contextTypes = {
    ...themeContextType,
  }

  static propTypes = {
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    input: PropTypes.shape(fieldInputPropTypes).isRequired,
    className: PropTypes.string,
    meta: PropTypes.shape(fieldMetaPropTypes).isRequired,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func,
    }),
    alwaysShowError: PropTypes.bool, // bypass touched to show some automatic errors
    disabled: PropTypes.bool,
    defaultValue: PropTypes.bool,
    noSpacing: PropTypes.bool, // set it to true to not show additional spacing in checkBox buttons groups
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
      alwaysShowError, input, className, label, disabled, meta: { touched, error },
      intl, noSpacing,
    } = this.props
    const { moduleTheme: { field: { error: errorStyle } } } = this.context
    const checked = !!input.value
    return (
      <div>
        <Checkbox
          style={noSpacing ? null : RenderCheckbox.STYLES.rootStyles}
          labelStyle={RenderCheckbox.STYLES.labelStyles}
          className={className}
          label={label}
          checked={checked}
          onCheck={this.onChange}
          disabled={disabled}
          name={input.name}
        />
        {(alwaysShowError || touched) && error && (<span style={errorStyle}>{intl.formatMessage({ id: error })}</span>)}
      </div>
    )
  }
}

export default withModuleStyle(styles)(RenderCheckbox)
