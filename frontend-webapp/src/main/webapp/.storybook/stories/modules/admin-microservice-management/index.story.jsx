import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'
import PluginMetaDataListComponent from '@regardsoss/admin-microservice-management/src/components/PluginMetaDataListComponent'
import PluginConfigurationsListComponent from '@regardsoss/admin-microservice-management/src/components/PluginConfigurationsListComponent'
import PluginConfigurationComponent from '@regardsoss/admin-microservice-management/src/components/PluginConfigurationComponent'
import PluginConfigurationFormComponent from '@regardsoss/admin-microservice-management/src/components/PluginConfigurationFormComponent'

const defaultPluginConfigurationList = {
  '0': {
    content: {
      id: '0',
      label: 'Cool configuration',
      version: '2.0.0',
      priorityOrder: 4,
      active: true,
      pluginClassName: 'Kerberos',
    },
    links: [],
  },
  '1': {
    content: {
      id: '1',
      label: 'Not cool configuration',
      version: '1.1.1',
      priorityOrder: 3,
      active: true,
      pluginClassName: 'Kerberos',
    },
    links: [],
  },
  '2': {
    content: {
      id: '2',
      label: 'Random configuration',
      version: '0.0.1',
      priorityOrder: 1,
      active: false,
      pluginClassName: 'Kerberos',
    },
    links: [],
  },
  '3': {
    content: {
      id: '3',
      label: 'Other random configuration',
      version: 'v12',
      priorityOrder: 1,
      active: true,
      pluginClassName: 'Kerberos',
    },
    links: [],
  },
}

storiesOf('Admin - Microservice management', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('Plugin meta data list', () => {
    const themeName = addLocaleAndThemeSelectors()
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-microservice-management/src/i18n">
        <PluginMetaDataListComponent microserviceName='rs-gateway'/>
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Plugin configurations list', () => {
    const themeName = addLocaleAndThemeSelectors()
    const pluginConfigurationList = object('Plugin configuration list', defaultPluginConfigurationList)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-microservice-management/src/i18n">
        <PluginConfigurationsListComponent
          microserviceName='rs-gateway'
          pluginConfigurationList={pluginConfigurationList}
          onBackClick={action('onBackClick')}
          onAddClick={action('onAddClick')}
          onUpwardClick={action('onUpwardClick')}
          onDownwardClick={action('onDownwardClick')}
          onDeleteClick={action('onDeleteClick')}
          onActiveToggle={action('onActiveToggle')}
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Plugin configuration item', () => {
    const themeName = addLocaleAndThemeSelectors()
    const pluginConfiguration = object('Plugin configuration', defaultPluginConfigurationList['0'])
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-microservice-management/src/i18n">
        <PluginConfigurationComponent
          pluginConfiguration={pluginConfiguration}
          onBackClick={action('onBackClick')}
          onAddClick={action('onAddClick')}
          onUpwardClick={action('onUpwardClick')}
          onDownwardClick={action('onDownwardClick')}
          onDeleteClick={action('onDeleteClick')}
          onActiveToggle={action('onActiveToggle')}
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Plugin configuration form', () => {
    const themeName = addLocaleAndThemeSelectors()
    const pluginConfiguration = object('Plugin configuration', defaultPluginConfigurationList['0'])
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-microservice-management/src/i18n">
        <PluginConfigurationFormComponent
          onSubmit={action('onSubmit')}
          backUrl={'back/url'}
          pluginConfiguration={pluginConfiguration}
        />
      </ThemeAndLocaleDecorator>
    )
  })
