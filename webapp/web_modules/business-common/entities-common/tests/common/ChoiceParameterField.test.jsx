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
import MenuItem from 'material-ui/MenuItem'
import ChoiceParameterField from '../../src/common/ChoiceParameterField'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test ChoiceParameterField
* @author Raphaël Mechali
*/
describe('[Entities Common] Testing ChoiceParameterField', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ChoiceParameterField)
  })
  it('should render properly, with choices', () => {
    const props = {
      name: 'aChoice',
      label: 'AChoice',
      choices: ['choice1', 'choice2'],
    }
    const enzymeWrapper = shallow(<ChoiceParameterField {...props} />, { context })
    const menuItems = enzymeWrapper.find(MenuItem)
    assert.lengthOf(menuItems, props.choices.length, 'There should be one menu item by choice value')
  })
})
