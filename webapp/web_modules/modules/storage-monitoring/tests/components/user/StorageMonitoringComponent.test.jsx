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
 */
import { shallow } from 'enzyme'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { assert } from 'chai'
import { storage } from '@regardsoss/units'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import StorageMonitoringComponent from '../../../src/components/user/StorageMonitoringComponent'
import StoragePluginContainer from '../../../src/containers/user/StoragePluginContainer'
import styles from '../../../src/styles/styles'
import { dump } from '../../dump/dump'

const context = buildTestContext(styles)

describe('[Storage Monitoring] Testing StorageMonitoringComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(StorageMonitoringComponent)
  })
  it('should render storage plugins in nominal case', () => {
    // initialize properties
    const props = {
      userApp: true,
      scale: storage.StorageUnitScale.bytesScale,
      storagePlugins: dump,
      isFetching: false,
      hasError: false,
    }

    const enzymeWrapper = shallow(<StorageMonitoringComponent {...props} />, { context })

    // check rendering state:
    const displayableComponent = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.isFalse(displayableComponent.props().isLoading, 'Loading should be false')
    assert.isFalse(displayableComponent.props().isContentError, 'isContentError should be false')
    assert.isFalse(displayableComponent.props().isEmpty, 'Empty content should be false')

    // cannot check plugins container as they are inside a Measure (lazy function)
  })

  it('should render storage plugins in admin app', () => {
    // initialize properties
    const props = {
      userApp: false,
      scale: storage.StorageUnitScale.bytesScale,
      storagePlugins: dump,
      isFetching: false,
      hasError: false,
    }

    shallow(<StorageMonitoringComponent {...props} />, { context })
  })

  it('should render correctly in loading / error / empty states', () => {
    const props = {
      userApp: true,
      scale: storage.StorageUnitScale.bytesScale,
      storagePlugins: {},
      isFetching: true,
      hasError: true,
    }
    // is rendering ok?
    const enzymeWrapper = shallow(<StorageMonitoringComponent {...props} />, { context })
    // is marked as loading?
    const displayableComponent = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.isTrue(displayableComponent.props().isLoading, 'Loading should be true')
    assert.isTrue(displayableComponent.props().isContentError, 'isContentError should be true')
    assert.isTrue(displayableComponent.props().isEmpty, 'Empty content should be true')
    assert.lengthOf(enzymeWrapper.find(StoragePluginContainer), 0, 'There should be no plugin container')
  })
})
