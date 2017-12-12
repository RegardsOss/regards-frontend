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
import AddBoxIcon from 'material-ui/svg-icons/content/add-box'
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardMedia } from 'material-ui/Card'
import { ListItem } from 'material-ui/List'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import {
  SelectableList, ConfirmDialogComponent,
  ConfirmDialogComponentTypes,
} from '@regardsoss/components'
import styles from '../styles'
import messages from '../i18n/Locales'

/**
* Display a form to configure metaFiles of a GenerationChain for dataprovider microservice
* This component is made to be used in a FieldArray from redux-form.
* @see https://redux-form.com/7.1.2/docs/api/fieldarray.md/
* @author Sébastien Binda
*/
class RenderArrayObjectField extends React.Component {
  static propTypes = {
    label: PropTypes.string.isRequired,
    fieldComponent: PropTypes.func.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    fieldProps: PropTypes.object,
    getEmptyObject: PropTypes.func,
    duplicationTransfromation: PropTypes.func,
    canBeEmpty: PropTypes.bool,
    // eslint-disable-next-line react/forbid-prop-types
    fields: PropTypes.object, // fields given by FieldArray from redux-form
  }

  static defaultProps = {
    canBeEmpty: true,
    fieldProps: {},
    getEmptyObject: () => ({}),
    duplicationTransfromation: object => object,
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    displayedFieldIdx: null,
    fieldIndexToDelete: null,
  }

  /**
   * Callback to add a new object to the existing ones.
   */
  onAddNewObject = () => {
    this.props.fields.push(this.props.getEmptyObject())
    this.displayObject(this.props.fields.length)
  }

  /**
   * Callback to delete an object. Should open the delete confirm dialog
   * @param {*} index : index of the object from the fields to delete.
   */
  onDeleteObject = (index) => {
    this.setState({
      fieldIndexToDelete: index,
    })
  }

  /**
   * Callback when user confirm deletion
   */
  onConfirmDeleteObject = () => {
    this.props.fields.remove(this.state.fieldIndexToDelete)
    this.closeDeleteDialog()
    if (this.props.fields.length > 0) {
      this.displayObject(0)
    }
  }

  /**
   * Callback to duplicate an object
   * @param {*} index : Index of the object from the fields props to duplicate
   */
  onDuplicateObject = (index) => {
    const objectToDuplicate = this.props.duplicationTransfromation(this.props.fields.get(index))
    this.props.fields.push(objectToDuplicate)
    this.displayObject(this.props.fields.length)
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
   * Callback to display selected object form
   * @param {*} index : Index of the object from the fields props to display
   */
  displayObject = (index) => {
    this.setState({
      displayedFieldIdx: index,
    })
  }

  /**
   * Render a ListItem for the given objects
   * @param {*} index : Index of the object from the fields props to render
   */
  renderListItem = (index) => {
    const { intl: { formatMessage } } = this.context
    const { label, canBeEmpty } = this.props
    const isDeletable = canBeEmpty ? true : this.props.fields.length > 1
    const iconButtonElement = (
      <IconButton
        touch
        tooltip={formatMessage({ id: 'render.array-object.options.title' })}
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon />
      </IconButton>
    )

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem
          disabled={!isDeletable}
          onClick={() => this.onDeleteObject(index)}
        >
          {formatMessage({ id: 'render.array-object.delete.button' })}
        </MenuItem>
        <MenuItem
          onClick={() => this.onDuplicateObject(index)}
        >
          {formatMessage({ id: 'render.array-object.duplicate.button' })}
        </MenuItem>
      </IconMenu>
    )

    return (
      <ListItem
        key={`${label}-${index}`}
        value={index}
        rightIconButton={rightIconMenu}
        primaryText={formatMessage({ id: 'render.array-object.item.title' }, { index })}
      />
    )
  }

  renderDeleteConfirmDialog = () => {
    if (!isNil(this.state.fieldIndexToDelete) && this.state.fieldIndexToDelete >= 0) {
      return (
        <ConfirmDialogComponent
          dialogType={ConfirmDialogComponentTypes.DELETE}
          title={this.context.intl.formatMessage({ id: 'render.array-object.delete.confirm.title' }, { index: this.state.fieldIndexToDelete })}
          onConfirm={this.onConfirmDeleteObject}
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
        arrayObject: {
          layoutStyle, leftColumnStyle, rightColumnStyle, typeListStyle, titleStyle, contentStyle,
        },
      },
    } = this.context
    const {
      canBeEmpty, fields, fieldComponent, fieldProps,
    } = this.props
    const { displayedFieldIdx } = this.state
    const entity = fields.get(displayedFieldIdx)
    const EntityComponent = fieldComponent

    if (!canBeEmpty && (!fields || fields.length === 0)) {
      return null
    }

    const fieldForm = displayedFieldIdx !== null && displayedFieldIdx >= 0 ? (
      <EntityComponent
        name={`${fields.name}[${displayedFieldIdx}]`}
        entity={entity}
        {...fieldProps}
      />) : null
    return (
      <Card>
        <CardMedia>
          <div style={layoutStyle}>
            <div style={titleStyle} />
            <div style={contentStyle}>
              <div style={leftColumnStyle}>
                <SelectableList
                  style={typeListStyle}
                  defaultValue={displayedFieldIdx}
                  onSelect={this.displayObject}
                >
                  {map(fields, (object, idx) => this.renderListItem(idx))}
                </SelectableList>
                <RaisedButton
                  label={formatMessage({ id: 'render.array-object.add.button' })}
                  fullWidth
                  primary
                  onClick={this.onAddNewObject}
                  icon={<AddBoxIcon />}
                />
              </div>
              <div style={rightColumnStyle}>
                {fieldForm}
              </div>
            </div>
          </div>
        </CardMedia>
        {this.renderDeleteConfirmDialog()}
      </Card>
    )
  }
}
export default withI18n(messages)(withModuleStyle(styles)(RenderArrayObjectField))
