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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import MenuItem from 'material-ui/MenuItem'
import { DamDomain } from '@regardsoss/domain'
import { TableColumnBuilder, DropDownButton } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import MoveColumnOption from '../../../../../../../../src/components/user/tabs/results/header/options/columns/MoveColumnOption'
import styles from '../../../../../../../../src/styles'

const context = buildTestContext(styles)

const allModels = [{ // 1- selection
  key: TableColumnBuilder.selectionColumnKey,
  visible: true,
}, { // 2 - an attribute model
  key: 'anything.else.key',
  label: {
    en: 'IDK.en',
    fr: 'IDK.fr',
  },
  visible: true,
  attributes: [
    DamDomain.AttributeModelController.getStandardAttributeModel(
      DamDomain.AttributeModelController.standardAttributesKeys.label),
    DamDomain.AttributeModelController.getStandardAttributeModel(
      DamDomain.AttributeModelController.standardAttributesKeys.id),
  ],
  enableSorting: false,
}, { // 3 - options column
  key: TableColumnBuilder.optionsColumnKey,
  visible: false,
}]

/**
 * Test MoveColumnOption
 * @author Raphaël Mechali
 */
describe('[SEARCH RESULTS] Testing MoveColumnOption', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MoveColumnOption)
  })
  it('should render correctly for selection column', () => {
    const props = {
      rowIndex: 0,
      entity: allModels[0],
      models: allModels,
      onMove: () => { },
    }
    const enzymeWrapper = shallow(<MoveColumnOption {...props} />, { context })
    const dropDown = enzymeWrapper.find(DropDownButton)
    assert.lengthOf(dropDown, 1, 'Drop down button should be rendered')
    assert.isFalse(dropDown.props().disabled, 'Drop down should be enabled as there are 2 possible positions')
    assert.equal(dropDown.props().onChange, enzymeWrapper.instance().onMove, 'Drop down callback should be correctly set')
    const optionsWrapper = dropDown.find(MenuItem)
    assert.lengthOf(optionsWrapper, 2, 'There are two possible position for selection column (start and after attr column)')
    // check start position
    testSuiteHelpers.assertWrapperProperties(optionsWrapper.at(0), {
      primaryText: 'search.results.configure.columns.move.column.at.first.position',
      value: 0,
      disabled: true, // already at start
    }, 'At start item should be correctly resolved')
    // check after attr column position
    testSuiteHelpers.assertWrapperProperties(optionsWrapper.at(1), {
      primaryText: 'search.results.configure.columns.move.column.after',
      value: 1,
      disabled: false,
    }, 'After selection should be correctly resolved')
  })
  it('should render correctly for options column', () => {
    const props = {
      rowIndex: 2,
      entity: allModels[2],
      models: allModels,
      onMove: () => { },
    }
    const enzymeWrapper = shallow(<MoveColumnOption {...props} />, { context })
    const dropDown = enzymeWrapper.find(DropDownButton)
    assert.lengthOf(dropDown, 1, 'Drop down button should be rendered')
    assert.isTrue(dropDown.props().disabled, 'Moving options column around should not be allowed')
    assert.equal(dropDown.props().onChange, enzymeWrapper.instance().onMove, 'Drop down callback should be correctly set')
  })
  it('should render correctly for attributes column', () => {
    const props = {
      rowIndex: 1,
      entity: allModels[1],
      models: allModels,
      onMove: () => { },
    }
    const enzymeWrapper = shallow(<MoveColumnOption {...props} />, { context })
    const dropDown = enzymeWrapper.find(DropDownButton)
    assert.lengthOf(dropDown, 1, 'Drop down button should be rendered')
    assert.isFalse(dropDown.props().disabled, 'Drop down should be enabled as there are 2 possible positions')
    assert.equal(dropDown.props().onChange, enzymeWrapper.instance().onMove, 'Drop down callback should be correctly set')
    const optionsWrapper = dropDown.find(MenuItem)
    assert.lengthOf(optionsWrapper, 2, 'There are two possible position for selection column (start and after attr column)')
    // check start position
    testSuiteHelpers.assertWrapperProperties(optionsWrapper.at(0), {
      primaryText: 'search.results.configure.columns.move.column.at.first.position',
      value: 0,
      disabled: false,
    }, 'At start item should be correctly resolved')
    // check after attr column position
    testSuiteHelpers.assertWrapperProperties(optionsWrapper.at(1), {
      primaryText: 'search.results.configure.columns.move.column.after',
      value: 1,
      disabled: true, // already at that position
    }, 'After selection should be correctly resolved')
  })
})
