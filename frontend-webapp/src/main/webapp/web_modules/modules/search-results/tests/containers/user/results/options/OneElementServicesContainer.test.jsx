/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ENTITY_TYPES_ENUM } from '@regardsoss/domain/dam'
import OneElementServicesComponent from '../../../../../src/components/user/results/options/OneElementServicesComponent'
import { OneElementServicesContainer } from '../../../../../src/containers/user/results/options/OneElementServicesContainer'
import styles from '../../../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test OneElementServicesContainer
* @author Raphaël Mechali
*/
describe('[Search Results] Testing OneElementServicesContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(OneElementServicesContainer)
  })
  it('should render correctly', () => {
    const props = {
      entity: {
        content: {
          id: 1,
          ipId: 'coucou',
          sipId: '1',
          label: 'O.D.I.L',
          entityType: ENTITY_TYPES_ENUM.DATA,
          files: {},
          geometry: null,
          properties: {},
          tags: [],
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
  it('should filter appliable services', () => {
    const props = {
      entity: {
        content: {
          id: 1,
          ipId: 'coucou',
          sipId: '1',
          label: 'O.D.I.L',
          entityType: ENTITY_TYPES_ENUM.DATA,
          files: {},
          geometry: null,
          properties: {},
          tags: [],
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
})
