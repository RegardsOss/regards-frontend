/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { ModelAttributeFormContainer } from '../../src/containers/ModelAttributeFormContainer'
import ModelAttributeFormComponent from '../../src/components/ModelAttributeFormComponent'

const attributeModelList = {
  0: {
    content: {
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
        name: 'Default',
      },
    },
    links: [],
  },
  1: {
    content: {
      id: 1,
      name: 'Attribute_1_0',
      description: "Description de l'attribut 1 - 0",
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
        name: 'Default',
      },
    },
    links: [],
  },
  2: {
    content: {
      id: 2,
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
        id: 3,
        name: 'Fragment 3',
      },
    },
    links: [],
  },
  3: {
    content: {
      id: 3,
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
        id: 2,
        name: 'Fragment 2',
      },
    },
    links: [],
  },
  4: {
    content: {
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
    links: [],
  },
}
const modelAttributeList = {
  1: {
    content: {
      id: 1,
      pos: 0,
      mode: 'FROM_DESCENDANTS',
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

const distributedAttrModels = {
  ATTR_REMAINING: {
    fragments: {
      2: [{
        content: {
          id: 3,
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
            id: 2,
            name: 'Fragment 2',
          },
        },
        links: [],
      }],
      3: [{
        content: {
          id: 2,
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
            id: 3,
            name: 'Fragment 3',
          },
        },
        links: [],
      }],
    },
    attrs: [{
      content: {
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
          name: 'Default',
        },
      },
      links: [],
    }, {
      content: {
        id: 1,
        name: 'Attribute_1_0',
        description: "Description de l'attribut 1 - 0",
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
          name: 'Default',
        },
      },
      links: [],
    }],
  },
  ATTR_ASSOCIATED: {
    fragments: {
      2: [{
        content: {
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
        links: [],
      }],
    },
    attrs: [],
  },
}
describe('[ADMIN DATA MODEL ATTRIBUTE MANAGEMENT]Testing form container', () => {
  it('should exists', () => {
    assert.isDefined(ModelAttributeFormContainer)
    assert.isDefined(ModelAttributeFormComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      // from router
      params: {
        project: 'project name',
        model_id: '1',
      },
      // from mapStateToProps
      model: {
        content: {
          id: 1,
          name: 'Deuxieme Modele',
          description: 'Description du deuxieme modele de jeux de données',
          type: 'DATASET',
        },
        links: [],
      },
      modelAttributeList,
      attributeModelList,
      isModelFetching: false,
      isModelAttributeFetching: false,
      isAttributeModelFetching: false,
      // from mapDispatchToProps
      createModelAttribute: () => {},
      fetchAttributeModelList: () => {},
      fetchModelAttributeList: () => {},
      deleteModelAttribute: () => {},
      fetchModel: () => {},
      bindFragment: () => {},
      unbindFragment: () => {},
    }
      // from mapStateToProps

    const enzymeWrapper = shallow(<ModelAttributeFormContainer {...props} />)
    const subComponent = enzymeWrapper.find(ModelAttributeFormComponent)
    expect(subComponent).to.have.length(1)
    assert.deepEqual(subComponent.prop('distributedAttrModels'), distributedAttrModels)
  })
})
