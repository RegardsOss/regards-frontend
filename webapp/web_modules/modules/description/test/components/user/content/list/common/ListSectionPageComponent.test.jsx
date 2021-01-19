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
import ListSectionPageComponent from '../../../../../../src/components/user/content/list/common/ListSectionPageComponent'
import styles from '../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test ListSectionPageComponent
 * @author Raphaël Mechali
 * @author Théo Lasserre
 */
describe('[Description] Testing ListSectionPageComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ListSectionPageComponent)
  })
  it('should render correctly', () => {
    const props = {
      elements: ['a', 'b', 'c'],
      scrollAreaHeight: 760,
      buildElementNode: (elt) => <div key={elt} id={elt} />,
    }
    const enzymeWrapper = shallow(<ListSectionPageComponent {...props} />, { context })
    props.elements.forEach((elt) => {
      const eltComponent = enzymeWrapper.findWhere((n) => n.props().id === elt)
      assert.lengthOf(eltComponent, 1, 'There should be element render, based on buildElementNode')
    })
  })
})
