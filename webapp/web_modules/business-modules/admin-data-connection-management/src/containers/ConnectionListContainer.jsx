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
 */
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import { DataManagementShapes } from '@regardsoss/shape'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { connectionActions, connectionSelectors } from '../clients/ConnectionClient'
import ConnectionListComponent from '../components/ConnectionListComponent'
import { connectionTestActions } from '../clients/ConnectionTestClient'
import messages from '../i18n'

/**
 * List connection
 */
export class ConnectionListContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapStateToProps
    connectionList: DataManagementShapes.ConnectionList,
    // from mapDispatchToProps
    fetchConnectionList: PropTypes.func,
    testConnection: PropTypes.func,
    deleteConnection: PropTypes.func,
  }

  state = {
    isLoading: true,
  }

  UNSAFE_componentWillMount() {
    Promise.resolve(this.props.fetchConnectionList())
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/acquisition/connection/create`
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/acquisition/board`
  }

  handleEdit = (connectionId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/connection/${connectionId}/edit`
    browserHistory.push(url)
  }

  handleDelete = (connectionId) => {
    this.props.deleteConnection(connectionId)
  }

  handleTestConnection = (connectionId) => this.props.testConnection(connectionId)

  render() {
    const { isLoading } = this.state
    const { connectionList } = this.props
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          <ConnectionListComponent
            connectionList={connectionList}
            handleDelete={this.handleDelete}
            handleEdit={this.handleEdit}
            handleTestConnection={this.handleTestConnection}
            backUrl={this.getBackUrl()}
            createUrl={this.getCreateUrl()}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  connectionList: connectionSelectors.getList(state),
})

const mapDispatchToProps = (dispatch) => ({
  fetchConnectionList: () => dispatch(connectionActions.fetchEntityList()),
  deleteConnection: (id) => dispatch(connectionActions.deleteEntity(id)),
  testConnection: (id) => dispatch(connectionTestActions.sendSignal('POST', null, { connectionId: id })),
})

export default connect(mapStateToProps, mapDispatchToProps)(ConnectionListContainer)
