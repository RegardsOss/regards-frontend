/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import AIPListFiltersComponent from '../../../src/components/aip/AIPListFiltersComponent'
import styles from '../../../src/styles'
import { storage1, storage2 } from '../../dumps/DataStorages.dump'

const context = buildTestContext(styles)

/**
 * Test AIPListFiltersComponent
 * @author Raphaël Mechali
 */
describe('[ADMIN STORAGE AIP MANAGEMENT] Testing AIPListFiltersComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AIPListFiltersComponent)
  })
  it('should render correctly and initialize search filters', () => {
    const spiedApplyFilter = {
      count: 0,
      filters: null,
    }
    const props = {
      initialFilters: {
        providerId: 'xxx',
        aipId: 'yyy',
        // TODO add here dates, tags and storages when it works...
      },
      isEmptySelection: false,
      sessionTags: ['s01', 's02'],
      searchingSessionTags: false,
      dataStorages: [storage2, storage1],

      onApplyFilters: (filters) => {
        spiedApplyFilter.count += 1
        spiedApplyFilter.filters = filters
      },
      openAddTagModal: () => {},
      openRemoveTagModal: () => {},
    }
    shallow(<AIPListFiltersComponent {...props} />, { context })

    // Check the state was initially applied
    assert.deepEqual(spiedApplyFilter, {
      count: 1,
      filters: {
        providerId: 'xxx',
        aipId: '%yyy%', // added automatically, means 'includes'
      },
    }, 'Apply filters should have been invoked once with reight parameters')
    // Nota: that component exports an array, which is hardly compatible with enzyme for more complex tests
  })
})
