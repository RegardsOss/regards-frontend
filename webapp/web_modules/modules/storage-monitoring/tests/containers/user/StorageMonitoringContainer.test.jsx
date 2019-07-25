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
import { expect, assert } from 'chai'
import { storage } from '@regardsoss/units'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { StorageMonitoringContainer } from '../../../src/containers/user/StorageMonitoringContainer'
import StorageMonitoringComponent from '../../../src/components/user/StorageMonitoringComponent'
import { dump } from '../../dump/dump'

// Test a component rendering
describe('[Storage Monitoring] Testing StorageMonitoringContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(StorageMonitoringContainer)
  })
  const props = {
    userApp: true,
    scale: storage.StorageUnitScale.bytesScale,
    isFetching: false, // from mapStateToProps
    hasError: false,
    storagePlugins: dump, // from mapDispatchToProps
    fetchStoragePlugins: () => {
    },
  }

  it('should render self and component sub component in nominal case', () => {
    const enzymeWrapper = shallow(<StorageMonitoringContainer {...props} />)
    const mainComponent = enzymeWrapper.find(StorageMonitoringComponent)
    expect(mainComponent).to.have.length(1)
    assert.isFalse(mainComponent.props().isFetching, 'The component should not be fetching')
    assert.isFalse(mainComponent.props().hasError, 'The component should show no error')
    assert.isTrue(mainComponent.props().userApp, 'The component should be marked in user app')
  })

  it('should render self and component sub component in admin app', () => {
    const localProps = { ...props, userApp: false }
    const enzymeWrapper = shallow(<StorageMonitoringContainer {...localProps} />)
    const mainComponent = enzymeWrapper.find(StorageMonitoringComponent)
    expect(mainComponent).to.have.length(1)
    assert.isFalse(mainComponent.props().isFetching, 'The component should not be fetching')
    assert.isFalse(mainComponent.props().hasError, 'The component should show no error')
    assert.isFalse(mainComponent.props().userApp, 'The component should be marked in admin app')
  })

  it('should show loading when loading', () => {
    const localProps = { ...props, isFetching: true }
    const enzymeWrapper = shallow(<StorageMonitoringContainer {...localProps} />)
    const mainComponent = enzymeWrapper.find(StorageMonitoringComponent)
    assert.isTrue(mainComponent.props().isFetching)
    assert.isFalse(mainComponent.props().hasError)
  })

  it('should show error when there is one', () => {
    const localProps = { ...props, hasError: true }
    const enzymeWrapper = shallow(<StorageMonitoringContainer {...localProps} />)
    const mainComponent = enzymeWrapper.find(StorageMonitoringComponent)
    assert.isFalse(mainComponent.props().isFetching)
    assert.isTrue(mainComponent.props().hasError)
  })
})
