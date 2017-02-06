import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import PluginConfigurationComponent from '@regardsoss/admin-microservice-management/src/components/plugin/PluginConfigurationComponent'
import PluginConfigurationFormComponent from '@regardsoss/admin-microservice-management/src/components/plugin/PluginConfigurationFormComponent'
import { PluginParameterPlugin } from '@regardsoss/admin-microservice-management/src/components/plugin/parameter/PluginParameterPlugin'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'

const defaultPluginMetaDataList = {
  aComplexErrorPlugin: {
    content: {
      id: 'aComplexErrorPlugin',
      pluginId: 'aComplexErrorPlugin',
      pluginClassName: 'fr.cnes.regards.framework.plugins.ComplexErrorPlugin',
      interfaceClassName: [
        'fr.cnes.regards.framework.plugins.ISamplePlugin',
        'fr.cnes.regards.framework.plugins.IComplexInterfacePlugin',
      ],
      author: 'CSSI',
      version: '0.0.1',
      description: 'Complex plugin test',
      parameters: [
        {
          name: 'coeff',
          type: 'java.lang.Integer',
          paramType: 'PRIMITIVE',
        },
      ],
    },
  },
  aSamplePlugin: {
    content: {
      id: 'aSamplePlugin',
      pluginId: 'aSamplePlugin',
      pluginClassName: 'fr.cnes.regards.framework.plugins.SamplePlugin',
      interfaceClassName: [
        'fr.cnes.regards.framework.plugins.ISamplePlugin',
      ],
      author: 'CSSI',
      version: '12345-6789-11',
      description: 'Sample plugin test',
      parameters: [
        {
          name: 'suffix',
          type: 'java.lang.String',
          paramType: 'PRIMITIVE',
        },
        {
          name: 'coeff',
          type: 'java.lang.Integer',
          paramType: 'PRIMITIVE',
        },
        {
          name: 'isActive',
          type: 'java.lang.Boolean',
          paramType: 'PRIMITIVE',
        },
      ],
    },
  },
  aSampleErrorPlugin: {
    content: {
      id: 'aSampleErrorPlugin',
      pluginId: 'aSampleErrorPlugin',
      pluginClassName: 'fr.cnes.regards.framework.plugins.SampleErrorPlugin',
      interfaceClassName: [
        'fr.cnes.regards.framework.plugins.ISamplePlugin',
      ],
      author: 'CSSI',
      version: '0.0.1',
      description: 'Sample plugin test',
      parameters: [
        {
          name: 'suffix',
          type: 'java.lang.String',
          paramType: 'PRIMITIVE',
        },
        {
          name: 'coeff',
          type: 'java.lang.Integer',
          paramType: 'PRIMITIVE',
        },
        {
          name: 'isActive',
          type: 'java.lang.Boolean',
          paramType: 'PRIMITIVE',
        },
      ],
    },
  },
  aComplexPlugin: {
    content: {
      id: 'aComplexPlugin',
      pluginId: 'aComplexPlugin',
      pluginClassName: 'fr.cnes.regards.framework.plugins.ComplexPlugin',
      interfaceClassName: [
        'fr.cnes.regards.framework.plugins.ISamplePlugin',
      ],
      author: 'CSSI',
      version: '0.0.1',
      description: 'Complex plugin test',
      parameters: [
        {
          name: 'plgInterface',
          type: 'fr.cnes.regards.framework.plugins.IComplexInterfacePlugin',
          paramType: 'PLUGIN',
        },
        {
          name: 'coeff',
          type: 'java.lang.Integer',
          paramType: 'PRIMITIVE',
        },
        {
          name: 'isActive',
          type: 'java.lang.Boolean',
          paramType: 'PRIMITIVE',
        },
      ],
    },
  },
}

const defaultPluginConfigurationList = {
  12: {
    content: {
      id: 12,
      pluginId: 'aComplexPlugin',
      label: 'This is a configuration',
      version: '1.2.0',
      priorityOrder: 0,
      active: true,
      pluginClassName: 'java.lang.Integer',
      parameters: [
        {
          name: 'coeff',
          value: 'thecoeffvalue',
          dynamic: true,
        },
        {
          name: 'isActive',
          value: 'true',
          dynamic: false,
        },
        {
          name: 'plgInterface',
          value: '40',
          dynamic: false,
        },
      ],
    },
  },
  40: {
    content: {
      id: 40,
      pluginId: 'aComplexErrorPlugin',
      label: 'a plugin configuration for the test',
      version: '12345-6789-11',
      priorityOrder: 0,
      active: true,
      pluginClassName: 'java.lang.Integer',
      parameters: [
        {
          name: 'param31',
          value: 'value31',
          dynamic: true,
        },
        {
          name: 'param32',
          value: 'value32',
          dynamic: false,
        },
        {
          name: 'param33',
          value: 'value33',
          dynamic: false,
        },
        {
          name: 'param34',
          value: 'value34',
          dynamic: false,
        },
        {
          name: 'param35',
          value: 'value35',
          dynamic: false,
        },
      ],
    },
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
  .add('Plugin parameter plugin - view', () => {
    const themeName = addLocaleAndThemeSelectors()
    const pluginMetaDataList = object('Plugin meta data', defaultPluginMetaDataList)
    const pluginConfigurationList = object('Plugin configuration', defaultPluginConfigurationList)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-microservice-management/src/i18n">
        <PluginParameterPlugin
          name={'parameter1'}
          value={'12'}
          mode={'view'}
          pluginParameterType={'fr.cnes.regards.framework.plugins.IComplexInterfacePlugin'}
          pluginMetaDataList={pluginMetaDataList}
          isPluginMetaDataListFetching={false}
          pluginConfigurationList={pluginConfigurationList}
          isPluginConfigurationListFetching={false}
          fetchPluginMetaDataList={action('fetchPluginMetaDataList')}
          fetchPluginConfigurationList={action('fetchPluginConfigurationList')}
        />
      </ThemeAndLocaleDecorator>
    )
  })
  .add('Plugin parameter plugin - edit', () => {
    const themeName = addLocaleAndThemeSelectors()
    const pluginMetaDataList = object('Plugin meta data', defaultPluginMetaDataList)
    const pluginConfigurationList = object('Plugin configuration', defaultPluginConfigurationList)
    return (
      <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-microservice-management/src/i18n">
        <PluginParameterPlugin
          name={'parameter1'}
          value={'12'}
          mode={'edit'}
          pluginParameterType={'fr.cnes.regards.framework.plugins.IComplexInterfacePlugin'}
          pluginMetaDataList={pluginMetaDataList}
          isPluginMetaDataListFetching={false}
          pluginConfigurationList={pluginConfigurationList}
          isPluginConfigurationListFetching={false}
          fetchPluginMetaDataList={action('fetchPluginMetaDataList')}
          fetchPluginConfigurationList={action('fetchPluginConfigurationList')}
        />
      </ThemeAndLocaleDecorator>
    )
  })
