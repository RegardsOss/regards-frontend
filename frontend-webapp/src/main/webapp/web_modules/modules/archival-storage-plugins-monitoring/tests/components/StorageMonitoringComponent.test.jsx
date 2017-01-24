/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import StorageMonitoringComponent from '../../src/components/StorageMonitoringComponent'
import StoragePluginCapacityComponent from '../../src/components/StoragePluginCapacityComponent'
import { bitsScale } from '../../src/helper/StorageUnit'
import { capacityFromValue } from '../../src/helper/StorageCapacity'

describe('[STORAGE PLUGINS MONITORING] Testing StorageMonitoringComponent', () => {
  it('should exists', () => {
    assert.isDefined(StorageMonitoringComponent)
  })
  // define context
  const context = {
    intl: {
      formatMessage: message => message,
      formatDate: date => date,
    },
    muiTheme: {
      palette: {
        textColor: {},
        canvas: {},
      },
      appBar: {
        textColor: {},
      },
    },
  }

  it('should render storage plugins in nominal case, with parsing errors', () => {
    // initialize properties
    const props = {
      initScale: bitsScale,
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
      if (capacityFromValue(plugin.usedSize)) {
        assert.isOk(usedSize)
      } else {
        assert.isNotOk(usedSize)
      }
      if (capacityFromValue(plugin.totalSize)) {
        assert.isOk(totalSize)
      } else {
        assert.isNotOk(totalSize)
      }
    })
  })

  it('should render correctly in loading / error / empty states', () => {
    const props = {
      initScale: bitsScale,
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
