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
import { buildTestContext, testSuiteHelpers, ReduxFormTestHelper } from '@regardsoss/tests-helpers'
import { storage } from '@regardsoss/units'
import { RenderFileFieldWithMui } from '../../../src/components/render/RenderFileFieldWithMui'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test RenderFileFieldWithMui
* @author Sébastien Binda
*/
describe('[FORM UTILS] Testing RenderFileFieldWithMui', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RenderFileFieldWithMui)
  })
  it('should render correctly', () => {
    const props = {
      label: 'some label',
      input: ReduxFormTestHelper.getInputFieldProps('test', {
        name: 'plop.txt',
        type: 'application/txt',
        size: 120,
      }),
      meta: ReduxFormTestHelper.getMetaFieldProps(),
      changeLabel: 'change label',
    }
    const enzymeWrapper = shallow(<RenderFileFieldWithMui {...props} />, { context })
    assert.equal(enzymeWrapper.find(storage.FormattedStorageCapacity).length, 1, 'The SIPSubmissionFormComponent should be rendered')
    assert.equal(enzymeWrapper.find("input[type='file']").length, 1, 'There should have a input type file rendered')
  })

  it('should render correctly without file selected', () => {
    const props = {
      label: 'some label',
      input: ReduxFormTestHelper.getInputFieldProps('test'),
      meta: ReduxFormTestHelper.getMetaFieldProps(),
      changeLabel: 'change label',
    }
    const enzymeWrapper = shallow(<RenderFileFieldWithMui {...props} />, { context })
    assert.equal(enzymeWrapper.find(storage.FormattedStorageCapacity).length, 0, 'The SIPSubmissionFormComponent should be rendered')
    assert.equal(enzymeWrapper.find("input[type='file']").length, 1, 'There should have a input type file rendered')
  })
})
