/**
 * Copyright 2017 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
 * */
import Container from './components/Container'
import ContainerShape from './model/ContainerShape'
import ContainerHelper from './ContainerHelper'
import ContainerTypes from './default/ContainerTypes'
import DefaultLayout from './default/DefaultLayout'
import ApplicationLayout from './components/ApplicationLayout'
import LayoutConfigurationComponent from './components/LayoutConfigurationComponent'

/**
 * Main interface to expose Layout utils
 */
export default {
  Container,
  ContainerShape,
  ContainerTypes,
  ContainerHelper,
  ApplicationLayout,
  LayoutConfigurationComponent,
  DefaultLayout,
}
