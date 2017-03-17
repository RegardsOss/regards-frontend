/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { TableRow } from 'material-ui/Table'
import DatasourceListComponent from '../../src/components/DatasourceListComponent'
import DatasourceDump from '../model/dump/DatasourceDump'

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing DatasourceListComponent', () => {
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
    assert.isDefined(DatasourceListComponent)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {},
    },
  }
  it('Render properly', () => {
    const props = {
      datasourceList: DatasourceDump,
      handleDelete: () => {},
      handleEdit: () => {},
      createUrl: '#',
      backUrl: '#',
    }

    const enzymeWrapper = shallow(<DatasourceListComponent {...props} />, { context })
    expect(enzymeWrapper.find(TableRow)).to.have.length(3)
  })
})
