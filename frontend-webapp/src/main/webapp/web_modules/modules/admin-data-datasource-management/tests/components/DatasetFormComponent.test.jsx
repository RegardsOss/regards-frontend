/**
 * LICENSE_PLACEHOLDER
 */
import { shallow } from 'enzyme'
import { expect, assert } from 'chai'
import sinon from 'sinon'
import { IntlStub } from '@regardsoss/tests-helpers'
import { Field } from '@regardsoss/form-utils'
import MenuItem from 'material-ui/MenuItem'
import { DatasourceFormComponent } from '../../src/components/DatasourceFormComponent'
import DatasourceStepperComponent from '../../src/components/DatasourceStepperComponent'

describe('[ADMIN DATA DATASOURCE MANAGEMENT] Testing DatasourceFormComponent', () => {
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
    assert.isDefined(DatasourceFormComponent)
  })
  const context = {
    intl: IntlStub,
    muiTheme: {
      palette: {},
    },
  }
  it('Render properly', () => {
    const props = {
      currentDatasource: { content: {
        type: 'DATASOURCE',
        lastUpdate: '2017-01-30T11:16:23.919',
        creationDate: '2017-01-30T11:16:23.919',
        id: 1,
        ipId: 'URN:AIP:DATASOURCE:PROJECT:fdsfdsf15-8a93-4d06-a90a-f657c26d3930:V1',
        sipId: 'SipId1',
        label: 'label',
        tags: [
          'URN:AIP:DATASOURCE:PROJECT:c70a2428-8a93-4d06-a90a-f657c26d3930:V1',
        ],
        model: {
          id: 1,
          name: 'modelName1',
          description: 'model desc',
          type: 'DATASOURCE',
        },
      } },
      onSubmit: () => {},
      backUrl: '#',
      modelList: {
        1: {
          content: {
            id: 1,
            name: 'Modele de datasource',
            description: 'Ceci est un modele de datasource',
            type: 'DATASOURCE',
          },
          links: [],
        },
        2: {
          content: {
            id: 4,
            name: 'Autre modele de datasource',
            descirption: 'Description du deuxieme modele de jeux de données',
            type: 'DATASOURCE',
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
              type: 'DATASOURCE',
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
    const enzymeWrapper = shallow(<DatasourceFormComponent {...props} />, { context })
    expect(enzymeWrapper.find(Field)).to.have.length(3)
    expect(enzymeWrapper.find(MenuItem)).to.have.length(2)
    expect(enzymeWrapper.find(DatasourceStepperComponent)).to.have.length(1)
  })
})
