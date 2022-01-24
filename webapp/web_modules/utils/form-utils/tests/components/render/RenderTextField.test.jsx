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
import { expect, assert } from 'chai'
import TextField from 'material-ui/TextField'
import { testSuiteHelpers, ReduxFormTestHelper } from '@regardsoss/tests-helpers'
import RenderTextField from '../../../src/components/render/RenderTextField'

// Test a components rendering
describe('[FORM UTILS] Testing RenderTextField', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RenderTextField)
  })
  it('should retrive the right child', () => {
    const props = {
      label: 'Some label',
      input: ReduxFormTestHelper.getInputFieldProps('isItInteresting', 'test'),
      meta: ReduxFormTestHelper.getMetaFieldProps(),
      children: (<span />),
      fullWidth: true,
      type: 'password',
      intl: {
        formatMessage: () => { },
      },
    }
    const enzymeWrapper = shallow(<RenderTextField {...props} />)
    const subComponent = enzymeWrapper.find(TextField)
    expect(subComponent).to.have.length(1)
  })
})
