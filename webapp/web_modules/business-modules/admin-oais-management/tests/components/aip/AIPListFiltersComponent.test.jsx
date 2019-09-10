/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
describe('[OAIS AIP MANAGEMENT] Testing AIPListFiltersComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AIPListFiltersComponent)
  })
  it('should render correctly', () => {
    const props = {
      currentFilters: {
        state: 'VALID',
      },
      isEmptySelection: false,
      sessionTags: ['s01', 's02'],
      searchingSessionTags: false,
      dataStorages: [storage2, storage1],

      onApplyFilters: (filters) => {},
      openAddTagModal: () => {},
      openRemoveTagModal: () => {},
    }
    shallow(<AIPListFiltersComponent {...props} />, { context })
  })
})
