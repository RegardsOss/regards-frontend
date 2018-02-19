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
import NoDataIcon from 'material-ui/svg-icons/av/not-interested'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import messages from './i18n'

/** Default filter method: doesn't filter (let the parent filter the current hint text) */
const NO_FILTER = () => true

/**
 * Auto complete text field. API user must provide elements list in currentHints and onFilterSelected, that will
 * be called when a new hint is selected.
 * Note: When strictValueOnly is true, onFilterSelected will only be called when value is matching one of the hints text (error
 * will be shown otherwise)
 * Note 2: No data and loading messages can be overriden through noDataMessageKey and loadingMessageKey properties.
 * They will be formatted in parent component context (contexts are stacked)
 *
 * Note: Every non defined property will be provided to material UI AutoComplete component instance.
 * @author Raphaël Mechali
 */
class AutoCompleteTextField extends React.Component {
  static propTypes = {
    // currently selected hint or user entered text
    currentHintText: PropTypes.string,
    // current list of visible hints
    currentHints: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired, // id that will be propagated when hint is selected.
      text: PropTypes.string.isRequired, // hint text when selected
      value: PropTypes.node.isRequired, // hint render component
    })),
    loadingMessageKey: PropTypes.string,
    noDataMessageKey: PropTypes.string,
    // is currently in error?
    isInError: PropTypes.bool, // externally controlled error, true to show, false to hide
    // Is currently fetching data?
    isFetching: PropTypes.bool,
    // onFilterSelected (id, isInList) => ().
    // the first parameter, ID, is the hint id (from currentHints list) OR the text user typed
    // the second parameter, isInList,
    onFilterSelected: PropTypes.func.isRequired,
    // controls the currentHints update
    onUpdateInput: PropTypes.func.isRequired, // text => ()

    // required materialUI/AutoComplete API elements
    openOnFocus: PropTypes.bool,
    // matching filter
    filter: PropTypes.func,
    // ...props: provided directly to MUI/Autocomplete
  }

  static defaultProps = {
    loadingMessageKey: 'autocomplete.filter.loading',
    noDataMessageKey: 'autocomplete.filter.empty',
    isInError: false,
    isFetching: false,

    openOnFocus: true,
    currentHints: [],
    filter: NO_FILTER,
  }

  static NON_REPORTED_PROPERTIES = [
    'currentHintText',
    'currentHints',
    'loadingMessageKey',
    'noDataMessageKey',
    'isInError',
    'isFetching',
    'onFilterSelected',
  ]

  /** List of property keys that should not be reported to the delegate autocomplete field */
  static NOT_REPORTED_PROPS_KEYS = [
    'currentHintText',
    'currentHints',
    'loadingMessageKey',
    'noDataMessageKey',
    'isInError',
    'isFetching',
    'onFilterSelected',
  ]


  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static DEFAULT_STATE = {
    errorText: null,
  }

  /** Default menu props */
  static MENU_PROPS = {
    autoWidth: true,
    maxHeight: 400,
  }


  static ERROR_EMPTY_MESSAGE = ' '

  /**
   * Lifecycle method: component did mount. Used here to request initial hints list
   */
  componentDidMount = () => {
    const { onUpdateInput, currentHintText } = this.props
    onUpdateInput(currentHintText)
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
   * Returns or create the current state datasource: switches real datasource in no data or loading cases
   * @return datasource to use in current case
   */
  getDatasource = () => {
    const { intl: { formatMessage } } = this.context
    const {
      isFetching, currentHints, noDataMessageKey, loadingMessageKey,
    } = this.props
    const isNoData = !currentHints || !currentHints.length
    if (isFetching || isNoData) {
      // loading or no data: show a message item
      return [{
        text: 'unused',
        value: <MenuItem
          leftIcon={isFetching ? <LoadingIcon /> : <NoDataIcon />}
          primaryText={formatMessage({ id: isFetching ? loadingMessageKey : noDataMessageKey })}
          disabled
        />,
      }]
    }
    // default case: use hints as datasource
    return currentHints

    // prepare the fetching menu item that will be used while loading
  }

  render() {
    const { currentHintText, isInError } = this.props
    // prepare the properties to report  (exclude properties consumed by this component)
    const reportedProps = omit(this.props, AutoCompleteTextField.NON_REPORTED_PROPERTIES)

    return (
      <AutoComplete
        dataSource={this.getDatasource()}
        searchText={currentHintText}
        errorText={isInError ? AutoCompleteTextField.ERROR_EMPTY_MESSAGE : null}
        onNewRequest={this.onNewRequest}
        menuProps={AutoCompleteTextField.MENU_PROPS}
        {...reportedProps}
      />
    )
  }
}

export default withI18n(messages, true)(AutoCompleteTextField)
