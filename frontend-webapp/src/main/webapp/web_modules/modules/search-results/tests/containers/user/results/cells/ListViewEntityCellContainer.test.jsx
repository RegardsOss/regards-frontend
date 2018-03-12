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
import { ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'
import { TableSelectionModes } from '@regardsoss/components'
import { ListViewEntityCellContainer, packGridAttributesRenderData } from '../../../../../src/containers/user/results/cells/ListViewEntityCellContainer'
import ListViewEntityCellComponent from '../../../../../src/components/user/results/cells/ListViewEntityCellComponent'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

const someModels = [
  {
    key: '1', label: 'L1', attributes: [], enableSorting: true, sortOrder: '',
  },
  {
    key: '2', label: 'L2', attributes: [], enableSorting: true, sortOrder: '',
  },
  {
    key: '3', label: 'L3', attributes: [], enableSorting: true, sortOrder: '',
  },
  {
    key: '4', label: 'L4', attributes: [], enableSorting: true, sortOrder: '',
  },
]

/**
 * Test ListViewEntityCellContainer
 * @author Raphaël Mechali
 */
describe('[Search Results] Testing ListViewEntityCellContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ListViewEntityCellContainer)
  })
  it('should render properly', () => {
    const props = {
      // table cell API
      rowIndex: 1,
      entity: {
        content: {
          id: 1,
          ipId: 'coucou',
          sipId: '1',
          label: 'O.D.I.L',
          entityType: ENTITY_TYPES_ENUM.DATASET,
          files: {},
          geometry: null,
          properties: {},
          tags: [],
          services: [],
        },
      },
      projectName: 'project1',
      accessToken: 'abcdef....',

      // cell props
      enableDownload: true,
      thumbnailRenderData: null,
      gridAttributesRenderData: packGridAttributesRenderData(someModels),
      selectionEnabled: true,
      servicesEnabled: true,
      onSearchEntity: () => { },
      onAddToCart: () => { },

      // from map state to props
      toggledElements: {},
      selectionMode: TableSelectionModes.includeSelected,
      onSelectEntity: () => { },
    }
    const render = shallow(<ListViewEntityCellContainer {...props} />, { context })
    const component = render.find(ListViewEntityCellComponent)
    assert.lengthOf(component, 1, 'There should be a render component')
  })
})
