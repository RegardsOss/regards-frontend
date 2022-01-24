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
import { connect } from '@regardsoss/redux'
import IconButton from 'material-ui/IconButton'
import Checked from 'mdi-material-ui/CheckboxMarked'
import Unchecked from 'mdi-material-ui/CheckboxBlankOutline'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { BasicPageableSelectors } from '@regardsoss/store-utils'
import TableActions from '../../model/TableActions' // class for prop type
import { TableSelectors } from '../../model/TableSelectors' // class for prop type

/**
* Shows a checkbox column header cell, sitching selection modes and selected object as follow:
* - Initially, or when AT LEAST one object is not selected: Show select all. Clicking that option will result
* in listing the non selected objects
* - When all objects are selected, in list non selected objects, shows unselect all. Clicking that option will result
* It acts as a connected container (to embed selection state and interactors)
*/
class CheckboxColumnHeaderCell extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state, { pageSelectors, tableSelectors }) {
    return {
      allSelected: tableSelectors.areAllSelected(state, pageSelectors),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps(dispatch, { tableActions }) {
    return {
      dispatchSelectAll: () => dispatch(tableActions.selectAll()),
      dispatchUnselectAll: () => dispatch(tableActions.unselectAll()),
    }
  }

  static propTypes = {
    displaySelectAll: PropTypes.bool.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    pageSelectors: PropTypes.instanceOf(BasicPageableSelectors).isRequired, // BasicPageableSelectors to retrieve entities from store
    // eslint-disable-next-line react/no-unused-prop-types
    tableActions: PropTypes.instanceOf(TableActions), // Table actions instance, used in mapDispatchToProps
    // eslint-disable-next-line react/no-unused-prop-types
    tableSelectors: PropTypes.instanceOf(TableSelectors), // Table selectors instance, used in onPropertiesUpdate
    // from map state to props
    allSelected: PropTypes.bool.isRequired,
    // from map dispatch to props
    dispatchSelectAll: PropTypes.func.isRequired,
    dispatchUnselectAll: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  /**
 * On user toggled select all / unselect all
 */
  onToggleSelectAll = () => {
    const { allSelected, dispatchSelectAll, dispatchUnselectAll } = this.props
    if (allSelected) {
      dispatchUnselectAll()
    } else {
      dispatchSelectAll()
    }
  }

  render() {
    const { intl: { formatMessage }, moduleTheme: { checkButton: { styles, checkedIcon, uncheckedIcon } } } = this.context
    const { displaySelectAll, allSelected } = this.props

    const [tooltipKey, iconStyle, Icon] = allSelected
      ? ['table.deselect.all.label', checkedIcon, Checked]
      : ['table.select.all.label', uncheckedIcon, Unchecked]

    return (
      displaySelectAll
        ? <IconButton
            style={styles}
            title={formatMessage({ id: tooltipKey })}
            iconStyle={iconStyle}
            onClick={this.onToggleSelectAll}
        >
          <Icon />
        </IconButton>
        : null
    )
  }
}

export default connect(
  CheckboxColumnHeaderCell.mapStateToProps,
  CheckboxColumnHeaderCell.mapDispatchToProps,
)(CheckboxColumnHeaderCell)
