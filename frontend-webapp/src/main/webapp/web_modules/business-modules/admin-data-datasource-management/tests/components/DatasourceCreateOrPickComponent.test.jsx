/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import RaisedButton from 'material-ui/RaisedButton'
import SelectField from 'material-ui/SelectField'
import DatasourceCreateOrPickConnectionComponent from '../../src/components/DatasourceCreateOrPickConnectionComponent'

const context = buildTestContext()

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing DatasourceCreateOrPickConnectionComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasourceCreateOrPickConnectionComponent)
  })
  it('Render properly', () => {
    const props = {
      connectionList: DumpProvider.get('DataManagementClient', 'Connection'),
      createConnectionUrl: '#',
      backUrl: '#',
      handleDone: () => {},
    }

    const enzymeWrapper = shallow(<DatasourceCreateOrPickConnectionComponent {...props} />, { context })
    expect(enzymeWrapper.find(RaisedButton)).to.have.length(1)
    expect(enzymeWrapper.find(SelectField)).to.have.length(1)
  })
})
