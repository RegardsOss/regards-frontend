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
 **/
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { UIDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import OneElementServicesComponent from '../../../../../../../src/components/user/tabs/results/common/options/OneElementServicesComponent'
import { OneElementServicesContainer } from '../../../../../../../src/containers/user/tabs/results/common/options/OneElementServicesContainer'
import styles from '../../../../../../../src/styles/styles'
import { dataEntity } from '../../../../../../dumps/entities.dump'

const context = buildTestContext(styles)

/**
* Test OneElementServicesContainer
* @author Raphaël Mechali
*/
describe('[SEARCH RESULTS] Testing OneElementServicesContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OneElementServicesContainer)
  })
  it('should render correctly', () => {
    const props = {
      tabType: UIDomain.RESULTS_TABS_ENUM.TAG_RESULTS,
      entity: {
        content: {
          ...dataEntity.content,
          services: [],
        },
      },
      // from mapDispatchToProps
      dispatchRunService: () => { },
    }
    const enzymeWrapper = shallow(<OneElementServicesContainer {...props} />, { context })
    const component = enzymeWrapper.find(OneElementServicesComponent)
    assert.lengthOf(component, 1, 'There should be the rendered component')
  })
  it('should filter appliable services only', () => {
    const props = {
      tabType: UIDomain.RESULTS_TABS_ENUM.MAIN_RESULTS,
      entity: {
        content: {
          ...dataEntity.content,
          services: [{ // this service should always be returned
            content: {
              configId: '1',
              label: 'test1',
              applicationModes: [
                'ONE',
              ],
              entityTypes: [
                'DATA',
                'DATASET',
              ],
              type: 'CATALOG',
            },
            links: [],
          }, { // this service should never be returned
            content: {
              configId: '2',
              label: 'test2',
              applicationModes: [
                'MANY',
              ],
              entityTypes: [
                'DATA',
                'DATASET',
              ],
              type: 'CATALOG',
            },
            links: [],
          }, { // this service should be returned for DATA
            content: {
              configId: '3',
              label: 'test3',
              applicationModes: [
                'ONE',
              ],
              entityTypes: [
                'DATA',
              ],
              type: 'UI',
            },
            links: [],
          }, { // this service should not be returned for DATA
            content: {
              configId: '4',
              label: 'test4',
              applicationModes: [
                'ONE',
              ],
              entityTypes: [
                'DATASET',
              ],
              type: 'UI',
            },
            links: [],
          }],
        },
      },
      availableDependencies: ['rs-catalog@/services/{pluginConfigurationBusinessId}/apply@POST'],
      dispatchRunService: () => { },
    }
    const enzymeWrapper = shallow(<OneElementServicesContainer {...props} />, { context })
    const component = enzymeWrapper.find(OneElementServicesComponent)
    assert.lengthOf(component, 1, 'There should be the rendered component')
    const providedServices = component.props().services
    assert.isOk(providedServices.find((s) => s.content.label === 'test1'), 'The test1 service, available for ONE use case, should be present')
    assert.isNotOk(providedServices.find((s) => s.content.label === 'test2'), 'The test2 service, not available for ONE use case, should not be present')
    assert.isOk(providedServices.find((s) => s.content.label === 'test3'), 'The test3 service, available for DATA, should be present')
    assert.isNotOk(providedServices.find((s) => s.content.label === 'test4'), 'The test4 service, available for DATASET only, should not be present')
  })
})
