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
import omit from 'lodash/omit'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'
import { ListViewEntityCellContainer } from '../../../../../src/containers/user/results/cells/ListViewEntityCellContainer'
import ListViewEntityCellComponent from '../../../../../src/components/user/results/cells/ListViewEntityCellComponent'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

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
      entity: {
        content: {
          id: 1,
          ipId: 'coucou',
          sipId: '1',
          label: 'O.D.I.L',
          entityType: ENTITY_TYPES_ENUM.DATASET,
          files: [],
          geometry: null,
          properties: {},
          tags: [],
          services: [],
        },
      },

      attributes: {},
      lineHeight: 20,
      isTableSelected: false,
      selectTableEntityCallback: () => { },
      tableColumns: [],
      onSearchEntity: () => { },
      displayCheckbox: true,
      enableServices: true,

      // from map dispatch to props
      dispatchShowDescription: () => { },
      dispatchRunService: () => { },
    }
    const render = shallow(<ListViewEntityCellContainer {...props} />, { context })
    const component = render.find(ListViewEntityCellComponent)
    assert.lengthOf(render, 1, 'There should be a render component')
    testSuiteHelpers.assertWrapperProperties(component, {
      // all previous props are reported, expected dispatchers and onSearchEntity callback (locally wrapped callbacks)
      ...(omit(props, ['dispatchShowDescription', 'dispatchRunService', 'onSearchEntity', 'onAddToCart'])),
      // also check local callbacks
      onEntitySelection: render.instance().onEntitySelection, // should be provided as there is an onClick handler
      onShowDescription: render.instance().onShowDescription,
      onServiceStarted: render.instance().onServiceStarted,
      onAddToCart: render.instance().onAddToCart,
    }, 'The container should report corretly properties to its component')
  })
})
