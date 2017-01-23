/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import ChartAdapter from '@regardsoss/charts'
import { Table } from 'material-ui/Table'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import StorageMonitoringComponent from '../../src/components/StorageMonitoringComponent'
import { bitsScale } from '../../src/helper/StorageUnit'
import styles from '../../src/styles/styles'

describe('[STORAGE PLUGINS MONITORING] Testing component', () => {
  it('should exists', () => {
    assert.isDefined(StorageMonitoringComponent)
  })
  // define context
  const unknownSizeMsgId = 'archival.storage.capacity.monitoring.capacity.unknown'
  let unkSizeCount = 0
  const context = {
    intl: {
      formatMessage: (message) => {
        // increment unknown capacity messages
        unkSizeCount += message.id === unknownSizeMsgId ? 1 : 0
        return message.id
      },
    },
    muiTheme: {
      palette: {
        textColor: {},
        canvas: {},
      },
      appBar: {
        textColor: {},
      },
      card: {
        subtitleColor: {},
      },
    },
    moduleTheme: styles({}),
  }
  it('should render storage plugins in nominal case, with parsing errors', () => {
    // initialize properties
    const props = {
      initScale: bitsScale,
      isFecthing: false,
      hasError: false,
      storagePlugins: [{
        id: '1',
        label: 'Plugin1',
        description: 'storage plugin 1',
        totalSize: '10 To',
        usedSize: '5 To',
      }, {
        id: '2',
        label: 'Plugin2',
        description: 'storage plugin 2',
        totalSize: '5 Tio',
        usedSize: '0gb',
      }, {
        id: '3',
        label: 'Plugin3',
        description: 'storage plugin 3',
        totalSize: '8Txxo',
        usedSize: 'ddOp',
      }],
    }
    const enzymeWrapper = shallow(<StorageMonitoringComponent {...props} />, { context })
    // check one table is built for each plugin
    expect(enzymeWrapper.find(Table)).to.have.length(3)
    // check one pie chart is built for each plugin
    expect(enzymeWrapper.find(ChartAdapter)).to.have.length(3)
    // check that the last plugin is displayed as unknown for all last 3 columns (and not others)
    assert.equal(unkSizeCount, 3) // node: wrapper.findWhere(....text() ==> seems buggy in this cases!)

    // check rendering state:
    const displayableComponent = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.isFalse(displayableComponent.props().isLoading, 'Loading should be false')
    assert.isFalse(displayableComponent.props().error, 'Content error should be false')
    assert.isFalse(displayableComponent.props().isEmpty, 'Empty content should be false')
  })

  it('should render correctly in loading / error / empty states', () => {
    const props = {
      initScale: bitsScale,
      isFetching: true,
      error: true,
      storagePlugins: [],
    }
    // is rendering ok?
    const enzymeWrapper = shallow(<StorageMonitoringComponent {...props} />, { context })
    // is marked as loading?
    const displayableComponent = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.isTrue(displayableComponent.props().isLoading, 'Loading should be true')
    assert.isTrue(displayableComponent.props().error, 'Content error should be true')
    assert.isTrue(displayableComponent.props().isEmpty, 'Empty content should be true')
  })
})
