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
import RaisedButton from 'material-ui/RaisedButton'
import FileUpload from 'material-ui/svg-icons/file/file-upload'
import Dialog from 'material-ui/Dialog'
import { Field, RenderFileFieldWithMui, reduxForm } from '@regardsoss/form-utils'
import { i18nContextType } from '@regardsoss/i18n'
import { CardActionsComponent, FormErrorMessage } from '@regardsoss/components'

/**
* Comment Here
* @author Sébastien Binda
*/
class ImportFromFileDialogButton extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    onImport: PropTypes.func.isRequired,
    onImportSucceed: PropTypes.func.isRequired,
    style: PropTypes.objectOf(PropTypes.string),
    // from reduxForm
    handleSubmit: PropTypes.func,
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
  }

  state = {
    open: false,
    error: false,
  };

  handleOpen = () => {
    this.setState({ open: true })
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  handleSubmit = (values) => {
    this.props.onImport(values).then(
      ((result) => {
        if (!result.error) {
          this.handleClose()
          this.props.onImportSucceed()
        } else {
          this.setState({
            error: true,
          })
        }
      }))
  }

  renderDialog = () => {
    const { handleSubmit, title } = this.props
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
          <Field
            name="file"
            component={RenderFileFieldWithMui}
            accept=".json"
          />
          <CardActionsComponent
            mainButtonLabel={formatMessage({ id: 'import.file.submit.button' })}
            mainButtonType="submit"
            secondaryButtonLabel={formatMessage({ id: 'import.file.cancel.button' })}
            secondaryButtonClick={this.handleClose}
          />
        </form >
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

const connectedReduxForm = reduxForm({
  form: 'chain-import-form',
})(ImportFromFileDialogButton)

export default connectedReduxForm
