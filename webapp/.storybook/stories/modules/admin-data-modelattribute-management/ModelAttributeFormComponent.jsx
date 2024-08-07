import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@storybook/addon-knobs'
import ModelAttributeFormComponent from '@regardsoss/admin-data-modelattribute-management/src/components/ModelAttributeFormComponent'
import { muiTheme } from 'storybook-addon-material-ui'
import { withStore, withLocale } from '../../decorators/index'

const defaultModel = {
  content: {
    id: 1,
    name: 'Deuxieme Modele',
    description: 'Description du deuxieme modele de jeux de données',
    type: 'DATASET',
  },
  links: [],
}
const defaultDistributedAttrModels = {
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
    fragments: {},
    attrs: [],
  },
}

storiesOf('Project admin - Link Model to attributes', module)
  .addDecorator(withLocale('modules/admin-data-modelattribute-management/src/i18n'))
  .addDecorator(withKnobs)
  .addDecorator(withStore)
  .addDecorator(muiTheme())
  .add('List', () => {
    const distributedAttrModels = object('Fragment', defaultDistributedAttrModels)
    const model = object('Mdoel', defaultModel)
    return (
      <ModelAttributeFormComponent
        onCreateFragment={action('handleCreateFragment')}
        onDeleteFragment={action('handleDeleteFragment')}
        onCreateAttributeModel={action('handleCreateAttributeModel')}
        onDeleteAttributeModel={action('handleDeleteAttributeModel')}
        backUrl="#"
        currentModel={model}
        distributedAttrModels={distributedAttrModels}
      />
    )
  })
