/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import values from 'lodash/values'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { OrderClient } from '@regardsoss/client'
import {
  PageableInfiniteTableContainer, AutoRefreshPageableTableHOC, TableLayout, TableColumnsVisibilityOption,
} from '@regardsoss/components'
import DatasetFilesComponent from '../../../src/components/files/DatasetFilesComponent'
import OrderDatasetsCountHeaderMessage from '../../../src/components/files/OrderDatasetsCountHeaderMessage'
import styles from '../../../src/styles/styles'
import { SOME_FILES } from '../../dumps/Files.dump'

const context = buildTestContext(styles)

/**
* Test DatasetFilesComponent
* @author Raphaël Mechali
*/
describe('[Order Common] Testing DatasetFilesComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetFilesComponent)
  })
  it('should render correctly no data', () => {
    const props = {
      isFetching: false,
      totalFilesCount: 0,
      pathParams: { any: 'a simple marker' },
      orderFilesActions: new OrderClient.OrderDatasetFilesActions('any'),
      orderFilesSelectors: OrderClient.getOrderDatasetFilesSelectors(['idk']),
      columnsVisibility: {},
      onChangeColumnsVisibility: () => { },
    }
    const enzymeWrapper = shallow(<DatasetFilesComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(TableLayout), 1, 'Table layout should be set')
    assert.lengthOf(enzymeWrapper.find(OrderDatasetsCountHeaderMessage), 1, 'There should be the header message')
    assert.lengthOf(enzymeWrapper.find(AutoRefreshPageableTableHOC), 1, 'There should be the auto refresh data HOC')
    assert.lengthOf(enzymeWrapper.find(TableColumnsVisibilityOption), 1, 'There should be the column visibiltiy option')

    const tableWrapper = enzymeWrapper.find(PageableInfiniteTableContainer)
    assert.lengthOf(tableWrapper, 1, 'There should be an infinite table')
    assert.deepEqual(tableWrapper.props().pageActions, props.orderFilesActions, 'actions should be correctly reported')
    assert.deepEqual(tableWrapper.props().pageSelectors, props.orderFilesSelectors, 'selectors should be correctly reported')
    assert.deepEqual(tableWrapper.props().pathParams, props.pathParams, 'path parameters should be correctly reported')
  })

  it('should render correctly with data', () => {
    const props = {
      isFetching: false,
      totalFilesCount: 45,
      pathParams: { any: 'a simple marker' },
      orderFilesActions: new OrderClient.OrderDatasetFilesActions('any'),
      orderFilesSelectors: OrderClient.getOrderDatasetFilesSelectors(['idk']),
      columnsVisibility: {},
      onChangeColumnsVisibility: () => { },
    }
    const enzymeWrapper = shallow(<DatasetFilesComponent {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(TableLayout), 1, 'Table layout should be set')
    assert.lengthOf(enzymeWrapper.find(OrderDatasetsCountHeaderMessage), 1, 'There should be the header message')
    assert.lengthOf(enzymeWrapper.find(AutoRefreshPageableTableHOC), 1, 'There should be the auto refresh data HOC')
    assert.lengthOf(enzymeWrapper.find(TableColumnsVisibilityOption), 1, 'There should be the column visibiltiy option')

    const tableWrapper = enzymeWrapper.find(PageableInfiniteTableContainer)
    assert.lengthOf(tableWrapper, 1, 'There should be an infinite table')
    assert.deepEqual(tableWrapper.props().pageActions, props.orderFilesActions, 'actions should be correctly reported')
    assert.deepEqual(tableWrapper.props().pageSelectors, props.orderFilesSelectors, 'selectors should be correctly reported')
    assert.deepEqual(tableWrapper.props().pathParams, props.pathParams, 'path parameters should be correctly reported')
  })
  it('recover data from entities correctly', () => {
    // test if the component extracts correctly data for objects
    const allFiles = values(SOME_FILES.content)
    allFiles.forEach((fileDef) => {
      assert.isDefined(DatasetFilesComponent.getFileName(fileDef), `Name could not be retrieved in file ${fileDef.content.id}`)
      assert.isDefined(DatasetFilesComponent.getStatus(fileDef), `Status could not be retrieved in file ${fileDef.content.id}`)
      assert.isDefined(DatasetFilesComponent.getSource(fileDef), `Source could not be retrieved in file ${fileDef.content.id}`)
    })
  })
})
