/**
 * LICENSE_PLACEHOLDER
 */
import React from 'react'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import { storiesOf } from '@kadira/storybook'
import { ModuleThemeProvider } from '@regardsoss/modules'
import AIPStatusComponent from '@regardsoss/archival-storage-aip-status-monitoring/src/components/AIPStatusComponent'
import StorageMonitoringComponent from '@regardsoss/archival-storage-plugins-monitoring/src/components/StorageMonitoringComponent'
import styles from '@regardsoss/archival-storage-plugins-monitoring/src/styles/styles'
import { StoreDecorator, addLocaleAndThemeSelectors, ThemeAndLocaleDecorator } from '../../utils/decorators'

storiesOf('Archival storage', module)
  .addDecorator(withKnobs)
  .addDecorator(StoreDecorator)
  .add('AIP status', () => (
    <ThemeAndLocaleDecorator theme={addLocaleAndThemeSelectors()} messageDir="modules/archival-storage-aip-status-monitoring/src/i18n" >
      <AIPStatusComponent />
    </ThemeAndLocaleDecorator>
  ))
  .add('Storage monitoring', () => {
    const storagePlugins = object('Storage plugins', [{
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
      // used size not parsable
      label: 'FLUT',
      description: 'FLUT - External safe cloud storage',
      totalSize: '0.5Po',
      usedSize: '0boot',
    }, {
      // all size not parsable
      label: 'Strange plugin',
      description: 'A strange storage plugin with wrong formats',
      totalSize: '8Txxo',
      usedSize: 'ddOp',
    }])

    const themeWithLocale = addLocaleAndThemeSelectors()
    // provide module styles to components
    const moduleTheme = { styles }

    return (
      <ThemeAndLocaleDecorator theme={themeWithLocale} messageDir="modules/archival-storage-plugins-monitoring/src/i18n">
        <ModuleThemeProvider module={moduleTheme}>
          <StorageMonitoringComponent storagePlugins={storagePlugins} />
        </ModuleThemeProvider>
      </ThemeAndLocaleDecorator>
    )
  })

