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
import TwoTemporalCriteriaComposedComponent from '../../src/components/TwoTemporalCriteriaComposedComponent'
import TemporalCriteriaComponent from '../../src/components/TemporalCriteriaComponent'

/**
 * Test case for {@link TwoTemporalCriteriaComposedComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN TWO TEMPORAL CRITERIA COMPOSED] Testing the two temporal criteria composed component', () => {
  it('should exists', () => {
    assert.isDefined(TwoTemporalCriteriaComposedComponent)
    assert.isDefined(TemporalCriteriaComponent)
  })
  it('should render self and subcomponents', () => {
    const props = {
      attributes: {
        firstAttribute: {
          name: 'firstAttribute',
          description: 'First attribute to search',
          type: 'temporal',
        },
      },
      getDefaultState: spy(),
      savePluginState: spy(),
      onChange: spy(),
    }
    const enzymeWrapper = shallow(<TwoTemporalCriteriaComposedComponent {...props} />)
    const children = enzymeWrapper.find(TemporalCriteriaComponent)
    expect(children).to.have.length(2)
    const first = children.at(0)
    const second = children.at(1)
    expect(first.props().reversed).to.equal(false)
    expect(first.props().comparator).to.equal('>=')
    expect(first.props().hideAttributeName).to.equal(true)
    expect(second.props().reversed).to.equal(false)
    expect(second.props().comparator).to.equal('<=')
    expect(second.props().hideAttributeName).to.equal(true)
  })
})
