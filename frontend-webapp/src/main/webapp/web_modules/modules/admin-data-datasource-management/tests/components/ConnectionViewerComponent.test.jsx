/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { ListItem } from 'material-ui/List'
import ConnectionViewerComponent from '../../src/components/ConnectionViewerComponent'
import ConnectionTableAttributeDump from '../model/dump/ConnectionTableAttributeDump'
import ConnectionTableDump from '../model/dump/ConnectionTableDump'

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing ConnectionViewerComponent', () => {
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
    assert.isDefined(ConnectionViewerComponent)
    assert.isDefined(ListItem)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {},
    },
  }

  it('Render properly', () => {
    const props = {
      tableList: ConnectionTableDump,
      tableAttributeList: ConnectionTableAttributeDump,
      // Both are only provided in FromTable
      displayTableAsSelected: false,
      onTableSelected: () => {},
      initialTableOpen: null,
    }
    const enzymeWrapper = shallow(<ConnectionViewerComponent {...props} />, { context })
    expect(enzymeWrapper.find(ListItem)).to.have.length(12)
  })
})
