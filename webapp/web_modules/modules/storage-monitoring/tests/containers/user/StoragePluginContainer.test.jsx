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
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { storage } from '@regardsoss/units'
import StoragePluginComponent from '../../../src/components/user/StoragePluginComponent'
import { StoragePluginContainer } from '../../../src/containers/user/StoragePluginContainer'
import styles from '../../../src/styles/styles'
import { dump } from '../../dump/dump'

const context = buildTestContext(styles)

/**
* Test StoragePluginContainer
* @author Raphaël Mechali
*/
describe('[Storage Monitoring] Testing StoragePluginContainer ', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(StoragePluginContainer)
  })
  it('should render correctly and provide data from state to children', () => {
    const props = {
      userApp: true,
      scale: storage.StorageUnitScale.bytesScale,
      plugin: dump[1],
    }
    const enzymeWrapper = shallow(<StoragePluginContainer {...props} />, { context })
    const subComponent = enzymeWrapper.find(StoragePluginComponent)
    assert.lengthOf(subComponent, 1, 'The sub component should be rendered')
    testSuiteHelpers.assertWrapperProperties(subComponent, {
      storagePlugin: enzymeWrapper.state().parsedStoragePlugin,
    }, 'Container data is not correctly reported')
  })
  it('should pre-convert correctly the plugin data in its state, ignoring non parsable sizes', () => {
    // first plugin (parsable)
    const props = {
      userApp: true,
      scale: storage.StorageUnitScale.bytesScale,
      plugin: dump[1],
    }
    const enzymeWrapper = shallow(<StoragePluginContainer {...props} />, { context })
    const firstConvertedPlugin = enzymeWrapper.state().parsedStoragePlugin
    assert.isOk(firstConvertedPlugin.confId)
    assert.isOk(firstConvertedPlugin.label)
    assert.isOk(firstConvertedPlugin.description)
    assert.isOk(firstConvertedPlugin.totalSize)
    assert.isOk(firstConvertedPlugin.usedSize)
    assert.isOk(firstConvertedPlugin.unusedSize)
    assert.isOk(firstConvertedPlugin.usedPercent)
    assert.isOk(firstConvertedPlugin.unusedPercent)
    // second plugin (not parsable)
    enzymeWrapper.setProps({
      scale: storage.StorageUnitScale.bitsScale,
      plugin: dump[2],
    })
    const secondConvertedPlugin = enzymeWrapper.state().parsedStoragePlugin
    assert.isOk(secondConvertedPlugin.confId)
    assert.isOk(secondConvertedPlugin.label)
    assert.isOk(secondConvertedPlugin.description)
    assert.isNotOk(secondConvertedPlugin.totalSize)
    assert.isNotOk(secondConvertedPlugin.usedSize)
    assert.isNotOk(secondConvertedPlugin.unusedSize)
    assert.isNotOk(secondConvertedPlugin.usedPercent)
    assert.isNotOk(secondConvertedPlugin.unusedPercent)
  })
  it('should round unused size to 0 when used size overflows capacity', () => {
    // An overflowing used size storage plugin
    const props = {
      userApp: true,
      scale: storage.StorageUnitScale.bytesScale,
      plugin: {
        content: {
          confId: 1,
          label: 'X',
          description: 'Y',
          totalSize: '25To',
          usedSize: '27To',
        },
      },
    }
    const enzymeWrapper = shallow(<StoragePluginContainer {...props} />, { context })
    const { parsedStoragePlugin } = enzymeWrapper.state()
    assert.equal(parsedStoragePlugin.unusedSize.value, 0)
    assert.equal(parsedStoragePlugin.unusedPercent, 0)
  })
  it('should render correctly in admin app', () => {
    const props = {
      userApp: false,
      scale: storage.StorageUnitScale.bytesScale,
      plugin: dump[1],
    }
    const enzymeWrapper = shallow(<StoragePluginContainer {...props} />, { context })
    const subComponent = enzymeWrapper.find(StoragePluginComponent)
    assert.lengthOf(subComponent, 1, 'The sub component should be rendered')
    testSuiteHelpers.assertWrapperProperties(subComponent, {
      storagePlugin: enzymeWrapper.state().parsedStoragePlugin,
    }, 'Container data is not correctly reported')
  })
})
