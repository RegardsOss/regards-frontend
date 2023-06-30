/*
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
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { ProjectFormContainer } from '../../../src/containers/project/ProjectFormContainer'
import ProjectFormComponent from '../../../src/components/project/ProjectFormComponent'

// Test a component rendering
describe('[ADMIN PROJECT MANAGEMENT] Testing form container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProjectFormContainer)
    assert.isDefined(ProjectFormComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      params: {
        project_name: 'project name',
      },
      // from mapStateToProps
      project: DumpProvider.getFirstEntity('AdminClient', 'Project'),
      isFetching: false,
      // from mapDispatchToProps
      createProject: () => { },
      fetchProject: () => { },
      updateProject: () => { },
    }

    const enzymeWrapper = shallow(<ProjectFormContainer {...props} />)
    const subComponent = enzymeWrapper.find(ProjectFormComponent)
    expect(subComponent).to.have.length(1)
  })
})
