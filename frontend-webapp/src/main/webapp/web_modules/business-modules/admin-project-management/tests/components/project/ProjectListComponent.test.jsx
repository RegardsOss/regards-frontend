/*
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { Table, TableRow } from 'material-ui/Table'
import { testSuiteHelpers, IntlStub, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { CardActionsComponent } from '@regardsoss/components'
import { ProjectListComponent } from '../../../src/components/project/ProjectListComponent'

// Test a component rendering
describe('[ADMIN PROJECT MANAGEMENT] Testing project list container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  const context = buildTestContext()

  it('should exists', () => {
    assert.isDefined(ProjectListComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      projectList: DumpProvider.get('AdminClient', 'Project'),
      handleConfigureConnections: () => { },
      handleDelete: () => { },
      handleOpen: () => { },
      handleEdit: () => { },
      handleUpdateLicense: () => { },
      createUrl: '/some/url',
    }
    const options = { context }

    const enzymeWrapper = shallow(<ProjectListComponent {...props} />, options)
    expect(enzymeWrapper.find(Table)).to.have.length(1)
    expect(enzymeWrapper.find(TableRow)).to.have.length(3)
    expect(enzymeWrapper.find(CardActionsComponent)).to.have.length(1)
  })
})
