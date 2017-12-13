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
import isNil from 'lodash/isNil'
import map from 'lodash/map'
import omit from 'lodash/omit'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardMedia } from 'material-ui/Card'
import { ListItem } from 'material-ui/List'
import { i18nContextType } from '@regardsoss/i18n'
import { themeContextType } from '@regardsoss/theme'
import {
  SelectableList, ConfirmDialogComponent,
  ConfirmDialogComponentTypes,
} from '@regardsoss/components'
import MetaFileFormComponent from './MetaFileFormComponent'

/**
* Display a form to configure metaFiles of a GenerationChain for dataprovider microservice
* This component is made to be used in a FieldArray from redux-form.
* @see https://redux-form.com/7.1.2/docs/api/fieldarray.md/
* @author Sébastien Binda
*/
class MetaFilesFormComponent extends React.Component {
  static propTypes = {
    // eslint-disable-next-line react/forbid-prop-types
    fields: PropTypes.object, // fields given by FieldArray from redux-form
  }

  static defaultProps = {}

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    displayedMetaFileIdx: 0,
    fieldIndexToDelete: null,
  }

  /**
   * Callback to add a new metaFile to the existing ones.
   */
  onAddNewMetaFile = () => {
    this.props.fields.push({
      mandatory: false,
      fileNamePattern: '',
      scanDirectories: '',
      invalidFolder: '',
      fileType: '',
      comment: '',
    })
    this.displayMetaFile(this.props.fields.length)
  }

  /**
   * Callback to delete a metaFile. Should open the delete confirm dialog
   * @param {*} index : index of the metaFile from the fields to delete.
   */
  onDeleteMetaFile = (index) => {
    this.setState({
      fieldIndexToDelete: index,
    })
  }

  /**
   * Callback when user confirm deletion
   */
  onConfirmDeleteMetaFile = () => {
    this.props.fields.remove(this.state.fieldIndexToDelete)
    this.closeDeleteDialog()
    if (this.props.fields.length > 0) {
      this.displayMetaFile(0)
    }
  }

  /**
   * Callback to duplicate a metaFile
   * @param {*} index : Index of the metaFile from the fields props to duplicate
   */
  onDuplicateMetaFile = (index) => {
    const metaFileToDuplicate = this.props.fields.get(index)
    const newMetaFile = {
      ...omit(metaFileToDuplicate, ['id']),
    }
    this.props.fields.push(newMetaFile)
    this.displayMetaFile(this.props.fields.length)
  }

  /**
   * Callback to close delete confirm dialog
   */
  closeDeleteDialog = () => {
    this.setState({
      fieldIndexToDelete: null,
    })
  }

  /**
   * Callback to display selected metaFile form
   * @param {*} index : Index of the metaFile from the fields props to display
   */
  displayMetaFile = (index) => {
    this.setState({
      displayedMetaFileIdx: index,
    })
  }

  /**
   * Render a ListItem for the given Metafile
   * @param {*} index : Index of the metaFile from the fields props to render
   */
  renderListItem = (index) => {
    const { intl: { formatMessage } } = this.context
    const isDeletable = this.props.fields.length > 1
    const iconButtonElement = (
      <IconButton
        touch
        tooltip={formatMessage({ id: 'generation-chain.form.create.metaFile.options.title' })}
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon />
      </IconButton>
    )

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem
          disabled={!isDeletable}
          onClick={() => this.onDeleteMetaFile(index)}
        >
          {formatMessage({ id: 'generation-chain.form.create.metaFile.list.delete.button' })}
        </MenuItem>
        <MenuItem
          onClick={() => this.onDuplicateMetaFile(index)}
        >
          {formatMessage({ id: 'generation-chain.form.create.metaFile.list.duplicate.button' })}
        </MenuItem>
      </IconMenu>
    )

    return (
      <ListItem
        key={`metafile-${index}`}
        value={index}
        rightIconButton={rightIconMenu}
        primaryText={formatMessage({ id: 'generation-chain.form.create.metaFile.list.item.title' }, { index })}
      />
    )
  }

  renderDeleteConfirmDialog = () => {
    if (!isNil(this.state.fieldIndexToDelete) && this.state.fieldIndexToDelete >= 0) {
      return (
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          title={this.context.intl.formatMessage({ id: 'generation-chain.create.metaFile.delete.confirm.title' }, { index: this.state.fieldIndexToDelete })}
          onConfirm={this.onConfirmDeleteMetaFile}
          onClose={this.closeDeleteDialog}
        />
      )
    }
    return null
  }

  render() {
    const {
      intl: { formatMessage },
      moduleTheme: {
        metafiles: {
          layoutStyle, leftColumnStyle, rightColumnStyle, typeListStyle, titleStyle, contentStyle,
        },
      },
    } = this.context
    const metaFileToDisplay = this.props.fields.get(this.state.displayedMetaFileIdx)

    if (!this.props.fields || this.props.fields.length === 0) {
      return null
    }
    return (
      <Card>
        <CardMedia>
          <div style={layoutStyle}>
            <div style={titleStyle} />
            <div style={contentStyle}>
              <div style={leftColumnStyle}>
                <SelectableList
                  style={typeListStyle}
                  defaultValue={this.state.displayedMetaFileIdx}
                  onSelect={this.displayMetaFile}
                >
                  {map(this.props.fields, (metaFile, idx) => this.renderListItem(idx))}
                </SelectableList>
                <RaisedButton
                  label={formatMessage({ id: 'generation-chain.form.create.metaFile.list.add.button' })}
                  fullWidth
                  primary
                  onClick={this.onAddNewMetaFile}
                />
              </div>
              <div style={rightColumnStyle}>
                <MetaFileFormComponent
                  name={`metaProduct.metaFiles[${this.state.displayedMetaFileIdx}]`}
                  metaFileField={metaFileToDisplay}
                />
              </div>
            </div>
          </div>
        </CardMedia>
        {this.renderDeleteConfirmDialog()}
      </Card>
    )
  }
}
export default MetaFilesFormComponent
