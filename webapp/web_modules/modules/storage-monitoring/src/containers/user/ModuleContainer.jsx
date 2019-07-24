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
import { AccessShapes } from '@regardsoss/shape'
import { storage } from '@regardsoss/units'
import ModuleComponent from '../../components/user/ModuleComponent'

/**
 * Module container, instantiates the module component (the module component shows wheter user has enough rights or not)
 * @author Raphaël Mechali
 */
export class ModuleContainer extends React.Component {
  static propTypes = {
    // default modules properties
    ...AccessShapes.runtimeDispayModuleFields,
  }

  /**
   * Component will mount: used here to initialize the module state
   */
  componentWillMount = () => {
    this.setState({
      currentScale: storage.StorageUnitScale.bytesScale,
    })
  }

  /**
   * User callback: on unit scale changed by user
   * @param newScale new selected scale
   */
  onUnitScaleChanged = newScale => this.setState({ currentScale: newScale })

  render() {
    const { appName } = this.props
    const { currentScale } = this.state
    return (
      <ModuleComponent
        userApp={appName === 'user'}
        scale={currentScale}
        onUnitScaleChanged={this.onUnitScaleChanged}
        {...this.props}
      />
    )
  }
}
export default ModuleContainer
