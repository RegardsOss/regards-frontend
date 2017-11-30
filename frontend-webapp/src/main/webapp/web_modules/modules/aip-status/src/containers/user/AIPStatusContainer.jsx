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
 */
import AIPStatusComponent from '../../components/user/AIPStatusComponent'

/**
 * AIP status container
 */
class AIPStatusContainer extends React.Component {
  static propTypes = {}

  /**
   * Lifecycle method: component will mount.
   * Initializes the expanded state of module
   */
  componentWillMount = () => this.setExpanded(true)

  /**
  * User callback: on toggle expanded state
  */
  onExpandChange = () => this.setExpanded(!this.state.expanded)

  /**
   * Sets the expanded state
   * @param expanded new expanded state
   */
  setExpanded = expanded => this.setState({ expanded })

  render() {
    const { expanded } = this.state
    return (
      <AIPStatusComponent
        expanded={expanded}
        onExpandChange={this.onExpandChange}
      />
    )
  }
}

export default AIPStatusContainer
