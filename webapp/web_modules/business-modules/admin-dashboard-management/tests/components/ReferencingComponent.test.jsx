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
import ReferencingComponent from '../../src/components/ReferencingComponent'
import DisplayPropertiesComponent from '../../src/components/DisplayPropertiesComponent'
import FEMActionsComponent from '../../src/components/actions/FEMActionsComponent'
import IngestActionsComponent from '../../src/components/actions/IngestActionsComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
  * Test ReferencingComponent
  * @author Théo Lasserre
  */
describe('[ADMIN DASHBOARD MANAGEMENT] Testing ReferencingComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ReferencingComponent)
  })
  it('should render correctly a INGEST step', () => {
    const props = {
      project: 'any',
      sessionSteps: [{
        id: 0,
        stepId: 'oais',
        source: 'Test_Source1',
        session: 'Test_Session1',
        type: 'REFERENCING',
        inputRelated: 3,
        outputRelated: 3,
        state: {
          errors: 3,
          waiting: 2,
          running: 1,
        },
        properties: {
          totalRequests: 1,
          requestsErrors: 1,
          generatedProducts: 1,
          newProductVersions: 1,
          replacedProducts: 1,
          ignoredProducts: 1,
          productWaitVersionMode: 1,
        },
        lastUpdateDate: '01/01/21',
      }],
      relaunchAIP: () => { },
      retryFEMRequests: () => { },
    }
    const enzymeWrapper = shallow(<ReferencingComponent {...props} />, { context })

    const cardWrapper = enzymeWrapper.find(Card)
    assert.lengthOf(cardWrapper, 1, 'There should be a Card')

    const propertiesComponentWrapper = enzymeWrapper.find(DisplayPropertiesComponent)
    assert.lengthOf(propertiesComponentWrapper, 2, 'There should be 2 DisplayPropertiesComponent')

    const actionsComponentWrapper = enzymeWrapper.find(IngestActionsComponent)
    assert.lengthOf(actionsComponentWrapper, 1, 'There should be a IngestActionsComponent')
  })
  it('should render correctly a FEM step', () => {
    const props = {
      project: 'any',
      sessionSteps: [{
        id: 0,
        stepId: 'feature',
        source: 'Test_Source1',
        session: 'Test_Session1',
        type: 'REFERENCING',
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
      relaunchAIP: () => { },
      retryFEMRequests: () => { },
    }
    const enzymeWrapper = shallow(<ReferencingComponent {...props} />, { context })

    const cardWrapper = enzymeWrapper.find(Card)
    assert.lengthOf(cardWrapper, 1, 'There should be a Card')

    const propertiesComponentWrapper = enzymeWrapper.find(DisplayPropertiesComponent)
    assert.lengthOf(propertiesComponentWrapper, 2, 'There should be 2 DisplayPropertiesComponent')

    const actionsComponentWrapper = enzymeWrapper.find(FEMActionsComponent)
    assert.lengthOf(actionsComponentWrapper, 1, 'There should be a FEMActionsComponent')
  })
})
