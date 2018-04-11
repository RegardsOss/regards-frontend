/**
 * Copyright 2017-2018-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import SIPsubmissionFormComponent from '../../src/components/submission/SIPSubmissionFormComponent'
import SIPSubmissionNotReadyComponent from '../../src/components/submission/SIPSubmissionNotReadyComponent'
import { SIPSubmissionFormContainer } from '../../src/containers/SIPSubmissionFormContainer'

import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test  SIPSubmissionFormContainer
* @author Sébastien Binda
*/
describe('[ADMIN INGEST SIP MANAGEMENT] Testing  SIPSubmissionFormContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SIPSubmissionFormContainer)
  })
  it('should render correctly', () => {
    const props = {
      params: {
        project: 'project',
      },
      submitSips: () => new Promise(() => { }),
      flushSips: () => new Promise(() => { }),
      isStorageReady: () => new Promise(() => { }),
    }
    const enzymeWrapper = shallow(<SIPSubmissionFormContainer {...props} />, { context })
    assert.equal(enzymeWrapper.find(SIPsubmissionFormComponent).length, 0, 'The SIPsubmissionFormComponent should be rendered')
    // Simulate return from isStorageReady
    enzymeWrapper.instance().setState({
      isError: false,
      isLoading: false,
      storageReady: true,
    })
    enzymeWrapper.update()
    assert.equal(enzymeWrapper.find(SIPsubmissionFormComponent).length, 1, 'The SIPsubmissionFormComponent should be rendered')
    // Simulate return from isStorageReady with not ready response
    enzymeWrapper.instance().setState({
      isError: false,
      isLoading: false,
      storageReady: false,
    })
    enzymeWrapper.update()
    assert.equal(enzymeWrapper.find(SIPSubmissionNotReadyComponent).length, 1, 'The SIPSubmissionNotReadyComponent should be rendered')
  })
})
