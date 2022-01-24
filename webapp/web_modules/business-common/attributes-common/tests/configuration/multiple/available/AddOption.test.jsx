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
import IconButton from 'material-ui/IconButton'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import AddOption from '../../../../src/configuration/multiple/available/AddOption'
import styles from '../../../../src/styles'
import { attributeModelsDictionary } from '../../../dumps/AttributeModels.dump'

const context = buildTestContext(styles)

/**
 * Test AddOption
 * @author Raphaël Mechali
 */
describe('[Attributes Common] Testing AddOption', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AddOption)
  })
  it('should render correctly and provide right value to callback', () => {
    let spiedCallbackValue = null
    const props = {
      entity: attributeModelsDictionary[1],
      onAdd: (jsonPath) => {
        spiedCallbackValue = jsonPath
      },
    }
    const enzymeWrapper = shallow(<AddOption {...props} />, { context })
    const button = enzymeWrapper.find(IconButton)
    assert.lengthOf(button, 1)
    assert.equal(button.props().onClick, enzymeWrapper.instance().onAdd)
    // Test button callback value
    assert.isNull(spiedCallbackValue, 'Callback should not have been invoked yet')
    enzymeWrapper.instance().onAdd()
    assert.equal(spiedCallbackValue, attributeModelsDictionary[1].content.jsonPath, 'Callback value should be the attribute json path')
  })
})
