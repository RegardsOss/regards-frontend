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
import SelectDocumentModelOptionComponent from '../../src/components/SelectDocumentModelOptionComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SelectDocumentModelOptionComponent
 * @author Raphaël Mechali
 */
describe('[ADMIN UI SETTINGS MANAGEMENT] Testing SelectDocumentModelOptionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SelectDocumentModelOptionComponent)
  })
  it('should render correctly and call parent on select', () => {
    const spiedSelectDocumentModel = {}
    const props = {
      entity: 'myLittleModel',
      onSelectDocumentModel: (model) => {
        spiedSelectDocumentModel.model = model
      },
    }
    const enzymeWrapper = shallow(<SelectDocumentModelOptionComponent {...props} />, { context })
    const buttonWrapper = enzymeWrapper.find(IconButton)
    assert.lengthOf(buttonWrapper, 1, 'There should be the button wrapper')
    testSuiteHelpers.assertWrapperProperties(buttonWrapper, {
      title: 'ui.admin.settings.add.to.document.models.title',
      onClick: enzymeWrapper.instance().onSelectDocumentModel,
    })
    // test callback
    assert.isUndefined(spiedSelectDocumentModel.model, 'Callback should not have been invoked yet')
    buttonWrapper.props().onClick()
    assert.equal(spiedSelectDocumentModel.model, props.entity, 'Callback should have invoked with model name')
  })
})
