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
import TextField from 'material-ui/TextField'
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { FullTextCriterionContainer } from '../../src/containers/FullTextCriterionContainer'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test FullTextCriteriaContainer
 * @author Raphaël Mechali
 */
describe('[Full text criterion] Testing FullTextCriteriaContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(FullTextCriterionContainer)
  })
  it('should render correctly', () => {
    const props = {
      // parent callbacks (required)
      pluginInstanceId: 'any',
      currentTodo: null,
      onChange: () => { },
      getDefaultState: () => { },
      savePluginState: () => { },
      registerClear: () => { },
      attributes: {},
    }
    const enzymeWrapper = shallow(<FullTextCriterionContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(TextField), 1, 'There should be search field')
  })
})
