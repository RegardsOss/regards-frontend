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
import { expect, assert } from 'chai'
import { Field } from '@regardsoss/form-utils'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { EnumConnectivity } from '@regardsoss/domain/admin'
import { ProjectConnectionFormComponent } from '../../../src/components/projectConnection/ProjectConnectionFormComponent'

const options = {
  context: buildTestContext(),
}

const props = {
  microservice: 'some microservice name',
  project: DumpProvider.getFirstEntity('AdminClient', 'Project'),
  projectConnection: {
    content: {
      id: 0,
      projectName: 'cdpp',
      microservice: 'rs-admin',
      userName: 'Alice',
      password: 'password',
      driverClassName: 'PostgreSQL',
      url: 'jdbcpostgresql://rs_test:5432/test',
      connectivity: EnumConnectivity.SUCCESS,
    },
    links: [],
  },
  configureOneForAll: false,
  onUpdate: () => {},
  onSubmit: () => {},
  onCancel: () => {},
  // This props allow to define if the current form is displayed in a stepper
  // or as a single form
  isStep: false,
  onNext: () => {},
  // from reduxForm
  submitting: false,
  pristine: false,
  handleSubmit: () => {},
  initialize: () => {},
  invalid: false,
}

// Test a component rendering
describe('[ADMIN PROJECT MANAGEMENT] Testing ProjectConnectionFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)
  it('should exists', () => {
    assert.isDefined(ProjectConnectionFormComponent)
  })

  it('should not be decorated with redux-form', () => {
    const enzymeWrapper = shallow(<ProjectConnectionFormComponent {...props} />, options)
    assert.isUndefined(enzymeWrapper.props().form)
  })

  it('should render the subcomponents', () => {
    const enzymeWrapper = shallow(<ProjectConnectionFormComponent {...props} />, options)
    const fields = enzymeWrapper.find(Field)
    expect(fields).to.have.length(6)
  })
})
