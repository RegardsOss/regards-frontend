/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import { stub } from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import MenuItem from 'material-ui/MenuItem'
import { CollectionFormComponent } from '../../src/components/CollectionFormComponent'
import CollectionStepperComponent from '../../src/components/CollectionStepperComponent'

describe('[ADMIN DATA COLLECTION MANAGEMENT] Testing CollectionFormComponent', () => {
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
    assert.isDefined(CollectionFormComponent)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {},
    },
  }
  it('Render properly', () => {
    const props = {
      currentCollection: { content: {
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
      } },
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
    expect(enzymeWrapper.find(Field)).to.have.length(5)
    expect(enzymeWrapper.find(MenuItem)).to.have.length(2)
    expect(enzymeWrapper.find(CollectionStepperComponent)).to.have.length(1)
  })
})
