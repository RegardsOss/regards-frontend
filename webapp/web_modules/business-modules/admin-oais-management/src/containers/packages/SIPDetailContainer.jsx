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
import { connect } from '@regardsoss/redux'
import { IngestShapes } from '@regardsoss/shape'
import { sipActions, sipSelectors } from '../../clients/SIPClient'
import SIPDetailComponent from '../../components/packages/SIPDetailComponent'

/**
 * SIPDetail container
 * @author Simon MILHAU
 */
export class SIPDetailContainer extends React.Component {
  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps = (state, props) => ({
    sip: props.sipId ? sipSelectors.getById(state, props.sipId) : null,
  })

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps = (dispatch) => ({
    fetchSip: (sipId) => dispatch(sipActions.fetchEntity(sipId)),
  })

  static propTypes = {
    sipId: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
    // from mapStateToProps
    sip: IngestShapes.SIPEntity,
    // from mapDispatchToProps
    fetchSip: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { sipId, fetchSip } = this.props
    fetchSip(sipId)
  }

  render() {
    const { sip, onClose } = this.props
    return (
      <SIPDetailComponent
        sip={sip}
        onClose={onClose}
      />
    )
  }
}
export default connect(SIPDetailContainer.mapStateToProps, SIPDetailContainer.mapDispatchToProps)(SIPDetailContainer)
