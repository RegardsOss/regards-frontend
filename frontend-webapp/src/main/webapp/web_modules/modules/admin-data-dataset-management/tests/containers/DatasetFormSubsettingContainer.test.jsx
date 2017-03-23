/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DatasetFormSubsettingContainer } from '../../src/containers/DatasetFormSubsettingContainer'
import DatasetDump from '../model/dump/DatasetDump'
import ModelAttributeDump from '../model/dump/ModelAttributeDump'


describe('[ADMIN DATASET MANAGEMENT] Testing DatasetFormSubsettingContainer', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    stub(console, 'error').callsFake((warning) => {
      throw new Error(warning)
    })
  })
  after(() => {
    console.error.restore()
  })
  it('should exists', () => {
    assert.isDefined(DatasetFormSubsettingContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {},
    },
  }
  it('Render properly', () => {
    const props = {
      currentDataset: DatasetDump[23],
      handleBack: () => {},
      handleSave: () => {},
      isEditing: false,
      // from mapStateToProps
      modelAttributeList: ModelAttributeDump,
      // from mapDispatchToProps
      fetchModelAttributeList: () => {},
    }
    const enzymeWrapper = shallow(<DatasetFormSubsettingContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')
  })
})
