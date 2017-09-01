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
import mapKeys from 'lodash/mapKeys'
import { browserHistory } from 'react-router'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { documentActions, documentSelectors } from '../clients/DocumentClient'
import { documentFileActions } from '../clients/DocumentFileClient'
import DocumentEditFilesComponent from '../components/DocumentEditFilesComponent'
import messages from '../i18n'

/**
 * Show the document files form
 */
export class DocumentEditFilesContainer extends React.Component {

  static propTypes = {
    // from router
    params: PropTypes.shape({
      project: PropTypes.string,
      documentId: PropTypes.string,
    }),
    // from mapStateToProps
    currentDocument: DataManagementShapes.Document,
    // from mapDispatchToProps
    removeTagFromDocument: PropTypes.func,
    addTagToDocument: PropTypes.func,
    fetchDocument: PropTypes.func,
  }

  state = {
    isLoading: true,
  }

  componentDidMount() {
    Promise.all([
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
    return `/admin/${project}/data/document/${documentId}/links`
  }

  getComponent = () => {
    const { currentDocument } = this.props
    return (
      <DocumentEditFilesComponent
        document={currentDocument}
        handleDeleteDocFile={this.handleDeleteDocFile}
        onSubmit={this.handleSubmit}
        backUrl={this.getBackUrl()}
      />)
  }

  redirectToLinksPage = () => {
    const { params: { project, documentId } } = this.props
    const url = `/admin/${project}/data/document/${documentId}/links`
    browserHistory.push(url)
  }

  /**
   * When the user sends file(s)
   * @param tag
   */
  handleSubmit = values => {
    /*const tesst = mapKeys(values, (value, key) => (
      `files_${key}`
    ))*/
    console.log(values)
    Promise.resolve(this.props.addFiles(values, this.props.params.documentId))
      .then(actionResult => console.log(actionResult))
  }
  /**
   * When the user remove a file
   * @param tag
   */
  handleDeleteDocFile = docFileId => Promise.resolve(this.props.removeTagFromDocument(this.props.currentDocument.content.id, docFileId))
    .then(actionResult => this.props.fetchDocument(this.props.params.documentId))

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
})

const mapDispatchToProps = dispatch => ({
  fetchDocument: id => dispatch(documentActions.fetchEntity(id)),
  addFiles: (files, docId) => dispatch(documentFileActions.sendMultipleFiles({}, files, 'files', {document_id: docId})),
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentEditFilesContainer)
