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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import AccountRequestFormComponent, { requestFormIds } from '../../src/components/AccountRequestFormComponent'
import { AccountRequestFormContainer } from '../../src/containers/AccountRequestFormContainer'

describe('[AUTHENTICATION] Testing AccountRequestFormContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccountRequestFormContainer)
  })

  const context = buildTestContext()

  it('should render properly', () => {
    const props = {
      onBack: () => {},
      // done callback
      onDone: () => {},
      // request form ID (used internally)
      requestFormId: requestFormIds.resetPasswordRequest,
    }
    // very small tests for component rendering
    const enzymeWrapper = shallow(<AccountRequestFormContainer {...props} />, { context })
    assert.equal(enzymeWrapper.find(AccountRequestFormComponent).length, 1, 'There should be the rendered component!')
  })
})
