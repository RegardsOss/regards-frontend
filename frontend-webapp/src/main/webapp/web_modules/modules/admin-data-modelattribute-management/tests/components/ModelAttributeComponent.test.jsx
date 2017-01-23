/**
 * LICENSE_PLACEHOLDER
 **/
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import ModelAttributeComponent from '../../src/components/ModelAttributeComponent'
import { TableRowColumn } from 'material-ui/Table'
import sinon from 'sinon'
import SelectField from 'material-ui/SelectField'


// Test a component rendering
describe('[ADMIN DATA MODEL ATTRIBUTE MANAGEMENT] Testing ModelAttributeComponent', () => {
  it('should exists', () => {
    assert.isDefined(ModelAttributeComponent)
  })


  it('should render', () => {
    const onSelectFieldChange = sinon.spy()

    const props = {
      modelAttribute: {
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
      handleComputationUpdate: onSelectFieldChange,
    }
    const enzymeWrapper = shallow(<ModelAttributeComponent {...props} />)
    const subComponent = enzymeWrapper.find(TableRowColumn)
    expect(subComponent).to.have.length(3)
    const subComponentSelectField = enzymeWrapper.find(SelectField)
    expect(subComponentSelectField).to.have.length(1)
    subComponentSelectField.simulate('change', 'FROM_DESCENDANTS')
    expect(onSelectFieldChange.calledOnce).to.equal(true)
  })
})
