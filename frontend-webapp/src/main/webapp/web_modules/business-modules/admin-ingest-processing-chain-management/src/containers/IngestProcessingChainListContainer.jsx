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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { withI18n } from '@regardsoss/i18n'
import { processingChainActions } from '../clients/ProcessingChainClient'
import ProcessingChainListComponent from '../components/IngestProcessingChainListComponent'
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
    // from mapDispatchToProps
    deleteChain: PropTypes.func,
    fetchPage: PropTypes.func,
  }

  onEdit = (chainNameToEdit) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/chain/${chainNameToEdit}/edit`
    browserHistory.push(url)
  }

  onCreate = () => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/chain/create`
    browserHistory.push(url)
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
    return (<ProcessingChainListComponent
      fetchPage={this.props.fetchPage}
      onDelete={this.onDelete}
      onEdit={this.onEdit}
      onCreate={this.onCreate}
      onBack={this.onBack}
      queryPageSize={IngestProcessingChainListContainer.queryPageSize}
    />)
  }
}

const mapStateToProps = (state, ownProps) => ({
})

const mapDispatchToProps = dispatch => ({
  deleteChain: name => dispatch(processingChainActions.deleteEntity(name)),
  fetchPage: (pageIndex, pageSize) => dispatch(processingChainActions.fetchPagedEntityList(pageIndex, pageSize)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withI18n(messages)(IngestProcessingChainListContainer))
