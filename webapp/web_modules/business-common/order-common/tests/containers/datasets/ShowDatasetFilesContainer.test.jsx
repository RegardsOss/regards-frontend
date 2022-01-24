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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { OrdersNavigationActions } from '../../../src/model/OrdersNavigationActions'
import ShowDatasetFilesComponent from '../../../src/components/datasets/ShowDatasetFilesComponent'
import { ShowDatasetFilesContainer } from '../../../src/containers/datasets/ShowDatasetFilesContainer'
import { SOME_ORDERS } from '../../dumps/Orders.dumb'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test ShowDatasetFilesContainer
* @author Raphaël Mechali
*/
describe('[Order Common] Testing ShowDatasetFilesContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ShowDatasetFilesContainer)
  })
  it('should render correctly', () => {
    const props = {
      entity: SOME_ORDERS.content[0].content.datasetTasks[0],
      navigationActions: new OrdersNavigationActions('any'),
      dispatchShowDatasetFiles: () => { },
    }
    const enzymeWrapper = shallow(<ShowDatasetFilesContainer {...props} />, { context })
    const component = enzymeWrapper.find(ShowDatasetFilesComponent)
    assert.lengthOf(component, 1, 'The component should be rendered')
    assert.equal(component.props().onShowDatasetFiles, props.dispatchShowDatasetFiles, 'callback should be correctly set up')
  })
})
