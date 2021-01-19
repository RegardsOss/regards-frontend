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
import { spy } from 'sinon'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { UnconnectedModulesListContainer } from '../../src/containers/ModulesListContainer'

/**
 * Tests for ModulesListContainer
 * @author Sébastien binda
 */
describe('[ADMIN UI MODULE MANAGEMENT] Testing Modules list container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(UnconnectedModulesListContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })

  it('Should fetch the modules list before rendering', () => {
    const fetchModulesCallback = spy()
    const props = {
      params: {
        project: 'testProject',
        applicationId: 'testApp',
        moduleId: '0',
      },
      // Set by mapDispatchToProps
      fetchModules: fetchModulesCallback,
      updateModule: () => {},
      deleteModule: () => {},
    }
    const wrapper = shallow(
      <UnconnectedModulesListContainer
        {...props}
      />)

    assert.isTrue(wrapper.find(LoadableContentDisplayDecorator).length === 1, 'There should be a LoadableContentDisplayDecorator displayed')
    assert.isTrue(fetchModulesCallback.calledOnce, 'The container should fetch the modules list at mount')
  })
})
