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
import { LTADomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { CardActionsComponent, CodeFileDisplayer } from '@regardsoss/components'
import ViewProductDialog from '../../../src/components/dialog/ViewProductDialog'
import styles from '../../../src/styles'

const context = buildTestContext(styles)

/**
 * Test ViewProductDialog
 * @author Théo Lasserre
 */
describe('[ADMIN LTA MANAGEMENT] Testing ViewProductDialog', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ViewProductDialog)
  })
  it('should render correctly', () => {
    const props = {
      entity: {
        content: {
          id: 0,
          requestId: 'test',
          owner: 'source',
          session: 'session',
          statusDate: '01/05/1965',
          creationDate: '05/05/0550',
          model: 'model',
          product: 'product',
          status: LTADomain.REQUEST_STATUS_ENUM.GENERATED,
        },
      },
      onClose: () => { },
    }
    const enzymeWrapper = shallow(<ViewProductDialog {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(CodeFileDisplayer), 1, 'There should be 1 CodeFileDisplayer')
    assert.lengthOf(enzymeWrapper.find(CardActionsComponent), 1, 'There should be 1 CardActionsComponent')
  })
})
