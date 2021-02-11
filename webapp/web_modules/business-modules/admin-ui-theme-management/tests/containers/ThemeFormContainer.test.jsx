/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import ThemeFormComponent from '../../src/components/ThemeFormComponent'
import ThemeFormContainer from '../../src/containers/ThemeFormContainer'

const context = buildTestContext()

/**
* Test ThemeFormContainer
* @author Léo Mieulet
*/
describe('[ADMIN UI THEME MANAGEMENT] Testing ThemeFormContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ThemeFormContainer)
    assert.isDefined(ThemeFormComponent)
  })
  it('should render correctly', () => {
    const backUrl = '#'
    const props = {
      backUrl,
      currentTheme: null,
      isCreating: true,
      isEditing: false,
      isDuplicating: false,

      fetchTheme: () => { },
      updateTheme: () => { },
      createTheme: () => { },
    }
    const enzymeWrapper = shallow(<ThemeFormContainer {...props} />, { context })
    const loadableDecoratorWrapper = enzymeWrapper.find(LoadableContentDisplayDecorator)
    assert.lengthOf(loadableDecoratorWrapper, 1, 'Should find the Loadable decorator')
    assert.isFalse(loadableDecoratorWrapper.props().isLoading, 'Loading should be false')

    assert.isFunction(loadableDecoratorWrapper.prop('children'))
    assert.deepEqual(loadableDecoratorWrapper.prop('children'), enzymeWrapper.instance().getForm)
    assert.deepEqual(enzymeWrapper.instance().getForm().props.backUrl, backUrl)
  })
})
