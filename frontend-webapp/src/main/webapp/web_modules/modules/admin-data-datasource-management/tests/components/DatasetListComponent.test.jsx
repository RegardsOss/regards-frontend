/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { TableRow } from 'material-ui/Table'
import DatasourceListComponent from '../../src/components/DatasourceListComponent'

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing DatasourceListComponent', () => {
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

      datasourceList: {
        1: { content: {
          type: 'DATASOURCE',
          lastUpdate: '2017-01-30T11:16:23.919',
          creationDate: '2017-01-30T11:16:23.919',
          id: 1,
          ipId: 'URN:AIP:DATASOURCE:PROJECT:fdsfdsf15-8a93-4d06-a90a-f657c26d3930:V1',
          sipId: 'SipId1',
          label: 'label',
          tags: [
            'URN:AIP:DATASOURCE:PROJECT:c70a2428-8a93-4d06-a90a-f657c26d3930:V1',
          ],
          model: {
            id: 1,
            name: 'modelName1',
            description: 'model desc',
            type: 'DATASOURCE',
          },
        } },
        2: { content: {
          type: 'DATASOURCE',
          lastUpdate: '2017-01-30T11:16:23.919',
          creationDate: '2017-01-30T11:16:23.919',
          id: 2,
          ipId: 'URN:AIP:DATASOURCE:PROJECT:fdsfdsf15-8a93-4d06-a90a-f657c26d3930:V1',
          sipId: 'SipId1',
          label: 'label',
          tags: [
            'URN:AIP:DATASOURCE:PROJECT:c70a2428-8a93-4d06-a90a-f657c26d3930:V1',
          ],
          model: {
            id: 1,
            name: 'modelName1',
            description: 'model desc',
            type: 'DATASOURCE',
          },
        } },
      },
      handleDelete: () => {},
      handleEdit: () => {},
      handleDuplicate: () => {},
      createUrl: '#',
      backUrl: '#',

    }
    const enzymeWrapper = shallow(<DatasourceListComponent {...props} />, { context })
    expect(enzymeWrapper.find(TableRow)).to.have.length(3)
  })
})
