/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, buildTestContext } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DatasetFormContainer } from '../../src/containers/DatasetFormContainer'

const context = buildTestContext()


describe('[ADMIN DATASET MANAGEMENT] Testing DatasetFormContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetFormContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })
  it('Render properly', () => {
    const props = {
      // from router
      params: {
        project: 'lambda',
        datasourceId: '4',
      },
      // from mapStateToProps
      currentDataset: undefined,
      // from mapDispatchToProps
      createDataset: () => {},
      updateDataset: () => {},
      fetchDataset: () => {},
    }
    const enzymeWrapper = shallow(<DatasetFormContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isFalse(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be false on creation')
  })
})
