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
import messages from '../i18n'
import styles from '../styles'
import { aipTableActions } from '../clients/AIPTableClient'
import { requestTableActions } from '../clients/RequestTableClient'
import OAISFeatureManagerComponent from '../components/OAISFeatureManagerComponent'

/**
 * OAIS Feature manager container.
 * @author Simon MILHAU
 */
export class OAISFeatureManagerContainer extends React.Component {
  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps = (dispatch) => ({
    clearAIPSelection: () => dispatch(aipTableActions.unselectAll()),
    clearRequestSelection: () => dispatch(requestTableActions.unselectAll()),
  })

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      session: PropTypes.string,
      aip: PropTypes.string,
    }),
    clearAIPSelection: PropTypes.func.isRequired,
    clearRequestSelection: PropTypes.func.isRequired,
  }

  render() {
    const { params, clearAIPSelection, clearRequestSelection } = this.props
    return (
      <OAISFeatureManagerComponent
        params={params}
        clearAIPSelection={clearAIPSelection}
        clearRequestSelection={clearRequestSelection}
      />
    )
  }
}

export default compose(withI18n(messages), withModuleStyle(styles), connect(null, OAISFeatureManagerContainer.mapDispatchToProps))(OAISFeatureManagerContainer)
