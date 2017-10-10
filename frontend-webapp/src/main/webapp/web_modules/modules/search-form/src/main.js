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
import ModuleIcon from 'material-ui/svg-icons/action/search'
import moduleContainer from './containers/ModuleContainer'
import adminContainer from './containers/AdminContainer'
import styles from './styles/styles'
import reducer from './reducer'
import dependencies from './dependencies'
/**
 * Module main file to expose public interface
 * @author Sébastien binda
 */
export default {
  moduleContainer,
  adminContainer,
  styles,
  reducer,
  messagesDir: 'modules/search-form/src/i18n',
  ModuleIcon,
  dependencies,
}
