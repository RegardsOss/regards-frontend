/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import FragmentComponent from '../../src/components/FragmentComponent'
import ItemTypes from '../../src/components/ItemTypes'
import AttributeModelComponent from '../../src/components/AttributeModelComponent'
import ModelAttributeContainer from '../../src/containers/ModelAttributeContainer'

const props = {
  attributes: [{
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
  }, {
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
}
// Test a component rendering
describe('[ADMIN DATA MODEL ATTRIBUTE MANAGEMENT] Testing FragmentComponent', () => {
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
    assert.isDefined(FragmentComponent)
  })

  it('should render ModelAttributeContainer', () => {
    props.type = ItemTypes.ATTR_ASSOCIATED
    const enzymeWrapper = shallow(<FragmentComponent {...props} />)
    const subComponent = enzymeWrapper.find(ModelAttributeContainer)
    expect(subComponent).to.have.length(2)
  })
  it('should render AttributeModelComponent', () => {
    props.type = ItemTypes.ATTR_REMAINING
    const enzymeWrapper = shallow(<FragmentComponent {...props} />)
    const subComponent = enzymeWrapper.find(AttributeModelComponent)
    expect(subComponent).to.have.length(2)
  })
})
