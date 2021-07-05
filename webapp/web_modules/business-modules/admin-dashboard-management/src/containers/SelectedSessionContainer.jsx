/**
 * Copyright 2017-2020 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import isEqual from 'lodash/isEqual'
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
    retryRequests: PropTypes.func.isRequired,
    deleteSession: PropTypes.func.isRequired,
    retryFEMRequests: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types, react/no-unused-prop-types
    sourceFilters: PropTypes.object.isRequired,
    // eslint-disable-next-line react/forbid-prop-types, react/no-unused-prop-types
    sessionFilters: PropTypes.object.isRequired,
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

  state = {
    selectedSession: null,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
   UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

   /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
   UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

   /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
   onPropertiesUpdated = (oldProps, newProps) => {
     const {
       selectedSession,
     } = newProps

     const oldState = this.state || {}
     const newState = { ...oldState }

     if (!isEqual(oldProps.selectedSession, selectedSession)) {
       newState.selectedSession = selectedSession
     }
     // update when there is a state change
     if (!isEqual(oldState, newState)) {
       this.setState(newState)
     }
   }

   render() {
     const {
       project, onSelected, relaunchProducts,
       relaunchAIP, retryRequests, relaunchStorages, deleteSession, sourceFilters,
       sessionFilters, retryFEMRequests,
     } = this.props
     const { selectedSession } = this.state
     return (
       !isEmpty(selectedSession)
         ? <SelectedSessionComponent
             project={project}
             selectedSession={selectedSession}
             onSelected={onSelected}
             relaunchProducts={relaunchProducts}
             relaunchAIP={relaunchAIP}
             retryRequests={retryRequests}
             relaunchStorages={relaunchStorages}
             deleteSession={deleteSession}
             sourceFilters={sourceFilters}
             sessionFilters={sessionFilters}
             retryFEMRequests={retryFEMRequests}
         /> : null
     )
   }
}
export default connect(
  SelectedSessionContainer.mapStateToProps, null)(SelectedSessionContainer)