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
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { buildTestContext, testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import ConnectionTesterIconButton from '../../src/components/ConnectionTesterIconButton'
import ConnectionTesterProgress from '../../src/components/ConnectionTesterProgress'

const context = buildTestContext()

describe('[ADMIN DATA CONNECTION MANAGEMENT] Testing ConnectionTesterIconButton', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ConnectionTesterIconButton)
    assert.isDefined(ConnectionTesterProgress)
  })
  it('Render properly', () => {
    const props = {
      connection: DumpProvider.getFirstEntity('DataManagementClient', 'Connection'),
      handleTestConnection: () => { },
    }
    const enzymeWrapper = shallow(<ConnectionTesterIconButton {...props} />, { context })
    expect(enzymeWrapper.find(ConnectionTesterProgress)).to.have.length(0)
  })
})
