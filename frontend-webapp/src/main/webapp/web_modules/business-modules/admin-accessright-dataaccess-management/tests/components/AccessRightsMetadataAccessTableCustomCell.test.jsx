/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import AccessRightsMetadataAccessTableCustomCell from '../../src/components/AccessRightsMetadataAccessTableCustomCell'

const context = buildTestContext()

/**
 * Tests for component AccessRightsActionsTableCustomCell
 *
 * @author Sébastien Binda
 */
describe('[ADMIN ACCESSRIGHT MANAGEMENT]  Testing AccessRightsMetadataAccessTableCustomCell', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccessRightsMetadataAccessTableCustomCell)
  })

  it('Render properly', () => {
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

    const enzymeWrapper = shallow(<AccessRightsMetadataAccessTableCustomCell {...props} />, { context, lifecycleExperimental: true })
    assert.equal(enzymeWrapper.children().text(), `accessright.form.meta.accessLevel.${accessRight.content.accessLevel}`, 'Invalid displayed value for accessRight')
  })
})
