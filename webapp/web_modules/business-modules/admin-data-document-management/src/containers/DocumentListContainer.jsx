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
import { browserHistory } from 'react-router'
import { connect } from '@regardsoss/redux'
import { I18nProvider } from '@regardsoss/i18n'
import DocumentListComponent from '../components/DocumentListComponent'
import { documentActions } from '../clients/DocumentClient'
import messages from '../i18n'

/**
 * Show the document list
 */
export class DocumentListContainer extends React.Component {
  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
    }),
    // from mapDispatchToProps
    deleteDocument: PropTypes.func,
    fetchPagedEntityList: PropTypes.func,
  }

  getCreateUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/acquisition/document/create`
  }

  getBackUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/acquisition/board`
  }

  handleEdit = (documentId) => {
    const { params: { project } } = this.props
    const url = `/admin/${project}/data/acquisition/document/${documentId}/edit`
    browserHistory.push(url)
  }

  handleDelete = (documentId, { rowIndex, pageSize }) => {
    this.props.deleteDocument(documentId)
      .then((actionResult) => {
        const pageToRefresh = Math.floor(rowIndex / pageSize)
        return this.props.fetchPagedEntityList(pageToRefresh, pageSize)
      })
  }


  render() {
    return (
      <I18nProvider messages={messages}>
        <DocumentListComponent
          handleDelete={this.handleDelete}
          handleEdit={this.handleEdit}
          backUrl={this.getBackUrl()}
          createUrl={this.getCreateUrl()}
        />
      </I18nProvider>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  deleteDocument: id => dispatch(documentActions.deleteEntity(id)),
  fetchPagedEntityList: (pageToRefresh, nbElementPerPage) => dispatch(documentActions.fetchPagedEntityList(pageToRefresh, nbElementPerPage)),
})

export default connect(null, mapDispatchToProps)(DocumentListContainer)
