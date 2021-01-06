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
import map from 'lodash/map'
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { BoardComponent } from '@regardsoss/components'
import MicroserviceBoardComponent from '../../src/components/MicroserviceBoardComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

const microservices = STATIC_CONF.MSERVICES
/**
 * Microservices configuration tests
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN PROJECT MANAGEMENT] Testing microservice board component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MicroserviceBoardComponent)
    assert.isDefined(BoardComponent)
  })

  it('should render sub-components', () => {
    const microservicesUp = map(microservices, (microservice) => microservice.name)

    const props = {
      project: 'someProject',
      microservices: microservicesUp,
      isMicroserviceActive: () => true,
      isMicroserviceBackupable: () => true,
      toggleMaintenance: () => { },
    }
    const enzymeWrapper = shallow(<MicroserviceBoardComponent {...props} />, { context })
    const subComponent = enzymeWrapper.find(BoardComponent)
    expect(subComponent).to.have.length(1)
  })
})
