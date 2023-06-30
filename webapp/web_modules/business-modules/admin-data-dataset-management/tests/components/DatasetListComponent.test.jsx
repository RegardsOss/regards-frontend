/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { PageableInfiniteTableContainer } from '@regardsoss/components'
import DatasetListComponent from '../../src/components/DatasetListComponent'
import DatasetListFiltersComponent from '../../src/components/DatasetListFiltersComponent'

const context = buildTestContext()

describe('[ADMIN DATASET MANAGEMENT] Testing DatasetListComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetListComponent)
  })
  it('Render properly', () => {
    const props = {
      datasetList: DumpProvider.get('DataManagementClient', 'Dataset'),
      handleDelete: () => {},
      handleEdit: () => {},
      onRefresh: () => {},
      navigateToCreateDataset: () => {},
      createUrl: '#',
      backUrl: '#',
    }
    const enzymeWrapper = shallow(<DatasetListComponent {...props} />, { context })
    const table = enzymeWrapper.find(PageableInfiniteTableContainer)
    const filters = enzymeWrapper.find(DatasetListFiltersComponent)
    assert.isTrue(table.length === 1, 'There should be a TableContainer rendered')
    assert.isTrue(filters.length === 1, 'There should be a Dataset list filter rendered')
  })
})
