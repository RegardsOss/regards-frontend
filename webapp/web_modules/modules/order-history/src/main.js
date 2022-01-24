/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
// ensure the default module icon is present in bundle
import '../default-icon.svg'

/**
 * Module main file to expose public interface
 * @author Raphaël Mechali
 */
export { default as adminContainer } from './containers/admin/AdminModuleContainer'
export { default as moduleContainer } from './containers/user/UserModuleContainer'
export { default as reducer } from './reducer'
export { default as styles } from './styles/styles'
export { default as messages } from './i18n'
export { default as dependencies } from './dependencies'
