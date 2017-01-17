import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import AttributeModelFormComponent from '@regardsoss/admin-data-attributemodel-management/src/components/AttributeModelFormComponent'
import AttributeModelListComponent from '@regardsoss/admin-data-attributemodel-management/src/components/AttributeModelListComponent'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'


const defaultAttrModelList = {
  1: {
    content: {
      id: '1',
      description: 'some description',
      name: 'Fragment_1',
      type: '',
      alterable: true,
      optional: true,
      queryable: true,
      facetable: true,
      fragment: {
        id: '1',
      },
    },
  },
}

const defaultFragmentList = {
  1: {
    content: {
      id: '1',
      name: 'fragment 1',
    },
  },
  2: {
    content: {
      id: '2',
      name: 'fragment 2',
    },
  },
  3: {
    content: {
      id: '3',
      name: 'fragment 3',
    },
  },
}

const attrModelTypeList = []
const attrModelRestrictionList = ['INTEGER_RANGE', 'FLOAT_RANGE', 'ENUMERATION', 'PATTERN']
storiesOf('Project admin - Attribute model', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('List', () => {
    const themeName = addLocaleAndThemeSelectors()
    const fragmentList = object('Fragment', defaultFragmentList)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-data-attributemodel-management/src/i18n">
        <AttributeModelListComponent
          fragmentList={fragmentList}
          createUrl="#"
          backUrl="#"
          handleEdit={action('handleEdit')}
          handleDelete={action('handleDelete')}
        />
      </ThemeAndLocaleDecorator>
    )
  })


  .add('Create', () => {
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-data-attributemodel-management/src/i18n">
        <AttributeModelFormComponent
          attrModelTypeList={attrModelTypeList}
          attrModelRestrictionList={attrModelRestrictionList}
          fragmentList={defaultFragmentList}
          flushAttributeModelRestriction={action('flush Attribute Model Restriction')}
          handleUpdateAttributeModelRestriction={action('fetch corresponding attribute model restriction')}
          onSubmit={action('submit')}
          backUrl="#"
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Edit', () => {
    const themeName = addLocaleAndThemeSelectors()
    const attrModel = object('Fragment', defaultAttrModelList['1'])
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-data-attributemodel-management/src/i18n">
        <AttributeModelFormComponent
          currentAttrModel={attrModel}
          attrModelTypeList={attrModelTypeList}
          attrModelRestrictionList={attrModelRestrictionList}
          fragmentList={defaultFragmentList}
          handleUpdateAttributeModelRestriction={action('fetch corresponding attribute model restriction')}
          onSubmit={action('submit')}
          backUrl="#"
        />
      </ThemeAndLocaleDecorator>
    )
  })
