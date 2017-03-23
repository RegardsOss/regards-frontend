/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { TableRow } from 'material-ui/Table'
import DatasetListComponent from '../../src/components/DatasetListComponent'
import DatasetDump from '../model/dump/DatasetDump'

describe('[ADMIN DATASET MANAGEMENT] Testing DatasetListComponent', () => {
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
    assert.isDefined(DatasetListComponent)
    assert.isDefined(TableRow)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {},
    },
  }
  it('Render properly', () => {
    const props = {
      datasetList: DatasetDump,
      handleDelete: () => {},
      handleEdit: () => {},
      createUrl: '#',
      backUrl: '#',
    }
    const enzymeWrapper = shallow(<DatasetListComponent {...props} />, { context })
    expect(enzymeWrapper.find(TableRow)).to.have.length(2)
  })
})
