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
import { DataManagementShapes } from '@regardsoss/shape'
import { I18nProvider } from '@regardsoss/i18n'
import partition from 'lodash/partition'
import some from 'lodash/some'
import filter from 'lodash/filter'
import startsWith from 'lodash/startsWith'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { documentActions, documentSelectors } from '../clients/DocumentClient'
import DocumentEditLinksComponent from '../components/DocumentEditLinksComponent'
import { documentLinkActions } from '../clients/DocumentLinkClient'
import messages from '../i18n'

/**
 * Show the document form
 */
export class DocumentEditLinksContainer extends React.Component {

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      documentId: PropTypes.string,
    }),
    // from mapStateToProps
    currentDocument: DataManagementShapes.Document,
    documentList: DataManagementShapes.DocumentList,
    // from mapDispatchToProps
    removeTagFromDocument: PropTypes.func,
    addTagToDocument: PropTypes.func,
    fetchDocument: PropTypes.func,
    fetchDocumentList: PropTypes.func,
  }

  state = {
    documentName: '',
    isLoading: true,
  }

  componentDidMount() {
    this.props.fetchDocumentList()
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  getBackUrl = () => {
    const { params: { project, documentId } } = this.props
    return `/admin/${project}/data/document/${documentId}/edit`
  }

  getComponent = documentLinkedToCurrentDocument => (
    <DocumentEditLinksComponent
      linkedDocuments={documentLinkedToCurrentDocument[0]}
      remainingDocuments={documentLinkedToCurrentDocument[1]}
      handleAdd={this.handleAdd}
      handleDelete={this.handleDelete}
      handleSearch={this.handleSearch}
      backUrl={this.getBackUrl()}
      doneUrl={this.getDoneUrl()}
    />)

  getDoneUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/document/list`
  }

  /**
   * Devide the documentList into 2 sets, one linked to the current document
   * and remaining document can be associated with current document
   * @param currentDocument
   * @param documentList
   * @returns {[*,*]}
   */
  getRemainingDocument = (currentDocument, documentList) => {
    const { documentName } = this.state
    const documentLinkedToCurrentDocument = partition(documentList, document => some(currentDocument.content.tags, tag => tag === document.content.ipId,
    ))
    return [
      documentLinkedToCurrentDocument[0],
      // Remove the currentDocument from documentList
      filter(documentLinkedToCurrentDocument[1], document =>
        document.content.id !== currentDocument.content.id && startsWith(document.content.label.toLowerCase(), documentName),
      ),
    ]
  }

  /**
   * When the user add a new tag
   * @param tag
   */
  handleAdd = tag => Promise.resolve(this.props.addTagToDocument(this.props.currentDocument.content.id, [tag]))
    .then(actionResult => this.props.fetchDocument(this.props.params.documentId))
  /**
   * When the user remove a tag
   * @param tag
   */
  handleDelete = tag => Promise.resolve(this.props.removeTagFromDocument(this.props.currentDocument.content.id, [tag]))
    .then(actionResult => this.props.fetchDocument(this.props.params.documentId))

  handleSearch = (event, documentName) => {
    this.setState({
      documentName: documentName.toLowerCase(),
    })
  }

  render() {
    const { currentDocument, documentList } = this.props
    const { isLoading } = this.state
    const documentLinkedToCurrentDocument = this.getRemainingDocument(currentDocument, documentList)
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {this.getComponent(documentLinkedToCurrentDocument)}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentDocument: documentSelectors.getById(state, ownProps.params.documentId),
  documentList: documentSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchDocumentList: () => dispatch(documentActions.fetchEntityList()),
  fetchDocument: id => dispatch(documentActions.fetchEntity(id)),
  addTagToDocument: (documentId, tags) => dispatch(documentLinkActions.sendSignal('PUT', tags, { document_id: documentId, operation: 'associate' })),
  removeTagFromDocument: (documentId, tags) => dispatch(documentLinkActions.sendSignal('PUT', tags, { document_id: documentId, operation: 'dissociate' })),
})
export default connect(mapStateToProps, mapDispatchToProps)(DocumentEditLinksContainer)
