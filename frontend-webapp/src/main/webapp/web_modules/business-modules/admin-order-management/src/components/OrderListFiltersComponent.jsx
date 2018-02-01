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
import values from 'lodash/values'
import IconButton from 'material-ui/IconButton'
import { MenuItem } from 'material-ui/Menu'
import ClearFilter from 'material-ui/svg-icons/content/backspace'
import { AdminShapes } from '@regardsoss/shape'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { TableHeaderAutoCompleteFilter, TableHeaderLine, TableHeaderContentBox, TableHeaderText } from '@regardsoss/components'

/**
* Order list filters component
* @author Raphaël Mechali
*/
class OrderListFiltersComponent extends React.Component {
  static propTypes = {
    usersFilterText: PropTypes.string.isRequired, // current filter text
    // eslint-disable-next-line react/no-unused-prop-types
    matchingUsers: AdminShapes.ProjectUserList, // used in onPropertiesUpdated, current users list
    isInError: PropTypes.bool.isRequired, // is currently in error?
    isFetching: PropTypes.bool.isRequired, // is current fetching?
    onUpdateUsersFilter: PropTypes.func.isRequired, // user entered some key value, callback to update matching users list
    onUserFilterSelected: PropTypes.func.isRequired, // callback: user selected a user mail OR entered some text
    onUserFilterCleared: PropTypes.func.isRequired, // callback: user cleared the filter
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  componentWillReceiveProps = nextProps => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    // detect matching users list changes to prepare hint models
    if (oldProps.matchingUsers !== newProps.matchingUsers) {
      let usersAsHints = []
      if (newProps.matchingUsers) {
        usersAsHints = values(newProps.matchingUsers).map(
          ({ content: { email } }) => ({
            id: email, // the value that interests us here
            text: email, // text field output when a user is selected
            value: <MenuItem primaryText={email} />, // graphic render
          }))
      }
      this.setState({ usersAsHints })
    }
  }

  render() {
    const {
      usersFilterText, isFetching, isInError,
      onUpdateUsersFilter, onUserFilterSelected, onUserFilterCleared,
    } = this.props
    const { intl: { formatMessage }, moduleTheme: { orderList: { clearFilterButton } } } = this.context
    const { usersAsHints } = this.state
    return (
      <TableHeaderLine>
        {/* left position: header text for bar */}
        <TableHeaderContentBox>
          <TableHeaderText text={formatMessage({ id: 'order.list.filters.label' })} />
        </TableHeaderContentBox>
        {/* right position: filters  */}
        <TableHeaderContentBox>
          {/* filter text box with autocompletion */}
          <TableHeaderAutoCompleteFilter
            hintText={formatMessage({ id: 'order.list.filter.by.email.hint' })}
            currentHintText={usersFilterText}
            currentHints={usersAsHints}
            isFetching={isFetching}
            isInError={isInError}
            onUpdateInput={onUpdateUsersFilter}
            onFilterSelected={onUserFilterSelected}
          />
          <IconButton
            title={formatMessage({ id: 'order.list.clear.filter.tooltip' })}
            style={clearFilterButton.style}
            onClick={onUserFilterCleared}
          >
            <ClearFilter />
          </IconButton>
        </TableHeaderContentBox>
      </TableHeaderLine>
    )
  }
}
export default OrderListFiltersComponent
