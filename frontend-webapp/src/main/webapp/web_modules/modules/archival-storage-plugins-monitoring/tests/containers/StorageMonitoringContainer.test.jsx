import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { StorageMonitoringContainer } from '../../src/containers/StorageMonitoringContainer'
import StorageMonitoringComponent from '../../src/components/StorageMonitoringComponent'

// Test a component rendering
describe('[STORAGE PLUGINS MONITORING] Testing plugins monitoring container', () => {
  it('should exists', () => {
    assert.isDefined(StorageMonitoringContainer)
  })
  const props = {
    appName: 'any', // from mapStateToProps
    isFetching: false,
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
    expect(enzymeWrapper.find(StorageMonitoringComponent)).to.have.length(1)
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading).to.equal(false)
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isEmpty).to.equal(false)
  })

  it('should show loading when loading', () => {
    const localProps = { ...props, isFetching: true }
    const enzymeWrapper = shallow(<StorageMonitoringContainer {...localProps} />)
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading).to.equal(true)
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isEmpty).to.equal(false)
  })
  it('should show no data when there is no data', () => {
    const localProps = { ...props, storagePlugins: {} }
    const enzymeWrapper = shallow(<StorageMonitoringContainer {...localProps} />)
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading).to.equal(false)
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isEmpty).to.equal(true)
  })

})
