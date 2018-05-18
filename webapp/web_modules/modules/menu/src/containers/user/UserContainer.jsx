/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { browserHistory } from 'react-router'
import { UIDomain } from '@regardsoss/domain'
import { AccessShapes } from '@regardsoss/shape'
import { ModuleConfiguration } from '../../shapes/ModuleConfiguration'
import MainMenuComponent from '../../components/user/MainMenuComponent'

/**
 * Main component of module menu (user part)
 * @author Sébastien binda
 **/
class UserContainer extends React.Component {
  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
    // redefines expected configuration shape
    moduleConf: ModuleConfiguration,
  }


  render() {
    const currentModuleId = UIDomain.getPathModuleId(browserHistory.getCurrentLocation().pathname)
    return (
      // Insert main render component
      <MainMenuComponent {...this.props} currentModuleId={currentModuleId} />
    )
  }
}

export default UserContainer
