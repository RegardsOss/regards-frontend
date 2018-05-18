/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
//import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
// import { testSuiteHelpers, buildTestContext, DumpProvider } from '@regardsoss/tests-helpers'
// import { ListItem } from 'material-ui/List'
// import { Field } from '@regardsoss/form-utils'
import { DocumentEditFilesComponent } from '../../src/components/DocumentEditFilesComponent'
//import DocumentStepperContainer from '../../src/containers/DocumentStepperContainer'

//const context = buildTestContext()

describe('[ADMIN DATA DOCUMENT MANAGEMENT] Testing DocumentEditLinksComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DocumentEditFilesComponent)
  })

  // TODO Leo ==> seems the dump is now wrong
  // it('Render properly', () => {
  //   const props = {
  //     document: DumpProvider.getFirstEntity('DataManagementClient', 'Document'),
  //     accessToken: 'abcdef',
  //     handleDeleteDocFile: () => { },
  //     onSubmit: () => { },
  //     backUrl: '#',
  //     removeOneFieldOfTheForm: () => { },

  //     // from reduxForm
  //     submitting: false,
  //     invalid: false,
  //     handleSubmit: () => { },
  //   }
  //   const enzymeWrapper = shallow(<DocumentEditFilesComponent {...props} />, { context })
  //   expect(enzymeWrapper.find(ListItem)).to.have.length(2)
  //   expect(enzymeWrapper.find(DocumentStepperContainer)).to.have.length(1)
  //   expect(enzymeWrapper.find(Field)).to.have.length(1)
  // })
})
