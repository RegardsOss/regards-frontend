/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { assert } from 'chai'
import { spy } from 'sinon'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { ConfirmDialogComponent, TableContainer } from '@regardsoss/components'
import AccessRightListComponent from '../../src/components/AccessRightListComponent'
import AccessRightFormComponent from '../../src/components/AccessRightFormComponent'

const context = buildTestContext()

/**
 * Tests for component AccessRightListComponent
 *
 * @author Sébastien Binda
 */
describe('[ADMIN ACCESSRIGHT MANAGEMENT]  Testing AccessRightListComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(AccessRightListComponent)
  })

  it('Render properly', () => {
    const props = {
      accessGroup: DumpProvider.getFirstEntity('DataManagementClient', 'AccessGroup'),
      accessRights: DumpProvider.get('DataManagementClient', 'AccessRight'),
      selectedDatasets: {},
      pluginConfigurationList: {},
      pluginMetaDataList: {},
      deleteAccessRight: () => { },
      submitAccessRights: () => { },
      navigateToCreateDataset: spy(),
    }

    const enzymeWrapper = shallow(<AccessRightListComponent {...props} />, { context, lifecycleExperimental: true })
    const form = enzymeWrapper.find(AccessRightFormComponent)
    const confirmDeleteDialog = enzymeWrapper.find(ConfirmDialogComponent)
    const table = enzymeWrapper.find(TableContainer)
    assert.isTrue(form.length === 1, 'There should a AccessRightFormComponent rendered')
    assert.isTrue(confirmDeleteDialog.length === 1, 'There should a confirmDeleteDialog rendered')
    assert.isTrue(table.length === 1, 'There should a TableContainer rendered')
  })
})
