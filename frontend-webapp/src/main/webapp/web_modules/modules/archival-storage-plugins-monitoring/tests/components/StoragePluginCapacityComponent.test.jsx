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
import { expect, assert } from 'chai'
import { Table } from 'material-ui/Table'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { storage } from '@regardsoss/units'
import { ChartAdapter } from '@regardsoss/adapters'
import StoragePluginCapacityComponent from '../../src/components/StoragePluginCapacityComponent'
import styles from '../../src/styles/styles'


const context = buildTestContext(styles)

describe('[STORAGE PLUGINS MONITORING] Testing StoragePluginCapacityComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(StoragePluginCapacityComponent)
  })

  it('Should render properly', () => {
    const enzymeWrapper = shallow(<StoragePluginCapacityComponent
      label="A label"
      description="A description"
      totalSize={storage.StorageCapacity.fromValue('10To')}
      usedSize={storage.StorageCapacity.fromValue('2To')}
    />, { context })

    // check one table is built for the plugin
    expect(enzymeWrapper.find(Table)).to.have.length(1)
    // check one pie chart is built for the plugin
    expect(enzymeWrapper.find(ChartAdapter)).to.have.length(1)
    // there should be 3 capacity formatters
    const capacityFormatters = enzymeWrapper.find(storage.FormattedStorageCapacity)
    assert(capacityFormatters.length, 3, 'There should be 3 capacity formatters')
    // they should all be defined
    capacityFormatters.forEach((formatter, index) => {
      assert.isOk(formatter.props().capacity, `The formatter capacity should be defined at ${index}`)
    })
  })

  it('Should render unknown values', () => {
    const enzymeWrapper = shallow(<StoragePluginCapacityComponent
      label="A label"
      description="A description"
      totalSize={null}
      usedSize={null}
    />, { context })

    const capacityFormatters = enzymeWrapper.find(storage.FormattedStorageCapacity)
    assert(capacityFormatters.length, 3, 'There should be 3 capacity formatters')
    // check that all capacities are unknown
    const firstDefinedElement = capacityFormatters.map(formatter => formatter.props().capacity).find(capacity => !!capacity)
    assert.isNotOk(firstDefinedElement, `There should be no capacity defined but we have found ${firstDefinedElement}`)
  })
})
