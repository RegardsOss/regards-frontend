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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import TagCellComponent from '../../../../../../src/components/user/tree/cells/links/TagCellComponent'
import TreeLinkComponent from '../../../../../../src/components/user/tree/cells/links/TreeLinkComponent'
import styles from '../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test TagCellComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing TagCellComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(TagCellComponent)
  })
  it('should render correctly a simple tag', () => {
    const props = {
      tag: 'MyCustomTag',
    }
    const enzymeWrapper = shallow(<TagCellComponent {...props} />, { context })
    const linkWrapper = enzymeWrapper.find(TreeLinkComponent)
    assert.lengthOf(linkWrapper, 1, 'There should be the link')
    testSuiteHelpers.assertWrapperProperties(linkWrapper, {
      text: 'MyCustomTag',
      tooltip: 'MyCustomTag',
      selected: false,
      disabled: true, // simple text, not a link
      section: false,
    }, 'Link properties should be correctly set')
  })
  it('should render correctly a coupling tag', () => {
    const props = {
      tag: 'coupling:myRef:myLabel',
    }
    const enzymeWrapper = shallow(<TagCellComponent {...props} />, { context })
    const linkWrapper = enzymeWrapper.find(TreeLinkComponent)
    assert.lengthOf(linkWrapper, 1, 'There should be the link')
    testSuiteHelpers.assertWrapperProperties(linkWrapper, {
      text: 'myLabel',
      tooltip: 'myLabel',
      selected: false,
      disabled: true, // simple text, not a link
      section: false,
    }, 'Link properties should be correctly set, parsing coupling label')
  })
})
