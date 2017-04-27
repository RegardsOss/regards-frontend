/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { Table } from 'material-ui/Table'
import { IntlStub } from '@regardsoss/tests-helpers'
import { ChartAdapter } from '@regardsoss/adapters'
import StoragePluginCapacityComponent from '../../src/components/StoragePluginCapacityComponent'
import styles from '../../src/styles/styles'
import StorageCapacity from '../../src/helper/StorageCapacity'

describe('[STORAGE PLUGINS MONITORING] Testing StoragePluginCapacityComponent', () => {
  it('should exists', () => {
    assert.isDefined(StoragePluginCapacityComponent)
  })
  // define context
  let unknownCount = 0
  const unknownTextKey = 'archival.storage.capacity.monitoring.capacity.unknown'
  const context = {
    intl: Object.assign({}, IntlStub, {
      // replace formatMessage to spy it
      formatMessage: (message) => {
        // mark unknown instance count
        if (message.id === unknownTextKey) {
          unknownCount += 1
        }
        return message.id
      },
    }),
    muiTheme: {
      palette: {
        textColor: {},
        canvas: {},
      },
      card: {},
      muiTheme: {
        palette: {
          textColor: {},
          canvas: {},
        },
        appBar: {
          textColor: {},
        },
      },
    },
    moduleTheme: styles({}),
  }

  it('Should render properly', () => {
    const enzymeWrapper = shallow(<StoragePluginCapacityComponent
      label="A label" description="A description"
      totalSize={StorageCapacity.fromValue('10To')}
      usedSize={StorageCapacity.fromValue('2To')}
    />, { context })

    // check one table is built for the plugin
    expect(enzymeWrapper.find(Table)).to.have.length(1)
    // check one pie chart is built for the plugin
    expect(enzymeWrapper.find(ChartAdapter)).to.have.length(1)
    // assert there was no unknown
    assert.equal(unknownCount, 0, 'There should be no unknown values here')
  })

  it('Should internationalize unknown values', () => {
    shallow(<StoragePluginCapacityComponent
      label="A label"
      description="A description"
      totalSize={null}
      usedSize={null}
    />, { context })

    // check text is marked as unknown 3 times (total, unused and used size columns)
    assert.equal(unknownCount, 3, 'There should be 3 unknown values internationalize here')
  })
})
