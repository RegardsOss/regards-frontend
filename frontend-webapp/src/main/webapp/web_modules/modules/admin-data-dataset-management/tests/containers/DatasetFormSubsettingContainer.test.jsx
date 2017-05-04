/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, DumpProvider, buildTestContext } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DatasetFormSubsettingContainer } from '../../src/containers/DatasetFormSubsettingContainer'

const context = buildTestContext()


describe('[ADMIN DATASET MANAGEMENT] Testing DatasetFormSubsettingContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(DatasetFormSubsettingContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })
  it('Render properly', () => {
    const props = {
      currentDataset: DumpProvider.getFirstEntity('DataManagementClient', 'Dataset'),
      handleBack: () => {},
      handleSave: () => {},
      isEditing: false,
      // from mapStateToProps
      modelAttributeList: DumpProvider.get('DataManagementClient', 'ModelAttribute'),
      // from mapDispatchToProps
      fetchModelAttributeList: () => {},
    }
    const enzymeWrapper = shallow(<DatasetFormSubsettingContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')
  })
})
