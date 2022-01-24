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
import compose from 'lodash/fp/compose'
import { withI18n } from '@regardsoss/i18n'
import { withModuleStyle } from '@regardsoss/theme'
import FeatureManagerComponent from '../components/FeatureManagerComponent'
import { referencesTableActions } from '../clients/ReferencesTableClient'
import { creationRequestsTableActions } from '../clients/CreationRequestsTableClient'
import { deleteRequestsTableActions } from '../clients/DeleteRequestsTableClient'
import { notificationRequestsTableActions } from '../clients/NotificationRequestsTableClient'
import { updateRequestsTableActions } from '../clients/UpdateRequestsTableClient'
import messages from '../i18n'
import styles from '../styles'

/**
 * Feature manager container
 * @author Théo Lasserre
 */
export class FeatureManagerContainer extends React.Component {
  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps = (dispatch) => ({
    clearReferencesSelection: () => dispatch(referencesTableActions.unselectAll()),
    clearCreationSelection: () => dispatch(creationRequestsTableActions.unselectAll()),
    clearDeleteSelection: () => dispatch(deleteRequestsTableActions.unselectAll()),
    clearNotificationSelection: () => dispatch(notificationRequestsTableActions.unselectAll()),
    clearUpdateSelection: () => dispatch(updateRequestsTableActions.unselectAll()),
  })

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      type: PropTypes.string,
    }),
    clearReferencesSelection: PropTypes.func.isRequired,
    clearCreationSelection: PropTypes.func.isRequired,
    clearDeleteSelection: PropTypes.func.isRequired,
    clearNotificationSelection: PropTypes.func.isRequired,
    clearUpdateSelection: PropTypes.func.isRequired,
  }

  render() {
    const {
      params, clearReferencesSelection, clearCreationSelection, clearDeleteSelection,
      clearNotificationSelection, clearUpdateSelection,
    } = this.props
    return (
      <FeatureManagerComponent
        params={params}
        clearReferencesSelection={clearReferencesSelection}
        clearCreationSelection={clearCreationSelection}
        clearDeleteSelection={clearDeleteSelection}
        clearNotificationSelection={clearNotificationSelection}
        clearUpdateSelection={clearUpdateSelection}
      />
    )
  }
}

export default compose(
  connect(FeatureManagerContainer.mapStateToProps, FeatureManagerContainer.mapDispatchToProps),
  withI18n(messages), withModuleStyle(styles))(FeatureManagerContainer)
