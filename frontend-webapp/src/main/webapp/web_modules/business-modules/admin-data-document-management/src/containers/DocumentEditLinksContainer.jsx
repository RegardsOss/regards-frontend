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
import { collectionActions, collectionSelectors } from '../clients/CollectionClient'
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
    collectionList: DataManagementShapes.CollectionList,
    // from mapDispatchToProps
    removeTagFromDocument: PropTypes.func,
    addTagToDocument: PropTypes.func,
    fetchDocument: PropTypes.func,
    fetchCollectionList: PropTypes.func,
  }

  state = {
    collectionName: '',
    isLoading: true,
  }

  componentDidMount() {
    Promise.all([
        this.props.fetchCollectionList(),
        this.props.fetchDocument(this.props.params.documentId)
      ])
      .then(() => {
        this.setState({
          isLoading: false,
        })
      })
  }

  getBackUrl = () => {
    const { params: { project, documentId } } = this.props
    return `/admin/${project}/data/document/${documentId}/files`
  }

  getComponent = () => {
    const { currentDocument, collectionList } = this.props
    const collectionLinkedToCurrentDocument = this.getRemainingCollections(currentDocument, collectionList)
    return (
      <DocumentEditLinksComponent
        linkedCollections={collectionLinkedToCurrentDocument[0]}
        remainingCollections={collectionLinkedToCurrentDocument[1]}
        currentDocument={currentDocument}
        handleAdd={this.handleAdd}
        handleDelete={this.handleDelete}
        handleSearch={this.handleSearch}
        backUrl={this.getBackUrl()}
        doneUrl={this.getDoneUrl()}
      />)
  }

  getDoneUrl = () => {
    const { params: { project } } = this.props
    return `/admin/${project}/data/document/list`
  }

  /**
   * Divide the collectionList into 2 sets, one linked to the current document
   * and remaining collections that can be associated with current document
   * @param currentDocument
   * @param collectionList
   * @returns {[*,*]}
   */
  getRemainingCollections = (currentDocument, collectionList) => {
    const { collectionName } = this.state

    const collectionLinkedToCurrentDocument = partition(collectionList, collection =>
      some(currentDocument.content.tags, tag => tag === collection.content.ipId,
    ))
    return [
      collectionLinkedToCurrentDocument[0],
      // Remove the currentCollection from collectionList and use, if setup, the search input value
      filter(collectionLinkedToCurrentDocument[1], collection =>
        startsWith(collection.content.label.toLowerCase(), collectionName),
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

  handleSearch = (event, collectionName) => {
    this.setState({
      collectionName: collectionName.toLowerCase(),
    })
  }

  render() {
    const { isLoading } = this.state
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isLoading}
        >
          {this.getComponent}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentDocument: documentSelectors.getById(state, ownProps.params.documentId),
  collectionList: collectionSelectors.getList(state),
})

const mapDispatchToProps = dispatch => ({
  fetchCollectionList: () => dispatch(collectionActions.fetchEntityList()),
  fetchDocument: id => dispatch(documentActions.fetchEntity(id)),
  addTagToDocument: (documentId, tags) => dispatch(documentLinkActions.sendSignal('PUT', tags, { document_id: documentId, operation: 'associate' })),
  removeTagFromDocument: (documentId, tags) => dispatch(documentLinkActions.sendSignal('PUT', tags, { document_id: documentId, operation: 'dissociate' })),
})
export default connect(mapStateToProps, mapDispatchToProps)(DocumentEditLinksContainer)
