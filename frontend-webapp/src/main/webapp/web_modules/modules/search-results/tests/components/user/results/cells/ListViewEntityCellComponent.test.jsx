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
import { CatalogEntityTypes } from '@regardsoss/model'
import ListViewEntityCellComponent from '../../../../../src/components/user/results/cells/ListViewEntityCellComponent'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Search Results] Testing ListViewEntityCellComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ListViewEntityCellComponent)
  })
  it('should render properly', () => {
    const props = {
      entity: {
        content: {
          id: 1,
          ipId: 'coucou',
          sipId: '1',
          label: 'O.D.I.L',
          entityType: CatalogEntityTypes.DATASET,
          files: [],
          geometry: null,
          properties: {},
          tags: [],
        },
      },
      attributes: {},
      lineHeight: 20,
      isTableSelected: false,
      selectTableEntityCallback: () => { },
      tableColumns: [],
      onSearchTag: () => { },
      onClick: () => { },
      styles: context.moduleTheme.user.listViewStyles,
      displayCheckBoxes: true,
      onShowDescription: () => { },
    }
    shallow(<ListViewEntityCellComponent {...props} />, { context })
  })
})
