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
import TwoNumericalCriteriaComponent from '../../src/components/TwoNumericalCriteriaComponent'
import TwoNumericalCriteriaSimpleComponent from '../../src/components/TwoNumericalCriteriaSimpleComponent'
import TwoNumericalCriteriaComposedComponent from '../../src/components/TwoNumericalCriteriaComposedComponent'

/**
 * Test case for {@link TwoNumericalCriteriaComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN TWO NUMERICAL CRITERIA] Testing the two numerical criteria component', () => {
  it('should exists', () => {
    assert.isDefined(TwoNumericalCriteriaComponent)
  })
  it('should render the simple component when two different attributes', () => {
    const props = {
      attributes: {
        firstField: {
          name: 'firstAttribute',
          description: 'First attribute to search',
          type: 'numerical',
        },
        secondField: {
          name: 'secondAttribute',
          description: 'Second attribute to search',
          type: 'numerical',
        },
      },
      pluginInstanceId: 42,
      onChange: () => {
      },
    }
    const enzymeWrapper = shallow(<TwoNumericalCriteriaComponent {...props} />)
    expect(enzymeWrapper.find(TwoNumericalCriteriaSimpleComponent)).to.have.length(1)
    expect(enzymeWrapper.find(TwoNumericalCriteriaComposedComponent)).to.have.length(0)
  })
  it('should render the composed component when just a single attribute', () => {
    const props = {
      attributes: {
        firstAttribute: {
          name: 'attribute',
          description: 'First attribute to search',
          type: 'numerical',
        },
      },
      pluginInstanceId: 42,
      onChange: () => {
      },
    }
    const enzymeWrapper = shallow(<TwoNumericalCriteriaComponent {...props} />)
    expect(enzymeWrapper.find(TwoNumericalCriteriaSimpleComponent)).to.have.length(0)
    expect(enzymeWrapper.find(TwoNumericalCriteriaComposedComponent)).to.have.length(1)
  })
})
