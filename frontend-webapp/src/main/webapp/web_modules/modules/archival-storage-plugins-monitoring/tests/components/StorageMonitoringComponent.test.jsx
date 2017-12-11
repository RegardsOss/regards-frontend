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
 */
import { shallow } from 'enzyme'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { expect, assert } from 'chai'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import StorageMonitoringComponent from '../../src/components/StorageMonitoringComponent'
import StoragePluginCapacityComponent from '../../src/components/StoragePluginCapacityComponent'
import StorageCapacity from '../../src/helper/StorageCapacity'
import StorageUnitScale from '../../src/helper/StorageUnit'


describe('[STORAGE PLUGINS MONITORING] Testing StorageMonitoringComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(StorageMonitoringComponent)
  })
  // define context
  const context = {
    initScale: StorageUnitScale.bytesScale,
    ...buildTestContext(),
  }

  it('should render storage plugins in nominal case, with parsing errors', () => {
    // initialize properties
    const props = {
      storagePlugins: [{
        id: 1,
        label: 'Plugin1',
        description: 'storage plugin 1',
        totalSize: '10 To',
        usedSize: '5 To',
      }, {
        id: 2,
        label: 'Plugin2',
        description: 'storage plugin 2',
        totalSize: '5 Tio',
        usedSize: '0gb',
      }, {
        id: 3,
        label: 'Plugin3',
        description: 'storage plugin 3',
        totalSize: '8Txxo',
        usedSize: 'ddOp',
      }],
    }

    const enzymeWrapper = shallow(<StorageMonitoringComponent {...props} />, { context })

    // check rendering state:
    const displayableComponent = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.isFalse(displayableComponent.props().isLoading, 'Loading should be false')
    assert.isFalse(displayableComponent.props().isContentError, 'isContentError should be false')
    assert.isFalse(displayableComponent.props().isEmpty, 'Empty content should be false')

    // Check each storage plugin component is correctly built, according with model data
    const storagePluginsComponents = enzymeWrapper.find(StoragePluginCapacityComponent)
    expect(storagePluginsComponents).to.have.length(3)
    storagePluginsComponents.forEach((node, i) => {
      // check each
      const { label, description, usedSize, totalSize } = node.props()
      const plugin = props.storagePlugins[i]
      assert.equal(label, plugin.label)
      assert.equal(description, plugin.description)
      if (StorageCapacity.fromValue(plugin.usedSize)) {
        assert.isOk(usedSize)
      } else {
        assert.isNotOk(usedSize)
      }
      if (StorageCapacity.fromValue(plugin.totalSize)) {
        assert.isOk(totalSize)
      } else {
        assert.isNotOk(totalSize)
      }
    })
  })

  it('should render correctly in loading / error / empty states', () => {
    const props = {
      isFetching: true,
      hasError: true,
      storagePlugins: [],
    }
    // is rendering ok?
    const enzymeWrapper = shallow(<StorageMonitoringComponent {...props} />, { context })
    // is marked as loading?
    const displayableComponent = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.isTrue(displayableComponent.props().isLoading, 'Loading should be true')
    assert.isTrue(displayableComponent.props().isContentError, 'isContentError should be true')
    assert.isTrue(displayableComponent.props().isEmpty, 'Empty content should be true')
    expect(enzymeWrapper.find(StoragePluginCapacityComponent)).to.have.length(0)
  })
})
