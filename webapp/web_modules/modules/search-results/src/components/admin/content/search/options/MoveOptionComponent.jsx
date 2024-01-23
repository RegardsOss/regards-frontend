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
import MoveIcon from 'mdi-material-ui/SwapVertical'
import MenuChildrenIcon from 'mdi-material-ui/MenuRight'
import IconButton from 'material-ui/IconButton'
import Menu from 'material-ui/Menu'
import Popover from 'material-ui/Popover'
import { i18nContextType } from '@regardsoss/i18n'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import { CriteriaGroup } from '../../../../../shapes/ModuleConfiguration'
import { CriteriaEditableRow } from '../../../../../shapes/form/CriteriaEditableRow'
import { CriteriaRowsHelper } from '../cells/CriteriaRowsHelper'
import PositionMenuItemComponent from './PositionMenuItemComponent'

/**
 * Table option to move a group / criterion
 * @author Raphaël Mechali
 */
class MoveOptionComponent extends React.Component {
  static propTypes = {
    entity: CriteriaEditableRow.isRequired,
    groups: PropTypes.arrayOf(CriteriaGroup).isRequired,
    onMoveGroup: PropTypes.func.isRequired,
    onMoveCriterion: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  /**
   * Builds all options for list as parameter
   * @param {[*]} list list of siding element
   * @param {Function} buildOption buildOption like (element, index) => Component, where element ranges
   * from -1 (first) to N-1
   */
  static buildOptionsForList(list, buildOption) {
    return [
      buildOption(null, -1), // first option
      ...list.map((element, index) => buildOption(element, index)),
    ].filter((c) => !!c) // remove null as MUI bugs with them in sub menus
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

  /** User callback: on move element
   * @param {{groupIndex: number, criterionIndex: number}} event as simulated event from inner callbacks
   * or PositionMenuItemComponent, due to poor MUI implementation in MenuItem... parameter is target
   * position (already computed as it should be used, ensured by render method)
   */
  onMove = (event) => this.onCloseMenu(() => {
    const { entity, onMoveCriterion, onMoveGroup } = this.props
    if (CriteriaRowsHelper.isCriterion(entity)) {
      onMoveCriterion(entity, event) // entity and event are holding the require fields to mimic position
    } else {
      onMoveGroup(entity.groupIndex, event.groupIndex)
    }
  })

  render() {
    const { groups, entity } = this.props
    const { menuOpen, menuAnchorElement } = this.state
    const { intl } = this.context
    return (
      <>
        {/* 1. Button */}
        <IconButton
          title={intl.formatMessage({ id: 'search.results.form.configuration.search.pane.options.column.move.tooltip' })}
          onClick={this.onOpenMenu}
        >
          <MoveIcon />
        </IconButton>
        {/* 2. Popover menu */}
        <Popover
          open={menuOpen}
          anchorEl={menuAnchorElement}
          onRequestClose={this.onRequestClose}
        >
          <Menu>
            { /** Menu, depending on element type */
              CriteriaRowsHelper.isCriterion(entity) ? (
                // Criterion options: move in each group (self one first)
                <>
                  {/* first group: this criterion group */}
                  <MenuItem
                    key="in.current.group.option"
                    primaryText={intl.formatMessage({ id: 'search.results.form.configuration.search.pane.options.column.move.in.current.group.menu.label' })}
                    rightIcon={<MenuChildrenIcon />}
                    menuItems={MoveOptionComponent.buildOptionsForList(groups[entity.groupIndex].criteria, (criterion, index) => {
                      // index: N => N+1 while before this criterion, N otherwise (computed after deletion)
                      const targetIndex = index < entity.criterionIndex ? index + 1 : index
                      // next options: skip element before and this one (x-1/x) as they would result in same location
                      return targetIndex === entity.criterionIndex ? null : (
                        <PositionMenuItemComponent
                          key={`at.${index}`}
                          label={criterion ? criterion.label : null}
                          index={index}
                          group={false}
                          onClick={this.onMove}
                          // event parameters
                          groupIndex={entity.groupIndex}
                          criterionIndex={targetIndex}
                        />)
                    })}
                  />
                  { /** Separator if there are more than one group */
                    groups.length ? <Divider /> : null
                  }
                  { /** In other groups */
                    groups.map((g, groupIndex) => groupIndex === entity.groupIndex ? null : (
                      <MenuItem
                        // eslint-disable-next-line react/no-array-index-key
                        key={`in.group.${groupIndex}`}
                        primaryText={
                          intl.formatMessage({
                            id: 'search.results.form.configuration.search.pane.options.column.move.in.other.group',
                          }, {
                            reference: PositionMenuItemComponent.formatReference(intl, g.title, groupIndex),
                          })
                        }
                        rightIcon={<MenuChildrenIcon />}
                        menuItems={MoveOptionComponent.buildOptionsForList(groups[groupIndex].criteria,
                          (criterion, criterionIndex) => ( // All options available in other groups
                            <PositionMenuItemComponent
                              key={`at.${criterionIndex}`}
                              label={criterion ? criterion.label : null}
                              index={criterionIndex}
                              group={false}
                              onClick={this.onMove}
                              // event parameters
                              groupIndex={groupIndex}
                              criterionIndex={criterionIndex + 1} // insert after
                            />))}
                      />))
                  }
                </>) // Group options: move first or after each
                : MoveOptionComponent.buildOptionsForList(groups, (g, index) => {
                  // index: N => N+1 while before this group, N otherwise (computed after deletion)
                  const targetIndex = index < entity.groupIndex ? index + 1 : index
                  // next options: skip element before and this one (x-1/x) as they would result in same location
                  return targetIndex === entity.groupIndex ? null : (
                    <PositionMenuItemComponent
                      key={`at.${index}`}
                      label={g ? g.title : null}
                      index={index}
                      group
                      onClick={this.onMove}
                      // event parameters
                      groupIndex={targetIndex}
                    />)
                })
            }
          </Menu>
        </Popover>
      </>)
  }
}
export default MoveOptionComponent
