/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import MoveOptionComponent from '../../../../../../src/components/admin/content/search/options/MoveOptionComponent'
import PositionMenuItemComponent from '../../../../../../src/components/admin/content/search/options/PositionMenuItemComponent'
import styles from '../../../../../../src/styles'
import { exampleEntities, exampleConfiguration } from '../../../../../dumps/search.criteria.runtime'

const context = buildTestContext(styles)

/**
 * Test MoveOptionComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing MoveOptionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MoveOptionComponent)
  })
  it('should render correctly a group, providing available move options', () => {
    const testCases = [{
      entity: exampleEntities[0],
      expectedOptions: [{ // after group #2
        groupIndex: 1,
        insertionIndex: 1, // insertion index is expressed AFTER removal
      }, {
        groupIndex: 2, // after group #3
        insertionIndex: 2,
      }],
    }, {
      entity: exampleEntities[4],
      expectedOptions: [{ // first
        groupIndex: -1,
        insertionIndex: 0,
      }, { // after group #3
        groupIndex: 2,
        insertionIndex: 2,
      }],
    }, {
      entity: exampleEntities[6], // first / after first
      expectedOptions: [{ // first
        groupIndex: -1,
        insertionIndex: 0,
      }, { // after group #1
        groupIndex: 0,
        insertionIndex: 1,
      }],
    }]
    testCases.forEach(({ entity, expectedOptions }) => {
      const spyMoveGroup = {}
      const props = {
        entity,
        groups: exampleConfiguration,
        onMoveGroup: (currentIndex, moveIndex) => {
          spyMoveGroup.currentIndex = currentIndex
          spyMoveGroup.moveIndex = moveIndex
        },
        onMoveCriterion: () => {},
      }
      const enzymeWrapper = shallow(<MoveOptionComponent {...props} />, { context })

      // A - Check button
      const buttonWrapper = enzymeWrapper.find(IconButton)
      assert.lengthOf(buttonWrapper, 1, `There should be the icon button (${entity.groupIndex})`)
      testSuiteHelpers.assertWrapperProperties(buttonWrapper, {
        title: 'search.results.form.configuration.search.pane.options.column.move.tooltip',
        onClick: enzymeWrapper.instance().onOpenMenu,
      }, `Icon button properties should be correctly set (${entity.groupIndex})`)
      // B - Check move options
      const optionWrappers = enzymeWrapper.find(PositionMenuItemComponent)
      assert.lengthOf(optionWrappers, expectedOptions.length, `There should ${expectedOptions.length} (${entity.groupIndex})`)
      // check each option parameters and callbacks
      expectedOptions.forEach(({ groupIndex, insertionIndex }, index) => {
        const optionWrapper = optionWrappers.at(index)
        testSuiteHelpers.assertWrapperProperties(optionWrapper, {
          label: groupIndex >= 0 ? exampleConfiguration[groupIndex].title : null, // -1 stands for first option
          index: groupIndex,
          group: true,
          onClick: enzymeWrapper.instance().onMove,
          // event parameter
          groupIndex: insertionIndex,
        }, `Option #${index} properties should be correctly set (${entity.groupIndex})`)
        // check callback invocation (assert PositionMenuItemComponent works correctly, tested elsewhere)
        optionWrapper.props().onClick({ groupIndex: insertionIndex })
        assert.deepEqual(spyMoveGroup, {
          currentIndex: entity.groupIndex,
          moveIndex: insertionIndex,
        }, `Option #${index} callback should be invoked with right values (${entity.groupIndex})`)
      })
    })
  })
  it('should render correctly a criterion, providing the available move options', () => {
    const testCases = [{ // crit 1.1
      entity: exampleEntities[1],
      // expected options in current groups (others are automatically computed)
      expectedOptions: [{ // after 1.2
        currentIndex: 1,
        insertionIndex: 1, // insertion index is expressed AFTER removal
      }, { // after 1.3
        currentIndex: 2,
        insertionIndex: 2,
      }],
    }, { // crit 1.2
      entity: exampleEntities[2],
      expectedOptions: [{ // first
        currentIndex: -1,
        insertionIndex: 0,
      }, { // after 1.3
        currentIndex: 2,
        insertionIndex: 2,
      }],
    }, { // crit 1.3
      entity: exampleEntities[3],
      expectedOptions: [{ // first
        currentIndex: -1,
        insertionIndex: 0,
      }, { // after 1.1
        currentIndex: 0,
        insertionIndex: 1,
      }],
    }, { // crit 2.1
      entity: exampleEntities[5],
      expectedOptions: [], // no option in this criterion group
    }]
    testCases.forEach(({ entity, expectedOptions }) => {
      const spyMoveCriterion = {}
      const props = {
        entity,
        groups: exampleConfiguration,
        onMoveGroup: () => {},
        onMoveCriterion: (currentLocation, newLocation) => {
          spyMoveCriterion.currentLocation = currentLocation
          spyMoveCriterion.newLocation = newLocation
        },
      }
      const enzymeWrapper = shallow(<MoveOptionComponent {...props} />, { context })

      // A - Check button
      const buttonWrapper = enzymeWrapper.find(IconButton)
      assert.lengthOf(buttonWrapper, 1, `There should be the icon button (${entity.groupIndex}:${entity.criterionIndex})`)
      testSuiteHelpers.assertWrapperProperties(buttonWrapper, {
        title: 'search.results.form.configuration.search.pane.options.column.move.tooltip',
        onClick: enzymeWrapper.instance().onOpenMenu,
      }, `Icon button properties should be correctly set (${entity.criterionIndex})`)
      // B - Check move options
      const menuItemsWrapper = enzymeWrapper.find(MenuItem)
      assert.lengthOf(menuItemsWrapper, props.groups.length, `There should be ${props.groups.length} groups move options (${entity.groupIndex}:${entity.criterionIndex})`)
      const currentGroupItemWrapper = menuItemsWrapper.at(0)
      // B.1 - Check this entity group options
      assert.equal(currentGroupItemWrapper.props().primaryText, 'search.results.form.configuration.search.pane.options.column.move.in.current.group.menu.label',
        `Current group menu label should be correctly set (${entity.groupIndex}:${entity.criterionIndex})`)
      const { menuItems: thisGroupOptions } = currentGroupItemWrapper.props()
      assert.lengthOf(thisGroupOptions, expectedOptions.length, `There should be ${expectedOptions.length}  (${entity.groupIndex}:${entity.criterionIndex})`)
      thisGroupOptions.forEach((option, index) => {
        const expectedOption = expectedOptions[index]
        // Check option
        assert.deepEqual(option.props, {
          label: expectedOption.currentIndex < 0 ? null : props.groups[props.entity.groupIndex].criteria[expectedOption.currentIndex].label,
          index: expectedOption.currentIndex,
          group: false,
          onClick: enzymeWrapper.instance().onMove,
          groupIndex: props.entity.groupIndex,
          criterionIndex: expectedOption.insertionIndex,
        }, `Current group option #${index} should be correctly set for entity (${entity.groupIndex}:${entity.criterionIndex})`)
        // Invoke callback
        option.props.onClick({ groupIndex: option.props.groupIndex, criterionIndex: option.props.criterionIndex })
        assert.deepEqual(spyMoveCriterion, {
          currentLocation: props.entity, // holds current groupIndex and criterionIndex
          newLocation: {
            groupIndex: props.entity.groupIndex,
            criterionIndex: expectedOption.insertionIndex,
          },
        }, `Move option #${index} should be invoked with right parameters (${entity.groupIndex}:${entity.criterionIndex})`)
      })
      // B.2 - Other groups items
      let itemWrapperIndex = 1
      props.groups.forEach((currentGroup, currentGroupIndex) => {
        // Test all groups but current one (should show first and after any option)
        if (currentGroupIndex !== props.entity.groupIndex) {
          const groupWrapper = menuItemsWrapper.at(itemWrapperIndex)
          assert.equal(groupWrapper.props().primaryText, 'search.results.form.configuration.search.pane.options.column.move.in.other.group',
            `Other group #${currentGroupIndex} label should be correctly set (${entity.groupIndex}:${entity.criterionIndex})`)
          const { menuItems: otherGroupOptions } = groupWrapper.props()
          assert.lengthOf(otherGroupOptions, currentGroup.criteria.length + 1, `Other group #${currentGroupIndex} should have N+1 move options (${entity.groupIndex}:${entity.criterionIndex})`)
          for (let i = 0; i < otherGroupOptions.length; i += 1) {
            const option = otherGroupOptions[i]
            // A - Test properties
            assert.deepEqual(option.props, {
              label: i === 0 ? null : currentGroup.criteria[i - 1].label,
              index: i - 1,
              group: false,
              onClick: enzymeWrapper.instance().onMove,
              groupIndex: currentGroupIndex,
              criterionIndex: i,
            }, `Other group #${currentGroupIndex}/option #${i} should have expected properties (${entity.groupIndex}:${entity.criterionIndex})`)
            // B - Test callback
            option.props.onClick({ groupIndex: currentGroupIndex, criterionIndex: i })
            assert.deepEqual(spyMoveCriterion, {
              currentLocation: props.entity, // holds current groupIndex and criterionIndex
              newLocation: {
                groupIndex: currentGroupIndex,
                criterionIndex: i,
              },
            }, `Other group #${currentGroupIndex}/option #${i} callback should be correctly invoked (${entity.groupIndex}:${entity.criterionIndex})`)
          }
          itemWrapperIndex += 1 // test next wrapper
        }
      })
    })
  })
})
