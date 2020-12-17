/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { expect, assert } from 'chai'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { testSuiteHelpers, ReduxFormTestHelper } from '@regardsoss/tests-helpers'
import RenderSelectField from '../../../src/components/render/RenderSelectField'

// Test a components rendering
describe('[FORM UTILS] Testing RenderSelectField', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RenderSelectField)
  })
  it('should retrieve the right child', () => {
    const props = {
      label: 'Some label',
      input: ReduxFormTestHelper.getInputFieldProps('isItInteresting', 'value1'),
      meta: ReduxFormTestHelper.getMetaFieldProps(),
      children: [<MenuItem key="0" value="value0" />, <MenuItem key="1" value="value1" />],
    }
    const enzymeWrapper = shallow(<RenderSelectField {...props} />)
    const subComponent = enzymeWrapper.find(SelectField)
    expect(subComponent).to.have.length(1)
  })
})
