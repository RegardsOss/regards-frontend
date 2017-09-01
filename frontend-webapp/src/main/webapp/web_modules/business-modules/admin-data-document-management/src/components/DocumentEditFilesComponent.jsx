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
import { Card, CardTitle, CardText, CardActions } from 'material-ui/Card'
import { List, ListItem } from 'material-ui/List'
import { FormattedMessage } from 'react-intl'
import map from 'lodash/map'
import times from 'lodash/times'
import Remove from 'material-ui/svg-icons/action/highlight-off'
import Add from 'material-ui/svg-icons/content/add-circle-outline'
import { RenderTextField, RenderSelectField, Field, RenderFileField, ErrorTypes, reduxForm } from '@regardsoss/form-utils'
import { DataManagementShapes } from '@regardsoss/shape'
import TextField from 'material-ui/TextField'
import Search from 'material-ui/svg-icons/action/search'
import Subheader from 'material-ui/Subheader'
import { CardActionsComponent, ShowableAtRender } from '@regardsoss/components'
import IconButton from 'material-ui/IconButton'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import DocumentStepperContainer from '../containers/DocumentStepperContainer'
import ShowableAtLoad from '../../../../components/src/ShowableAtLoad'

/**
 * React component to list documents files.
 */
export class DocumentEditFilesComponent extends React.Component {

  static propTypes = {
    document: DataManagementShapes.Document,
    handleDeleteDocFile: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    backUrl: PropTypes.string.isRequired,
    // from reduxForm
    submitting: PropTypes.bool,
    invalid: PropTypes.bool,
    handleSubmit: PropTypes.func,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  state = {
    nbInputs: 1
  }

  static rowInputAndButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent:'space-between',
  }

  addFileInput = () => {
    this.setState({
      nbInputs: this.state.nbInputs + 1
    })
  }

  deleteFileInput = () => {
    this.setState({
      nbInputs: this.state.nbInputs - 1
    })
  }

  getFileInput = (inputId) => {
      return (
        <div
          style={DocumentEditFilesComponent.rowInputAndButtonStyle}
          key={inputId}
        >
          <Field
            name={`files_${inputId}`}
            component={RenderFileField}
            fullWidth
          />
          <ShowableAtRender show={(inputId === this.state.nbInputs - 1)}>
            <div>
              <IconButton onTouchTap={this.addFileInput}>
                <Add />
              </IconButton>
              <IconButton onTouchTap={this.deleteFileInput}>
                <Remove />
              </IconButton>
            </div>
          </ShowableAtRender>
        </div>
      )
  }
  render() {
    const { document, handleDeleteDocFile, backUrl, submitting, invalid } = this.props
    return (
      <form
        onSubmit={this.props.handleSubmit(this.props.onSubmit)}
      >
        <Card>
          <CardTitle
            title={this.context.intl.formatMessage({ id: 'document.form.files.title' }, {name: document.content.name})}
            subtitle={this.context.intl.formatMessage({ id: 'document.form.files.subtitle' })}
          />
          <DocumentStepperContainer
            stepIndex={1}
            isEditing
            currentDocumentId={document.content.id}
          />
          <CardText>
            <div className="row">
              <div className="col-sm-50">
                <List>
                  <Subheader><FormattedMessage id="document.form.files.docFiles.subtitle" /></Subheader>
                  {map(document.content.documents, (document) => (
                    <ListItem
                      key={document.content.ipId}
                      primaryText={document.content.label}
                      rightIconButton={
                        <IconButton onTouchTap={() => handleDeleteDocFile(document.id)}>
                          <Remove />
                        </IconButton>
                      }
                      disabled
                    />
                  ))}
                </List>
              </div>
              <div className="col-sm-50">
                <Subheader><FormattedMessage id="document.form.files.addFile.subtitle" /></Subheader>
                {times(this.state.nbInputs, i => this.getFileInput(i))}
              </div>
            </div>
          </CardText>
          <CardActions>
            <CardActionsComponent
              mainButtonLabel={this.context.intl.formatMessage({ id: 'document.form.files.action.next' })}
              mainButtonType="submit"
              isMainButtonDisabled={submitting || invalid}
              secondaryButtonLabel={this.context.intl.formatMessage({ id: 'document.form.files.action.cancel' })}
              secondaryButtonUrl={backUrl}
            />
          </CardActions>
        </Card>
      </form>
    )
  }
}



export default reduxForm({
  form: 'document-files',
})(DocumentEditFilesComponent)

