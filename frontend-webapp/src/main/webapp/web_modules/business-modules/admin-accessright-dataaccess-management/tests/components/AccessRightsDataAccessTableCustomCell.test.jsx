/**
 * LICENSE_PLACEHOLDER
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
      onDelete: () => {},
      onEdit: () => {},
      accessGroup,
      accessRights: { accessRight },
      intl: context.intl,
      entity: dataset,
      lineHeight: 47,
    }

    const enzymeWrapper = shallow(<AccessRightsDataAccessTableCustomCell {...props} />, { context, lifecycleExperimental: true })
    assert.equal(enzymeWrapper.children().text(), `accessright.form.data.accessLevel.${accessRight.content.dataAccessRight.dataAccessLevel}`, 'Invalid displayed value for accessRight')
  })

  it('Render properly a NOT_APPLICABLE value if metadata access is not FULL_ACCESS', () => {
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
      onDelete: () => {},
      onEdit: () => {},
      accessGroup,
      accessRights: { accessRight },
      intl: context.intl,
      entity: dataset,
      lineHeight: 47,
    }

    const enzymeWrapper = shallow(<AccessRightsDataAccessTableCustomCell {...props} />, { context, lifecycleExperimental: true })
    assert.equal(enzymeWrapper.children().text(), `accessright.form.data.accessLevel.${AccessRightsDataAccessTableCustomCell.NOT_APPLICABLE}`, 'Invalid displayed value for accessRight')
  })

  it('Render properly a NOT_APPLICABLE value if metadata access is not FULL_ACCESS', () => {
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
      onDelete: () => {},
      onEdit: () => {},
      accessGroup,
      accessRights: { accessRight },
      intl: context.intl,
      entity: dataset,
      lineHeight: 47,
    }

    const enzymeWrapper = shallow(<AccessRightsDataAccessTableCustomCell {...props} />, { context, lifecycleExperimental: true })
    assert.equal(enzymeWrapper.children().text(), `accessright.form.data.accessLevel.${AccessRightsDataAccessTableCustomCell.NOT_APPLICABLE}`, 'Invalid displayed value for accessRight')
  })
})
