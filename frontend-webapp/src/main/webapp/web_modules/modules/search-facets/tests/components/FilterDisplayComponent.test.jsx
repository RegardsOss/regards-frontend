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
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import FilterDisplayComponent from '../../src/components/FilterDisplayComponent'

import styles from '../../src/styles/styles'

describe('[SEARCH FACETS] Testing FilterDisplayComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FilterDisplayComponent)
  })
  const context = buildTestContext(styles)

  it('should render properly', () => {
    const props = {
      filter: {
        filterLabel: 'any',
        filterKey: 'any',
        openSearchQuery: ' any',
      },
      deleteFilter: () => { },
    }
    // simple render test (nothing static to test here)
    shallow(<FilterDisplayComponent {...props} />, { context })
  })
})
