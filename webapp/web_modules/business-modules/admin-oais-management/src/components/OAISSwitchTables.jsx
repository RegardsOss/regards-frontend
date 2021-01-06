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
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import { CommonShapes } from '@regardsoss/shape'
import FlatButton from 'material-ui/FlatButton'
import { aipSelectors } from '../clients/AIPClient'
import { requestSelectors } from '../clients/RequestClient'

/**
 * Switch between the two tables
 * @author Simon MILHAU
 */
export class OAISSwitchTables extends React.Component {
  /**
  * Redux: map state to props function
  * @param {*} state: current redux state
  * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
  * @return {*} list of component properties extracted from redux state
  */
  static mapStateToProps(state) {
    return {
      aipsMeta: aipSelectors.getMetaData(state),
      requestsMeta: requestSelectors.getMetaData(state),
    }
  }

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      session: PropTypes.string,
      aip: PropTypes.string,
    }),
    aipsMeta: CommonShapes.PageMetadata,
    requestsMeta: CommonShapes.PageMetadata,
    onSwitchToRequests: PropTypes.func.isRequired,
    onSwitchToPackages: PropTypes.func.isRequired,
    openedPane: PropTypes.string,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  changeToPackages = () => {
    const { onSwitchToPackages } = this.props
    onSwitchToPackages()
  }

  changeToRequests = () => {
    const { onSwitchToRequests } = this.props
    onSwitchToRequests()
  }

  render() {
    const { intl: { formatMessage }, moduleTheme: { switchButton } } = this.context
    const { aipsMeta, requestsMeta, openedPane } = this.props
    return (
      <>
        <FlatButton
          label={formatMessage({ id: 'oais.requests.switch-to.products.label' }, { productsNb: aipsMeta ? aipsMeta.totalElements : 0 })}
          title={formatMessage({ id: 'oais.requests.switch-to.products.title' })}
          onClick={this.changeToPackages}
          style={openedPane === 'PACKAGES' ? switchButton : null}
          disabled={openedPane === 'PACKAGES'}
        />
        <FlatButton
          label={formatMessage({ id: 'oais.packages.switch-to.requests.label' }, { requestsNb: requestsMeta ? requestsMeta.totalElements : 0 })}
          title={formatMessage({ id: 'oais.packages.switch-to.requests.title' })}
          onClick={this.changeToRequests}
          style={openedPane === 'REQUESTS' ? switchButton : null}
          disabled={openedPane === 'REQUESTS'}
        />

      </>
    )
  }
}

export default connect(OAISSwitchTables.mapStateToProps, null)(OAISSwitchTables)
