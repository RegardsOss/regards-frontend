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
import { OrderDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import StatusProgressRender from '../../../../src/components/orders/cells/StatusProgressRender'
import { ORDER_DISPLAY_MODES } from '../../../../src/model/OrderDisplayModes'
import styles from '../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test StatusProgressRender
 * @author Théo Lasserre
 */
describe('[Order Common] Testing StatusProgressRender', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(StatusProgressRender)
  })
  it('should render correctly a paused order (USER)', () => {
    const props = {
      entity: {
        id: 0,
        label: 'orderTest',
        owner: 'ownerTest',
        creationDate: Date.now().toString(),
        expirationDate: new Date().setMinutes(new Date().getMinutes() + 15).toString(),
        percentCompleted: 75,
        status: OrderDomain.ORDER_STATUS_ENUM.PAUSED,
        waitingForUser: false,
        statusDate: Date.now().toString(),
        availableFilesCount: 4,
        datasetTasks: [{
          id: 1,
          datasetLabel: 'datasetLabel',
          objectsCount: 4,
          filesCount: 2,
          filesSize: 4560,
          processing: {
            uuid: 'testProcessing',
            parameters: [],
          },
        }],
      },
      displayMode: ORDER_DISPLAY_MODES.USER,
    }
    shallow(<StatusProgressRender {...props} />, { context })
  })
  it('should render correctly a done order (USER)', () => {
    const props = {
      entity: {
        id: 0,
        label: 'orderTest',
        owner: 'ownerTest',
        creationDate: Date.now().toString(),
        expirationDate: new Date().setMinutes(new Date().getMinutes() + 15).toString(),
        percentCompleted: 100,
        status: OrderDomain.ORDER_STATUS_ENUM.DONE,
        waitingForUser: false,
        statusDate: Date.now().toString(),
        availableFilesCount: 4,
        datasetTasks: [{
          id: 1,
          datasetLabel: 'datasetLabel',
          objectsCount: 4,
          filesCount: 2,
          filesSize: 4560,
          processing: {
            uuid: 'testProcessing',
            parameters: [],
          },
        }],
      },
      displayMode: ORDER_DISPLAY_MODES.USER,
    }
    shallow(<StatusProgressRender {...props} />, { context })
  })
  it('should render correctly a paused order (ADMIN)', () => {
    const props = {
      entity: {
        id: 0,
        label: 'orderTest',
        owner: 'ownerTest',
        creationDate: Date.now().toString(),
        expirationDate: new Date().setMinutes(new Date().getMinutes() + 15).toString(),
        percentCompleted: 75,
        status: OrderDomain.ORDER_STATUS_ENUM.PAUSED,
        waitingForUser: false,
        statusDate: Date.now().toString(),
        availableFilesCount: 4,
        datasetTasks: [{
          id: 1,
          datasetLabel: 'datasetLabel',
          objectsCount: 4,
          filesCount: 2,
          filesSize: 4560,
          processing: {
            uuid: 'testProcessing',
            parameters: [],
          },
        }],
      },
      displayMode: ORDER_DISPLAY_MODES.PROJECT_ADMINISTRATOR,
    }
    shallow(<StatusProgressRender {...props} />, { context })
  })
  it('should render correctly a done order (ADMIN)', () => {
    const props = {
      entity: {
        id: 0,
        label: 'orderTest',
        owner: 'ownerTest',
        creationDate: Date.now().toString(),
        expirationDate: new Date().setMinutes(new Date().getMinutes() + 15).toString(),
        percentCompleted: 100,
        status: OrderDomain.ORDER_STATUS_ENUM.DONE,
        waitingForUser: false,
        statusDate: Date.now().toString(),
        availableFilesCount: 4,
        datasetTasks: [{
          id: 1,
          datasetLabel: 'datasetLabel',
          objectsCount: 4,
          filesCount: 2,
          filesSize: 4560,
          processing: {
            uuid: 'testProcessing',
            parameters: [],
          },
        }],
      },
      displayMode: ORDER_DISPLAY_MODES.PROJECT_ADMINISTRATOR,
    }
    shallow(<StatusProgressRender {...props} />, { context })
  })
})
