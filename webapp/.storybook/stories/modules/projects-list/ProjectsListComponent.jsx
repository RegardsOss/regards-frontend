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
import ProjectListComponent from '@regardsoss-modules/projects-list/src/components/ProjectListComponent'
import ProjectListStyles from '@regardsoss-modules/projects-list/src/styles/styles'
import { storiesOf } from '@storybook/react'
import { withKnobs, object } from '@storybook/addon-knobs'
import { muiTheme } from 'storybook-addon-material-ui'
import { withStore, withLocale, withModuleTheme } from '../../decorators/index'

storiesOf('Projects list', module)
  .addDecorator(withLocale('modules/projects-list/src/i18n'))
  .addDecorator(withKnobs)
  .addDecorator(withModuleTheme({ styles: ProjectListStyles }))
  .addDecorator(withStore)
  .addDecorator(muiTheme())
  .add('', () => {
    const defaultProjects = [
      {
        id: 0,
        name: 'CDPP',
        description: 'Viking was the first Swedish satellite. It was successfully launched from Kourou (French Guiana) by Ariane' +
        ' 1 on February 22, 1986. The satellite was placed into a final 817 km x 13,527 km polar orbit with an inclination of 98.8° ' +
        'and a period of 262 mn. This orbit thus allowed the spacecraft to spend 208 mn in the region between 4000 and 14000 km ' +
        "above the Earth's surface on the geomagnetic field lines leading down to the northern auroral zone. The satellite spinned at" +
        ' a rate of about 3 rpm with its spin axis perpendicular to the orbital plane (cartwheel mode).' +
        '   The nominal life time of the satellite was 8 months ; ' +
        'it sent data for about 15 months, until May 1987. There is one data taking period per orbit ; its duration is up to 160 minutes.',
        isPublic: true,
        icon: 'https://cdpp-archive.cnes.fr/templates/cdpp/img/cdpp-logo-h70.png',
        isAccessible: true,
      },
      {
        id: 1,
        name: 'SSALTO',
        description: 'Access to AVISO data center. Altimetry satellite missions',
        isPublic: true,
        icon: 'https://cdpp-archive.cnes.fr/templates/cdpp/img/cdpp-logo-h70.png',
        isAccessible: false,
      },
    ]

    const projects = object('Projects list', defaultProjects)

    return (
      <ProjectListComponent
        projects={projects}
      />
    )
  })
