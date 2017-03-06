/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import DatasourceCreateOrPickConnectionComponent from '../../src/components/DatasourceCreateOrPickConnectionComponent'
import ConnectionDump from '../model/dump/ConnectionDump'

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing DatasourceCreateOrPickConnectionComponent', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    sinon.stub(console, 'error', (warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(DatasourceCreateOrPickConnectionComponent)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {},
    },
  }
  it('Render properly', () => {
    const props = {
      connectionList: ConnectionDump,
      createConnectionUrl: '#',
      backUrl: '#',
      handleDone: () => {},
    }

    const enzymeWrapper = shallow(<DatasourceCreateOrPickConnectionComponent {...props} />, { context })
    expect(enzymeWrapper.find(RaisedButton)).to.have.length(1)
    expect(enzymeWrapper.find(SelectField)).to.have.length(1)
  })
})
