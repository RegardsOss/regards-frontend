/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import IconButton from 'material-ui/IconButton'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ShowOrderDatasetsComponent from '../../../../src/components/orders/options/ShowOrderDatasetsComponent'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test ShowOrderDatasetsComponent
* @author Raphaël Mechali
*/
describe('[Order Common] Testing ShowOrderDatasetsComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ShowOrderDatasetsComponent)
  })
  it('should render correctly', () => {
    const props = {
      onSelectOrder: () => { },
    }
    const enzymeWrapper = shallow(<ShowOrderDatasetsComponent {...props} />, { context })
    const buttonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be a button')
    assert.isDefined(buttonWrapper.props().title, 'There should be a tooltip')
    assert.equal(buttonWrapper.props().onClick, props.onSelectOrder, 'Calback should be correctly reported')
  })
})
