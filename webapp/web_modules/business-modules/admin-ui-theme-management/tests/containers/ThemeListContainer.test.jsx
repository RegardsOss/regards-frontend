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
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import ThemeListComponent from '../../src/components/list/ThemeListComponent'
import ThemeListContainer from '../../src/containers/ThemeListContainer'

const context = buildTestContext()

/**
* Test ThemeListContainer
* @author Léo Mieulet
*/
describe('[ADMIN UI THEME MANAGEMENT] Testing ThemeListContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ThemeListContainer)
    assert.isDefined(ThemeListComponent)
  })
  it('should render correctly', () => {
    const backUrl = '#'
    const props = {
      themeList: {},
      backUrl,
      createUrl: backUrl,
      handleEdit: testSuiteHelpers.getSuccessDispatchStub(),
      handleDuplicate: testSuiteHelpers.getSuccessDispatchStub(),
      fetchThemeList: testSuiteHelpers.getSuccessDispatchStub(),
      deleteTheme: testSuiteHelpers.getSuccessDispatchStub(),
    }
    const enzymeWrapper = shallow(<ThemeListContainer {...props} />, { context })
    const loadableDecoratorWrapper = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.lengthOf(loadableDecoratorWrapper, 1, 'Should find the Loadable decorator')
    assert.isTrue(loadableDecoratorWrapper.props().isLoading, 'should load list of theme')
    assert.lengthOf(enzymeWrapper.find(ThemeListComponent), 1, 'Should find the list component')
  })
})
