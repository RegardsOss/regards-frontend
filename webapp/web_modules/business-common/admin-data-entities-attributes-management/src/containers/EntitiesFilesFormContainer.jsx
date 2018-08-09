/**
 * Copyright 2017-2018 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import values from 'lodash/values'
import { connect } from '@regardsoss/redux'
import { DataManagementShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType, I18nProvider } from '@regardsoss/i18n'
import { unregisterField } from 'redux-form'
import { LoadableContentDisplayDecorator } from '@regardsoss/display-control'
import EntitiesFilesFormComponent from '../components/EntitiesFilesFormComponent'
import { entityAttachmentActions } from '../clients/EntityAttachmentClient'
import { authenticationSelectors } from '../clients/AuthenticationClient'
import messages from '../i18n'

/**
 * Form component to edit datasets/collection attributes that the admin has to define.
 */
export class EntitiesFilesFormContainer extends React.Component {
  static propTypes = {
    currentEntity: DataManagementShapes.Entity.isRequired,
    allowedDataType: PropTypes.arrayOf(PropTypes.string).isRequired,
    handleRefreshEntity: PropTypes.func.isRequired,
    handleUpdateEntity: PropTypes.func.isRequired,

    // from mapStateToProps
    accessToken: PropTypes.string.isRequired,

    // from mapDispatchToProps
    addFiles: PropTypes.func.isRequired,
    removeOneFieldOfTheForm: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static mapStateToProps = (state, ownProps) => ({
    accessToken: authenticationSelectors.getAccessToken(state),
  })

  static mapDispatchToProps = dispatch => ({
    addFiles: (entityId, dataType, formValues, files) => dispatch(entityAttachmentActions.uploadEntityFile(entityId, dataType, formValues, files)),
    removeFile: (entityId, documentFileChecksum) => dispatch(entityAttachmentActions.deleteEntity(documentFileChecksum, { entityId })),
    removeOneFieldOfTheForm: (form, name) => dispatch(unregisterField(form, name)),
  })
  state = {
    isSendingFiles: false,
  }

  /**
   * When the user sends file(s)
   * @param tag
   */
  handleSubmit = (dataType, formValues, files) => {
    const { currentEntity } = this.props
    this.setState({
      isSendingFiles: true,
    })
    Promise.resolve(this.props.addFiles(currentEntity.content.feature.id, dataType, formValues, files))
      .then((actionResult) => {
        this.setState({
          isSendingFiles: false,
        })
        // We receive here the action
        if (!actionResult.error) {
          this.props.handleRefreshEntity()
        }
      })
  }
  handleDeleteFile = (checksum) => {

  }

  render() {
    const {
      currentEntity, accessToken, removeOneFieldOfTheForm, allowedDataType,
    } = this.props
    const { isSendingFiles } = this.state
    return (
      <I18nProvider messages={messages}>
        <LoadableContentDisplayDecorator
          isLoading={isSendingFiles}
        >
          <EntitiesFilesFormComponent
            currentEntity={currentEntity}
            allowedDataType={allowedDataType}
            removeOneFieldOfTheForm={removeOneFieldOfTheForm}
            onSubmit={this.handleSubmit}
            handleDeleteFile={this.handleDeleteFile}
            accessToken={accessToken}
          />
        </LoadableContentDisplayDecorator>
      </I18nProvider>
    )
  }
}


export default connect(EntitiesFilesFormContainer.mapStateToProps, EntitiesFilesFormContainer.mapDispatchToProps)(EntitiesFilesFormContainer)
