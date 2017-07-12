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
import { spy } from 'sinon'
import TwoTemporalCriteriaSimpleComponent from '../../src/components/TwoTemporalCriteriaSimpleComponent'
import TemporalCriteriaComponent from '../../src/components/TemporalCriteriaComponent'

/**
 * Test case for {@link TwoTemporalCriteriaSimpleComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN TWO TEMPORAL CRITERIA SIMPLE] Testing the two temporal criteria simple component', () => {
  it('should exists', () => {
    assert.isDefined(TwoTemporalCriteriaSimpleComponent)
    assert.isDefined(TemporalCriteriaComponent)
  })
  it('should render self and subcomponents', () => {
    const props = {
      attributes: {
        firstField: {
          name: 'firstField',
          description: 'First attribute to search',
          type: 'temporal',
        },
        secondField: {
          name: 'secondField',
          description: 'Second attribute to search',
          type: 'temporal',
        },
      },
      getDefaultState: spy(),
      savePluginState: spy(),
      onChange: spy(),
    }
    const enzymeWrapper = shallow(<TwoTemporalCriteriaSimpleComponent {...props} />)
    expect(enzymeWrapper.find(TemporalCriteriaComponent)).to.have.length(2)
  })
})
