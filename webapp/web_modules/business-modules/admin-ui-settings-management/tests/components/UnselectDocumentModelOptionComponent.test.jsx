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
import IconButton from 'material-ui/IconButton'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import UnselectDocumentModelOptionComponent from '../../src/components/UnselectDocumentModelOptionComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test UnselectDocumentModelOptionComponent
 * @author Raphaël Mechali
 */
describe('[ADMIN UI SETTINGS MANAGEMENT] Testing UnselectDocumentModelOptionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(UnselectDocumentModelOptionComponent)
  })
  it('should render correctly and call parent on unselect', () => {
    const spiedUnselectDocumentModel = {}
    const props = {
      rowIndex: 23,
      onUnselectDocumentModel: (index) => {
        spiedUnselectDocumentModel.index = index
      },
    }
    const enzymeWrapper = shallow(<UnselectDocumentModelOptionComponent {...props} />, { context })
    const buttonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be the button wrapper')
    testSuiteHelpers.assertWrapperProperties(buttonWrapper, {
      title: 'ui.admin.settings.add.to.data.models.title',
      onClick: enzymeWrapper.instance().onUnselectDocumentModel,
    })
    // test callback
    assert.isUndefined(spiedUnselectDocumentModel.index, 'Callback should not have been invoked yet')
    buttonWrapper.props().onClick()
    assert.equal(spiedUnselectDocumentModel.index, props.rowIndex, 'Callback should have invoked with row index')
  })
})
