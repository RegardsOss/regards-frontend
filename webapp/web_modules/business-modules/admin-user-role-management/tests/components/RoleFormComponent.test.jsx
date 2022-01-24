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
import { expect, assert } from 'chai'
import { Field } from '@regardsoss/form-utils'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { RoleFormComponent } from '../../src/components/RoleFormComponent'

const options = {
  context: buildTestContext(),
}

// Test a component rendering
describe('[ADMIN USER ROLE MANAGEMENT] Testing form container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(RoleFormComponent)
  })

  it('should render edit form', () => {
    const props = {
      currentRole: DumpProvider.getFirstEntity('AdminClient', 'Role'),
      backUrl: '/some/url',
      onSubmit: () => {},
      change: () => {},
      // from reduxForm
      submitting: false,
      pristine: false,
      handleSubmit: () => {},
      initialize: () => {},
    }
    const enzymeWrapper = shallow(<RoleFormComponent {...props} />, options)
    const subComponent = enzymeWrapper.find(Field)
    expect(subComponent).to.have.length(2)
  })

  it('should render create form', () => {
    const props = {
      backUrl: '/some/url',
      onSubmit: () => {},
      change: () => {},
      // from reduxForm
      submitting: false,
      pristine: false,
      handleSubmit: () => {},
      initialize: () => {},
    }
    const enzymeWrapper = shallow(<RoleFormComponent {...props} />, options)
    const subComponent = enzymeWrapper.find(Field)
    expect(subComponent).to.have.length(2)
  })
})
