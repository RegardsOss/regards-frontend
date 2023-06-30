/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import { FormEntityNotFoundComponent } from '@regardsoss/form-utils'
import ModuleFormComponent from '../../src/components/ModuleFormComponent'
import NoContainerAvailables from '../../src/components/NoContainerAvailables'
import { UnconnectedModuleFormContainer } from '../../src/containers/ModuleFormContainer'

/**
 * Tests for ModuleFormContainer
 * @author Sébastien binda
 */
describe('[ADMIN UI MODULE MANAGEMENT] Testing Module form container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('Should fetch module before rendering component', () => {
    const props = {
      params: {
        project: 'testProject',
        applicationId: 'testApp',
        moduleId: '1',
      },
      updateModule: () => { },
      createModule: () => { },
      fetchModule: () => { },
      fetchLayout: () => { },
      // Set by mapStateToProps
      isFetching: false,
    }
    const wrapper = shallow(<UnconnectedModuleFormContainer
      {...props}
    />)

    assert.isTrue(wrapper.find(ModuleFormComponent).length === 0, 'There should be no ModuleFormComponent displayed')
  })

  it('should render a No entity found when no plugin is available', () => {
    const props = {
      params: {
        project: 'testProject',
        applicationId: 'testApp',
        moduleId: '1',
      },
      updateModule: () => { },
      createModule: () => { },
      fetchModule: () => { },
      fetchLayout: () => { },
      module: {},
      layout: {},
    }
    const wrapper = shallow(<UnconnectedModuleFormContainer
      {...props}
    />)
    wrapper.setState({
      isLoading: false,
    })
    assert.lengthOf(wrapper.find(ModuleFormComponent), 0, 'There should not be a ModuleFormComponent displayed')
    assert.lengthOf(wrapper.find(FormEntityNotFoundComponent), 1, 'There should be a FormEntityNotFoundComponent displayed')
  })

  it('Should render a no container available component', () => {
    const props = {
      params: {
        project: 'testProject',
        applicationId: 'testApp',
        moduleId: '1',
      },
      updateModule: () => { },
      createModule: () => { },
      fetchModule: () => { },
      fetchLayout: () => { },
      isFetching: false,
      module: {},
      layout: {},
    }
    const wrapper = shallow(<UnconnectedModuleFormContainer
      {...props}
    />)
    wrapper.setState({
      isLoading: false,
    })
    // give some modules (otherwise the component should lock the rendering)
    wrapper.instance().setState({ availableModuleTypes: ['aModule'] })
    wrapper.update() // wait for state update

    assert.isTrue(wrapper.find(ModuleFormComponent).length === 0, 'There should not be a ModuleFormComponent displayed')
    assert.isTrue(wrapper.find(NoContainerAvailables).length === 1, 'There should be a NoContainerAvailables displayed')
  })

  it('Should render component', () => {
    const props = {
      params: {
        project: 'testProject',
        applicationId: 'testApp',
        moduleId: '1',
      },
      updateModule: () => { },
      createModule: () => { },
      fetchModule: () => { },
      fetchLayout: () => { },
      isFetching: false,
      module: {},
      layout: {
        id: 0,
        type: 'MainContainer',
        applicationId: 'test',
        layout: {
          id: 'test',
          type: 'RowContainer',
          containers: [
            { id: 'test1', type: 'RowContainer' },
            { id: 'test2', type: 'RowContainer' },
          ],
        },
      },
    }
    const wrapper = shallow(<UnconnectedModuleFormContainer
      {...props}
    />)
    // give some modules (otherwise the component should lock the rendering)
    wrapper.setState({
      isLoading: false,
      availableModuleTypes: ['aModule'],
    })
    wrapper.update() // wait for state update

    assert.isTrue(wrapper.find(ModuleFormComponent).length === 1, 'There should be a ModuleFormComponent displayed')
  })
})
