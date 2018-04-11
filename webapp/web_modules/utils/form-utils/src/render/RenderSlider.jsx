/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Slider from 'material-ui/Slider'
import { themeContextType } from '@regardsoss/theme'

const renderSlider = ({
  input, label, meta: { touched, error }, children, disabled, min, max, step, intl, ...rest
}) => (
  <div>
    {touched && error && (<span style={{ color: this.context.muiTheme.textField.errorColor }}>{intl.formatMessage({ id: error })}</span>)}
    <Slider
      {...input}
      min={min}
      max={max}
      step={step}
      onChange={(event, value) => {
          input.onChange(value)
        }}
      disabled={disabled}
      {...rest}
    />
  </div>
)
renderSlider.propTypes = {
  input: PropTypes.shape({
    value: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
      PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number])),
    ]),
    name: PropTypes.string,
  }),
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  meta: PropTypes.shape({
    touched: PropTypes.bool,
    error: PropTypes.string,
  }),
  children: PropTypes.arrayOf(PropTypes.element),
  disabled: PropTypes.bool,
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  intl: PropTypes.shape({
    formatMessage: PropTypes.func,
  }),
}
renderSlider.contextTypes = {
  ...themeContextType,
}

export default renderSlider
