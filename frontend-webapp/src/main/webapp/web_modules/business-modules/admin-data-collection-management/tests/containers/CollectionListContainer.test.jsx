/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { CollectionListContainer } from '../../src/containers/CollectionListContainer'

const collectionList = {
  1: { content: {
    type: 'COLLECTION',
    lastUpdate: '2017-01-30T11:16:23.919',
    creationDate: '2017-01-30T11:16:23.919',
    id: 1,
    ipId: 'URN:AIP:COLLECTION:PROJECT:fdsfdsf15-8a93-4d06-a90a-f657c26d3930:V1',
    sipId: 'SipId1',
    label: 'label',
    tags: [
      'URN:AIP:COLLECTION:PROJECT:c70a2428-8a93-4d06-a90a-f657c26d3930:V1',
    ],
    model: {
      id: 1,
      name: 'modelName1',
      description: 'model desc',
      type: 'COLLECTION',
    },
  } },
  2: { content: {
    type: 'COLLECTION',
    lastUpdate: '2017-01-30T11:16:23.919',
    creationDate: '2017-01-30T11:16:23.919',
    id: 1,
    ipId: 'URN:AIP:COLLECTION:PROJECT:fdsfdsf15-8a93-4d06-a90a-f657c26d3930:V1',
    sipId: 'SipId1',
    label: 'label',
    tags: [
      'URN:AIP:COLLECTION:PROJECT:c70a2428-8a93-4d06-a90a-f657c26d3930:V1',
    ],
    model: {
      id: 1,
      name: 'modelName1',
      description: 'model desc',
      type: 'COLLECTION',
    },
  } },
}

describe('[ADMIN DATA COLLECTION MANAGEMENT] Testing CollectionListContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CollectionListContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })
  const context = buildTestContext()

  it('Render properly', () => {
    const props = {
      params: {
        project: 'someprocjet',
      },
      // from mapStateToProps
      collectionList,
      isFetching: false,
      // from mapDispatchToProps
      fetchCollectionList: () => {},
      deleteCollection: () => {},

    }
    const enzymeWrapper = shallow(<CollectionListContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isFalse(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be false')
  })
})
