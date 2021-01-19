/**
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
import { assert } from 'chai'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { AdminContainer } from '../../../src/containers/admin/AdminContainer'
import ModuleFormComponent from '../../../src/components/admin/ModuleFormComponent'
import styles from '../../../src/styles/styles'

const context = buildTestContext(styles)

describe('[Menu] Testing AdminContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AdminContainer)
  })
  it('should render properly, hiding component when roles are not available', () => {
    const props = {
      appName: 'x',
      project: 'y',
      type: 'any',
      roleList: {},
      adminForm: {
        isPage: false,
        changeField: () => { },
        currentNamespace: 'conf',
        form: {},
      },
      fetchLayout: () => { },
      fetchModules: () => { },
      fetchRoleList: () => { },
    }
    const enzymeWrapper = shallow(<AdminContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(ModuleFormComponent)
    assert.lengthOf(componentWrapper, 0, 'Component should be hidden')
  })
  it('should render properly, showing component when roles are available', () => {
    const props = {
      appName: 'x',
      project: 'y',
      type: 'any',
      roleList: {
        1: {
          content: {
            name: 'ROLE1',
          },
        },
      },
      adminForm: {
        isPage: false,
        changeField: () => { },
        currentNamespace: 'conf',
        form: {},
      },
      fetchLayout: () => { },
      fetchModules: () => { },
      fetchRoleList: () => { },
    }
    const enzymeWrapper = shallow(<AdminContainer {...props} />, { context })
    const componentWrapper = enzymeWrapper.find(ModuleFormComponent)
    assert.lengthOf(componentWrapper, 1, 'There should be the form component')
    testSuiteHelpers.assertWrapperProperties(componentWrapper, {
      appName: props.appName,
      project: props.project,
      adminForm: props.adminForm,
    }, 'Properties should be correctly reported')
  })
})
