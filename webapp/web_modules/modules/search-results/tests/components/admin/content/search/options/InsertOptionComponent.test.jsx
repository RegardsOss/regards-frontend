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
import IconButton from 'material-ui/IconButton'
import MenuItem from 'material-ui/MenuItem'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import InsertOptionComponent from '../../../../../../src/components/admin/content/search/options/InsertOptionComponent'
import styles from '../../../../../../src/styles'
import { exampleEntities } from '../../../../../dumps/search.criteria.runtime'

const context = buildTestContext(styles)

/**
 * Test InsertOptionComponent
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing InsertOptionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(InsertOptionComponent)
  })
  it('should render correctly of a group, providing the right options for that group', () => {
    const spyInsertGroup = { }
    const spyInsertCriterion = { }
    const testData = [0, 4, 6].map((index) => ({ entity: exampleEntities[index] }))
    testData.forEach(({ entity, expectedInsertionIndex }) => {
      const props = {
        entity,
        onInsertGroup: (groupIndex) => {
          spyInsertGroup.groupIndex = groupIndex
        },
        onInsertCriterion: (groupIndex, criterionIndex) => {
          spyInsertCriterion.groupIndex = groupIndex
          spyInsertCriterion.criterionIndex = criterionIndex
        },
      }
      const enzymeWrapper = shallow(<InsertOptionComponent {...props} />, { context })
      // A- There should be the button
      const buttonWrapper = enzymeWrapper.find(IconButton)
      assert.lengthOf(buttonWrapper, 1, `There should be the button (${entity.groupIndex})`)
      // B - Check menu options
      const menuItemWrappers = enzymeWrapper.find(MenuItem)
      assert.lengthOf(menuItemWrappers, 3, `There should 3 options: 2 for groups, one for criteria sub menu (${entity.groupIndex})`)
      // B.1 - Check insert before option
      const beforeItemWrapper = menuItemWrappers.at(0)
      testSuiteHelpers.assertWrapperProperties(beforeItemWrapper, {
        primaryText: 'search.results.form.configuration.search.pane.options.column.insert.group.before.label',
        onClick: enzymeWrapper.instance().onInsertGroupBefore,
      }, `Before option properties should be correctly set (${entity.groupIndex})`)
      // test callbacks
      beforeItemWrapper.props().onClick()
      assert.deepEqual(spyInsertGroup, { groupIndex: entity.groupIndex }) // insert at exact location will shift entity after inserted element
      // B.2 - Check insert after option
      const afterItemWrapper = menuItemWrappers.at(1)
      testSuiteHelpers.assertWrapperProperties(afterItemWrapper, {
        primaryText: 'search.results.form.configuration.search.pane.options.column.insert.group.after.label',
        onClick: enzymeWrapper.instance().onInsertGroupAfter,
      }, `After option properties should be correctly set (${entity.groupIndex})`)
      // test callbacks
      afterItemWrapper.props().onClick()
      assert.deepEqual(spyInsertGroup, { groupIndex: entity.groupIndex + 1 })
      // C - Test criteria sub menu
      const criteriaMenuWrapper = menuItemWrappers.at(2)
      assert.equal(criteriaMenuWrapper.props().primaryText, 'search.results.form.configuration.search.pane.options.column.insert.criterion.in.group.menu.label',
        `Criteria menu label should be correctly set (${entity.groupIndex})`)
      const insertionOptions = criteriaMenuWrapper.props().menuItems
      assert.lengthOf(insertionOptions, entity.criteria.length + 1, `There should be N+1 insertion options (first then after each criterion in group) (${entity.groupIndex})`)
      // check ranging from [-1;N-1] and callback invoked in [0; N]
      // Nota: insertion options are not place in wrappers (enzyme cannot render them)
      insertionOptions.forEach((elt, index) => {
        assert.equal(elt.props.label, index ? entity.criteria[index - 1].label : null,
          `Label should be correctly set, except for first element (${entity.groupIndex}, option #${index}`)
        assert.equal(elt.props.index, index - 1,
          `Option index should be correctly set, using -1 for first item (${entity.groupIndex}, option #${index}`)
        assert.isFalse(elt.props.group,
          `Option should be marked for criterion (${entity.groupIndex}, option #${index}`)
        assert.equal(elt.props.onClick, enzymeWrapper.instance().onInsertCriterionAt,
          `Callback should be correctly set (${entity.groupIndex}, option #${index}`)
        assert.equal(elt.props.groupIndex, entity.groupIndex,
          `Callback group index should be correctly set (${entity.groupIndex}, option #${index}`)
        assert.equal(elt.props.criterionIndex, index,
          `Callback criterion index should be correctly set, ranging in [-1; N-1] (${entity.groupIndex}, option #${index}`)
      })
    })
  })
  it('should render correctly of a criterion', () => {
    const spyInsertGroup = { }
    const spyInsertCriterion = { }
    const testData = [1, 2, 3, 5].map((index) => ({ entity: exampleEntities[index] }))
    testData.forEach(({ entity, expectedInsertionIndex }) => {
      const props = {
        entity,
        onInsertGroup: (groupIndex) => {
          spyInsertGroup.groupIndex = groupIndex
        },
        onInsertCriterion: (groupIndex, criterionIndex) => {
          spyInsertCriterion.groupIndex = groupIndex
          spyInsertCriterion.criterionIndex = criterionIndex
        },
      }
      const enzymeWrapper = shallow(<InsertOptionComponent {...props} />, { context })
      // A- There should be the button
      const buttonWrapper = enzymeWrapper.find(IconButton)
      assert.lengthOf(buttonWrapper, 1, `There should be the button (${entity.groupIndex}:${entity.criterionIndex})`)
      // B - Check menu options
      const menuItemWrappers = enzymeWrapper.find(MenuItem)
      assert.lengthOf(menuItemWrappers, 4, `There should 4 options: 2 for groups, and 2 for criteria (${entity.groupIndex}:${entity.criterionIndex})`)
      // B.1 - Check insert group before option
      const groupBeforeItemWrapper = menuItemWrappers.at(0)
      testSuiteHelpers.assertWrapperProperties(groupBeforeItemWrapper, {
        primaryText: 'search.results.form.configuration.search.pane.options.column.insert.group.before.label',
        onClick: enzymeWrapper.instance().onInsertGroupBefore,
      }, `Before option properties should be correctly set (${entity.groupIndex}:${entity.criterionIndex})`)
      // test callbacks
      groupBeforeItemWrapper.props().onClick()
      assert.deepEqual(spyInsertGroup, { groupIndex: entity.groupIndex })
      // B.2 - Check insert group after option
      const groupAfterItemWrapper = menuItemWrappers.at(1)
      testSuiteHelpers.assertWrapperProperties(groupAfterItemWrapper, {
        primaryText: 'search.results.form.configuration.search.pane.options.column.insert.group.after.label',
        onClick: enzymeWrapper.instance().onInsertGroupAfter,
      }, `After option properties should be correctly set (${entity.groupIndex}:${entity.criterionIndex})`)
      // test callbacks
      groupAfterItemWrapper.props().onClick()
      assert.deepEqual(spyInsertGroup, { groupIndex: entity.groupIndex + 1 })
      // C.1 - Check insert before option
      const critBeforeItemWrapper = menuItemWrappers.at(2)
      testSuiteHelpers.assertWrapperProperties(critBeforeItemWrapper, {
        primaryText: 'search.results.form.configuration.search.pane.options.column.insert.criterion.before.label',
        onClick: enzymeWrapper.instance().onInsertCriterionBefore,
      }, `Before option properties should be correctly set (${entity.groupIndex}:${entity.criterionIndex})`)
      // test callbacks
      critBeforeItemWrapper.props().onClick()
      assert.deepEqual(spyInsertCriterion, { groupIndex: entity.groupIndex, criterionIndex: entity.criterionIndex }) // insert at exact location will shift entity after inserted element
      // B.2 - Check insert after option
      const critAfterItemWrapper = menuItemWrappers.at(3)
      testSuiteHelpers.assertWrapperProperties(critAfterItemWrapper, {
        primaryText: 'search.results.form.configuration.search.pane.options.column.insert.criterion.after.label',
        onClick: enzymeWrapper.instance().onInsertCriterionAfter,
      }, `After option properties should be correctly set (${entity.groupIndex}:${entity.criterionIndex})`)
      // test callbacks
      critAfterItemWrapper.props().onClick()
      assert.deepEqual(spyInsertCriterion, { groupIndex: entity.groupIndex, criterionIndex: entity.criterionIndex + 1 })
    })
  })
})
