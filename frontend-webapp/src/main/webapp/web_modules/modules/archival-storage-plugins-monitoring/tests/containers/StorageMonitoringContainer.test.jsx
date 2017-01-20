import { shallow } from 'enzyme'
import { expect, assert } from 'chai'

import { StorageMonitoringContainer } from '../../src/containers/StorageMonitoringContainer'
import StorageMonitoringComponent from '../../src/components/StorageMonitoringComponent'

// Test a component rendering
describe('[STORAGE PLUGINS MONITORING] Testing plugins monitoring container', () => {
  it('should exists', () => {
    assert.isDefined(StorageMonitoringContainer)
  })
  const props = {
    appName: 'any', // from mapStateToProps
    isFetching: false, // from mapStateToProps
    storagePlugins: {
      1: {
        content: {
          id: 1,
          label: 'Test plugin',
          description: 'This is a test plugin',
          totalSize: '80To',
          usedSize: '10To',
        },
      },
    }, // from mapDispatchToProps
    fetchStoragePlugins: () => {
    },
  }
  it('should render self and component sub component in nominal case', () => {
    const enzymeWrapper = shallow(<StorageMonitoringContainer {...props} />)
    const mainComponent = enzymeWrapper.find(StorageMonitoringComponent)
    expect(mainComponent).to.have.length(1)
    assert.isFalse(mainComponent.props().isFetching)
    assert.isFalse(mainComponent.props().error)
  })

  it('should show loading when loading', () => {
    const localProps = { ...props, isFetching: true }
    const enzymeWrapper = shallow(<StorageMonitoringContainer {...localProps} />)
    const mainComponent = enzymeWrapper.find(StorageMonitoringComponent)
    assert.isTrue(mainComponent.props().isFetching)
    assert.isFalse(mainComponent.props().error)
  })
  it('should show error when there is one', () => {
    const localProps = { ...props, error: 'Test error' }
    const enzymeWrapper = shallow(<StorageMonitoringContainer {...localProps} />)
    const mainComponent = enzymeWrapper.find(StorageMonitoringComponent)
    assert.isFalse(mainComponent.props().isFetching)
    assert.isTrue(mainComponent.props().error)
  })
})
