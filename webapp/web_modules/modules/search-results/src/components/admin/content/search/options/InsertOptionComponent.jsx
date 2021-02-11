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
import InsertIcon from 'mdi-material-ui/Plus'
import MenuChildrenIcon from 'mdi-material-ui/MenuRight'
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import Menu from 'material-ui/Menu'
import Popover from 'material-ui/Popover'
import Divider from 'material-ui/Divider'
import { i18nContextType } from '@regardsoss/i18n'
import { CriteriaEditableRow } from '../../../../../shapes/form/CriteriaEditableRow'
import { CriteriaRowsHelper } from '../cells/CriteriaRowsHelper'
import PositionMenuItemComponent from './PositionMenuItemComponent'

/**
 * Table option to insert a new group / criterion
 * @author Raphaël Mechali
 */
class InsertOptionComponent extends React.Component {
  static propTypes = {
    entity: CriteriaEditableRow.isRequired,
    onInsertGroup: PropTypes.func.isRequired,
    onInsertCriterion: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /** Initial state */
  state = {
    menuOpen: false,
    menuAnchorElement: null,
  }

  /**
   * User callback : on open menu
   */
  onOpenMenu = (event) => {
    event.preventDefault()
    this.setState({
      menuOpen: true,
      menuAnchorElement: event.currentTarget,
    })
  }

  /**
   * User callback: request close menu close menu
   * @param {Function} callback any operation to perform after closing menu
   */
  onRequestClose = () => this.onCloseMenu()

  /**
   * Inner close method, that performs callback after closing
   * @param {Function} callback to invoke after state update, optional
   */
  onCloseMenu = (callback) => this.setState({ menuOpen: false }, callback)

  /**
   * User callback: group inserted
   * @param {number} index insertion index
   */
  onInsertGroup = (groupIndex) => this.onCloseMenu(() => {
    const { onInsertGroup } = this.props
    onInsertGroup(groupIndex)
  })

  /**
   * User callback: insert group before this element
   */
  onInsertGroupBefore = () => {
    const { entity: { groupIndex } } = this.props
    this.onInsertGroup(groupIndex)
  }

  /**
   * User callback: insert group before this element
   */
  onInsertGroupAfter = () => {
    const { entity: { groupIndex } } = this.props
    this.onInsertGroup(groupIndex + 1)
  }

  /**
   * User callback: insert criterion at given index in current group
   * @param {{groupIndex: number, criterionIndex: number}} event as simulated event from inner callbacks
   * or PositionMenuItemComponent, due to poor MUI implementation in MenuItem...
   */
  onInsertCriterionAt = ({ groupIndex, criterionIndex }) => this.onCloseMenu(() => {
    const { onInsertCriterion } = this.props
    onInsertCriterion(groupIndex, criterionIndex)
  })

  /**
   * User callback: insert criterion before self. PRE: this cell displays a criterion
   */
  onInsertCriterionBefore = () => {
    const { entity } = this.props
    this.onInsertCriterionAt(entity) // holds both groupIndex and criterionIndex
  }

  /**
   * User callback: insert criterion after. PRE: this cell displays a criterion
   */
  onInsertCriterionAfter = () => {
    const { entity: { groupIndex, criterionIndex } } = this.props
    this.onInsertCriterionAt({ groupIndex, criterionIndex: criterionIndex + 1 })
  }

  /**
   * Renders new criterion insert options for criteria list as parameter
   * @param {[*]} criteria matching criteria field in CriteriaEditableRow
   * @return {}
   */
  renderInsertOptionsFor = (criteria) => {
    const { entity: { groupIndex } } = this.props
    return [null, ...criteria].map((c, index) => (
      <PositionMenuItemComponent
      // eslint-disable-next-line react/no-array-index-key
        key={`insert.at#${index}`}
        label={c ? c.label : null}
        index={index - 1} // range: [-1 (first); N-1]
        group={false}
        onClick={this.onInsertCriterionAt}
        // event parameters
        groupIndex={groupIndex}
        criterionIndex={index}
      />))
  }

  render() {
    const { entity } = this.props
    const { menuOpen, menuAnchorElement } = this.state
    const { intl: { formatMessage } } = this.context
    return (
      <>
        {/* 1 Button */}
        <IconButton
          title={formatMessage({ id: 'search.results.form.configuration.search.pane.options.column.insert.tooltip' })}
          onClick={this.onOpenMenu}
        >
          <InsertIcon />
        </IconButton>
        {/* 2. Popover and menu */}
        <Popover
          open={menuOpen}
          anchorEl={menuAnchorElement}
          onRequestClose={this.onRequestClose}
        >
          <Menu>

            {/* Common options: group management */}
            <MenuItem
              key="insert.group.before"
              primaryText={formatMessage({ id: 'search.results.form.configuration.search.pane.options.column.insert.group.before.label' })}
              onClick={this.onInsertGroupBefore}
            />
            <MenuItem
              key="insert.group.after"
              primaryText={formatMessage({ id: 'search.results.form.configuration.search.pane.options.column.insert.group.after.label' })}
              onClick={this.onInsertGroupAfter}
            />
            <Divider />
            { /** Insert criterion: depends on entity type */
              CriteriaRowsHelper.isCriterion(entity) ? (
                // for a criterion cell: insert before / after
                <>
                  <MenuItem
                    key="insert.criterion.before"
                    primaryText={formatMessage({ id: 'search.results.form.configuration.search.pane.options.column.insert.criterion.before.label' })}
                    onClick={this.onInsertCriterionBefore}
                  />
                  <MenuItem
                    key="insert.criterion.after"
                    primaryText={formatMessage({ id: 'search.results.form.configuration.search.pane.options.column.insert.criterion.after.label' })}
                    onClick={this.onInsertCriterionAfter}
                  />
                </>) : ( // for a group cell: sub menu for insert at (before each) or at end
                  <MenuItem
                    key="inset.sub.menu"
                    primaryText={formatMessage({ id: 'search.results.form.configuration.search.pane.options.column.insert.criterion.in.group.menu.label' })}
                    rightIcon={<MenuChildrenIcon />}
                    menuItems={this.renderInsertOptionsFor(entity.criteria)}
                  />)
            }
          </Menu>
        </Popover>
      </>
    )
  }
}
export default InsertOptionComponent
