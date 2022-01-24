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
import DisplayExternalDiffusionComponent from '../../src/components/DisplayExternalDiffusionComponent'
import DisplayPropertiesComponent from '../../src/components/DisplayPropertiesComponent'
import DiffusionActionsComponent from '../../src/components/actions/DiffusionActionsComponent'
import ExternalDiffusionActionsComponent from '../../src/components/actions/ExternalDiffusionActionsComponent'
import DiffusionComponent from '../../src/components/DiffusionComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
    * Test DiffusionComponent
    * @author Théo Lasserre
    */
describe('[ADMIN DASHBOARD MANAGEMENT] Testing DiffusionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DiffusionComponent)
  })
  it('should render correctly a CATALOG STEP', () => {
    const props = {
      project: 'any',
      sessionSteps: [{
        id: 0,
        stepId: 'metacatalog',
        source: 'Test_Source1',
        session: 'Test_Session1',
        type: 'DISSEMINATION',
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
    }
    const enzymeWrapper = shallow(<DiffusionComponent {...props} />, { context })

    const cardWrapper = enzymeWrapper.find(Card)
    assert.lengthOf(cardWrapper, 1, 'There should be a Card')

    const propertiesComponentWrapper = enzymeWrapper.find(DisplayPropertiesComponent)
    assert.lengthOf(propertiesComponentWrapper, 1, 'There should be a DisplayPropertiesComponent')

    const actionscomponentWrapper = enzymeWrapper.find(DiffusionActionsComponent)
    assert.lengthOf(actionscomponentWrapper, 1, 'There should be a DiffusionActionsComponent')
  })
  it('should render correctly an EXTERNAL DIFFUSION step', () => {
    const props = {
      project: 'any',
      sessionSteps: [{
        stepId: 'fem_dissemination',
        source: 'PEPS',
        session: 'Init validation data',
        type: 'DISSEMINATION',
        inputRelated: 9990,
        outputRelated: 9990,
        state: { errors: 1, waiting: 1, running: 1 },
        properties: {
          sds: {
            pending: '10',
            done: '5',
          },
          chronos: {
            pending: '10',
            done: '5',
          },
        },
        lastUpdateDate: '2021-10-13T14:42:30.983Z',
        registrationDate: '2021-10-13T14:42:34.948Z',
      }],
    }
    const enzymeWrapper = shallow(<DiffusionComponent {...props} />, { context })

    const cardWrapper = enzymeWrapper.find(Card)
    assert.lengthOf(cardWrapper, 1, 'There should be a Card')

    const externalDiffusionComponentWrapper = enzymeWrapper.find(DisplayExternalDiffusionComponent)
    assert.lengthOf(externalDiffusionComponentWrapper, 1, 'There should be a DisplayExternalDiffusionComponent')

    const actionsComponentWrapper = enzymeWrapper.find(ExternalDiffusionActionsComponent)
    assert.lengthOf(actionsComponentWrapper, 1, 'There should be a ExternalDiffusionActionsComponent')
  })
})
