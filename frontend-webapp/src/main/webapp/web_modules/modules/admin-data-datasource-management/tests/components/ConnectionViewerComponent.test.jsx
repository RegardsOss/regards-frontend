/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { ListItem } from 'material-ui/List'
import ConnectionViewerComponent from '../../src/components/ConnectionViewerComponent'

const context = buildTestContext()

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing ConnectionViewerComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)


  it('should exists', () => {
    assert.isDefined(ConnectionViewerComponent)
    assert.isDefined(ListItem)
  })

  it('Render properly', () => {
    const props = {
      tableList: DumpProvider.get('DataManagementClient', 'ConnectionTable'),
      tableAttributeList: DumpProvider.get('DataManagementClient', 'ConnectionTableAttribute'),
      // Both are only provided in FromTable
      displayTableAsSelected: false,
      onTableSelected: () => {},
      initialTableOpen: null,
    }
    const enzymeWrapper = shallow(<ConnectionViewerComponent {...props} />, { context })
    expect(enzymeWrapper.find(ListItem)).to.have.length(12)
  })
})
