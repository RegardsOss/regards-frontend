/**
 * Copyright 2017-2022 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import RaisedButton from 'material-ui/RaisedButton'
import FileUpload from 'mdi-material-ui/Upload'
import CircularProgress from 'material-ui/CircularProgress'
import Dialog from 'material-ui/Dialog'
import { Field, RenderFileFieldWithMui, reduxForm } from '@regardsoss/form-utils'
import { i18nContextType, withI18n } from '@regardsoss/i18n'
import { CardActionsComponent, FormErrorMessage } from '@regardsoss/components'
import messages from './i18n'

/**
* Component to display a button that handle a dialog allowing user to upload a selected local file.
* @author Sébastien Binda
*/
class ImportFromFileDialogButton extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    onImport: PropTypes.func.isRequired,
    onImportSucceed: PropTypes.func.isRequired,
    disableImportButton: PropTypes.bool,
    // when true, close the modal even if there is some error
    ignoreErrors: PropTypes.bool,
    style: PropTypes.objectOf(PropTypes.string),
    // from reduxForm
    handleSubmit: PropTypes.func,
  }

  static defaultProps = {
    ignoreErrors: false,
    disableImportButton: false,
  }

  static contextTypes = {
    ...i18nContextType,
  }

  static loadingFilterStyles = {
    position: 'absolute',
    opacity: '0.5',
    backgroundColor: 'black',
    width: '90%',
    height: '115px',
    margin: 'auto',
    textAlign: 'center',
    zIndex: '10',
    paddingTop: '30px',
  }

  state = {
    open: false,
    error: false,
  }

  /**
   * Open file selection dialog
   */
  handleOpen = () => {
    this.setState({ open: true })
  }

  /**
   * Close file selection dialog
   */
  handleClose = () => {
    this.setState({ open: false })
  }

  /**
   * Handle file upload submition by calling the prop onImport function in a first time.
   * Then after succeed the prop onImportSucceed function is called.
   */
  handleSubmit = (values) => {
    this.props.onImport(values).then(
      ((result) => {
        if (!result.error) {
          this.handleClose()
          this.props.onImportSucceed()
        } else if (this.props.ignoreErrors) {
          // do not display an error inside the popup, just quit it
          this.handleClose()
        } else {
          // display a default error message inside the popup
          this.setState({
            error: true,
          })
        }
      }))
  }

  /**
   * Display select local file dialog
   */
  renderDialog = () => {
    const { handleSubmit, title, disableImportButton } = this.props
    const { intl: { formatMessage } } = this.context

    return (
      <Dialog
        title={title || formatMessage({ id: 'import.file.dialog.title' })}
        modal
        open={this.state.open}
        onRequestClose={this.handleClose}
      >
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          {this.state.error ? <FormErrorMessage>{formatMessage({ id: 'import.file.error' })}</FormErrorMessage> : null}
          {disableImportButton ? <div style={ImportFromFileDialogButton.loadingFilterStyles}>
            <CircularProgress />
          </div> : null}
          <Field
            name="file"
            component={RenderFileFieldWithMui}
            accept=".json"
          />
          <br />
          <CardActionsComponent
            mainButtonLabel={formatMessage({ id: 'import.file.submit.button' })}
            mainButtonType="submit"
            isMainButtonDisabled={disableImportButton}
            secondaryButtonLabel={formatMessage({ id: 'import.file.cancel.button' })}
            secondaryButtonClick={this.handleClose}
          />
        </form>
      </Dialog>

    )
  }

  render() {
    const { intl: { formatMessage } } = this.context
    const { style } = this.props
    return (
      <div style={style}>
        {this.renderDialog()}
        <RaisedButton
          label={formatMessage({ id: 'import.file.dialog.open.button' })}
          labelPosition="before"
          primary
          icon={<FileUpload />}
          onClick={this.handleOpen}
        />
      </div>
    )
  }
}
const component = withI18n(messages)(ImportFromFileDialogButton)
const connectedReduxForm = reduxForm({
  form: 'chain-import-form',
})(component)

export default connectedReduxForm
