/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DatasetEditLinksContainer } from '../../src/containers/DatasetEditLinksContainer'

const datasetList = {
  1: { content: {
    type: 'DATASET',
    lastUpdate: '2017-01-30T11:16:23.919',
    creationDate: '2017-01-30T11:16:23.919',
    id: 1,
    ipId: 'URN:AIP:DATASET:PROJECT:fdsfdsf15-8a93-4d06-a90a-f657c26d3930:V1',
    sipId: 'SipId1',
    label: 'label',
    tags: [
      'URN:AIP:DATASET:PROJECT:c70a2428-8a93-4d06-a90a-f657c26d3930:V1',
    ],
    model: {
      id: 1,
      name: 'modelName1',
      description: 'model desc',
      type: 'DATASET',
    },
  } },
  2: { content: {
    type: 'DATASET',
    lastUpdate: '2017-01-30T11:16:23.919',
    creationDate: '2017-01-30T11:16:23.919',
    id: 1,
    ipId: 'URN:AIP:DATASET:PROJECT:fdsfdsf15-8a93-4d06-a90a-f657c26d3930:V1',
    sipId: 'SipId1',
    label: 'label',
    tags: [
      'URN:AIP:DATASET:PROJECT:c70a2428-8a93-4d06-a90a-f657c26d3930:V1',
    ],
    model: {
      id: 1,
      name: 'modelName1',
      description: 'model desc',
      type: 'DATASET',
    },
  } },
}
describe('[ADMIN DATA DATASET MANAGEMENT] Testing DatasetEditLinksContainer', () => {
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
    assert.isDefined(DatasetEditLinksContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {},
    },
  }
  // TODO test some rendering
  it('Render properly', () => {
    const props = {
      // from router
      params: {
        project: 'lambda',
        datasetId: '1',
      },
      // from mapStateToProps
      currentDataset: datasetList[1],
      datasetList,
      isFetching: false,
      // from mapDispatchToProps
      removeTagFromDataset: () => {},
      addTagToDataset: () => {},
      fetchDataset: () => {},
      fetchDatasetList: () => {},
    }
    const enzymeWrapper = shallow(<DatasetEditLinksContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isFalse(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be false')
  })
})
