import React from 'react'
import { storiesOf } from '@kadira/storybook'
import { withKnobs } from '@kadira/storybook-addon-knobs'
import { ModuleThemeProvider } from '@regardsoss/modules'
import AIPStatusComponent from '@regardsoss/archival-storage/src/components/AIPStatusComponent.jsx'
import StorageMonitoringComponent from '@regardsoss/archival-storage/src/components/StorageMonitoringComponent.jsx'
import styles from '@regardsoss/archival-storage/src/styles/styles'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'

storiesOf('Archival storage', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('AIP status', () => (
    <ThemeAndLocaleDecorator theme={addLocaleAndThemeSelectors()} messageDir="modules/archival-storage/src/i18n">
      <AIPStatusComponent />
    </ThemeAndLocaleDecorator>
  ))
  .add('Storage monitoring', () => {
    const mockStoragePlugins = [{
      label: 'ServerHDD',
      description: 'Main server hard drives',
      totalSize: '25To',
      usedSize: '0.9To',
    }, {
      label: 'STAFF',
      description: 'STAFF storage engine',
      totalSize: '1500Tib',
      usedSize: '152.85666Tib',
    }, {
      label: 'Emergency server HDD',
      description: 'DB Storage with postgreSQL',
      totalSize: '500To',
      usedSize: '0b',
    }, {
      label: 'FLUT',
      description: 'FLUT - External safe cloud storage',
      totalSize: '0.5Po',
      usedSize: '0boot',
    }]

    const themeWithLocale = addLocaleAndThemeSelectors()
    // provide module styles to components
    const moduleTheme = { styles }

    return (
      <ThemeAndLocaleDecorator theme={themeWithLocale} messageDir="modules/archival-storage/src/i18n">
        <ModuleThemeProvider module={moduleTheme}>
          <StorageMonitoringComponent
            onClose={() => console.info('Close clicked')}
            storagePluginsData={mockStoragePlugins}
          />
        </ModuleThemeProvider>
      </ThemeAndLocaleDecorator>
    )
  })

