/**
 * Copyright 2017-2023 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import times from 'lodash/times'
import map from 'lodash/map'
import get from 'lodash/get'
import includes from 'lodash/includes'
import isEmpty from 'lodash/isEmpty'
import size from 'lodash/size'
import reduce from 'lodash/reduce'
import some from 'lodash/some'
import { DataManagementShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { mimeTypesDefinitions } from '@regardsoss/mime-types'
import { CommonDomain } from '@regardsoss/domain'
import { List, ListItem, makeSelectable } from 'material-ui/List'
import Badge from 'material-ui/Badge'
import Paper from 'material-ui/Paper'
import {
  Field, FieldArray, RenderFileFieldWithMui, RenderArrayObjectField, reduxForm,
} from '@regardsoss/form-utils'
import Subheader from 'material-ui/Subheader'
import { CardActionsComponent, ShowableAtRender, NoContentComponent } from '@regardsoss/components'
import RaisedButton from 'material-ui/RaisedButton'
import IconButton from 'material-ui/IconButton'
import Remove from 'mdi-material-ui/CloseCircleOutline'
import Add from 'mdi-material-ui/PlusCircleOutline'
import Download from 'mdi-material-ui/FileDownload'
import IconEmptyList from 'mdi-material-ui/FolderPlus'
import EntitiesFilesRefFieldArray from './EntitiesFilesRefFieldArray'

const SelectableList = makeSelectable(List)
const STATE = {
  INIT: 'INIT',
  FORM: 'FORM',
}
/**
 * Form component to edit datasets/collection/documents files.
 */
export class EntitiesFilesFormComponent extends React.Component {
  static propTypes = {
    currentEntity: DataManagementShapes.Entity,
    allowedDataType: PropTypes.arrayOf(PropTypes.string).isRequired,
    removeOneFieldOfTheForm: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    handleDeleteFile: PropTypes.func.isRequired,
    accessToken: PropTypes.string.isRequired,
    // from reduxForm
    handleSubmit: PropTypes.func.isRequired,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static rowInputAndButtonStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }

  static addFileWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: '20px',
  }

  static paperStyle = {
    padding: '5px',
    paddingBottom: '10px',
    marginBottom: '20px',
  }

  static subHeaderStyle = {
    lineHeight: '24px',
  }

  /**
   * Build mime type list
   * @param {Array<String>} authorisedList
   * @returns
   */
  static buildMimeTypeList = (authorisedList = []) => reduce(mimeTypesDefinitions, (acc, value, key) => {
    const { label, mime } = value
    if ((isEmpty(authorisedList) || includes(authorisedList, mime)) && !some(acc, { mime })) {
      return acc.concat({
        label: `${label} (${mime})`,
        mime,
      })
    }
    return acc
  }, [])

  state = {
    nbInputs: 1,
    type: get(this.props, 'allowedDataType[0]', CommonDomain.DATA_TYPES_ENUM.DESCRIPTION),
    state: STATE.INIT,
  }

  /**
   * When the form is submitted, extract refs (an array of file references) and files on the other side
   */
  onSubmit = (vals) => {
    const {
      refs,
      ...files
    } = vals
    const formValues = {}
    if (refs) {
      formValues.refs = refs
    }
    const { type } = this.state
    this.props.onSubmit(type, formValues, files)
  }

  /**
   * @return {string} the list of extension allowed on the file input
   */
  getAcceptTypesForFileInput = () => {
    switch (this.state.type) {
      case CommonDomain.DATA_TYPES_ENUM.THUMBNAIL:
        return '.jpg,.jpeg,.png,.gif'
      case CommonDomain.DATA_TYPES_ENUM.DESCRIPTION:
        return '.md,.pdf,.html,.txt'
      case CommonDomain.DATA_TYPES_ENUM.DOCUMENT:
        return '.md,.pdf,.html,.zip,.tar,.rar,.txt'
      default:
        return ''
    }
  }

  /**
   * @return {string} link to see an associated file
   */
  getDocumentUrlWithToken = (file) => {
    const { accessToken } = this.props
    if (file.reference) {
      return file.uri
    }
    return `${file.uri}?token=${accessToken}` || ''
  }

  /**
   * @return {Object} the list of files for the current type of entity
   */
  getFileList = () => {
    const { currentEntity } = this.props
    const { type } = this.state
    return get(currentEntity, `content.feature.files.${type}`, [])
  }

  /**
   * @return {int} the number of file for the provided type
   */
  getNbFile = (type) => {
    const { currentEntity } = this.props
    return size(get(currentEntity, `content.feature.files.${type}`, []))
  }

  /**
   * @return {Array<String>} The list of Mimetype available for the current type of DataFile
   */
  getMimeTypeAuthorised = () => {
    switch (this.state.type) {
      case CommonDomain.DATA_TYPES_ENUM.THUMBNAIL:
        return EntitiesFilesFormComponent.buildMimeTypeList([CommonDomain.MimeTypes.jpg, CommonDomain.MimeTypes.png, CommonDomain.MimeTypes.gif])
      case CommonDomain.DATA_TYPES_ENUM.DESCRIPTION:
        return EntitiesFilesFormComponent.buildMimeTypeList([CommonDomain.MimeTypes.pdf, CommonDomain.MimeTypes.md, CommonDomain.MimeTypes.html, CommonDomain.MimeTypes.txt])
      case CommonDomain.DATA_TYPES_ENUM.DOCUMENT:
        return EntitiesFilesFormComponent.buildMimeTypeList([CommonDomain.MimeTypes.pdf, CommonDomain.MimeTypes.md, CommonDomain.MimeTypes.html, CommonDomain.MimeTypes.zip, CommonDomain.MimeTypes.tar, CommonDomain.MimeTypes.rar, CommonDomain.MimeTypes.txt])
      case CommonDomain.DATA_TYPES_ENUM.RAWDATA:
        return EntitiesFilesFormComponent.buildMimeTypeList()
      default:
        return []
    }
  }

  /**
   * Return props for EntitiesFilesRefFieldArray component
   */
  getFilesRefProps = () => ({
    mimeTypeList: this.getMimeTypeAuthorised(),
    allowImage: this.state.type === CommonDomain.DATA_TYPES_ENUM.THUMBNAIL,
  })

  /**
   * Generate another file input
   */
  addFileInput = () => {
    this.setState({
      nbInputs: this.state.nbInputs + 1,
    })
  }

  /**
   * Remove one file input
   */
  deleteFileInput = () => {
    this.props.removeOneFieldOfTheForm('entities-files', `files_${this.state.nbInputs}`)
    this.setState({
      nbInputs: this.state.nbInputs - 1,
    })
  }

  /**
   * Change the type of DataType displayed
   */
  handleChangeDataType = (event, index) => {
    const stateChanges = {
      type: index,
      state: STATE.INIT,
    }
    // Remove all useless file input
    if (this.state.nbInputs > 1) {
      stateChanges.nbInputs = 1
    }
    this.setState(stateChanges)
  }

  handleOpenForm = () => {
    this.setState({
      state: STATE.FORM,
    })
  }

  handleCloseForm = () => {
    this.setState({
      state: STATE.INIT,
    })
  }

  renderFileInput = (inputId) => (
    <div
      style={EntitiesFilesFormComponent.rowInputAndButtonStyle}
      key={inputId}
    >
      <Field
        name={`files_${inputId}`}
        component={RenderFileFieldWithMui}
        accept={this.getAcceptTypesForFileInput()}
        fullWidth
      />
      <ShowableAtRender show={(inputId === this.state.nbInputs - 1)}>
        <div>
          <ShowableAtRender show={(inputId > 0)}>
            <IconButton onClick={this.deleteFileInput}>
              <Remove />
            </IconButton>
          </ShowableAtRender>
          <IconButton onClick={this.addFileInput}>
            <Add />
          </IconButton>
        </div>
      </ShowableAtRender>
    </div>
  )

  renderFormNewValue = () => {
    const { intl: { formatMessage } } = this.context

    if (this.state.state !== STATE.FORM) {
      return null
    }
    return (
      <form
        onSubmit={this.props.handleSubmit(this.onSubmit)}
      >
        <Paper style={EntitiesFilesFormComponent.paperStyle} zDepth={3}>
          <Subheader>{formatMessage({ id: 'entities-files.form.upload.files.subtitle' })}</Subheader>
          {times(this.state.nbInputs, (i) => this.renderFileInput(i))}
          <Subheader>{formatMessage({ id: 'entities-files.form.upload.refs.subtitle' })}</Subheader>
          <FieldArray
            name="refs"
            component={RenderArrayObjectField}
            elementLabel={this.context.intl.formatMessage({ id: 'entities-files.form.reference' })}
            fieldComponent={EntitiesFilesRefFieldArray}
            fieldProps={this.getFilesRefProps()}
            canBeEmpty
            listHeight="450px"
          />
          <CardActionsComponent
            mainButtonLabel={this.context.intl.formatMessage({ id: 'entities-files.form.upload.action.send' })}
            mainButtonType="submit"
            secondaryButtonLabel={this.context.intl.formatMessage({ id: 'entities-files.form.upload.action.cancel' })}
            secondaryButtonClick={this.handleCloseForm}
          />
        </Paper>
      </form>
    )
  }

  renderType = (type) => {
    const nbFile = this.getNbFile(type)
    const { formatMessage } = this.context.intl
    const { allowedDataType } = this.props
    return includes(allowedDataType, type)
      ? (<ListItem
          rightIcon={<Badge
            secondary
            badgeContent={nbFile}
            title={formatMessage({ id: 'entities-files.form.nbFile.tooltip' }, { nbFile })}
          />}
          primaryText={formatMessage({ id: `entities-files.form.${type}.title` })}
          secondaryText={formatMessage({ id: `entities-files.form.${type}.subtitle` })}
          title={formatMessage({ id: `entities-files.form.${type}.subtitle` })}
          value={type}
      />) : null
  }

  renderTypeList = () => (
    <div className="col-sm-25">
      <SelectableList value={this.state.type} onChange={this.handleChangeDataType}>
        {this.renderType(CommonDomain.DATA_TYPES_ENUM.THUMBNAIL)}
        {this.renderType(CommonDomain.DATA_TYPES_ENUM.DOCUMENT)}
        {this.renderType(CommonDomain.DATA_TYPES_ENUM.DESCRIPTION)}
        {this.renderType(CommonDomain.DATA_TYPES_ENUM.RAWDATA)}
      </SelectableList>
    </div>
  )

  renderListValue = () => {
    if (this.state.state !== STATE.INIT) {
      return null
    }
    const fileList = this.getFileList()
    const { formatMessage } = this.context.intl
    const content = fileList.length === 0 ? (
      <NoContentComponent
        titleKey="entities-files.form.no-file.title"
        messageKey="entities-files.form.no-file.message"
        Icon={IconEmptyList}
      />
    ) : map(this.getFileList(), (file) => (
      <ListItem
        key={file.checksum}
        primaryText={file.filename}
        rightIconButton={
          <div>
            <a href={this.getDocumentUrlWithToken(file)} target="_blank">
              <Download />
            </a>
            <IconButton onClick={() => this.props.handleDeleteFile(this.state.type, file)}>
              <Remove />
            </IconButton>
          </div>
        }
        disabled
      />
    ))
    return (
      <List>
        <Subheader style={EntitiesFilesFormComponent.subHeaderStyle}>
          {
            this.state.type === CommonDomain.DATA_TYPES_ENUM.RAWDATA
              ? formatMessage({ id: 'entities-files.form.file.RAWDATA.subtitle' }) : formatMessage({ id: 'entities-files.form.file.subtitle' })
          }
        </Subheader>
        {content}
        <div style={EntitiesFilesFormComponent.addFileWrapperStyle}>
          <RaisedButton label={formatMessage({ id: 'entities-files.form.action.add-file' })} onClick={this.handleOpenForm} />
        </div>
      </List>
    )
  }

  render() {
    return (
      <div className="row">
        {this.renderTypeList()}
        <div className="col-sm-65 col-sm-offset-5">
          {this.renderFormNewValue()}
          {this.renderListValue()}
        </div>
      </div>
    )
  }
}

export default reduxForm({
  form: 'entities-files',
})(EntitiesFilesFormComponent)
