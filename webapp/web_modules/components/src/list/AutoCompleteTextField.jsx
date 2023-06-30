/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import LoadingIcon from 'mdi-material-ui/Sync'
import NoDataIcon from 'mdi-material-ui/Cancel'
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
    errorMessage: PropTypes.string,
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
    // menu props to transfer to autocomplete list
    // eslint-disable-next-line react/forbid-prop-types
    menuProps: PropTypes.object,
    // list style to transfer to autocomplete list
    // eslint-disable-next-line react/forbid-prop-types
    listStyle: PropTypes.object,

    // required materialUI/AutoComplete API elements
    openOnFocus: PropTypes.bool,
    // matching filter
    filter: PropTypes.func,
    // ...props: provided directly to MUI/Autocomplete
  }

  static defaultProps = {
    loadingMessageKey: 'autocomplete.filter.loading',
    noDataMessageKey: 'autocomplete.filter.empty',
    errorMessage: ' ', // default message placeholder
    isInError: false,
    isFetching: false,

    openOnFocus: true,
    currentHints: [],
    filter: NO_FILTER,

    menuProps: {
      maxHeight: 400,
    },
    listStyle: {
      width: 'auto',
      maxWidth: 'none',
      overflowX: 'hidden',
    },
  }

  /** List of property keys that should not be reported to the delegate autocomplete field */
  static NON_REPORTED_PROPERTIES = [
    'currentHintText',
    'currentHints',
    'loadingMessageKey',
    'noDataMessageKey',
    'errorMessage',
    'isInError',
    'isFetching',
    'onFilterSelected',
    'onUpdateInput', // from MUI but locally wrapped
  ]

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static DEFAULT_STATE = {
    errorText: null,
  }

  /**
   * Lifecycle method: component did mount. Used here to request initial hints list
   */
  componentDidMount = () => {
    const { onUpdateInput, currentHintText } = this.props
    onUpdateInput(currentHintText)
  }

  /**
   * Lifecycle method: component will receive props. Used here to reinit users list when text is externally changed
   * (onUpdateInput should be correctly throttled to avoid this system sending to many requests)
   * @param {*} nextProps next properties
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    const { currentHintText } = nextProps
    const { currentHintText: oldText } = this.props
    if (oldText !== currentHintText) {
      if (currentHintText !== this.lastUserInputText) {
        nextProps.onUpdateInput(nextProps.currentHintText)
      }
      // reset last text field input
      this.lastUserInputText = null
    }
  }

  /**
   * User typed some text in textfield: keep track of it to avoid multiple updates
   * @param {string} newText typed text
   */
  onUpdateInput = (newText = '') => {
    const { onUpdateInput } = this.props
    // store a transient state to avoid calling onTextInput twice for the same event (see UNSAFE_componentWillReceiveProps)
    this.lastUserInputText = newText
    onUpdateInput(newText)
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
      isInList = !!currentHints.find((hint) => hint.text.toLowerCase() === item.toLowerCase())
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
    const { currentHintText, isInError, errorMessage } = this.props
    // prepare the properties to report  (exclude properties consumed by this component)
    const reportedProps = omit(this.props, AutoCompleteTextField.NON_REPORTED_PROPERTIES)
    return (
      <AutoComplete
        dataSource={this.getDatasource()}
        searchText={currentHintText}
        errorText={isInError ? errorMessage : null}
        onNewRequest={this.onNewRequest}
        onUpdateInput={this.onUpdateInput}
        {...reportedProps}
      />
    )
  }
}

export default withI18n(messages, true)(AutoCompleteTextField)
