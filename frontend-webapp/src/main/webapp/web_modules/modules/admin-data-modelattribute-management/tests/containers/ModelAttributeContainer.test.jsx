/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import { ModelAttributeContainer } from '../../src/containers/ModelAttributeContainer'
import ModelAttributeComponent from '../../src/components/ModelAttributeComponent'

const attributeModel = {
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
}

const modelAttribute = {
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
}

describe('[ADMIN DATA MODEL ATTRIBUTE MANAGEMENT] Testing ModelAttributeContainer', () => {
  // Since react will console.error propType warnings, that which we'd rather have
  // as errors, we use sinon.js to stub it into throwing these warning as errors
  // instead.
  before(() => {
    sinon.stub(console, 'error', (warning) => { throw new Error(warning) })
  })
  after(() => {
    console.error.restore()
  })

  it('should exists', () => {
    assert.isDefined(ModelAttributeContainer)
    assert.isDefined(ModelAttributeComponent)
  })

  it('should render self and subcomponents', () => {
    const props = {
      attribute: attributeModel,
      // from mapStateToProps
      modelAttribute,
      // from mapDispatchToProps
      updateModelAttribute: () => {},
    }
    const enzymeWrapper = shallow(<ModelAttributeContainer {...props} />)
    const subComponent = enzymeWrapper.find(ModelAttributeComponent)
    expect(subComponent).to.have.length(1)
  })
})
