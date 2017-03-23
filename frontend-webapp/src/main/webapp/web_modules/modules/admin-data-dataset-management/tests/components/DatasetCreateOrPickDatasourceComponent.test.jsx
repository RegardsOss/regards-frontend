/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import MenuItem from 'material-ui/MenuItem'
import DatasourceDump from '../model/dump/DatasourceDump'
import { DatasetCreateOrPickDatasourceComponent } from '../../src/components/DatasetCreateOrPickDatasourceComponent'

describe('[ADMIN DATASET MANAGEMENT] Testing DatasetCreateOrPickDatasourceComponent', () => {
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
    assert.isDefined(DatasetCreateOrPickDatasourceComponent)
    assert.isDefined(MenuItem)
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
      createDatasourceUrl: '#',
      backUrl: '#',
      handleDone: () => {},
    }
    const enzymeWrapper = shallow(<DatasetCreateOrPickDatasourceComponent {...props} />, { context })
    expect(enzymeWrapper.find(MenuItem)).to.have.length(2)
  })
})
