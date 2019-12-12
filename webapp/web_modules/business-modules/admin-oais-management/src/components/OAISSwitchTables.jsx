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
import { connect } from '@regardsoss/redux'
import { i18nContextType } from '@regardsoss/i18n'
import { FlatButtonWithNotifications } from '@regardsoss/components'
import { CommonShapes } from '@regardsoss/shape'
import {
  aipCountSelectors,
  aipCountActions,
} from '../clients/AIPCountClient'
import {
  requestCountSelectors,
  requestCountActions,
} from '../clients/RequestCountClient'

/**
 * Switch between the two tables
 * @author Simon MILHAU
 */
class OAISSwitchTables extends React.Component {
  /**
  * Redux: map state to props function
  * @param {*} state: current redux state
  * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
  * @return {*} list of component properties extracted from redux state
  */
  static mapStateToProps(state) {
    return {
      aipsMeta: aipCountSelectors.getMetaData(state),
      requestsMeta: requestCountSelectors.getMetaData(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of actions ready to be dispatched in the redux store
   */
  static mapDispatchToProps = dispatch => ({
    fetchAipPage: (pageIndex, pageSize, pathParams, bodyParams) => dispatch(aipCountActions.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, bodyParams)),
    fetchRequestPage: (pageIndex, pageSize, pathParams, bodyParams) => dispatch(requestCountActions.fetchPagedEntityListByPost(pageIndex, pageSize, pathParams, bodyParams)),
  })

  static propTypes = {
    aipsMeta: CommonShapes.PageMetadata,
    requestsMeta: CommonShapes.PageMetadata,
    onSwitch: PropTypes.func.isRequired,
    isPackageManagerVisible: PropTypes.bool.isRequired,
    fetchAipPage: PropTypes.func.isRequired,
    fetchRequestPage: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  componentDidMount = () => {
    const { fetchAipPage, fetchRequestPage } = this.props
    fetchAipPage(0, 20, {}, {})
    fetchRequestPage(0, 20, {}, {})
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { isPackageManagerVisible, onSwitch } = this.props
    const { aipsMeta, requestsMeta } = this.props

    return (
      <React.Fragment>
        <FlatButtonWithNotifications
          notificationsCount={aipsMeta ? aipsMeta.totalElements : 0}
          label={formatMessage({ id: 'oais.requests.switch-to.products.label' })}
          title={formatMessage({ id: 'oais.requests.switch-to.products.title' })}
          onClick={onSwitch}
          disabled={isPackageManagerVisible}
        />
        <FlatButtonWithNotifications
          notificationsCount={requestsMeta ? requestsMeta.totalElements : 0}
          label={formatMessage({ id: 'oais.packages.switch-to.requests.label' })}
          title={formatMessage({ id: 'oais.packages.switch-to.requests.title' })}
          onClick={onSwitch}
          disabled={!isPackageManagerVisible}
        />
      </React.Fragment>
    )
  }
}

export default connect(OAISSwitchTables.mapStateToProps, OAISSwitchTables.mapDispatchToProps)(OAISSwitchTables)
