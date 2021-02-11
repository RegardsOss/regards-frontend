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
import TestIcon from 'mdi-material-ui/Human'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import PageLinkCellComponent from '../../../../../../src/components/user/content/list/common/PageLinkCellComponent'
import PageTextCellComponent from '../../../../../../src/components/user/content/list/common/PageTextCellComponent'
import styles from '../../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test PageLinkCellComponent
 * @author Raphaël Mechali
 */
describe('[Description] Testing PageLinkCellComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(PageLinkCellComponent)
  })
  it('should render as link when enabled', () => {
    const props = {
      text: 'My text',
      tooltip: 'my tooltip',
      LinkIconConstructor: TestIcon,
      disabled: false,
      onClick: () => {},
    }
    const enzymeWrapper = shallow(<PageLinkCellComponent {...props} />, { context })
    // search for first div
    const rootDiv = enzymeWrapper.findWhere((n) => n.props().title === props.tooltip)
    assert.lengthOf(rootDiv, 1, 'There should be root div, displaying tooltip')
    assert.equal(rootDiv.props().onClick, props.onClick, 'Root division should hold onClick callback')
    rootDiv.find(props.LinkIconConstructor, 'Link icon should be displayed')

    assert.lengthOf(enzymeWrapper.find(PageTextCellComponent), 0, 'Link should not be rendered as text cell when enabled')
  })
  it('should render as text cell when disabled', () => {
    const props = {
      text: 'My text',
      tooltip: 'my tooltip',
      LinkIconConstructor: TestIcon,
      disabled: true,
      onClick: () => {},
    }
    const enzymeWrapper = shallow(<PageLinkCellComponent {...props} />, { context })
    const textCell = enzymeWrapper.find(PageTextCellComponent)
    assert.lengthOf(textCell, 1, 'Link should be rendered as text cell when disabled')
    testSuiteHelpers.assertWrapperProperties(textCell, {
      text: props.text,
    }, 'Text cell properties should be correctly reported')
  })
})
