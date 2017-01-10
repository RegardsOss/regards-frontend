import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, select, object } from '@kadira/storybook-addon-knobs'
import FragmentFormComponent from '@regardsoss/admin-data-fragment-management/src/components/FragmentFormComponent'
import FragmentListComponent from '@regardsoss/admin-data-fragment-management/src/components/FragmentListComponent'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'


const defaultFragmentList = {
  1: {
    content: {
      id: '1',
      description: 'some description',
      name: 'Fragment_1',
    },
  },
}

storiesOf('Project admin - Fragment', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('List', () => {
    const themeName = addLocaleAndThemeSelectors()
    const fragmentList = object('Fragment', defaultFragmentList)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-data-fragment-management/src/i18n">
        <FragmentListComponent
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
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-data-fragment-management/src/i18n">
        <FragmentFormComponent
          onSubmit={action('submit')}
          backUrl="#"
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Edit', () => {
    const themeName = addLocaleAndThemeSelectors()
    const fragment = object('Fragment', defaultFragmentList['1'])
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-data-fragment-management/src/i18n">
        <FragmentFormComponent
          currentFragment={fragment}
          onSubmit={action('submit')}
          backUrl="#"
        />
      </ThemeAndLocaleDecorator>
    )
  })
