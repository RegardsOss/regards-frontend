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
 **/
import ModuleIcon from 'material-ui/svg-icons/action/shopping-cart'
import adminContainer from './containers/admin/AdminModuleContainer'
import moduleContainer from './containers/user/UserModuleContainer'
import reducer from './reducer'
import styles from './styles/styles'
import dependencies from './dependencies'
import messages from './i18n'

/**
 * Module main file to expose public interface
 * @author Raphaël Mechali
 */
module.exports = {
  adminContainer,
  moduleContainer,
  reducer,
  styles,
  messages,
  ModuleIcon,
  dependencies,
}
