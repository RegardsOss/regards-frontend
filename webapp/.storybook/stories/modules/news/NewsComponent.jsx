/**
 * Copyright 2017-2019 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { storiesOf } from '@storybook/react'
import { withKnobs } from '@storybook/addon-knobs'
import { LazyModuleComponent } from '@regardsoss/modules'
import styles from '@regardsoss-modules/news/src/styles/styles'
import { muiTheme } from 'storybook-addon-material-ui'
import { withStore, withModuleTheme } from '../../decorators/index'

storiesOf('News module', module)
  .addDecorator(withKnobs)
  .addDecorator(withStore)
  .addDecorator(withModuleTheme({ styles }))
  .addDecorator(muiTheme())
  .add('', () => {
    const module = {
      name: 'news',
      active: true,
      conf: {},
    }
    return (
      <LazyModuleComponent appName={'test'} module={module} />
    )
  })
