/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import DeleteDatasetSelectionComponent from '../../../../src/components/user/options/DeleteDatasetSelectionComponent'
import { DeleteDatasetSelectionContainer } from '../../../../src/containers/user/options/DeleteDatasetSelectionContainer'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test DeleteDatasetSelectionContainer
* @author Raphaël Mechali
*/
describe('[Order Cart] Testing DeleteDatasetSelectionContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DeleteDatasetSelectionContainer)
  })
  it('should render correctly', () => {
    const props = {
      disabled: false,
      datasetSelectionId: 5,
      dispatchDelete: () => { },
    }
    const enzymeWrapper = shallow(<DeleteDatasetSelectionContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(DeleteDatasetSelectionComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the corresponding component')
    assert.equal(componentWrapper.props().onDelete, props.dispatchDelete, 'The component callback should be correctly set up')
    assert.equal(componentWrapper.props().disabled, props.disabled, 'The component disabled state should be correctly reported')
  })
})
