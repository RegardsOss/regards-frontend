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
import { assert } from 'chai'
import { Table, TableRow } from 'material-ui/Table'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { storage } from '@regardsoss/units'
import StoragePluginComponent from '../../src/components/StoragePluginComponent'
import PhysicalStorageChartComponent from '../../src/components/PhysicalStorageChartComponent'

import styles from '../../src/styles/styles'
import { convertedParsableDevice, convertedNonParsableDevice } from '../dump/dump'

const context = buildTestContext(styles)

describe('[STORAGE PLUGINS MONITORING] Testing StoragePluginComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(StoragePluginComponent)
  })

  it('Should render properly both parsed and unparsed data', () => {
    const props = {
      label: 'A plugin',
      description: 'A plugin description',
      storageInfo: [convertedParsableDevice, convertedNonParsableDevice],
      selectedStorageIndex: 1,
      onStorageRowSelected: () => { },
    }
    const enzymeWrapper = shallow(<StoragePluginComponent {...props} />, { context })

    // check one table is built for the plugin
    const tableWrapper = enzymeWrapper.find(Table)
    assert.lengthOf(tableWrapper, 1, 'There should be the devices table')
    const rowsWrapper = tableWrapper.find(TableRow)
    // check the rows count (1 for header + storage info count) and the selected row
    assert.lengthOf(rowsWrapper, props.storageInfo.length + 1, 'There should one row for each device and 1 for header')
    // check by row that parsed data is internationalized and that the right row is selected (not any other)
    rowsWrapper.forEach((rowWrapper, index) => {
      if (index > 0) { // ignore header
        if (index - 1 === props.selectedStorageIndex) {
          assert.isTrue(rowWrapper.props().selected, `Row at index ${index} should be selected (see props)`)
        } else {
          assert.isFalse(rowWrapper.props().selected, `Row at index ${index} should not be selected (see props)`)
        }
        assert.lengthOf(rowWrapper.find(storage.FormattedStorageCapacity), 3, 'Total, used and unused sizes should be internationalized')
      }
    })

    // check the chart
    const chartWrapper = enzymeWrapper.find(PhysicalStorageChartComponent)
    assert.lengthOf(chartWrapper, 1, 'There should be the chart wrapper')
    testSuiteHelpers.assertWrapperProperties(chartWrapper, {
      physicalStorage: props.storageInfo[props.selectedStorageIndex],
    }, 'The right selected storage data should be provided to chart')
  })
})
