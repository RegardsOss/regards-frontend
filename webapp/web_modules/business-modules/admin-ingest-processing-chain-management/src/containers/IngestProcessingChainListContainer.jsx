/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { withI18n } from '@regardsoss/i18n'
import { processingChainActions } from '../clients/ProcessingChainClient'
import { authenticationSelectors } from '../clients/AuthenticationClient'
import IngestProcessingChainListComponent from '../components/IngestProcessingChainListComponent'
import messages from '../i18n'

/**
 * Container to display all existing ingest processing chains
 * @author Sébastien Binda
 */
export class IngestProcessingChainListContainer extends React.Component {
  static queryPageSize = 100

  static propTypes = {
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapStateToProps
    accessToken: PropTypes.string.isRequired,
    // from mapDispatchToProps
    deleteChain: PropTypes.func,
    fetchPage: PropTypes.func,
  }

  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/acquisition/chain/create`
  }

  onBack = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/board`
    browserHistory.push(url)
  }

  onDelete = ({ content: { name } }, callback) => {
    this.props.deleteChain(name).then(callback)
  }

  render() {
    return (<IngestProcessingChainListComponent
      project={this.props.params.project}
      fetchPage={this.props.fetchPage}
      onDelete={this.onDelete}
      createUrl={this.getCreateUrl()}
      onBack={this.onBack}
      queryPageSize={IngestProcessingChainListContainer.queryPageSize}
      accessToken={this.props.accessToken}
    />)
  }
}

const mapStateToProps = (state, ownProps) => ({
  accessToken: authenticationSelectors.getAccessToken(state),
})

const mapDispatchToProps = (dispatch) => ({
  deleteChain: (name) => dispatch(processingChainActions.deleteEntity(name)),
  fetchPage: (pageIndex, pageSize) => dispatch(processingChainActions.fetchPagedEntityList(pageIndex, pageSize)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withI18n(messages)(IngestProcessingChainListContainer))
