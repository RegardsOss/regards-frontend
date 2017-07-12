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
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import NumericalComparatorComponent from '../../src/components/NumericalComparatorComponent'
import EnumNumericalComparator from '../../src/model/EnumNumericalComparator'

/**
 * Test case for {@link NumericalComparatorComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN NUMERICAL CRITERIA] Testing the numerical comparator component', () => {
  it('should exists', () => {
    assert.isDefined(NumericalComparatorComponent)
    assert.isDefined(EnumNumericalComparator)
  })
  it('should render self and subcomponents', () => {
    const props = {
      onChange: () => {
      },
    }
    const enzymeWrapper = shallow(<NumericalComparatorComponent {...props} />)
    expect(enzymeWrapper.find(RaisedButton)).to.have.length(1)
    expect(enzymeWrapper.find(IconMenu)).to.have.length(1)
    expect(enzymeWrapper.find(MenuItem)).to.have.length(4)
  })
})
