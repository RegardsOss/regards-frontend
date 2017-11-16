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
import IconButton from 'material-ui/IconButton'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import AccessRightsActionsTableCustomCell from '../../src/components/AccessRightsActionsTableCustomCell'

const context = buildTestContext()

/**
 * Tests for component AccessRightsActionsTableCustomCell
 *
 * @author Sébastien Binda
 */
describe('[ADMIN ACCESSRIGHT MANAGEMENT]  Testing AccessRightListComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccessRightsActionsTableCustomCell)
  })

  it('Render properly with delete option', () => {
    const accessGroup = DumpProvider.getFirstEntity('DataManagementClient', 'AccessGroup')
    const dataset = DumpProvider.getFirstEntity('DataManagementClient', 'Dataset')
    const accessRight = DumpProvider.getFirstEntity('DataManagementClient', 'AccessRight')

    // Create an accessRight
    accessRight.content.dataset.id = dataset.content.id

    const props = {
      onDelete: () => { },
      onEdit: () => { },
      accessGroup,
      accessRights: { accessRight },
      entity: dataset,
    }

    const enzymeWrapper = shallow(<AccessRightsActionsTableCustomCell {...props} />, { context, lifecycleExperimental: true })

    const buttons = enzymeWrapper.find(IconButton)
    // Delete and Edit button should be present.
    // Delete is present only if the accessRight is configuraed for the dataset for the given accessGroup
    const numberOfExpectedButtons = 2
    assert.equal(buttons.length, numberOfExpectedButtons, `There should be ${numberOfExpectedButtons} buttons rendered`)
  })

  it('Render properly without delete option', () => {
    const accessGroup = DumpProvider.getFirstEntity('DataManagementClient', 'AccessGroup')
    const accessRight = DumpProvider.getFirstEntity('DataManagementClient', 'AccessRight')
    const dataset = DumpProvider.getFirstEntity('DataManagementClient', 'Dataset')

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
    }

    const enzymeWrapper = shallow(<AccessRightsActionsTableCustomCell {...props} />, { context, lifecycleExperimental: true })

    const buttons = enzymeWrapper.find(IconButton)
    // Delete and Edit button should be present.
    // Delete is present only if the accessRight is configuraed for the dataset for the given accessGroup
    const numberOfExpectedButtons = 1
    assert.equal(buttons.length, numberOfExpectedButtons, `There should be ${numberOfExpectedButtons} buttons rendered`)
  })
})
