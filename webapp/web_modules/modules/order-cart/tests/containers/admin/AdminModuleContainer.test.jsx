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
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import ModuleConfigurationComponent from '../../../src/components/admin/ModuleConfigurationComponent'
import { AdminModuleContainer } from '../../../src/containers/admin/AdminModuleContainer'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

/**
* Test AdminModuleContainer
* @author Raphaël Mechali
*/
describe('[Order Cart] Testing AdminModuleContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AdminModuleContainer)
  })
  it('should render correctly', () => {
    const props = {
      appName: 'x',
      project: 'y',
      type: 'any',
      adminForm: {
        isCreating: true,
        isDuplicating: false,
        isEditing: false,
        isPage: true,
        currentNamespace: 'conf',
        changeField: () => { },
        form: {},
      },
    }
    const enzymeWrapper = shallow(<AdminModuleContainer {...props} />, { context })
    assert.lengthOf(enzymeWrapper.find(ModuleConfigurationComponent), 1, 'There should be the configuration form')
  })
})
