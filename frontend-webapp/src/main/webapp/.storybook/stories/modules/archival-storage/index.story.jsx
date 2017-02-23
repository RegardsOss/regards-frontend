/**
 * LICENSE_PLACEHOLDER
 */
import React from 'react'
import { withKnobs, object } from '@kadira/storybook-addon-knobs'
import { storiesOf } from '@kadira/storybook'
import StorageMonitoringComponent from '@regardsoss/archival-storage-plugins-monitoring/src/components/StorageMonitoringComponent'
import styles from '@regardsoss/archival-storage-plugins-monitoring/src/styles/styles'
import { muiTheme } from 'storybook-addon-material-ui'
import { withStore, withLocale, withModuleTheme } from '../../decorators/index'

storiesOf('Archival storage', module)
  .addDecorator(withLocale('modules/archival-storage-plugins-monitoring/src/i18n'))
  .addDecorator(withKnobs)
  .addDecorator(withStore)
  .addDecorator(withModuleTheme({ styles }))
  .addDecorator(muiTheme())
  .add('Storage monitoring', () => {
    const storagePlugins = object('Storage plugins', [{
      label: 'ServerHDD',
      description: 'Main server hard drives',
      totalSize: '25TB',
      usedSize: '0.9TB',
    }, {
      label: 'STAFF',
      description: 'STAFF storage engine',
      totalSize: '1500tib',
      usedSize: '152.85666tib',
    }, {
      label: 'Emergency server HDD',
      description: 'DB Storage with postgreSQL',
      totalSize: '500to',
      usedSize: '0b',
    }, {
      // used size not parsable
      label: 'FLUT',
      description: 'FLUT - External safe cloud storage',
      totalSize: '0.5PB',
      usedSize: '0boot',
    }, {
      // all size not parsable
      label: 'Strange plugin',
      description: 'A strange storage plugin with wrong formats',
      totalSize: '8Txxo',
      usedSize: 'ddOp',
    }])

    return (
      <StorageMonitoringComponent storagePlugins={storagePlugins} />
    )
  })

