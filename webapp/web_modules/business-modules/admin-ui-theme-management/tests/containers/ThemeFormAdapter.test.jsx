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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ThemeFormContainer from '../../src/containers/ThemeFormContainer'
import { ThemeFormAdapter } from '../../src/containers/ThemeFormAdapter'

const context = buildTestContext()

/**
* Test ThemeFormAdapter
* @author Léo Mieulet
*/
describe('[ADMIN UI THEME MANAGEMENT] Testing ThemeFormAdapter', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ThemeFormContainer)
    assert.isDefined(ThemeFormAdapter)
  })
  it('should render correctly', () => {
    const props = {
      // from router
      params: {
        project: 'project 1',
        themeId: null,
      },

      // Set by mapStateToProps
      isInstance: true,
      currentTheme: null,

      // Set by mapDispatchToProps
      fetchTheme: () => { },
      fetchThemeInstance: () => { },
      updateTheme: () => { },
      updateInstanceTheme: () => { },
      createTheme: () => { },
      createInstanceTheme: () => { },
    }
    const enzymeWrapper = shallow(<ThemeFormAdapter {...props} />, { context })
    const formContainerWrapper = enzymeWrapper.find(ThemeFormContainer)
    assert.lengthOf(formContainerWrapper, 1, 'Should find the form container')

    assert.deepEqual(formContainerWrapper.prop('fetchTheme'), props.fetchThemeInstance)
  })
})
