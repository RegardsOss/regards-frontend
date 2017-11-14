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

  it('Render properly', () => {
    const accessGroup = DumpProvider.getFirstEntity('DataManagementClient', 'AccessGroup')
    const dataset = DumpProvider.getFirstEntity('DataManagementClient', 'Dataset')
    const accessRight = DumpProvider.getFirstEntity('DataManagementClient', 'AccessRight')

    // Create an accessRight
    accessRight.content.dataset.id = dataset.content.id

    const props = {
      attributes: {
        id: 1,
        label: 'test',
      },
      onDelete: () => { },
      onEdit: () => { },
      accessGroup,
      accessRights: { accessRight },
      entity: dataset,
      lineHeight: 47,
    }

    const enzymeWrapper = shallow(<AccessRightsDataAccessTableCustomCell {...props} />, { context, lifecycleExperimental: true })
    assert.equal(enzymeWrapper.children().text(), `accessright.form.data.accessLevel.${accessRight.content.dataAccessRight.dataAccessLevel}`, 'Invalid displayed value for accessRight')
  })

  it('Render properly a NOT_APPLICABLE value if metadata access is not FULL_ACCESS (NO_ACCESS)', () => {
    const accessGroup = DumpProvider.getFirstEntity('DataManagementClient', 'AccessGroup')
    const dataset = DumpProvider.getFirstEntity('DataManagementClient', 'Dataset')
    const accessRight = DumpProvider.getFirstEntity('DataManagementClient', 'AccessRight')

    // Create an accessRight
    accessRight.content.dataset.id = dataset.content.id
    accessRight.content.accessLevel = AccessRightsEnum.METADATA_ACCESS_ENUM.NO_ACCESS

    const props = {
      attributes: {
        id: 1,
        label: 'test',
      },
      onDelete: () => { },
      onEdit: () => { },
      accessGroup,
      accessRights: { accessRight },
      entity: dataset,
      lineHeight: 47,
    }

    const enzymeWrapper = shallow(<AccessRightsDataAccessTableCustomCell {...props} />, { context, lifecycleExperimental: true })
    assert.equal(enzymeWrapper.children().text(), `accessright.form.data.accessLevel.${AccessRightsDataAccessTableCustomCell.NOT_APPLICABLE}`, 'Invalid displayed value for accessRight')
  })

  it('Render properly a NOT_APPLICABLE value if metadata access is not FULL_ACCESS (DATASET_ACCESS)', () => {
    const accessGroup = DumpProvider.getFirstEntity('DataManagementClient', 'AccessGroup')
    const dataset = DumpProvider.getFirstEntity('DataManagementClient', 'Dataset')
    const accessRight = DumpProvider.getFirstEntity('DataManagementClient', 'AccessRight')

    // Create an accessRight
    accessRight.content.dataset.id = dataset.content.id
    accessRight.content.accessLevel = AccessRightsEnum.METADATA_ACCESS_ENUM.DATASET_ACCESS

    const props = {
      attributes: {
        id: 1,
        label: 'test',
      },
      onDelete: () => { },
      onEdit: () => { },
      accessGroup,
      accessRights: { accessRight },
      entity: dataset,
      lineHeight: 47,
    }

    const enzymeWrapper = shallow(<AccessRightsDataAccessTableCustomCell {...props} />, { context, lifecycleExperimental: true })
    assert.equal(enzymeWrapper.children().text(), `accessright.form.data.accessLevel.${AccessRightsDataAccessTableCustomCell.NOT_APPLICABLE}`, 'Invalid displayed value for accessRight')
  })
})
