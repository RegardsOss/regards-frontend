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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { TableSelectionModes, TableSelectAllOption } from '@regardsoss/components'
import { selectors as searchEntitiesSelectors } from '../../../../../src/clients/SearchEntitiesClient'
import { TableSelectAllContainer } from '../../../../../src/containers/user/results/options/TableSelectAllContainer'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search results] Testing TableSelectAllContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TableSelectAllContainer)
  })
  it('should render properly', () => {
    const props = {
      pageSelectors: searchEntitiesSelectors,
      pageMetadata: {
        number: 40,
        size: 40,
        totalElements: 168000,
      },
      toggledElements: {},
      selectionMode: TableSelectionModes.includeSelected,
      dispatchSelectAll: () => { },
      dispatchUnselectAll: () => { },
    }
    // 1 - render with none selected
    const enzymeWrapper = shallow(<TableSelectAllContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(TableSelectAllOption), 1, 'The corresponding component should be rendered')

    // 2 - render with all selected
    const nextProps = {
      ...props,
      selectionMode: TableSelectionModes.excludeSelected,
    }
    shallow(<TableSelectAllContainer {...nextProps} />, { context })
  })
})
