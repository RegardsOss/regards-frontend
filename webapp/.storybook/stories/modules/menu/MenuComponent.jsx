/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { LazyModuleComponent } from '@regardsoss/modules'
import { storiesOf } from '@storybook/react'
import { withKnobs, object } from '@storybook/addon-knobs'
import styles from '@regardsoss-modules/menu/src/styles/styles'
import { muiTheme } from 'storybook-addon-material-ui'
import { withStore, withLocale, withModuleTheme } from '../../decorators/index'

storiesOf('Menu', module)
  .addDecorator(withLocale('modules/menu/src/i18n'))
  .addDecorator(withKnobs)
  .addDecorator(withStore)
  .addDecorator(withModuleTheme({ styles }))
  .addDecorator(muiTheme())
  .add('Simple', () => {
    const module = object('Menu module', {
      name: 'menu',
      active: true,
      conf: {
        title: 'Menu Component',
        displayAuthentication: false,
        displayLocaleSelector: false,
        displayThemeSelector: false,
      },
    })
    return (
      <LazyModuleComponent appName={'test'} module={module} />
    )
  })
  .add('With authentication', () => {
    const module = object('Menu module', {
      name: 'menu',
      active: true,
      conf: {
        title: 'Menu Component with authentication',
        displayAuthentication: true,
        displayLocaleSelector: true,
        displayThemeSelector: true,
      },
    })
    return (
      <LazyModuleComponent appName={'test'} module={module} />
    )
  })
