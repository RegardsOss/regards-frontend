import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@storybook/addon-knobs'
import FragmentFormComponent from '@regardsoss/admin-data-fragment-management/src/components/FragmentFormComponent'
import FragmentListComponent from '@regardsoss/admin-data-fragment-management/src/components/FragmentListComponent'
import { muiTheme } from 'storybook-addon-material-ui'
import { withStore, withLocale } from '../../decorators/index'

const defaultFragmentList = {
  1: {
    content: {
      id: 1,
      description: 'some description',
      name: 'Fragment_1',
    },
  },
}

storiesOf('Project admin - Fragment', module)
  .addDecorator(withLocale('modules/admin-data-fragment-management/src/i18n'))
  .addDecorator(withKnobs)
  .addDecorator(withStore)
  .addDecorator(muiTheme())
  .add('List', () => {
    const fragmentList = object('Fragment', defaultFragmentList)
    return (
      <FragmentListComponent
        fragmentList={fragmentList}
        createUrl="#"
        backUrl="#"
        handleEdit={action('handleEdit')}
        handleDelete={action('handleDelete')}
      />
    )
  })
  .add('Create', () => (
    <FragmentFormComponent
      onSubmit={action('submit')}
      backUrl="#"
    />
    ))
  .add('Edit', () => {
    const fragment = object('Fragment', defaultFragmentList['1'])
    return (
      <FragmentFormComponent
        currentFragment={fragment}
        onSubmit={action('submit')}
        backUrl="#"
      />
    )
  })
