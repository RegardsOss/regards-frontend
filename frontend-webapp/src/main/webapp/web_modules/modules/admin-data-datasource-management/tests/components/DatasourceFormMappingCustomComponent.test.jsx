/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import DatasourceFormMappingCustomComponent from '../../src/components/DatasourceFormMappingCustomComponent'
import ModelAttributeDump from '../model/dump/ModelAttributeDump'
import DatasourceDump from '../model/dump/DatasourceDump'
import ConnectionTableAttributeDump from '../model/dump/ConnectionTableAttributeDump'
import ConnectionTableDump from '../model/dump/ConnectionTableDump'
import DatasourceFormMappingLineComponent from '../../src/components/DatasourceFormMappingLineComponent'

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing DatasourceFormMappingCustomComponent', () => {
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
    assert.isDefined(DatasourceFormMappingCustomComponent)
    assert.isDefined(DatasourceFormMappingLineComponent)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {},
    },
  }
  it('Render properly', () => {
    const props = {
      modelAttributeList: ModelAttributeDump,
      tableAttributeList: ConnectionTableAttributeDump,
      table: ConnectionTableDump.t_fragment,
      currentDatasource: DatasourceDump[4],
      isEditing: false,
      change: () => {},
    }


    const enzymeWrapper = shallow(<DatasourceFormMappingCustomComponent {...props} />, { context })
    expect(enzymeWrapper.find(DatasourceFormMappingLineComponent)).to.have.length(2)
  })
})
