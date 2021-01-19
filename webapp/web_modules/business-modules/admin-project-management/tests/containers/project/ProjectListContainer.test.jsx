/*
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
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider } from '@regardsoss/tests-helpers'
import { ProjectListContainer } from '../../../src/containers/project/ProjectListContainer'
import ProjectListComponent from '../../../src/components/project/ProjectListComponent'

// Test a components rendering
describe('[ADMIN PROJECT MANAGEMENT] Testing project list container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ProjectListContainer)
    assert.isDefined(ProjectListComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      // from mapStateToProps
      projectList: DumpProvider.get('AdminClient', 'Project'),
      // from mapDispatchToProps
      fetchProjectList: () => { },
      deleteProject: () => { },
      updateLicense: () => { },
    }

    const enzymeWrapper = shallow(<ProjectListContainer {...props} />)
    const subComponent = enzymeWrapper.find(ProjectListComponent)
    expect(subComponent).to.have.length(1)
  })
})
