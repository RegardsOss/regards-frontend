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
import { AdminDomain } from '@regardsoss/domain'
import { buildTestContext, testSuiteHelpers } from '@regardsoss/tests-helpers'
import { ModulesConfigurationErrorContainer } from '../../src/containers/ModulesConfigurationErrorContainer'
import { moduleDumps1, attrDumps1 } from '../dumps/dumps'
import styles from '../../src/styles'

const context = buildTestContext(styles)

/**
 * Test ModulesConfigurationErrorContainer
 * @author Théo Lasserre
 */
describe('[ADMIN CONFIGURATION MODULE MANAGEMENT] Testing ModulesConfigurationErrorContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(ModulesConfigurationErrorContainer)
  })
  it('should render correctly no error message without project admin role', () => {
    const props = {
      currentRole: AdminDomain.DEFAULT_ROLES_ENUM.REGISTERED_USER,
      isAuthenticated: true,
      isInstance: false,
      isFetchingAttributes: false,
      isFetchingModules: false,
      attributes: attrDumps1,
      modules: moduleDumps1,
      fetchModules: () => { },
      fetchAttrModelList: () => { },
    }
    const enzymeWrapper = shallow(<ModulesConfigurationErrorContainer {...props} />, { context })
    assert.isEmpty(enzymeWrapper.instance().state.errorConfDialogContent)
  })
  it('should render correctly no error message without configuration errors', () => {
    const props = {
      currentRole: AdminDomain.DEFAULT_ROLES_ENUM.PROJECT_ADMIN,
      isAuthenticated: true,
      isInstance: false,
      isFetchingAttributes: false,
      isFetchingModules: false,
      attributes: attrDumps1,
      modules: moduleDumps1,
      fetchModules: () => { },
      fetchAttrModelList: () => { },
    }
    const enzymeWrapper = shallow(<ModulesConfigurationErrorContainer {...props} />, { context })
    assert.isNotEmpty(enzymeWrapper.instance().state.errorConfDialogContent)
    assert.lengthOf(enzymeWrapper.instance().state.errorConfDialogContent, 2)

    assert.lengthOf(enzymeWrapper.instance().state.errorConfDialogContent[0].filters, 3)
    assert.lengthOf(enzymeWrapper.instance().state.errorConfDialogContent[0].criteriasGroup, 1)
    assert.lengthOf(enzymeWrapper.instance().state.errorConfDialogContent[0].criteriasGroup[0].criteriaAttribute, 2)

    assert.notExists(enzymeWrapper.instance().state.errorConfDialogContent[1].filters)
    assert.lengthOf(enzymeWrapper.instance().state.errorConfDialogContent[1].criteriasGroup, 1)
    assert.lengthOf(enzymeWrapper.instance().state.errorConfDialogContent[1].criteriasGroup[0].criteriaAttribute, 1)
    assert.notExists(enzymeWrapper.instance().state.errorConfDialogContent[1].criteriasGroup[1])
  })
})
