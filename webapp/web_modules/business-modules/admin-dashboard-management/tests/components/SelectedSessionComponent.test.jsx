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
import FlatButton from 'material-ui/FlatButton'
import { CardActionsComponent } from '@regardsoss/components'
import { AdminDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import SelectedSessionComponent from '../../src/components/SelectedSessionComponent'
import AcquisitionComponent from '../../src/components/AcquisitionComponent'
import ReferencingComponent from '../../src/components/ReferencingComponent'
import ArchivalComponent from '../../src/components/ArchivalComponent'
import DiffusionComponent from '../../src/components/DiffusionComponent'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test SelectedSessionComponent
 * @author Théo Lasserre
 */
describe('[ADMIN DASHBOARD MANAGEMENT] Testing SelectedSessionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(SelectedSessionComponent)
  })
  it('should render correctly', () => {
    const props = {
      project: 'any',
      selectedSession: {
        content: {
          id: 0,
          source: 'Test_Source1',
          name: 'Test_Session1',
          creationDate: '01/01/21',
          lastUpdateDate: '01/01/21',
          steps: [
            {
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
            },
            {
              id: 1,
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
              properties: {},
              lastUpdateDate: '01/01/21',
            },
            {
              id: 2,
              stepId: 'storage',
              source: 'Test_Source1',
              session: 'Test_Session1',
              type: 'STORAGE',
              inputRelated: 3,
              outputRelated: 3,
              state: {
                errors: 3,
                waiting: 2,
                running: 1,
              },
              properties: {},
              lastUpdateDate: '01/01/21',
            },
            {
              id: 3,
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
            },
          ],
          managerState: {
            running: true,
            errors: true,
            waiting: true,
          },
        },
        links: [],
      },
      onSelected: () => { },
      relaunchProducts: () => { },
      relaunchAIP: () => { },
      relaunchStorages: () => { },
      retryWorkerRequests: () => { },
      deleteSession: () => { },
      retryFEMRequests: () => { },
    }
    const enzymeWrapper = shallow(<SelectedSessionComponent {...props} />, { context })

    const cardActionWrapper = enzymeWrapper.find(CardActionsComponent)
    assert.lengthOf(cardActionWrapper, 1, 'There should be 1 CardActionsComponent')

    const flatButtonWrapper = enzymeWrapper.find(FlatButton)
    assert.lengthOf(flatButtonWrapper, 1, 'There should be a FlatButton')

    const acquisitionWrapper = enzymeWrapper.find(AcquisitionComponent)
    assert.lengthOf(acquisitionWrapper, 1, 'There should be a AcquisitionComponent')
    testSuiteHelpers.assertWrapperProperties(acquisitionWrapper, {
      project: props.project,
      sessionSteps: enzymeWrapper.instance().getSessionSteps(props.selectedSession, AdminDomain.STEP_TYPE_ENUM.ACQUISITION),
      relaunchProducts: props.relaunchProducts,
      selectedSession: props.selectedSession,
      retryWorkerRequests: props.retryWorkerRequests,
    }, 'Component should define the expected properties')

    const referencingWrapper = enzymeWrapper.find(ReferencingComponent)
    assert.lengthOf(referencingWrapper, 1, 'There should be a ReferencingComponent')
    testSuiteHelpers.assertWrapperProperties(referencingWrapper, {
      project: props.project,
      selectedSession: props.selectedSession,
      sessionSteps: enzymeWrapper.instance().getSessionSteps(props.selectedSession, AdminDomain.STEP_TYPE_ENUM.REFERENCING),
      relaunchAIP: props.relaunchAIP,
      retryFEMRequests: props.retryFEMRequests,
    }, 'Component should define the expected properties')

    const storageWrapper = enzymeWrapper.find(ArchivalComponent)
    assert.lengthOf(storageWrapper, 1, 'There should be a ArchivalComponent')
    testSuiteHelpers.assertWrapperProperties(storageWrapper, {
      project: props.project,
      sessionSteps: enzymeWrapper.instance().getSessionSteps(props.selectedSession, AdminDomain.STEP_TYPE_ENUM.STORAGE),
      relaunchStorages: props.relaunchStorages,
    }, 'Component should define the expected properties')

    const diffusionWrapper = enzymeWrapper.find(DiffusionComponent)
    assert.lengthOf(diffusionWrapper, 1, 'There should be a DiffusionComponent')
    testSuiteHelpers.assertWrapperProperties(diffusionWrapper, {
      project: props.project,
      sessionSteps: enzymeWrapper.instance().getSessionSteps(props.selectedSession, AdminDomain.STEP_TYPE_ENUM.DISSEMINATION),
    }, 'Component should define the expected properties')
  })
})
