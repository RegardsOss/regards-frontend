import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import CollectionEditLinksComponent from '@regardsoss/admin-data-collection-management/src/components/CollectionEditLinksComponent'
import CollectionFormComponent from '@regardsoss/admin-data-collection-management/src/components/CollectionFormComponent'
import CollectionListComponent from '@regardsoss/admin-data-collection-management/src/components/CollectionListComponent'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'

const defaultCollectionList = {
  1: { content: {
    type: 'COLLECTION',
    lastUpdate: '2017-01-30T11:16:23.919',
    creationDate: '2017-01-30T11:16:23.919',
    id: 1,
    ipId: 'URN:AIP:COLLECTION:PROJECT:fdsfdsf15-8a93-4d06-a90a-f657c26d3930:V1',
    sipId: 'SipId1',
    label: 'Collection 1',
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
  2: { content: {
    type: 'COLLECTION',
    lastUpdate: '2017-01-30T11:16:23.919',
    creationDate: '2017-01-30T11:16:23.919',
    id: 1,
    ipId: 'URN:AIP:COLLECTION:PROJECT:fdsfdsf15-8a93-4d06-a90a-f657c26d3930:V1',
    sipId: 'SipId1',
    label: 'Collection 2',
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
}


const defaultModelList = {
  1: {
    content: {
      id: 1,
      name: 'Modele de collection',
      description: 'Ceci est un modele de collection',
      type: 'COLLECTION',
    },
    links: [],
  },
  4: {
    content: {
      id: 4,
      name: 'Autre modele de collection',
      descirption: 'Description du deuxieme modele de jeux de données',
      type: 'COLLECTION',
    },
    links: [],
  },
}
const defaultModelAttributeList = {
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
  1: {
    content: {
      id: 1,
      pos: 0,
      mode: 'GIVEN',
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


storiesOf('Project admin - Collection', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('List', () => {
    const themeName = addLocaleAndThemeSelectors()
    const collectionList = object('Collections', defaultCollectionList)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-data-collection-management/src/i18n">
        <CollectionListComponent
          collectionList={collectionList}
          createUrl="#"
          backUrl="#"
          handleEdit={action('handleEdit')}
          handleDelete={action('handleDelete')}
          handleDuplicate={action('handleDuplicate')}
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Create', () => {
    const themeName = addLocaleAndThemeSelectors()
    const modelList = object('Models', defaultModelList)
    const modelAttributeList = object('Model attributes', defaultModelAttributeList)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-data-collection-management/src/i18n">
        <CollectionFormComponent
          onSubmit={action('submit')}
          backUrl="#"
          modelList={modelList}
          modelAttributeList={modelAttributeList}
          isDuplicating={false}
          handleUpdateModel={action('fetch model attributes')}
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Edit', () => {
    const themeName = addLocaleAndThemeSelectors()
    const currentCollection = object('Collection', defaultCollectionList['1'])
    const modelList = object('Models', defaultModelList)
    const modelAttributeList = object('Model attributes', defaultModelAttributeList)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-data-collection-management/src/i18n">
        <CollectionFormComponent
          currentCollection={currentCollection}
          onSubmit={action('submit')}
          backUrl="#"
          modelList={modelList}
          modelAttributeList={modelAttributeList}
          isDuplicating={false}
          handleUpdateModel={action('fetch model attributes')}
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Duplicate', () => {
    const themeName = addLocaleAndThemeSelectors()
    const currentCollection = object('Collection', defaultCollectionList['1'])
    const modelList = object('Models', defaultModelList)
    const modelAttributeList = object('Model attributes', defaultModelAttributeList)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-data-collection-management/src/i18n">
        <CollectionFormComponent
          currentCollection={currentCollection}
          onSubmit={action('submit')}
          backUrl="#"
          modelList={modelList}
          modelAttributeList={modelAttributeList}
          isDuplicating
          handleUpdateModel={action('fetch model attributes')}
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Links', () => {
    const themeName = addLocaleAndThemeSelectors()
    const linkedCollections = object('Collections linked', defaultCollectionList)
    const remainingCollections = object('Collections remaining', defaultCollectionList)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-data-collection-management/src/i18n">
        <CollectionEditLinksComponent
          linkedCollections={linkedCollections}
          remainingCollections={remainingCollections}
          handleAdd={action('add')}
          handleDelete={action('delete')}
          backUrl="#"
          doneUrl="#"
        />
      </ThemeAndLocaleDecorator>
    )
  })
