/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { TableRow } from 'material-ui/Table'
import AccessGroupListComponent from '../../src/components/AccessGroupListComponent'
import AccessGroupList from '../model/dump/AccessGroupList'

describe('[ADMIN USER ACCESSGROUP MANAGEMENT] Testing AccessGroupListComponent', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(AccessGroupListComponent)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {},
    },
  }
  it('Render properly', () => {
    const props = {

      accessGroupList: AccessGroupList,
      handleDelete: () => {},
      handleEdit: () => {},
      handleDuplicate: () => {},
      createUrl: '#',
      backUrl: '#',

    }
    const enzymeWrapper = shallow(<AccessGroupListComponent {...props} />, { context })
    expect(enzymeWrapper.find(TableRow)).to.have.length(4)
  })
})
