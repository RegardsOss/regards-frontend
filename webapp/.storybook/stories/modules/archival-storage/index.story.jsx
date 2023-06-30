/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
 *
 * This file is part of REGARDS.
 *
 * REGARDS is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * REGARDS is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with REGARDS. If not, see <http://www.gnu.org/licenses/>.
 **/
import React from 'react'
import { withKnobs, object } from '@storybook/addon-knobs'
import { storiesOf } from '@storybook/react'
import StorageMonitoringComponent from '@regardsoss-modules/archival-storage-plugins-monitoring/src/components/StorageMonitoringComponent'
import styles from '@regardsoss-modules/archival-storage-plugins-monitoring/src/styles/styles'
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

