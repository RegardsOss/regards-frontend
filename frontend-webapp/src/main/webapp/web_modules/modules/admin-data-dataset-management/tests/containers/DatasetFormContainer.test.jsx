/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { DatasetFormContainer } from '../../src/containers/DatasetFormContainer'

const modelAttributeList = {
  0: {
    content: {
      id: 0,
      pos: 0,
      mode: 'GIVEN',
      model: {
        id: 1,
        name: 'Deuxieme Modele',
        description: 'Description du deuxieme modele de jeux de données',
        type: 'DATASET',
      },
      attribute: {
        id: 0,
        name: 'Attribute_0_0',
        description: "Description de l'attribut 0 - 0",
        defaultValue: null,
        type: 'STRING',
        unit: null,
        precision: null,
        arraysize: 0,
        queryable: true,
        facetable: true,
        alterable: true,
        optional: true,
        group: 'leGroup',
        fragment: {
          id: 1,
          name: 'Fragment 1',
        },
      },
    },
    links: [],
  },
  1: {
    content: {
      id: 1,
      pos: 0,
      mode: 'GIVEN',
      model: {
        id: 1,
        name: 'Deuxieme Modele',
        description: 'Description du deuxieme modele de jeux de données',
        type: 'DATASET',
      },
      attribute: {
        id: 4,
        name: 'Attribute_4',
        description: "Description de l'attribut 0 - 0",
        defaultValue: null,
        type: 'STRING',
        unit: null,
        precision: null,
        arraysize: 0,
        queryable: true,
        facetable: true,
        alterable: true,
        optional: true,
        group: 'leGroup',
        fragment: {
          id: 2,
          name: 'Fragment 2',
        },
      },
    },
    links: [],
  },
}


const modelList = {
  1: {
    content: {
      id: 1,
      name: 'Modele de dataset',
      description: 'Ceci est un modele de dataset',
      type: 'DATASET',
    },
    links: [],
  },
  4: {
    content: {
      id: 4,
      name: 'Autre modele de dataset',
      descirption: 'Description du deuxieme modele de jeux de données',
      type: 'DATASET',
    },
    links: [],
  },
}

const currentDataset = { content: {
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
} }

describe('[ADMIN DATA DATASET MANAGEMENT] Testing DatasetFormContainer', () => {
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
    assert.isDefined(DatasetFormContainer)
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
        mode: 'duplicate',
      },
      // from mapStateToProps
      currentDataset,
      isFetchingDataset: false,
      isFetchingModelAttribute: false,
      isFetchingModel: false,
      modelAttributeList,
      modelList,
      // from redux-form
      unregisterField: () => {},
      // from mapDispatchToProps
      createDataset: () => {},
      updateDataset: () => {},
      fetchDataset: () => {},
      fetchModelList: () => {},
      fetchModelAttributeList: () => {},
    }
    const enzymeWrapper = shallow(<DatasetFormContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isFalse(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be false')
  })
})

