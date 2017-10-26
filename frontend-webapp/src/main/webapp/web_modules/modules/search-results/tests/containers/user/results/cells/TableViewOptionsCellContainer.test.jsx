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
import { TableViewOptionsCellContainer } from '../../../../../src/containers/user/results/cells/TableViewOptionsCellContainer'
import TableViewOptionsCellComponent from '../../../../../src/components/user/results/cells/TableViewOptionsCellComponent'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test TableViewOptionsCellContainer
 * @author Raphaël Mechali
 */
describe('[Search Results] Testing TableViewOptionsCellContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TableViewOptionsCellContainer)
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
          files: {},
          geometry: null,
          properties: {},
          tags: [],
        },
      },
      enableServices: true,
      dispatchShowDescription: () => { },
      dispatchRunService: () => { },
      onAddToCart: () => { },
    }
    const render = shallow(<TableViewOptionsCellContainer {...props} />, { context })
    const component = render.find(TableViewOptionsCellComponent)
    assert.lengthOf(component, 1, 'The container should use a component to render')
    testSuiteHelpers.assertWrapperProperties(component, {
      onShowDescription: render.instance().onShowDescription,
      onServiceStarted: render.instance().onServiceStarted,
      onAddToCart: render.instance().onAddToCart,
    }, 'The container should provider the right properties to the render component')
  })
})
