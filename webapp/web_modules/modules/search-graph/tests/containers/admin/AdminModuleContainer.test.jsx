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
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers } from '@regardsoss/tests-helpers'
import ModuleForm from '../../../src/components/admin/ModuleForm'
import { AdminModuleContainer } from '../../../src/containers/admin/AdminModuleContainer'

describe('[Search Graph] Testing AdminModuleContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AdminModuleContainer)
  })
  it('should render properly', () => {
    const props = {
      project: 'any',
      appName: 'any',
      type: 'any',
      adminForm: {
        isCreating: true,
        isDuplicating: false,
        isEditing: false,
        isPage: true,
        changeField: () => { },
        form: {},
      },
      // form map state to properties
      collectionModels: {},
      selectableAttributes: {},
      hasError: false,
      // from map dispatch to properies
      fetchCollectionModels: () => { },
      fetchSelectableAttributes: () => { },
    }
    // verify that the module form is rendered
    const enzymeWrapper = shallow(<AdminModuleContainer {...props} />)
    assert.equal(enzymeWrapper.find(ModuleForm).length, 1, 'The corresponding component should be rendered')
  })
})
