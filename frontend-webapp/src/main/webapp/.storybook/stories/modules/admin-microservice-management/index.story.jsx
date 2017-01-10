import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { withKnobs } from '@kadira/storybook-addon-knobs'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'
import MicroservicePluginTypesComponent from '@regardsoss/admin-microservice-management/src/components/MicroservicePluginTypesComponent'
import MicroservicePluginsComponent from '@regardsoss/admin-microservice-management/src/components/MicroservicePluginsComponent'
import MicroservicePluginConfigurationEditComponent from '@regardsoss/admin-microservice-management/src/components/MicroservicePluginConfigurationEditComponent'

storiesOf('Admin - Microservice management', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('Microservice plugin types', () => {
      const themeName = addLocaleAndThemeSelectors()
      return (
        <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-microservice-management/src/i18n">
          <MicroservicePluginTypesComponent microserviceName='rs-gateway'/>
        </ThemeAndLocaleDecorator>
      )
    })
    .add('Microservice plugins', () => {
      const themeName = addLocaleAndThemeSelectors()
      return (
        <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-microservice-management/src/i18n">
          <MicroservicePluginsComponent microserviceName='rs-gateway'/>
        </ThemeAndLocaleDecorator>
      )
    })
    .add('Microservice plugin configuration edit', () => {
      const themeName = addLocaleAndThemeSelectors()
      return (
        <ThemeAndLocaleDecorator theme={themeName} messageDir="modules/admin-microservice-management/src/i18n">
          <MicroservicePluginConfigurationEditComponent microserviceName='rs-gateway'/>
        </ThemeAndLocaleDecorator>
      )
    })
