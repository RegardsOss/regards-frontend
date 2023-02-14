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
import isPlainObject from 'lodash/isPlainObject'
import keys from 'lodash/keys'
import get from 'lodash/get'
import omit from 'lodash/omit'
import map from 'lodash/map'
import { ScrollArea } from '@regardsoss/adapters'
import { CommonDomain } from '@regardsoss/domain'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import Chip from 'material-ui/Chip'
import { FiltersPaneHelper } from '@regardsoss/domain/ui'

/**
 * @author Théo Lasserre
 */
class FiltersChipsComponent extends React.Component {
  static propTypes = {
    updateFiltersStore: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types, react/no-unused-prop-types
    filters: PropTypes.object,
    // eslint-disable-next-line react/forbid-prop-types
    filtersI18n: PropTypes.object.isRequired,
  }

  static defaultProps = {
    filters: {},
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    filters: {},
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    if (oldProps.filters !== newProps.filters) {
      this.setState({
        filters: newProps.filters,
      })
    }
  }

  deleteFilter = (filterKey) => {
    const { updateFiltersStore } = this.props
    const { filters } = this.state
    const newFilters = omit(filters, filterKey)
    updateFiltersStore(newFilters)
  }

  buildFilterChip = (filter, filterKey) => {
    const { filtersI18n } = this.props
    const {
      intl: { formatMessage, messages },
      moduleTheme: {
        filtersChipsStyle: {
          chipStyle, chipLabelStyle, chipMainStyle, chipValueDivStyle,
          scrollAreaStyle, scrollAreaContentStyle,
        },
      },
    } = this.context
    const i18nKey = get(filtersI18n, `${filterKey}.labelKey`)
    const chipLabel = this.i18nExist(i18nKey, messages) ? formatMessage({ id: i18nKey }) : `${filterKey}`
    return (
      !FiltersPaneHelper.isFilterEmpty(filter)
      && <div
        style={chipStyle}
        key={`filter-${filterKey}-${filter}`}
      >
        <Chip
          onRequestDelete={() => this.deleteFilter(filterKey)}
        >
          <div style={chipMainStyle} key={`filter-${filterKey}-${filter}-${chipLabel}`}>
            <div style={chipLabelStyle}>{`${chipLabel} :`}</div>
            <ScrollArea
              vertical={false}
              horizontal
              style={scrollAreaStyle}
              contentStyle={scrollAreaContentStyle}
            >
              <div style={chipValueDivStyle}>{this.buildFilterChipValue(filter, filterKey)}</div>
            </ScrollArea>
          </div>
        </Chip>
      </div>)
  }

  buildFilterChipValue = (filter, filterKey) => {
    const {
      intl: { formatMessage },
      moduleTheme: {
        filtersChipsStyle: { chipValueStyle, chipLabelStyle, chipAltLabelStyle },
      },
    } = this.context
    if (isPlainObject(filter)) {
      if (!FiltersPaneHelper.isValuesEmptyFilter(filter)) {
        return map(filter[CommonDomain.REQUEST_PARAMETERS.VALUES], (value, index) => {
          const chipValue = (<div style={chipValueStyle}>
            {this.formatValue(value, filterKey)}
          </div>)
          if (index < filter[CommonDomain.REQUEST_PARAMETERS.VALUES].length - 1) {
            return <>
              {chipValue}
              <div style={chipLabelStyle}>{', '}</div>
            </>
          }
          return chipValue
        })
      }
      if (!FiltersPaneHelper.isBeforeDateEmptyFilter(filter) && !FiltersPaneHelper.isAfterDateEmptyFilter(filter)) {
        return <>
          <div style={chipLabelStyle}>{formatMessage({ id: 'filter.chips.date.from' })}</div>
          <div style={chipValueStyle}>{filter[CommonDomain.REQUEST_PARAMETERS.AFTER]}</div>
          <div style={chipAltLabelStyle}>{formatMessage({ id: 'filter.chips.date.to' })}</div>
          <div style={chipValueStyle}>{filter[CommonDomain.REQUEST_PARAMETERS.BEFORE]}</div>
        </>
      }
      if (!FiltersPaneHelper.isBeforeDateEmptyFilter(filter)) {
        return <>
          <div style={chipLabelStyle}>{formatMessage({ id: 'filter.chips.date.to' })}</div>
          <div style={chipValueStyle}>{filter[CommonDomain.REQUEST_PARAMETERS.BEFORE]}</div>
        </>
      }
      if (!FiltersPaneHelper.isAfterDateEmptyFilter(filter)) {
        return <>
          <div style={chipLabelStyle}>{formatMessage({ id: 'filter.chips.date.from' })}</div>
          <div style={chipValueStyle}>{filter[CommonDomain.REQUEST_PARAMETERS.AFTER]}</div>
        </>
      }
    }
    return <div style={chipValueStyle}>{this.formatValue(filter, filterKey)}</div>
  }

  formatValue = (value, filterKey) => {
    const { filtersI18n } = this.props
    const {
      intl: { formatMessage, messages },
    } = this.context
    const i18nValueKeyOrDirectValue = get(filtersI18n, `${filterKey}.chipValueKeys.${value}`)
    const displayedDirectValues = get(filtersI18n, `${filterKey}.displayedDirectValues`, false)
    // We want to display value without i18n formatting (when selected value is made by user for example)
    if (displayedDirectValues) {
      return `${i18nValueKeyOrDirectValue}`
    }
    if (!this.i18nExist(i18nValueKeyOrDirectValue, messages)) {
      return `${value}`
    }
    return formatMessage({ id: i18nValueKeyOrDirectValue })
  }

  i18nExist = (i18nKey, messages) => keys(messages).includes(i18nKey)

  render() {
    const { filters } = this.state
    const {
      moduleTheme: {
        filtersChipsStyle: {
          mainDivStyle, filtersDivStyle,
        },
      },
    } = this.context
    return (
      !FiltersPaneHelper.isFiltersEmpty(filters)
      && <div style={mainDivStyle}>
        <div style={filtersDivStyle}>
          {
            map(filters, (filter, filterKey) => this.buildFilterChip(filter, filterKey))
          }
        </div>
      </div>
    )
  }
}
export default FiltersChipsComponent
