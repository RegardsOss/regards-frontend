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
import TextField from 'material-ui/TextField'
import { StringCriteriaComponent } from '../../src/components/StringCriteriaComponent'

/**
 * Test case for {@link StringCriteriaComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN STRING CRITERIA] Testing the string criteria component', () => {
  it('should exists', () => {
    assert.isDefined(StringCriteriaComponent)
    assert.isDefined(TextField)
  })
  it('should render self and sub components', () => {
    const props = {
      attributes: {
        searchField: {
          name: 'searchField',
          description: 'Attribute to search',
          type: 'string',
        },
      },
      pluginInstanceId: 42,
      onChange: () => {
      },
    }
    const enzymeWrapper = shallow(<StringCriteriaComponent {...props} />)
    expect(enzymeWrapper.find(TextField)).to.have.length(1)
  })
})
