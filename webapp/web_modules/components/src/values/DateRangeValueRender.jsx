/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import DateValueRender from './DateValueRender'
import RangeValueRenderDelegate from './RangeValueRenderDelegate'

/**
 * Component to display Date range values group value
 * Note: this component API is compatible with a ValuesRenderCell, in infinite tables
 *
 * @author Sébastien binda
 */
class DateRangeValueRender extends React.Component {
  static propTypes = {
    value: PropTypes.shape({
      lowerBound: PropTypes.string,
      upperBound: PropTypes.string,
    }),
    // should diplay using multiple lines? (false by default)
    multilineDisplay: PropTypes.bool,
  }

  static defaultProps = {
    multilineDisplay: false,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  render() {
    const value = this.props.value || {}
    const { multilineDisplay } = this.props
    const { intl } = this.context

    return (
      <RangeValueRenderDelegate
        noValue={isNil(this.props.value)}
        lowerBound={DateValueRender.getFormattedDate(intl, value.lowerBound)}
        upperBound={DateValueRender.getFormattedDate(intl, value.upperBound)}
        multilineDisplay={multilineDisplay}
      />)
  }
}

export default DateRangeValueRender
