/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import Dialog from 'material-ui/Dialog'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import AIPRemoveTagDialog from '../../../../src/components/aip/dialogs/AIPRemoveTagDialog'
import styles from '../../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test AIPRemoveTagDialog
 * @author Raphaël Mechali
 */
describe('[ADMIN STORAGE AIP MANAGEMENT] Testing AIPRemoveTagDialog', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AIPRemoveTagDialog)
  })
  it('should render correctly loading', () => {
    const props = {
      tags: [],
      searchingTags: true,
      onClose: () => {},
      onSubmit: () => {},
    }
    const enzymeWrapper = shallow(<AIPRemoveTagDialog {...props} />, { context })
    const dialogWrapper = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialogWrapper, 1, 'There should be dialog wrapper')
    assert.isTrue(dialogWrapper.props().open, 'It should be opened')
    const loaderWrapper = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.lengthOf(loaderWrapper, 1, 'There should be loader wrapper')
    assert.isTrue(loaderWrapper.props().isLoading, 'It should hide content (marked loading)')
  })
  it('should render correctly in edition', () => {
    const props = {
      tags: ['tag1', 'tag2'],
      searchingTags: false,
      onClose: () => {},
      onSubmit: () => {},
    }
    const enzymeWrapper = shallow(<AIPRemoveTagDialog {...props} />, { context })
    const dialogWrapper = enzymeWrapper.find(Dialog)
    assert.lengthOf(dialogWrapper, 1, 'There should be dialog wrapper')
    assert.isTrue(dialogWrapper.props().open, 'It should be opened')
    const loaderWrapper = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.lengthOf(loaderWrapper, 1, 'There should be loader wrapper')
    assert.isFalse(loaderWrapper.props().isLoading, 'It should show content (marked loaded)')
  })
})
