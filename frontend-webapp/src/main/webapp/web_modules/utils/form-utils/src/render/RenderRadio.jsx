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
import { RadioButtonGroup } from 'material-ui/RadioButton'
import { themeContextType } from '@regardsoss/theme'

const RenderRadio = ({
  input, onSelect, defaultSelected, children, meta: { touched, error }, intl,
}, { muiTheme }) => (
  <div>
      <RadioButtonGroup
        {...input}
        defaultSelected={defaultSelected}
        valueSelected={(input.value || input.value === false) ? input.value : undefined}
        onChange={(event, value) => {
          if (onSelect) {
            onSelect(event, value, input)
          }
          return input.onChange(value)
        }}
      >
        {children}
      </RadioButtonGroup>
      {touched && error && (<span style={{ color: muiTheme.textField.errorColor }}>{intl.formatMessage({ id: error })}</span>)}
    </div>
)
RenderRadio.contextTypes = {
  ...themeContextType,
}
RenderRadio.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    name: PropTypes.string,
    onChange: PropTypes.func,
  }),
  meta: PropTypes.shape({
    error: PropTypes.string,
    touched: PropTypes.bool,
  }),
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }),
  // eslint-disable-next-line react/forbid-prop-types
  defaultSelected: PropTypes.any,
  onSelect: PropTypes.func,
  children: PropTypes.arrayOf(PropTypes.element),
}
export default RenderRadio
