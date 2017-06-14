/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, buildTestContext, DumpProvider } from '@regardsoss/tests-helpers'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { CollectionFormContainer } from '../../src/containers/CollectionFormContainer'


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
      name: 'Modele de collection',
      description: 'Ceci est un modele de collection',
      type: 'COLLECTION',
    },
    links: [],
  },
  4: {
    content: {
      id: 4,
      name: 'Autre modele de collection',
      descirption: 'Description du deuxieme modele de jeux de données',
      type: 'COLLECTION',
    },
    links: [],
  },
}

const currentCollection = { content: {
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
} }

describe('[ADMIN DATA COLLECTION MANAGEMENT] Testing CollectionFormContainer', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CollectionFormContainer)
    assert.isDefined(LoadableContentDisplayDecorator)
  })
  const context = buildTestContext()

  it('Render properly', () => {
    const props = {
      // from router
      params: {
        project: 'lambda',
        collectionId: DumpProvider.getFirstEntityKey('DataManagementClient', 'Collection'),
        mode: 'duplicate',
      },
      // from mapStateToProps
      currentCollection: DumpProvider.getFirstEntity('DataManagementClient', 'Collection'),
      isFetchingCollection: false,
      isFetchingModelAttribute: false,
      isFetchingModel: false,
      modelAttributeList,
      modelList,
      // from redux-form
      unregisterField: () => {},
      // from mapDispatchToProps
      createCollection: () => {},
      updateCollection: () => {},
      fetchCollection: () => {},
      fetchModelList: () => {},
      fetchModelAttributeList: () => {},
    }
    const enzymeWrapper = shallow(<CollectionFormContainer {...props} />, { context })
    expect(enzymeWrapper.find(LoadableContentDisplayDecorator)).to.have.length(1)
    assert.isFalse(enzymeWrapper.find(LoadableContentDisplayDecorator).props().isLoading, 'Loading should be false')
  })
})

