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
import omit from 'lodash/omit'
import AutoComplete from 'material-ui/AutoComplete'
import MenuItem from 'material-ui/MenuItem'
import LoadingIcon from 'material-ui/svg-icons/av/loop'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'

/** Default filter method: doesn't filter (let the parent filter the current hint text) */
const NO_FILTER = () => true

/**
 * Table header auto complete filter. API user must provide elements list in currentHints and onFilterSelected, that will
 * be called when a new hint is selected.
 * New
 * Note: When strictValueOnly is true, onFilterSelected will only be called when value is matching one of the hints text (error
 * will be shown otherwise)
 *
 * Note: Every non defined property will be provided to material UI AutoComplete component instance.
 * @author Raphaël Mechali
 */
class TableHeaderAutoCompleteFilter extends React.Component {
  static propTypes = {
    // currently selected hint or user entered text
    currentHintText: PropTypes.string,
    // current list of visible hints
    currentHints: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired, // id that will be propagated when hint is selected.
      text: PropTypes.string.isRequired, // hint text when selected
      value: PropTypes.node.isRequired, // hint render component
    })),
    // is currently in error?
    isInError: PropTypes.bool, // externally controlled error, true to show, false to hide
    // Is currently fetching data?
    isFetching: PropTypes.bool,
    // onFilterSelected (id, isInList) => ().
    // the first parameter, ID, is the hint id (from currentHints list) OR the text user typed
    // the second parameter, isInList,
    onFilterSelected: PropTypes.func.isRequired,

    // required materialUI/AutoComplete API elements
    openOnFocus: PropTypes.bool,
    // matching filter
    filter: PropTypes.func,
    // controls the currentHints update
    onUpdateInput: PropTypes.func.isRequired, // text => ()
  }

  static defaultProps = {
    isInError: false,
    isFetching: false,

    openOnFocus: true,
    currentHints: [],
    filter: NO_FILTER,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static DEFAULT_STATE = {
    errorText: null,
  }

  static ERROR_EMPTY_MESSAGE = ' '

  /**
   * Lifecycle method: component will mount. Used here to request initial hints list
   */
  componentWillMount = () => {
    this.setState(TableHeaderAutoCompleteFilter.DEFAULT_STATE)
    this.props.onUpdateInput()
  }

  /**
   * On new request: before callback, check if item is complete or just a string (user typed enter key).
   * In the latest case, block the callback and mark the error
   */
  onNewRequest = (item, index) => {
    const { currentHints, onFilterSelected } = this.props
    let id
    let isInList
    if (index >= 0) {
      // selected item: use its ID
      id = item.id
      isInList = true
    } else {
      // user entered text, item is the text value here
      id = item
      // verify hints list to check wether the hint can be found
      isInList = !!currentHints.find(hint => hint.text.toLowerCase() === item.toLowerCase())
    }
    onFilterSelected(id, isInList)
  }

  /**
   * Renders the loading item
   * @return loading item
   */
  renderLoadingDatasource = () => {
    const { intl: { formatMessage } } = this.context

    // prepare the fetching menu item that will be used while loading
    return [{
      text: 'unused',
      value: <MenuItem
        leftIcon={<LoadingIcon />}
        primaryText={formatMessage({ id: 'table.header.autocomplete.filter.loading' })}
        disabled
      />,
    }]
  }

  render() {
    const {
      currentHintText, currentHints, isInError, isFetching,
      onUpdateInput, ...autoCompleteProps
    } = this.props
    const { moduleTheme: { header: { autocomplete } } } = this.context
    // report other props, ignore only the callback that is not used here
    const reportedProps = omit(autoCompleteProps, ['onFilterSelected'])
    return (
      <AutoComplete
        dataSource={isFetching ? this.renderLoadingDatasource() : currentHints}
        searchText={currentHintText}
        errorText={isInError ? TableHeaderAutoCompleteFilter.ERROR_EMPTY_MESSAGE : null}
        onUpdateInput={onUpdateInput}
        onNewRequest={this.onNewRequest}
        textFieldStyle={autocomplete.textStyle}
        {...reportedProps}
      />

    )
  }
}

export default TableHeaderAutoCompleteFilter
