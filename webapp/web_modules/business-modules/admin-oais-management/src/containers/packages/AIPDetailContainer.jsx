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
import { StorageShapes } from '@regardsoss/shape'
import AIPDetailComponent from '../../components/packages/AIPDetailComponent'

/**
 * AIPDetailContainer
 * @author Raphaël Mechali
 */
class AIPDetailContainer extends React.Component {
  static propTypes = {
    aip: StorageShapes.AIPEntity.isRequired,
    fetchSip: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  /**
    * Redux: map state to props function
    * @param {*} state: current redux state
    * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
    * @return {*} list of component properties extracted from redux state
    */
  static mapStateToProps(state) {
    return {
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps = dispatch => ({
    // fetchSip: (bodyParams, pathParams) => dispatch(aipStorageSearchActions.fetchEntityListByPost(bodyParams, pathParams)),
  })

  render() {
    const { aip, fetchSip, onClose } = this.props

    return (
      <AIPDetailComponent
        aip={aip}
        fetchSip={fetchSip}
        onClose={onClose}
      />
    )
  }
}
export default AIPDetailContainer
