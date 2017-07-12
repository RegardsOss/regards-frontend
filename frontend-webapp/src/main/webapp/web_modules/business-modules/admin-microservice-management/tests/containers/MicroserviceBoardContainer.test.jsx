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
import { expect, assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { MicroserviceBoardContainer } from '../../src/containers/MicroserviceBoardContainer'
import MicroserviceBoardComponent from '../../src/components/MicroserviceBoardComponent'

/**
 * Plugin tests
 * @author Xavier-Alexandre Brochard
 */
describe('[ADMIN MICROSERVICE MANAGEMENT] Testing microservice board container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(MicroserviceBoardContainer)
    assert.isDefined(MicroserviceBoardComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      fetchMaintenance: () => { },
      setMaintenance: () => { },
      maintenanceList: () => { },
      // from router
      params: {
        project: 'projectName',
      },
    }
    const enzymeWrapper = shallow(<MicroserviceBoardContainer {...props} />)
    expect(enzymeWrapper.find(MicroserviceBoardComponent)).to.have.length(1)
  })
})
