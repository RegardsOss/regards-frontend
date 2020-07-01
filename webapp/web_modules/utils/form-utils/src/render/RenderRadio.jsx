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
import { fieldArrayMetaPropTypes } from 'redux-form'
import { RadioButtonGroup } from 'material-ui/RadioButton'
import isNil from 'lodash/isNil'
import { themeContextType, withModuleStyle } from '@regardsoss/theme'
import styles from '../styles'

// TODO v1.3 ===> EVERY RENDER SHOULD BE EXPORTED WITH CONTEXT! (stop importing FormMessages eveywhere)
// TODO v1.3 check each definition in app of meta: input: fields: ==> bind all onto redux-form equivalent (nota: fieldInputPropTypes no longer exists!)

class RenderRadio extends React.Component {
  static contextTypes = {
    ...themeContextType,
  }

  static propTypes = {
    input: PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
      name: PropTypes.string,
      onChange: PropTypes.func.isRequired,
    }),
    meta: PropTypes.shape(fieldArrayMetaPropTypes).isRequired,
    intl: PropTypes.shape({
      formatMessage: PropTypes.func,
    }),
    // eslint-disable-next-line react/forbid-prop-types
    defaultSelected: PropTypes.any,
    onSelect: PropTypes.func,
    children: PropTypes.arrayOf(PropTypes.element),
  }

  componentDidMount() {
    const { defaultSelected, input } = this.props
    if (isNil(input.value) || input.value === '') {
      input.onChange(defaultSelected)
    }
  }

  /**
   * On select value callback
   * @param {*} event
   * @param {*} value selected value
   */
  onSelect = (event, value) => {
    const { onSelect, input } = this.props
    if (onSelect) {
      onSelect(event, value, input)
    }
    return input.onChange(value)
  }

  render() {
    const {
      input, defaultSelected, children,
      meta: { touched, error }, intl,
    } = this.props
    const { moduleTheme: { field: { error: errorStyle } } } = this.context
    return (
      <div>
        <RadioButtonGroup
          {...input}
          defaultSelected={defaultSelected}
          valueSelected={(input.value || input.value === false) ? input.value : undefined}
          onChange={this.onSelect}
        >
          {children}
        </RadioButtonGroup>
        {touched && error && (<span style={errorStyle}>{intl.formatMessage({ id: error })}</span>)}
      </div>
    )
  }
}

export default withModuleStyle(styles)(RenderRadio)
