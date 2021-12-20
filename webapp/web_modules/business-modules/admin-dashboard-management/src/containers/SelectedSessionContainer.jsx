/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEmpty from 'lodash/isEmpty'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { AdminShapes } from '@regardsoss/shape'
import { selectedSessionSelectors } from '../clients/SelectedSessionClient'
import SelectedSessionComponent from '../components/SelectedSessionComponent'

/**
 * Comment Here
 * @author Théo Lasserre
 */
export class SelectedSessionContainer extends React.Component {
  static propTypes = {
    project: PropTypes.string.isRequired,
    onSelected: PropTypes.func.isRequired,
    relaunchProducts: PropTypes.func.isRequired,
    relaunchAIP: PropTypes.func.isRequired,
    relaunchStorages: PropTypes.func.isRequired,
    retryWorkerRequests: PropTypes.func.isRequired,
    deleteSession: PropTypes.func.isRequired,
    retryFEMRequests: PropTypes.func.isRequired,
    // from mapStateToProps
    // eslint-disable-next-line react/no-unused-prop-types
    selectedSession: AdminShapes.Session,
  }

  /**
   * Redux: map state to props function
   * @param {*} state: current redux state
   * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapStateToProps(state) {
    return {
      selectedSession: selectedSessionSelectors.getSession(state),
    }
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  render() {
    const {
      project, onSelected, relaunchProducts,
      relaunchAIP, retryWorkerRequests, relaunchStorages, deleteSession, retryFEMRequests, selectedSession,
    } = this.props
    return (
      !isEmpty(selectedSession)
        ? <SelectedSessionComponent
            project={project}
            selectedSession={selectedSession}
            onSelected={onSelected}
            relaunchProducts={relaunchProducts}
            relaunchAIP={relaunchAIP}
            retryWorkerRequests={retryWorkerRequests}
            relaunchStorages={relaunchStorages}
            deleteSession={deleteSession}
            retryFEMRequests={retryFEMRequests}
        /> : null
    )
  }
}
export default connect(
  SelectedSessionContainer.mapStateToProps, null)(SelectedSessionContainer)
