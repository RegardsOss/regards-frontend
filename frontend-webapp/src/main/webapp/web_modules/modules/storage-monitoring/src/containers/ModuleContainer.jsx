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
import { connect } from '@regardsoss/redux'
import { storage } from '@regardsoss/units'
import ModuleComponent from '../components/ModuleComponent'

/**
 * Module container, instantiates the module component (the module component shows wheter user has enough rights or not)
 * @author Raphaël Mechali
 */
export class ModuleContainer extends React.Component {
  static propTypes = {
    expandable: PropTypes.bool.isRequired,
    expanded: PropTypes.bool.isRequired,
  }

  /**
   * Component will mount: used here to initialize the module state
   */
  componentWillMount = () => {
    this.setState({
      expanded: this.props.expanded,
      currentScale: storage.StorageUnitScale.bytesScale,
    })
  }


  /**
   * User callback: on unit scale changed by user
   * @param newScale new selected scale
   */
  onUnitScaleChanged = newScale => this.setState({ currentScale: newScale })

  /**
   * User callback: on toggle expanded state
   */
  onExpandChange = () => this.setState({ expanded: !this.state.expanded })

  render() {
    const { expandable } = this.props
    const { expanded, currentScale } = this.state
    return (
      <ModuleComponent
        expandable={expandable}
        expanded={expanded}
        scale={currentScale}
        onExpandChange={this.onExpandChange}
        onUnitScaleChanged={this.onUnitScaleChanged}
      />
    )
  }
}
export default connect(
  ModuleContainer.mapStateToProps,
  ModuleContainer.mapDispatchToProps)(ModuleContainer)
