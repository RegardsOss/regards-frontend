/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { testSuiteHelpers, buildTestContext, DumpProvider } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import MenuItem from 'material-ui/MenuItem'
import { CollectionFormComponent } from '../../src/components/CollectionFormComponent'
import CollectionStepperComponent from '../../src/components/CollectionStepperComponent'

describe('[ADMIN DATA COLLECTION MANAGEMENT] Testing CollectionFormComponent', () => {
  before(testSuiteHelpers.before)
  after(testSuiteHelpers.after)

  it('should exists', () => {
    assert.isDefined(CollectionFormComponent)
  })
  const context = buildTestContext()
  it('Render properly', () => {
    const props = {
      currentCollection: DumpProvider.getFirstEntity('DataManagementClient', 'Collection'),
      onSubmit: () => {},
      backUrl: '#',
      modelList: {
        1: {
          content: {
            id: 1,
            name: 'Modele de collection',
            description: 'Ceci est un modele de collection',
            type: 'COLLECTION',
          },
          links: [],
        },
        2: {
          content: {
            id: 4,
            name: 'Autre modele de collection',
            descirption: 'Description du deuxieme modele de jeux de données',
            type: 'COLLECTION',
          },
          links: [],
        },
      },
      modelAttributeList: {
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
      },
      isDuplicating: false,
      handleUpdateModel: () => {},
      // from reduxForm
      submitting: false,
      invalid: false,
      handleSubmit: () => {},
      initialize: () => {},
    }
    const enzymeWrapper = shallow(<CollectionFormComponent {...props} />, { context })
    expect(enzymeWrapper.find(Field)).to.have.length(4)
    expect(enzymeWrapper.find(MenuItem)).to.have.length(2)
    expect(enzymeWrapper.find(CollectionStepperComponent)).to.have.length(1)
  })
})
