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
import root from 'window-or-global'
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { Field } from '@regardsoss/form-utils'
import { testSuiteHelpers, buildTestContext, DumpProvider } from '@regardsoss/tests-helpers'
import { ProjectFormComponent } from '../../../src/components/project/ProjectFormComponent'

const options = {
  context: buildTestContext(),
}

// Test a component rendering
describe('[ADMIN PROJECT MANAGEMENT] Testing form container', () => {
  before(() => {
    testSuiteHelpers.before()
    // mock root location object
    root.location = { protocol: '', host: '' }
  })
  after(() => {
    testSuiteHelpers.after()
    delete root.location
  })
  it('should exists', () => {
    assert.isDefined(ProjectFormComponent)
  })

  it('should render edit form', () => {
    const props = {
      currentProject: DumpProvider.getFirstEntity('AdminClient', 'Project'),
      backUrl: '/some/url',
      onSubmit: () => { },
      // from reduxForm
      submitting: false,
      invalid: false,
      pristine: false,
      handleSubmit: () => { },
      initialize: () => { },
    }
    const enzymeWrapper = shallow(<ProjectFormComponent {...props} />, options)
    const subComponent = enzymeWrapper.find(Field)
    expect(subComponent).to.have.length(10)
  })

  it('should render create form', () => {
    const props = {
      backUrl: '/some/url',
      onSubmit: () => { },
      // from reduxForm
      submitting: false,
      invalid: false,
      pristine: false,
      handleSubmit: () => { },
      initialize: () => { },
    }
    const enzymeWrapper = shallow(<ProjectFormComponent {...props} />, options)
    const subComponent = enzymeWrapper.find(Field)
    expect(subComponent).to.have.length(10)
  })
})
