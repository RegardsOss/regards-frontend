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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { CodeDisplayDialog } from '@regardsoss/components'
import SIPDetailComponent from '../../../src/components/packages/SIPDetailComponent'
import styles from '../../../src/styles'
import { SIP } from '../../dumps/SIP.dump'

const context = buildTestContext(styles)

/**
 * Test SIPDetailComponent
 * @author Simon MILHAU
 */
describe('[OAIS SIP MANAGEMENT] Testing SIPDetailComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SIPDetailComponent)
  })

  it('should render correctly', () => {
    const props = {
      sip: SIP,
      onClose: () => {},
    }
    const enzymeWrapper = shallow(<SIPDetailComponent {...props} />, { context })
    const codeDisplayDialog = enzymeWrapper.find(CodeDisplayDialog)
    assert.lengthOf(codeDisplayDialog, 1, 'There should be SIP as JSON render')
    assert.isOk(codeDisplayDialog.props().displayedContent, 'SIP JSON value should be found')
  })
})
