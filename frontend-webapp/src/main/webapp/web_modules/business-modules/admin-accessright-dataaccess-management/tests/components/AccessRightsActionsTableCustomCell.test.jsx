/**
 * LICENSE_PLACEHOLDER
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
    accessRight.content.dataSet.id = dataset.content.id
    accessGroup.content.accessRights.push(accessRight.content)

    const props = {
      attributes: {
        id: 1,
        label: 'test',
      },
      onDelete: () => {},
      onEdit: () => {},
      accessGroup,
      intl: context.intl,
      entity: dataset,
      lineHeight: 47,
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
    const dataset = DumpProvider.getFirstEntity('DataManagementClient', 'Dataset')

    const props = {
      attributes: {
        id: 1,
        label: 'test',
      },
      onDelete: () => {},
      onEdit: () => {},
      accessGroup,
      intl: context.intl,
      entity: dataset,
      lineHeight: 47,
    }

    const enzymeWrapper = shallow(<AccessRightsActionsTableCustomCell {...props} />, { context, lifecycleExperimental: true })

    const buttons = enzymeWrapper.find(IconButton)
    // Delete and Edit button should be present.
    // Delete is present only if the accessRight is configuraed for the dataset for the given accessGroup
    const numberOfExpectedButtons = 1
    assert.equal(buttons.length, numberOfExpectedButtons, `There should be ${numberOfExpectedButtons} buttons rendered`)
  })
})
