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
 **/
import { connect } from '@regardsoss/redux'
import { browserHistory } from 'react-router'
import { I18nProvider } from '@regardsoss/i18n'
import { ModuleStyleProvider } from '@regardsoss/theme'
import { IngestShapes } from '@regardsoss/shape'
import SIPListComponent from '../components/SIPListComponent'
import { processingChainActions, processingChainSelectors } from '../clients/ProcessingChainClient'
import { sipActions } from '../clients/SIPClient'
import messages from '../i18n'
import styles from '../styles/styles'

/**
 * Displays the list of SIPs
 * @author Maxime Bouveron
 * @author Sébastien Binda
 */
export class SIPListContainer extends React.Component {

  /**
  * Redux: map state to props function
  * @param {*} state: current redux state
  * @param {*} props: (optional) current component properties (excepted those from mapStateToProps and mapDispatchToProps)
  * @return {*} list of component properties extracted from redux state
  */
  static mapStateToProps(state) {
    return {
      chains: processingChainSelectors.getList(state),
    }
  }

  /**
   * Redux: map dispatch to props function
   * @param {*} dispatch: redux dispatch function
   * @param {*} props: (optional)  current component properties (excepted those from mapStateToProps and mapDispatchToProps)
   * @return {*} list of component properties extracted from redux state
   */
  static mapDispatchToProps = dispatch => ({
    fetchProcessingChains: file => dispatch(processingChainActions.fetchPagedEntityList(0, 1000)),
    deleteSIPByIpId: sip => dispatch(sipActions.deleteEntity(sip.ipId)),
    deleteSIPBySipId: sip => dispatch(sipActions.deleteEntity(undefined, {}, { sipId: sip.sipId })),
    fetchPage: (pageIndex, pageSize) => dispatch(sipActions.fetchPagedEntityList(pageIndex, pageSize)),
  })

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      session: PropTypes.string,
    }),
    // from mapDistpathToProps
    fetchProcessingChains: PropTypes.func.isRequired,
    deleteSIPByIpId: PropTypes.func.isRequired,
    deleteSIPBySipId: PropTypes.func.isRequired,
    fetchPage: PropTypes.func.isRequired,
    // from mapStateToProps
    chains: IngestShapes.IngestProcessingChainList.isRequired,
  }

  componentDidMount() {
    this.props.fetchProcessingChains()
  }

  getInitialFilters = () => ({
    sessionId: this.props.params.session,
  })

  handleGoBack = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/sip/session`
    browserHistory.push(url)
  }

  render() {
    const stylesObj = { styles }
    return (
      <I18nProvider messages={messages}>
        <ModuleStyleProvider module={stylesObj}>
          <SIPListComponent
            chains={this.props.chains}
            getInitialFilters={this.getInitialFilters}
            onBack={this.handleGoBack}
            onDeleteByIpId={this.props.deleteSIPByIpId}
            onDeleteBySipId={this.props.deleteSIPBySipId}
            fetchPage={this.props.fetchPage}
          />
        </ModuleStyleProvider>
      </I18nProvider>
    )
  }
}

export default connect(SIPListContainer.mapStateToProps, SIPListContainer.mapDispatchToProps)(SIPListContainer)
