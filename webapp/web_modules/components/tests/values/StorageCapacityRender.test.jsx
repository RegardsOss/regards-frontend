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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { storage } from '@regardsoss/units'
import StorageCapacityRender from '../../src/values/StorageCapacityRender'
import styles from '../../src/values/styles'

const context = buildTestContext(styles)

/**
* Test StorageCapacityRender
* @author Raphaël Mechali
*/
describe('[COMPONENTS] Testing StorageCapacityRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(StorageCapacityRender)
  })
  it('should render correctly a storage capacity', () => {
    const props = {
      value: new storage.StorageCapacity(8000, storage.units.BIT), // expected one ko
      presentationScale: storage.StorageUnitScale.bytesScale,
    }
    const enzymeWrapper = shallow(<StorageCapacityRender {...props} />, { context })
    let formatterWrapper = enzymeWrapper.find(storage.FormattedStorageCapacity)
    assert.lengthOf(formatterWrapper, 1, 'There should be a formatter wrapper')
    let { capacity } = formatterWrapper.props()
    assert.isOk(capacity, 'Capacity should be defined')
    assert.equal(capacity.value, 1, 'Capacity should scaled to 1 (KB)')
    assert.equal(capacity.unit.symbol, 'KB', 'Capacity should be scaled to (1) KB')

    const props2 = {
      ...props,
      presentationScale: storage.StorageUnitScale.bitsScale,
    }
    enzymeWrapper.setProps(props2)
    formatterWrapper = enzymeWrapper.find(storage.FormattedStorageCapacity)
    assert.lengthOf(formatterWrapper, 1, 'There should be a formatter wrapper')

    capacity = formatterWrapper.props().capacity
    assert.isOk(capacity, 'Capacity should be defined')
    assert.equal(capacity.value, 8, 'Capacity should scaled to 8 (kb)')
    assert.equal(capacity.unit.symbol, 'kb', 'Capacity should be scaled to (8) kb')
  })

  it('should render correctly a storage value to parse', () => {
    const props = {
      value: '1000000b', // expected one ko
      presentationScale: storage.StorageUnitScale.bitsScale,
    }
    const enzymeWrapper = shallow(<StorageCapacityRender {...props} />, { context })
    const formatterWrapper = enzymeWrapper.find(storage.FormattedStorageCapacity)
    assert.lengthOf(formatterWrapper, 1, 'There should be a formatter wrapper')
    const { capacity } = formatterWrapper.props()
    assert.isOk(capacity, 'Capacity should be parsed')
    assert.equal(capacity.value, 1, 'Capacity should scaled to 1 (mb)')
    assert.equal(capacity.unit.symbol, 'mb', 'Capacity should be scaled to (1) mb')
  })

  it('should render correctly a number', () => {
    const props = {
      value: 1, // expected one 8b (from 1 byte)
      presentationScale: storage.StorageUnitScale.bitsScale,
      numberUnit: storage.units.BYTE,
    }
    const enzymeWrapper = shallow(<StorageCapacityRender {...props} />, { context })
    const formatterWrapper = enzymeWrapper.find(storage.FormattedStorageCapacity)
    assert.lengthOf(formatterWrapper, 1, 'There should be a formatter wrapper')
    const { capacity } = formatterWrapper.props()
    assert.isOk(capacity, 'Capacity should be set')
    assert.equal(capacity.value, 8, 'Capacity should scaled to 8 (b)')
    assert.equal(capacity.unit.symbol, 'b', 'Capacity should be scaled to (8) b')
  })

  it('should render no data when no value', () => {
    const props = {
      value: null,
    }
    const enzymeWrapper = shallow(<StorageCapacityRender {...props} />, { context })
    const formatterWrapper = enzymeWrapper.find(storage.FormattedStorageCapacity)
    assert.lengthOf(formatterWrapper, 1, 'There should be a formatter wrapper')
    const { capacity } = formatterWrapper.props()
    assert.isNotOk(capacity, 'Capacity should not be set')
  })

  it('should render no data when value is not parsed', () => {
    const props = {
      value: '8x',
    }
    const enzymeWrapper = shallow(<StorageCapacityRender {...props} />, { context })
    const formatterWrapper = enzymeWrapper.find(storage.FormattedStorageCapacity)
    assert.lengthOf(formatterWrapper, 1, 'There should be a formatter wrapper')
    const { capacity } = formatterWrapper.props()
    assert.isNotOk(capacity, 'Capacity should not be set as it was not parsed')
  })
})
