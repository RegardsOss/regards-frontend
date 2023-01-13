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
import { assert } from 'chai'
import { WorkerDomain } from '@regardsoss/domain'
import { StringValueRender } from '@regardsoss/components'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import StatusRender from '../../../src/components/render/StatusRender'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test StatusRender
 * @author Théo Lasserre
 */
describe('[ADMIN DATAPREPARATION MANAGEMENT] Testing StatusRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(StatusRender)
  })
  it('should render correctly with entity in ERROR', () => {
    const props = {
      entity: {
        content: {
          id: 0,
          requestId: 'requestId',
          creationDate: '01/09/2022',
          contentType: 'test',
          source: 'source',
          session: 'session',
          status: WorkerDomain.REQUEST_STATUS_ENUM.ERROR,
          dispatchedWorkerType: 'test',
          error: '',
        },
      },
      onViewRequestErrors: () => { },
    }
    const enzymeWrapper = shallow(<StatusRender {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(StringValueRender), 1, 'StringValueRender should be set')
  })
})
