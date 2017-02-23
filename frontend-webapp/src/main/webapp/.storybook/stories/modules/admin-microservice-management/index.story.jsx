import React from 'react'
import { storiesOf, action } from '@kadira/storybook'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import PluginConfigurationComponent from '@regardsoss/admin-microservice-management/src/components/plugin/PluginConfigurationComponent'
import PluginConfigurationFormComponent from '@regardsoss/admin-microservice-management/src/components/plugin/PluginConfigurationFormComponent'
import { PluginParameterPlugin } from '@regardsoss/admin-microservice-management/src/components/plugin/parameter/PluginParameterPlugin'
import { muiTheme } from 'storybook-addon-material-ui'
import { withStore, withLocale } from '../../decorators/index'

const defaultPluginMetaDataList = {
  aComplexErrorPlugin: {
    content: {
      id: 'aComplexErrorPlugin',
      pluginId: 'aComplexErrorPlugin',
      pluginClassName: 'fr.cnes.regards.framework.plugins.ComplexErrorPlugin',
      interfaceName: 'fr.cnes.regards.framework.plugins.ISamplePlugin',
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
      interfaceName: 'fr.cnes.regards.framework.plugins.ISamplePlugin',
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
      interfaceName: 'fr.cnes.regards.framework.plugins.ISamplePlugin',
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
      interfaceName: 'fr.cnes.regards.framework.plugins.ISamplePlugin',
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
          value: '42',
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
  11: {
    content: {
      id: 11,
      pluginId: 'aComplexPlugin',
      label: 'A configuration',
      version: '1.0.0',
      priorityOrder: 0,
      active: true,
      pluginClassName: 'java.lang.Integer',
      parameters: [
        {
          name: 'coeff',
          value: '43',
          dynamic: true,
        },
        {
          name: 'isActive',
          value: 'false',
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
  10: {
    content: {
      id: 10,
      pluginId: 'aComplexPlugin',
      label: 'An other configuration',
      version: '1.0.0',
      priorityOrder: 0,
      active: false,
      pluginClassName: 'java.lang.Integer',
      parameters: [
        {
          name: 'coeff',
          value: '44',
          dynamic: true,
        },
        {
          name: 'isActive',
          value: 'true',
          dynamic: false,
        },
        {
          name: 'plgInterface',
          value: '12',
          dynamic: false,
        },
      ],
    },
  },
}

storiesOf('Admin - Microservice management', module)
  .addDecorator(withLocale('modules/admin-microservice-management/src/i18n'))
  .addDecorator(withKnobs)
  .addDecorator(withStore)
  .addDecorator(muiTheme())
  .add('Plugin configuration item', () => {
    const pluginConfiguration = object('Plugin configuration', defaultPluginConfigurationList[40])
    const pluginMetaData = object('Plugin meta data', defaultPluginMetaDataList['0'])
    return (
      <PluginConfigurationComponent
        pluginConfiguration={pluginConfiguration}
        pluginMetaData={pluginMetaData}
        onActiveToggle={action('onActiveToggle')}
        onCopyClick={action('onCopyClick')}
        onDeleteClick={action('onDeleteClick')}
        onEditClick={action('onEditClick')}
        onDownwardClick={action('onDownwardClick')}
        onUpwardClick={action('onUpwardClick')}
      />
    )
  })
  .add('Plugin configuration form', () => {
    const pluginConfiguration = object('Plugin configuration', defaultPluginConfigurationList[40])
    return (
      <PluginConfigurationFormComponent
        onSubmit={action('onSubmit')}
        backUrl={'back/url'}
        pluginConfiguration={pluginConfiguration}
      />
    )
  })
  .add('Plugin parameter plugin - view', () => {
    const pluginMetaDataList = object('Plugin meta data', defaultPluginMetaDataList)
    const pluginConfigurationList = object('Plugin configuration', defaultPluginConfigurationList)
    return (
      <PluginParameterPlugin
        fieldKey={'afieldkey'}
        microserviceName={'rs-truc'}
        pluginParameter={pluginConfigurationList[12].content.parameters[2]}
        pluginParameterType={'fr.cnes.regards.framework.plugins.IComplexInterfacePlugin'}
        mode={'view'}
        change={action('change')}
        pluginMetaDataList={pluginMetaDataList}
        isPluginMetaDataListFetching={false}
        pluginConfigurationList={pluginConfigurationList}
        isPluginConfigurationListFetching={false}
      />
    )
  })
  .add('Plugin parameter plugin - edit', () => {
    const pluginMetaDataList = object('Plugin meta data', defaultPluginMetaDataList)
    const pluginConfigurationList = object('Plugin configuration', defaultPluginConfigurationList)
    return (
      <PluginParameterPlugin
        fieldKey={'afieldkey'}
        microserviceName={'rs-truc'}
        pluginParameter={pluginConfigurationList[12].content.parameters[2]}
        pluginParameterType={'fr.cnes.regards.framework.plugins.IComplexInterfacePlugin'}
        mode={'edit'}
        change={action('change')}
        pluginMetaDataList={pluginMetaDataList}
        isPluginMetaDataListFetching={false}
        pluginConfigurationList={pluginConfigurationList}
        isPluginConfigurationListFetching={false}
        fetchPluginMetaDataList={action('fetchPluginMetaDataList')}
        fetchPluginConfigurationList={action('fetchPluginConfigurationList')}
      />
    )
  })
