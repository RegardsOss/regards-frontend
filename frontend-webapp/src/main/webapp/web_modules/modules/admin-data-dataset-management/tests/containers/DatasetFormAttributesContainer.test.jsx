/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DatasetFormAttributesContainer } from '../../src/containers/DatasetFormAttributesContainer'
import DatasourceDump from '../model/dump/DatasourceDump'
import ModelDump from '../model/dump/ModelDump'
import ModelAttributeDump from '../model/dump/ModelAttributeDump'
import DatasetDump from '../model/dump/DatasetDump'


describe('[ADMIN DATASET MANAGEMENT] Testing DatasetFormAttributesContainer', () => {
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
    assert.isDefined(DatasetFormAttributesContainer)
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
      currentDatasourceId: '4',
      backUrl: '#',
      handleSave: () => {},
      isEditing: true,
      // from mapStateToProps
      currentDatasource: DatasourceDump[4],
      modelList: ModelDump,
      modelAttributeList: ModelAttributeDump,
      // from redux-form
      unregisterField: () => {},
      // from mapDispatchToProps
      fetchModelList: () => {},
      fetchModelAttributeList: () => {},
      fetchDatasource: () => {},
    }
    const enzymeWrapper = shallow(<DatasetFormAttributesContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isTrue(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be true')
  })
})
