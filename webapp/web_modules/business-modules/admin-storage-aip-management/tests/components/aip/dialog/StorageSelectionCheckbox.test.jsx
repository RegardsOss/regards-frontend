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
import { shallow } from 'enzyme'
import Checkbox from 'material-ui/Checkbox'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import StorageSelectionCheckbox from '../../../../src/components/aip/dialogs/StorageSelectionCheckbox'
import styles from '../../../../src/styles'
import { storage1, storage2 } from '../../../dumps/DataStorages.dump'


const context = buildTestContext(styles)

/**
 * Test StorageSelectionCheckbox
 * @author Raphaël Mechali
 */
describe('[ADMIN STORAGE AIP MANAGEMENT] Testing StorageSelectionCheckbox', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(StorageSelectionCheckbox)
  })
  it('should render correctly not selected', () => {
    const spiedCallbackData = {
      count: 0,
      index: -1,
    }
    const props = {
      storage: storage1,
      selected: false,
      index: 1,
      onToggleStorage: (index) => {
        spiedCallbackData.count += 1
        spiedCallbackData.index = index
      },
    }
    const enzymeWrapper = shallow(<StorageSelectionCheckbox {...props} />, { context })
    const checkboxWrapper = enzymeWrapper.find(Checkbox)
    assert.lengthOf(checkboxWrapper, 1, 'There should be a checkbox')
    assert.isFalse(checkboxWrapper.props().checked, 'It should not be selected')
    assert.equal(checkboxWrapper.props().label, 'storage1', 'Storage space label should be correctly set')
    assert.equal(checkboxWrapper.props().onCheck, enzymeWrapper.instance().onToggle, 'Callback should be correctly set')
    // check callback calls props callback
    assert.equal(spiedCallbackData.count, 0, 'Callback should not have been invoked yet')
    enzymeWrapper.instance().onToggle()
    assert.equal(spiedCallbackData.count, 1, 'Callback should have been invoked once')
    assert.equal(spiedCallbackData.index, 1, 'Callback index should be valid')
  })
  it('should render correctly selected', () => {
    const spiedCallbackData = {
      count: 0,
      index: -1,
    }
    const props = {
      storage: storage2,
      selected: true,
      index: 2,
      onToggleStorage: (index) => {
        spiedCallbackData.count += 1
        spiedCallbackData.index = index
      },
    }
    const enzymeWrapper = shallow(<StorageSelectionCheckbox {...props} />, { context })
    const checkboxWrapper = enzymeWrapper.find(Checkbox)
    assert.lengthOf(checkboxWrapper, 1, 'There should be a checkbox')
    assert.isTrue(checkboxWrapper.props().checked, 'It should not be selected')
    assert.equal(checkboxWrapper.props().label, 'storage2', 'Storage space label should be correctly set')
    assert.equal(checkboxWrapper.props().onCheck, enzymeWrapper.instance().onToggle, 'Callback should be correctly set')
    // check callback calls props callback
    assert.equal(spiedCallbackData.count, 0, 'Callback should not have been invoked yet')
    enzymeWrapper.instance().onToggle()
    assert.equal(spiedCallbackData.count, 1, 'Callback should have been invoked once')
    assert.equal(spiedCallbackData.index, 2, 'Callback index should be valid')
  })
})
