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
import { assert } from 'chai'
import { Field, RenderFileFieldWithMui } from '@regardsoss/form-utils'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { SIPSubmissionFormComponent } from '../../src/components/submission/SIPSubmissionFormComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test SIPsubmissionFormComponent
* @author Sébastien Binda
*/
describe('[ADMIN INGEST SIP MANAGEMENT] Testing SIPsubmissionFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SIPSubmissionFormComponent)
  })
  it('should render correctly', () => {
    const props = {
      submitSips: () => new Promise(() => { }),
      onBack: () => new Promise(() => { }),
      isError: false,
      isLoading: false,
      handleSubmit: () => new Promise(() => { }),
    }
    const enzymeWrapper = shallow(<SIPSubmissionFormComponent {...props} />, { context })
    assert.equal(enzymeWrapper.find(Field).find({ component: RenderFileFieldWithMui }).length, 1, 'There should have a FileRenderer')
  })
})
