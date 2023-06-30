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
import DeleteLinkOption from '../../../../../src/components/admin/navigation/options/DeleteLinkOption'
import styles from '../../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test DeleteLinkOption
 * @author Théo Lasserre
 */
describe('[Menu] Testing DeleteLinkOption', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DeleteLinkOption)
  })
  it('should render correctly', () => {
    let spiedLinkId
    const props = {
      id: 3,
      onDeleteLink: (id) => { spiedLinkId = id },
    }
    const enzymeWrapper = shallow(<DeleteLinkOption {...props} />, { context })
    enzymeWrapper.instance().onDelete()
    assert.equal(spiedLinkId, props.id, 'The callback should trigger the right ID')
    const iconButton = enzymeWrapper.find(IconButton)
    assert.lengthOf(iconButton, 1, 'There should be the icon button')
    assert.equal(iconButton.props().onClick, enzymeWrapper.instance().onDelete, 'The component should set up the right callback')
  })
})
