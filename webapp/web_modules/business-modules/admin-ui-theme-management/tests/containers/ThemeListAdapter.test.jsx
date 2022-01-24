/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import ThemeListContainer from '../../src/containers/ThemeListContainer'
import { ThemeListAdapter } from '../../src/containers/ThemeListAdapter'

const context = buildTestContext()

/**
* Test ThemeListAdapter
* @author Léo Mieulet
*/
describe('[ADMIN UI THEME MANAGEMENT] Testing ThemeListAdapter', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ThemeListContainer)
    assert.isDefined(ThemeListAdapter)
  })
  it('should render correctly', () => {
    const props = {
      // from router
      params: {
        project: 'project 1',
      },

      // Set by mapStateToProps
      isInstance: true,
      themeList: {},

      // Set by mapDispatchToProps
      fetchThemeList: () => { },
      fetchThemeInstanceList: () => { },
      deleteTheme: () => { },
      deleteInstanceTheme: () => { },
    }
    const enzymeWrapper = shallow(<ThemeListAdapter {...props} />, { context })
    const listContainerWrapper = enzymeWrapper.find(ThemeListContainer)
    assert.lengthOf(listContainerWrapper, 1, 'Should find the list container')

    assert.deepEqual(listContainerWrapper.prop('fetchThemeList'), props.fetchThemeInstanceList)
  })
})
