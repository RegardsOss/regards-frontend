/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { ModelAttributeFormComponent } from '../../src/components/ModelAttributeFormComponent'
import DraggableCard from '../../src/components/DraggableCard'
import ContainerCard from '../../src/components/ContainerCard'

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
// Test a component rendering
describe('[ADMIN DATA MODEL ATTRIBUTE MANAGEMENT] Testing ModelAttributeFormComponent', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    stub(console, 'error').callsFake((warning) => { throw new Error(warning) })
  })
  after(() => {
    console.error.restore()
  })

  it('should exists', () => {
    assert.isDefined(ModelAttributeFormComponent)
  })

  it('should render', () => {
    const props = {
      distributedAttrModels,
      onCreateFragment: () => {},
      onDeleteFragment: () => {},
      onCreateAttributeModel: () => {},
      onDeleteAttributeModel: () => {},
      backUrl: '#',
      currentModel: {
        content: {
          id: 1,
          name: 'Deuxieme Modele',
          description: 'Description du deuxieme modele de jeux de données',
          type: 'DATASET',
        },
        links: [],
      },
    }
    const context = {
      muiTheme: {
        layout: {
          cardEspaced: {},
        },
      },
    }
    const enzymeWrapper = shallow(<ModelAttributeFormComponent {...props} />, { context })
    const subComponent = enzymeWrapper.find(DraggableCard)
    const subComponentContainerCard = enzymeWrapper.find(ContainerCard)
    expect(subComponent).to.have.length(5)
    expect(subComponentContainerCard).to.have.length(2)
  })
})
