/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { testSuiteHelpers, buildTestContext, DumpProvider } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import MenuItem from 'material-ui/MenuItem'
import { DocumentFormComponent } from '../../src/components/DocumentFormComponent'
import DocumentStepperComponent from '../../src/components/DocumentStepperComponent'

describe('[ADMIN DATA COLLECTION MANAGEMENT] Testing DocumentFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DocumentFormComponent)
  })
  const context = buildTestContext()
  it('Render properly', () => {
    const props = {
      currentDocument: DumpProvider.getFirstEntity('DataManagementClient', 'Document'),
      onSubmit: () => {},
      backUrl: '#',
      modelList: DumpProvider.get('DataManagementClient', 'Model'),
      modelAttributeList: DumpProvider.get('DataManagementClient', 'ModelAttribute'),
      isDuplicating: false,
      handleUpdateModel: () => {},
      // from reduxForm
      submitting: false,
      invalid: false,
      handleSubmit: () => {},
      initialize: () => {},
    }
    const enzymeWrapper = shallow(<DocumentFormComponent {...props} />, { context })
    expect(enzymeWrapper.find(Field)).to.have.length(5)
    expect(enzymeWrapper.find(MenuItem)).to.have.length(1)
    expect(enzymeWrapper.find(DocumentStepperComponent)).to.have.length(1)
  })
})
