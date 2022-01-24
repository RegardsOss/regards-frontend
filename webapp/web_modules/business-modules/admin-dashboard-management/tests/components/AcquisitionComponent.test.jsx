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
 * REGARDS is distributed inputRelated the hope that it will be useful,
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
import { Card } from 'material-ui/Card'
import DisplayPropertiesComponent from '../../src/components/DisplayPropertiesComponent'
import DPActionsComponent from '../../src/components/actions/DPActionsComponent'
import WorkerActionsComponent from '../../src/components/actions/WorkerActionsComponent'
import AcquisitionComponent from '../../src/components/AcquisitionComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test AcquisitionComponent
 * @author Théo Lasserre
 */
describe('[ADMIN DASHBOARD MANAGEMENT] Testing AcquisitionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AcquisitionComponent)
  })
  it('should render correctly a DP step', () => {
    const props = {
      project: 'any',
      sessionSteps: [{
        id: 0,
        stepId: 'scan',
        source: 'Test_Source1',
        session: 'Test_Session1',
        type: 'ACQUISITION',
        inputRelated: 3,
        outputRelated: 3,
        state: {
          errors: 3,
          waiting: 2,
          running: 1,
        },
        properties: {},
        lastUpdateDate: '01/01/21',
      }],
      relaunchProducts: () => { },
      retryWorkerRequests: () => { },
    }
    const enzymeWrapper = shallow(<AcquisitionComponent {...props} />, { context })

    const cardWrapper = enzymeWrapper.find(Card)
    assert.lengthOf(cardWrapper, 1, 'There should be a Card')

    const propertiesComponentWrapper = enzymeWrapper.find(DisplayPropertiesComponent)
    assert.lengthOf(propertiesComponentWrapper, 2, 'There should be 2 DisplayPropertiesComponent')

    const actionsComponentWrapper = enzymeWrapper.find(DPActionsComponent)
    assert.lengthOf(actionsComponentWrapper, 1, 'There should be a DPActionsComponent')
  })
  it('should render correctly a Worker step', () => {
    const props = {
      project: 'any',
      sessionSteps: [{
        id: 0,
        stepId: 'workers',
        source: 'Test_Source1',
        session: 'Test_Session1',
        type: 'ACQUISITION',
        inputRelated: 3,
        outputRelated: 3,
        state: {
          errors: 3,
          waiting: 2,
          running: 1,
        },
        properties: {},
        lastUpdateDate: '01/01/21',
      }],
      relaunchProducts: () => { },
      retryWorkerRequests: () => { },
    }
    const enzymeWrapper = shallow(<AcquisitionComponent {...props} />, { context })

    const cardWrapper = enzymeWrapper.find(Card)
    assert.lengthOf(cardWrapper, 1, 'There should be a Card')

    const propertiesComponentWrapper = enzymeWrapper.find(DisplayPropertiesComponent)
    assert.lengthOf(propertiesComponentWrapper, 1, 'There should be a DisplayPropertiesComponent')

    const actionsComponentWrapper = enzymeWrapper.find(WorkerActionsComponent)
    assert.lengthOf(actionsComponentWrapper, 1, 'There should be a WorkerActionsComponent')
  })
})
