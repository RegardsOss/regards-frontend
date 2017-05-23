/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { Table, TableRow } from 'material-ui/Table'
import { CardActionsComponent } from '@regardsoss/components'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { RoleListComponent } from '../../src/components/RoleListComponent'

const options = {
  context: buildTestContext(),
}

// Test a component rendering
describe('[ADMIN USER ROLE MANAGEMENT] Testing project list container', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)


  it('should exists', () => {
    assert.isDefined(RoleListComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      roleList: DumpProvider.get('AdminClient', 'Role'),
      handleDelete: () => {},
      handleEdit: () => {},
      handleEditResourceAccess: () => {},
      createUrl: '/some/url',
      backUrl: '/some/url',
    }
    const enzymeWrapper = shallow(<RoleListComponent {...props} />, options)
    expect(enzymeWrapper.find(Table)).to.have.length(1)
    expect(enzymeWrapper.find(TableRow)).to.have.length(7)
    expect(enzymeWrapper.find(CardActionsComponent)).to.have.length(1)
  })
})
