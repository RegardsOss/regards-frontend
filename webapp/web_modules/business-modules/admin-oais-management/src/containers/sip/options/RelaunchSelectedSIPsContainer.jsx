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
import values from 'lodash/values'
import { connect } from '@regardsoss/redux'
import { IngestShapes } from '@regardsoss/shape'
import { TableSelectionModes } from '@regardsoss/components'
import { sipTableSelectors } from '../../../clients/SIPTableClient'
import RelaunchSelectedSIPsComponent from '../../../components/sip/options/RelaunchSelectedSIPsComponent'

/**
 * Container to relaunch selected SIPs
 * @author Kévin Picart
 */
export class RelaunchSelectedSIPsContainer extends React.Component {

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    const toggledSIPs = sipTableSelectors.getToggledElementsAsList(state)
    const selectionMode = sipTableSelectors.getSelectionMode(state)
    return {
      toggledSIPs,
      selectionMode,
    }
  }

  static propTypes = {
    // callback: on relaunch (selectionMode, [SIPs]) => ()
    onRelaunch: PropTypes.func.isRequired,
    disabled: PropTypes.bool.isRequired,
    // from mapStateToProps
    toggledSIPs: PropTypes.arrayOf(IngestShapes.IngestSIP).isRequired,
    selectionMode: PropTypes.oneOf(values(TableSelectionModes)).isRequired,
  }

  /**
   * User callback on click
   */
  onRelaunch = () => {
    const { toggledSIPs, selectionMode, onRelaunch } = this.props
    onRelaunch(selectionMode, toggledSIPs)
  }

  render() {
    const { disabled } = this.props
    return (
      <RelaunchSelectedSIPsComponent
        disabled={disabled}
        onRelaunch={this.onRelaunch}
      />
    )
  }
}
export default connect(RelaunchSelectedSIPsContainer.mapStateToProps)(RelaunchSelectedSIPsContainer)
