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
import isEmpty from 'lodash/isEmpty'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { durationParser } from '@regardsoss/domain/common'

/**
 * @author Léo Mieulet
 */
class DurationValueRender extends React.Component {
  static propTypes = {
    value: PropTypes.string,
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

  static UNITS = {
    YEARS: 'years',
    MONTHS: 'months',
    DAYS: 'days',
    HOURS: 'hours',
    MINUTES: 'minutes',
    SECONDS: 'seconds',
  }

  /**
   * Return true when the durationInfo[unit] is different than 0
   * and is the biggest unit or the following one
   */
  shouldShow = (unit, durationInfo) => {
    if (durationInfo[unit] === 0) {
      return false
    }
    switch (unit) {
      case DurationValueRender.UNITS.YEARS:
      case DurationValueRender.UNITS.MONTHS:
        return true
      case DurationValueRender.UNITS.DAYS:
        return durationInfo[DurationValueRender.UNITS.YEARS] === 0
      case DurationValueRender.UNITS.HOURS:
        return durationInfo[DurationValueRender.UNITS.YEARS] === 0 && durationInfo[DurationValueRender.UNITS.MONTHS] === 0
      case DurationValueRender.UNITS.MINUTES:
        return durationInfo[DurationValueRender.UNITS.YEARS] === 0 && durationInfo[DurationValueRender.UNITS.MONTHS] === 0
          && durationInfo[DurationValueRender.UNITS.DAYS] === 0
      case DurationValueRender.UNITS.SECONDS:
        return durationInfo[DurationValueRender.UNITS.YEARS] === 0 && durationInfo[DurationValueRender.UNITS.MONTHS] === 0
          && durationInfo[DurationValueRender.UNITS.DAYS] === 0 && durationInfo[DurationValueRender.UNITS.HOURS] === 0
      default:
        throw new Error('Unknow units')
    }
  }

  render() {
    const { value, multilineDisplay } = this.props
    const { intl: { formatMessage }, moduleTheme: { textRenderCell, multilineTextRenderCell } } = this.context
    if (!isEmpty(value)) {
      const durationInfo = durationParser(value)
      return (
        <div style={multilineDisplay ? multilineTextRenderCell : textRenderCell}>
          {durationInfo.sign !== '+' ? durationInfo.sign : null}
          {this.shouldShow(DurationValueRender.UNITS.YEARS, durationInfo) && formatMessage({ id: 'value.render.duration.year' }, { year: durationInfo.years })}
          {this.shouldShow(DurationValueRender.UNITS.MONTHS, durationInfo) && formatMessage({ id: 'value.render.duration.month' }, { month: durationInfo.months })}
          {this.shouldShow(DurationValueRender.UNITS.DAYS, durationInfo) && formatMessage({ id: 'value.render.duration.day' }, { day: durationInfo.days })}
          {this.shouldShow(DurationValueRender.UNITS.HOURS, durationInfo) && formatMessage({ id: 'value.render.duration.hour' }, { hour: durationInfo.hours })}
          {this.shouldShow(DurationValueRender.UNITS.MINUTES, durationInfo) && formatMessage({ id: 'value.render.duration.minute' }, { minute: durationInfo.minutes })}
          {this.shouldShow(DurationValueRender.UNITS.SECONDS, durationInfo) && formatMessage({ id: 'value.render.duration.second' }, { second: durationInfo.seconds })}
        </div>
      )
    }
    return '-'
  }
}

export default DurationValueRender
