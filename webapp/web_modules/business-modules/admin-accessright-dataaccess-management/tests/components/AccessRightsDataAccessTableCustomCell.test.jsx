/**
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
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import AccessRightsDataAccessTableCustomCell from '../../src/components/AccessRightsDataAccessTableCustomCell'
import AccessRightsEnum from '../../src/components/AccessRightsEnum'

const context = buildTestContext()

/**
 * Tests for component AccessRightsActionsTableCustomCell
 *
 * @author Sébastien Binda
 */
describe('[ADMIN ACCESSRIGHT MANAGEMENT]  Testing AccessRightsDataAccessTableCustomCell', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccessRightsDataAccessTableCustomCell)
  })

  const testCases = [{
    label: 'not applicable label when metadata access level is undefined',
    entity: DumpProvider.getEntityBy('DataManagementClient', 'DatasetWithAccessRight',
      'content.datasetIpId', 'URN:AIP:DATASET:project1:7cb64c2a-a866-4c18-9cf7-08fef9dfcc6c:V1'),
    expectedLevelKeyword: AccessRightsDataAccessTableCustomCell.NOT_APPLICABLE,
  },
  {
    label: 'not applicable label when metadata access level is RESTRICTED_ACCESS',
    entity: DumpProvider.getEntityBy('DataManagementClient', 'DatasetWithAccessRight',
      'content.datasetIpId', 'URN:AIP:DATASET:project1:1b3aaeb5-c475-46a1-9454-3c69c05215ea:V1'),
    expectedLevelKeyword: AccessRightsDataAccessTableCustomCell.NOT_APPLICABLE,
  }, {
    label: 'data access level label when metadata access level is FULL_ACCESS',
    entity: DumpProvider.getEntityBy('DataManagementClient', 'DatasetWithAccessRight',
      'content.datasetIpId', 'URN:AIP:DATASET:project1:075bc1d9-0f3e-4275-8f8e-bbca8f092229:V1'),
    expectedLevelKeyword: AccessRightsEnum.DATA_ACCESS_ENUM.AUTHORIZED,
  }, {
    label: 'data access level label when metadata access level is CUSTOM_ACCESS',
    entity: DumpProvider.getEntityBy('DataManagementClient', 'DatasetWithAccessRight',
      'content.datasetIpId', 'URN:AIP:DATASET:project1:873b8085-e4f7-400a-ba4c-dc3f5cf88b7b:V1'),
    expectedLevelKeyword: AccessRightsEnum.DATA_ACCESS_ENUM.AUTHORIZED,
  }]

  testCases.forEach(({ label, entity, expectedLevelKeyword }) => it(`should render correctly, displaying ${label}`, () => {
    const props = {
      entity,
    }
    const enzymeWrapper = shallow(<AccessRightsDataAccessTableCustomCell {...props} />, { context })
    assert.equal(enzymeWrapper.children().text(), `accessright.form.data.accessLevel.${expectedLevelKeyword}`, 'Invalid displayed value for accessRight')
  }))
})
