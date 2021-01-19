/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import RangeValueRenderDelegate from './RangeValueRenderDelegate'
import { NumberValueRender } from './NumberValueRender'

/**
 * Component to display Number range values
 * Note: this component API is compatible with a ValuesRenderCell, in infinite tables
 *
 * @author Raphaël Mechali
 */
class NumberRangeValueRender extends React.Component {
  static propTypes = {
    value: PropTypes.shape({
      lowerBound: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      upperBound: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
    precision: PropTypes.number,
    unit: PropTypes.string,
    // should diplay using multiple lines? (false by default)
    multilineDisplay: PropTypes.bool,
  }

  static defaultProps = {
    multilineDisplay: false,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const value = this.props.value || {}
    const { multilineDisplay, precision, unit } = this.props
    const { intl } = this.context

    return (
      <RangeValueRenderDelegate
        noValue={isNil(this.props.value)}
        lowerBound={NumberValueRender.formatValue(intl, value.lowerBound, precision, unit)}
        upperBound={NumberValueRender.formatValue(intl, value.upperBound, precision, unit)}
        multilineDisplay={multilineDisplay}
      />)
  }
}

export default NumberRangeValueRender
