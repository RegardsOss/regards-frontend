/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { TableRow } from 'material-ui/Table'
import { Field } from '@regardsoss/form-utils'
import DatasourceFormMappingLineComponent from '../../src/components/DatasourceFormMappingLineComponent'
import ModelAttributeDump from '../model/dump/ModelAttributeDump'
import ConnectionTableAttributeDump from '../model/dump/ConnectionTableAttributeDump'
import ConnectionTableDump from '../model/dump/ConnectionTableDump'

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing DatasourceFormMappingLineComponent', () => {
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
    assert.isDefined(DatasourceFormMappingLineComponent)
    assert.isDefined(Field)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {},
    },
  }
  it('Render properly', () => {
    const props = {
      modelAttribute: ModelAttributeDump['0'],
      handleDelete: () => {},
      tableAttributeList: ConnectionTableAttributeDump,
      table: ConnectionTableDump,
      onlyAdvancedConfiguration: false,
      isEditingSQL: false,
      change: () => {},
    }

    const enzymeWrapper = shallow(<DatasourceFormMappingLineComponent {...props} />, { context })
    expect(enzymeWrapper.find(TableRow)).to.have.length(1)
    expect(enzymeWrapper.find(Field)).to.have.length(3)
  })
})
