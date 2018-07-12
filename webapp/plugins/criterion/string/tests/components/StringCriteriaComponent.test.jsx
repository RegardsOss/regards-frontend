/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { DamDomain } from '@regardsoss/domain'
import { StringCriteriaComponent } from '../../src/components/StringCriteriaComponent'
import styles from '../../src/styles/styles'

const context = buildTestContext(styles)

/**
 * Test case for {@link StringCriteriaComponent}
 *
 * @author Xavier-Alexandre Brochard
 */
describe('[PLUGIN STRING CRITERIA] Testing the string criteria component', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(StringCriteriaComponent)
    assert.isDefined(TextField)
  })
  it('should render self and sub components', () => {
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      onChange: () => { },
      getDefaultState: () => { },
      savePluginState: () => { },
      registerClear: () => { },
      attributes: {
        searchField: {
          name: 'searchField',
          description: 'Attribute to search',
          type: DamDomain.MODEL_ATTR_TYPES.STRING,
        },
      },
    }
    const enzymeWrapper = shallow(<StringCriteriaComponent {...props} />, { context })
    expect(enzymeWrapper.find(TextField)).to.have.length(1)
  })
})
