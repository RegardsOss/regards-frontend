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
import { browserHistory } from 'react-router'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import { unregisterField } from 'redux-form'
import { authenticationSelectors } from '../clients/AuthenticationClient'
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
    accessToken: PropTypes.string,
    // from mapDispatchToProps
    addFiles: PropTypes.func,
    removeFile: PropTypes.func,
    unregisterField: PropTypes.func,
    fetchDocument: PropTypes.func,
  }

  state = {
    isLoading: true,
  }

  componentDidMount() {
    Promise.all([
      this.props.fetchDocument(this.props.params.documentId),
    ])
      .then(() => {
        this.setState({
          isLoading: false,
          isSendingFiles: false,
        })
      })
  }

  getBackUrl = () => {
    const { params: { project, documentId } } = this.props
    return `/admin/${project}/data/document/${documentId}/edit`
  }

  getComponent = () => {
    const { currentDocument, accessToken } = this.props
    return (
      <DocumentEditFilesComponent
        document={currentDocument}
        accessToken={accessToken}
        handleDeleteDocFile={this.handleDeleteDocFile}
        onSubmit={this.handleSubmit}
        backUrl={this.getBackUrl()}
        removeOneFieldOfTheForm={this.props.unregisterField}
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
  handleSubmit = (values) => {
    this.setState({
      isSendingFiles: true,
    })
    Promise.resolve(this.props.addFiles(values, this.props.params.documentId))
      .then((actionResult) => {
        this.setState({
          isSendingFiles: false,
        })
        // We receive here the action
        if (!actionResult.error) {
          this.redirectToLinksPage()
        }
      })
  }
  /**
   * When the user remove a file
   * @param tag
   */
  handleDeleteDocFile = documentFileChecksum => Promise.resolve(this.props.removeFile(this.props.currentDocument.content.id, documentFileChecksum))
    .then(actionResult => this.props.fetchDocument(this.props.currentDocument.content.id))

  render() {
    const { isLoading, isSendingFiles } = this.state
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isLoading || isSendingFiles}
        >
          {this.getComponent}
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  currentDocument: documentSelectors.getById(state, ownProps.params.documentId),
  accessToken: authenticationSelectors.getAccessToken(state),
})

const mapDispatchToProps = dispatch => ({
  fetchDocument: id => dispatch(documentActions.fetchEntity(id)),
  addFiles: (files, docId) => dispatch(documentFileActions.sendMultipleFiles({}, files, 'files', { document_id: docId })),
  removeFile: (docId, documentFileChecksum) => dispatch(documentFileActions.deleteEntity(documentFileChecksum, { document_id: docId })),
  unregisterField: (form, name) => dispatch(unregisterField(form, name)),
})

export default connect(mapStateToProps, mapDispatchToProps)(DocumentEditFilesContainer)
