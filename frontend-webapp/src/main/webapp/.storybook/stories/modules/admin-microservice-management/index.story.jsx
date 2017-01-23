import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import PluginConfigurationComponent from '@regardsoss/admin-microservice-management/src/components/PluginConfigurationComponent'
import PluginConfigurationFormComponent from '@regardsoss/admin-microservice-management/src/components/PluginConfigurationFormComponent'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'

const defaultPluginConfigurationList = {
  0: {
    content: {
      id: 0,
      label: 'Cool configuration',
      version: '2.0.0',
      priorityOrder: 4,
      active: true,
      pluginClassName: 'Kerberos',
    },
    links: [],
  },
  1: {
    content: {
      id: 1,
      label: 'Not cool configuration',
      version: '1.1.1',
      priorityOrder: 3,
      active: true,
      pluginClassName: 'Kerberos',
    },
    links: [],
  },
  2: {
    content: {
      id: 2,
      label: 'Random configuration',
      version: '0.0.1',
      priorityOrder: 1,
      active: false,
      pluginClassName: 'Kerberos',
    },
    links: [],
  },
  3: {
    content: {
      id: 3,
      label: 'Other random configuration',
      version: 'v12',
      priorityOrder: 1,
      active: true,
      pluginClassName: 'Kerberos',
    },
    links: [],
  },
}

const defaultPluginMetaData = {
  0: {
    content: {
      id: 0,
      pluginType: 'Authentication',
      pluginClassName: 'Kerberos',
      author: 'Jules Verne',
      version: '0.0.5',
      description: 'Allows the users to log in with their usual email and password.',
    },
    links: [],
  },
  1: {
    content: {
      id: 1,
      pluginType: 'Authentication',
      pluginClassName: 'Kerberos',
      author: 'Jules Verne',
      version: '0.0.6',
      description: 'Allows the users to log in with their usual email and password.',
    },
    links: [],
  },
  2: {
    content: {
      id: 2,
      pluginType: 'Authentication',
      pluginClassName: 'Toto',
      author: 'Jean-Paul Sartre',
      version: '2.0.0',
      description: 'This plugin is pretty useless actually.',
    },
    links: [],
  },
  3: {
    content: {
      id: 3,
      pluginType: 'Authentication',
      pluginClassName: 'Titi',
      author: 'Victor Hugo',
      version: '2.0.5',
      description: 'This plugin is pretty useless actually.',
    },
    links: [],
  },
  4: {
    content: {
      id: 4,
      pluginType: 'Authentication',
      pluginClassName: 'Toto',
      author: 'Jean-Paul Sartre',
      version: '2.0.0',
      description: 'This plugin is pretty useless actually.',
    },
    links: [],
  },
  5: {
    content: {
      id: 5,
      pluginType: 'Authentication',
      pluginClassName: 'Titi',
      author: 'Victor Hugo',
      version: '2.0.5',
      description: 'This plugin is pretty useless actually.',
    },
    links: [],
  },
  6: {
    content: {
      id: 6,
      pluginType: 'Other',
      pluginClassName: 'Kerberos',
      author: 'Jules Verne',
      version: '0.0.5',
      description: 'Allows the users to log in with their usual email and password.',
    },
    links: [],
  },
  7: {
    content: {
      id: 7,
      pluginType: 'Other',
      pluginClassName: 'Toto',
      author: 'Jean-Paul Sartre',
      version: '2.0.0',
      description: 'This plugin is pretty useless actually.',
    },
    links: [],
  },
  8: {
    content: {
      id: 8,
      pluginType: 'Other',
      pluginClassName: 'Titi',
      author: 'Victor Hugo',
      version: '2.0.5',
      description: 'This plugin is pretty useless actually.',
    },
    links: [],
  },
}

storiesOf('Admin - Microservice management', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('Plugin configuration item', () => {
    const themeName = addLocaleAndThemeSelectors()
    const pluginConfiguration = object('Plugin configuration', defaultPluginConfigurationList['0'])
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-microservice-management/src/i18n">
        <PluginConfigurationComponent
          pluginConfiguration={pluginConfiguration}
          onBackClick={action('onBackClick')}
          onAddClick={action('onAddClick')}
          onCopyClick={action('onCopyClick')}
          onEditClick={action('onEditClick')}
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
