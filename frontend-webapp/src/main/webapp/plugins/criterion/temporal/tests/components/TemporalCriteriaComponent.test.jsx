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
import DatePicker from 'material-ui/DatePicker'
import TimePicker from 'material-ui/TimePicker'
import TemporalCriteriaComponent from '../../src/components/TemporalCriteriaComponent'
import TemporalComparatorComponent from '../../src/components/TemporalComparatorComponent'

/**
 * Test case for {@link TemporalCriteriaComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN TEMPORAL CRITERIA] Testing the temporal criteria component', () => {
  it('should exists', () => {
    assert.isDefined(TemporalCriteriaComponent)
    assert.isDefined(TemporalComparatorComponent)
    assert.isDefined(DatePicker)
    assert.isDefined(TimePicker)
  })
  it('should render self and subcomponents', () => {
    const props = {
      attributes: {
        searchField: {
          name: 'searchField',
          description: 'Attribute to search',
          type: 'temporal',
        },
      },
      getDefaultState: spy(),
      savePluginState: spy(),
      onChange: spy(),
    }
    const enzymeWrapper = shallow(<TemporalCriteriaComponent {...props} />)
    expect(enzymeWrapper.find(TemporalComparatorComponent)).to.have.length(1)
    expect(enzymeWrapper.find(DatePicker)).to.have.length(1)
    expect(enzymeWrapper.find(TimePicker)).to.have.length(1)
  })
})
