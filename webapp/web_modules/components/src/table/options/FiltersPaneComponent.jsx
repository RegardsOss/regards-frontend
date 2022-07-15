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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import compose from 'lodash/fp/compose'
import reduce from 'lodash/reduce'
import includes from 'lodash/includes'
import debounce from 'lodash/debounce'
import pickBy from 'lodash/pickBy'
import omit from 'lodash/omit'
import keys from 'lodash/keys'
import split from 'lodash/split'
import isEmpty from 'lodash/isEmpty'
import isEqual from 'lodash/isEqual'
import ClearIcon from 'mdi-material-ui/Eraser'
import SearchIcon from 'mdi-material-ui/Magnify'
import IconButton from 'material-ui/IconButton'
import CloseIcon from 'mdi-material-ui/Close'
import FlatButton from 'material-ui/FlatButton'
import Drawer from 'material-ui/Drawer'
import { CommonDomain, UIDomain } from '@regardsoss/domain'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import TableFilterSortingAndVisibilityContainer from './TableFilterSortingAndVisibilityContainer'
import TableSelectionModes from '../model/TableSelectionModes'
import styles from '../styles'
import messages from '../i18n'

/**
 * @author Théo Lasserre
 */
class FiltersPaneComponent extends React.Component {
  static propTypes = {
    isPaneOpened: PropTypes.bool.isRequired,
    onCloseFiltersPane: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    defaultFiltersState: PropTypes.object,
    filtersComponent: PropTypes.func.isRequired,
    updateRequestParameters: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    filtersComponentProps: PropTypes.object,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /** List of locally consumed properties, others properties will be proxyfied to inject onRefresh function as the last param */
  static NON_REPORTED_PROPS = ['children', 'defaultFiltersState', 'i18n', 'theme']

  state = {
    inputValues: {},
  }

  applyRequestParameters = debounce((requestParameters) => {
    const { updateRequestParameters } = this.props
    updateRequestParameters(requestParameters)
  }, 500)

  UNSAFE_componentWillMount() {
    const { updateRequestParameters } = this.props
    const extractedFilters = UIDomain.FiltersPaneHelper.extractFiltersFromURL(this.props.defaultFiltersState)
    const requestParameters = UIDomain.FiltersPaneHelper.buildRequestParameters(extractedFilters)
    updateRequestParameters(requestParameters)
    this.setState({
      inputValues: extractedFilters,
    })
  }

  getProxyfiedFunc = (newPropsToProxy) => (
    reduce(newPropsToProxy, (acc, newProp, key) => {
      acc[key] = (...params) => newProp(...params, this.onRefresh)
      return acc
    }, {})
  )

  /**
    * Update a filter
    * @param {*} newFilterValue
    * @param {*} filterElement
    * @param {*} useDebounce
    */
  updateFilter = (newFilterValue, filterElement, useDebounce = false) => {
    const { updateRequestParameters } = this.props
    const { inputValues } = this.state
    const newFilters = {
      ...inputValues,
      [filterElement]: newFilterValue,
    }
    const newState = {
      inputValues: newFilters,
    }
    const newRequestParameters = UIDomain.FiltersPaneHelper.buildRequestParameters(newFilters)
    if (useDebounce) {
      this.applyRequestParameters(newRequestParameters)
    } else {
      updateRequestParameters(newRequestParameters)
    }
    this.setState(newState)
    UIDomain.FiltersPaneHelper.updateURL(newFilters)
  }

  /**
   * Update a Values Restriction filter type
   * @param {*} value
   * @param {*} filterElement
   * @param {*} mode
   */
  updateValuesFilter = (value, filterElement, mode = TableSelectionModes.INCLUDE, useDebounce = false) => {
    let newFilterValue = {}
    if (isEmpty(value)) {
      newFilterValue = TableFilterSortingAndVisibilityContainer.DEFAULT_VALUES_RESTRICTION_STATE
    } else {
      newFilterValue = {
        [CommonDomain.REQUEST_PARAMETERS.VALUES]: split(value, ','),
        [CommonDomain.REQUEST_PARAMETERS.MODE]: mode,
      }
    }
    this.updateFilter(newFilterValue, filterElement, useDebounce)
  }

  /**
   * Update a Dates Restriction filter type
   * @param {*} value
   * @param {*} filterElement
   * @param {*} dateParameter : either AFTER or BEFORE
   */
  updateDatesFilter = (value, filterElement, dateParameter, useDebounce = false) => {
    const { inputValues } = this.state
    const newFilterValue = {
      ...inputValues[filterElement],
      [dateParameter]: value,
    }
    this.updateFilter(newFilterValue, filterElement, useDebounce)
  }

  /**
   * Clear filters
   */
  clearFilters = () => {
    const { pathname, query } = browserHistory.getCurrentLocation()
    const { defaultFiltersState, updateRequestParameters } = this.props
    const { inputValues } = this.state
    if (!isEqual(inputValues, defaultFiltersState)) {
      this.setState({
        inputValues: defaultFiltersState,
      })
      updateRequestParameters(UIDomain.FiltersPaneHelper.buildRequestParameters(defaultFiltersState))
    }
    // Clear url parameters
    const newQuery = {
      ...pickBy(query, (value, key) => !includes(keys(defaultFiltersState), key)),
    }
    browserHistory.replace({
      pathname,
      search: new URLSearchParams(newQuery).toString(),
      query: newQuery,
    })
  }

  render() {
    const {
      isPaneOpened, onCloseFiltersPane, filtersComponent, filtersComponentProps,
    } = this.props
    const {
      inputValues,
    } = this.state
    const {
      intl: { formatMessage },
      muiTheme: { module: { searchResults: { searchPane: { width } } } },
      moduleTheme: {
        searchPane: {
          rootContainer, titleContainer, icon,
          text, mainContainer, buttonsContainers,
        },
      },
    } = this.context
    const newPropsToProxy = omit(this.props, FiltersPaneComponent.NON_REPORTED_PROPS)
    const decoratedComponentElement = React.createElement(filtersComponent, {
      ...this.getProxyfiedFunc(newPropsToProxy),
      ...filtersComponentProps,
      updateFilter: this.updateFilter,
      updateValuesFilter: this.updateValuesFilter,
      updateDatesFilter: this.updateDatesFilter,
      inputValues,
    })
    return (
      <Drawer
        width={width}
        containerStyle={rootContainer}
        open={isPaneOpened}
        disableSwipeToOpen
        openSecondary
      >
        {/* 1. Title bar */}
        <div style={titleContainer}>
          {/* 1.a Icon and title */}
          <SearchIcon style={icon} />
          <div style={text}>
            {formatMessage({ id: 'filter.pane.title' })}
          </div>
          {/* 1.b close button */}
          <IconButton
            title={formatMessage({ id: 'filter.pane.close.button' })}
            onClick={onCloseFiltersPane}
          >
            <CloseIcon />
          </IconButton>
        </div>
        <div style={mainContainer}>
          {decoratedComponentElement}
        </div>
        {/* 3. Buttons bar */}
        <div style={buttonsContainers}>
          {/* 3.a clear inputs */}
          <FlatButton
            icon={<ClearIcon />}
            label={formatMessage({ id: 'filter.pane.clear.button' })}
            title={formatMessage({ id: 'filter.pane.clear.button' })}
            onClick={this.clearFilters}
          />
        </div>
      </Drawer>
    )
  }
}
export default compose(connect(), withI18n(messages, true), withModuleStyle(styles, true),
)(FiltersPaneComponent)
