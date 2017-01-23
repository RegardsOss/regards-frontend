/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { TableRowColumn } from 'material-ui/Table'
import AttributeModelComponent from '../../src/components/AttributeModelComponent'

// Test a component rendering
describe('[ADMIN DATA MODEL ATTRIBUTE MANAGEMENT] Testing AttributeModelComponent', () => {
  it('should exists', () => {
    assert.isDefined(AttributeModelComponent)
  })

  it('should render', () => {
    const props = {
      attribute: {
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
    }
    const enzymeWrapper = shallow(<AttributeModelComponent {...props} />)
    const subComponent = enzymeWrapper.find(TableRowColumn)
    expect(subComponent).to.have.length(2)
  })
})
