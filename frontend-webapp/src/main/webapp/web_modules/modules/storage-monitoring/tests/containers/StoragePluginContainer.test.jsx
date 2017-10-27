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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { storage } from '@regardsoss/units'
import StoragePluginComponent from '../../src/components/StoragePluginComponent'
import { StoragePluginContainer } from '../../src/containers/StoragePluginContainer'
import styles from '../../src/styles/styles'
import { dump } from '../dump/dump'

const context = buildTestContext(styles)

/**
* Test StoragePluginContainer
* @author Raphaël Mechali
*/
describe('[STORAGE PLUGINS MONITORING] Testing StoragePluginContainer ', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(StoragePluginContainer)
  })
  it('should render correctly and provide data from state to children', () => {
    const props = {
      scale: storage.StorageUnitScale.bytesScale,
      plugin: dump[1],
    }
    const enzymeWrapper = shallow(<StoragePluginContainer {...props} />, { context })
    const subComponent = enzymeWrapper.find(StoragePluginComponent)
    assert.lengthOf(subComponent, 1, 'The sub component should be rendered')
    testSuiteHelpers.assertWrapperProperties(subComponent, {
      label: dump[1].content.label, // label should come from fetched data
      description: dump[1].content.description, // description should come from fetched data
      storageInfo: enzymeWrapper.state().storageInfo,
      selectedStorageIndex: 0, // should be initialized correctly
      onStorageRowSelected: enzymeWrapper.instance().onStorageRowSelected,
    }, 'Container data is not correctly reported')
  })
  it('should pre-convert correctly the device data in its state, ignoring non parsable device sizes', () => {
    const props = {
      scale: storage.StorageUnitScale.bytesScale,
      plugin: dump[1],
    }
    // base on dump info, first device should be correctly parsed, second one should have no size information available
    const enzymeWrapper = shallow(<StoragePluginContainer {...props} />, { context })
    const convertedInfo = enzymeWrapper.state().storageInfo
    // note: test remains very light here as we do not test parsing process, that is tested in regardsoss/units
    // first device (parsable)
    assert.isOk(convertedInfo[0].storagePhysicalId)
    assert.isOk(convertedInfo[0].totalSize)
    assert.isOk(convertedInfo[0].usedSize)
    assert.isOk(convertedInfo[0].unusedSize)
    assert.isOk(convertedInfo[0].usedPercent)
    assert.isOk(convertedInfo[0].unusedPercent)
    // second device (unparsable)
    assert.isOk(convertedInfo[1].storagePhysicalId)
    assert.isNotOk(convertedInfo[1].totalSize)
    assert.isNotOk(convertedInfo[1].usedSize)
    assert.isNotOk(convertedInfo[1].unusedSize)
    assert.isNotOk(convertedInfo[1].usedPercent)
    assert.isNotOk(convertedInfo[1].unusedPercent)
  })
})
