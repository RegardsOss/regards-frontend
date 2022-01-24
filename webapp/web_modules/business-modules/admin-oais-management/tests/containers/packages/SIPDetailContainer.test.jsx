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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { SIPDetailContainer } from '../../../src/containers/packages/SIPDetailContainer'
import SIPDetailComponent from '../../../src/components/packages/SIPDetailComponent'
import styles from '../../../src/styles'
import { SIP } from '../../dumps/SIP.dump'

const context = buildTestContext(styles)

/**
 * Test SIPDetailContainer
 * @author Simon MILHAU
 */
describe('[OAIS AIP MANAGEMENT] Testing SIPDetailContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SIPDetailContainer)
  })

  it('should render correctly', () => {
    const props = {
      sipId: '',
      onClose: () => {},
      // from mapStateToProps
      sip: SIP,
      // from mapDispatchToProps
      fetchSip: () => {},
    }
    const enzymeWrapper = shallow(<SIPDetailContainer {...props} />, { context })
    const flatButtonWrapper = enzymeWrapper.find(SIPDetailComponent)
    assert.lengthOf(flatButtonWrapper, 1, 'There should a AIPModifyDialogComponent')
  })
})
