/**
 * Copyright 2017-2021 CNES - CENTRE NATIONAL d'ETUDES SPATIALES
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
import omit from 'lodash/omit'
import isFunction from 'lodash/isFunction'
import isString from 'lodash/isString'
import isNil from 'lodash/isNil'
import map from 'lodash/map'
import filter from 'lodash/filter'
import AddBoxIcon from 'mdi-material-ui/PlusBox'
import MoreVertIcon from 'mdi-material-ui/DotsVertical'
import IconButton from 'material-ui/IconButton'
import IconMenu from 'material-ui/IconMenu'
import MenuItem from 'material-ui/MenuItem'
import SubHeader from 'material-ui/Subheader'
import RaisedButton from 'material-ui/RaisedButton'
import { Card, CardMedia } from 'material-ui/Card'
import { ListItem } from 'material-ui/List'
import { fieldArrayFieldsPropTypes, fieldArrayMetaPropTypes } from 'redux-form'
import { withI18n, i18nContextType } from '@regardsoss/i18n'
import { withModuleStyle, themeContextType } from '@regardsoss/theme'
import {
  SelectableList, ConfirmDialogComponent,
  ConfirmDialogComponentTypes, FormErrorMessage,
} from '@regardsoss/components'
import RenderHelper from './RenderHelper'
import styles from '../../styles'
import messages from '../../i18n'

/**
* Display a form to configure metaFiles of a GenerationChain for dataprovider microservice
* This component is made to be used in a FieldArray from redux-form.
* @see https://redux-form.com/7.1.2/docs/api/fieldarray.md/
* @author Sébastien Binda
*/
class RenderArrayObjectField extends React.Component {
  static propTypes = {
    label: PropTypes.string, // List label
    displayLabel: PropTypes.bool,
    elementLabel: PropTypes.oneOfType([PropTypes.string, PropTypes.func]), // Each element prefix label
    fieldComponent: PropTypes.func.isRequired, // redux-form Field component to render an object of the list
    // eslint-disable-next-line react/forbid-prop-types
    fieldProps: PropTypes.object, // additional props to pass to the fieldComponent
    getEmptyObject: PropTypes.func, // Function to generate a new empty object value
    duplicationTransformation: PropTypes.func, // Function to transform object value when dulicating an element of the list
    allowDuplicate: PropTypes.bool,
    canBeEmpty: PropTypes.bool, // If false, the list is not displayed if there is no element in it
    listHeight: PropTypes.string,
    disabled: PropTypes.bool,
    // From redux-form
    fields: PropTypes.shape(fieldArrayFieldsPropTypes).isRequired, // fields given by FieldArray from redux-form
    meta: PropTypes.shape(fieldArrayMetaPropTypes).isRequired,
  }

  static defaultProps = {
    allowDuplicate: true,
    displayLabel: true,
    disabled: false,
    canBeEmpty: true,
    fieldProps: {},
    getEmptyObject: () => ({}),
    duplicationTransformation: (object) => object && { ...object },
  }

  static contextTypes = {
    ...i18nContextType,
    ...themeContextType,
  }

  state = {
    displayedFieldIdx: null,
    fieldIndexToDelete: null,
  }

  UNSAFE_componentWillMount() {
    const { moduleTheme: { arrayObject: { contentStyle } } } = this.context
    this.setState({
      listContentStyle: this.props.listHeight ? { ...omit(contentStyle, ['height']), height: this.props.listHeight } : contentStyle,
    })
  }

  componentDidMount() {
    if (this.props.fields && this.props.fields.length > 0) {
      this.displayObject(0)
    }
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
    if (this.props.fields.length > 1) {
      this.displayObject(0)
    } else {
      this.displayObject(undefined)
    }
    this.props.fields.remove(this.state.fieldIndexToDelete)
    this.closeDeleteDialog()
  }

  /**
   * Callback to duplicate an object
   * @param {*} index : Index of the object from the fields props to duplicate
   */
  onDuplicateObject = (index) => {
    const objectToDuplicate = this.props.duplicationTransformation(this.props.fields.get(index))
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
  renderListItem = (index, object) => {
    const { intl: { formatMessage } } = this.context
    const {
      elementLabel, canBeEmpty, disabled,
    } = this.props
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
          // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
          onClick={() => this.onDeleteObject(index)} // eslint wont fix: Cannot compose using MenuItems in MUI 0x (breaks menu auto closing system)
        >
          {formatMessage({ id: 'render.array-object.delete.button' })}
        </MenuItem>

        { this.props.allowDuplicate ? <MenuItem
          // eslint-disable-next-line react-perf/jsx-no-new-function-as-prop
          onClick={() => this.onDuplicateObject(index)} // eslint wont fix: Cannot compose using MenuItems in MUI 0x (breaks menu auto closing system)
        >
          {formatMessage({ id: 'render.array-object.duplicate.button' })}
        </MenuItem> : null}
      </IconMenu>
    )

    let itemLabel = formatMessage({ id: 'render.array-object.item.title' }, { index })
    if (elementLabel && isFunction(elementLabel)) {
      itemLabel = elementLabel(object, index)
      const itemsWithSameItemLabel = filter(this.props.fields, (field, idx, fields) => idx < index && itemLabel === elementLabel(fields.get(idx), idx))
      if (itemsWithSameItemLabel.length > 0) {
        itemLabel = `${itemLabel} (${itemsWithSameItemLabel.length})`
      }
    } else {
      itemLabel = elementLabel ? `${elementLabel} ${index}` : itemLabel
    }

    return (
      <ListItem
        key={`${index}`}
        value={index}
        rightIconButton={disabled ? null : rightIconMenu}
        primaryText={itemLabel}
      />
    )
  }

  renderDeleteConfirmDialog = () => {
    if (!isNil(this.state.fieldIndexToDelete) && this.state.fieldIndexToDelete >= 0 && !this.props.disabled) {
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
      intl,
      intl: { formatMessage },
      moduleTheme: {
        arrayObject: {
          layoutStyle, leftColumnStyle, rightColumnStyle, leftListStyle, leftButtonStyle, titleStyle,
        },
      },
    } = this.context
    const {
      canBeEmpty, fields, fieldComponent, fieldProps, meta, label, displayLabel,
    } = this.props
    const { displayedFieldIdx, listContentStyle } = this.state
    const entity = fields.get(displayedFieldIdx)
    const EntityComponent = fieldComponent

    if (!canBeEmpty && (!fields || fields.length === 0)) {
      return null
    }

    const fieldForm = !isNil(displayedFieldIdx) ? (
      <EntityComponent
        key={`${fields.name}[${displayedFieldIdx}]`}
        name={`${fields.name}[${displayedFieldIdx}]`}
        entity={entity}
        {...fieldProps}
      />) : null
    return (
      <Card>
        <CardMedia>
          {label && displayLabel ? <SubHeader inset={false}>{label}</SubHeader> : null}
          {meta.error && isString(meta.error)
            ? <FormErrorMessage>{RenderHelper.getErrorMessage(true, meta.error, intl)}</FormErrorMessage>
            : null}
          <div style={layoutStyle}>
            <div style={titleStyle} />
            <div style={listContentStyle}>
              <div style={leftColumnStyle}>
                <SelectableList
                  style={leftListStyle}
                  defaultValue={displayedFieldIdx}
                  onSelect={this.displayObject}
                >
                  {map(fields, (object, idx) => this.renderListItem(idx, fields.get(idx)))}
                </SelectableList>
                {!this.props.disabled
                  ? <RaisedButton
                      label={formatMessage({ id: 'render.array-object.add.button' })}
                      fullWidth
                      primary
                      onClick={this.onAddNewObject}
                      icon={<AddBoxIcon />}
                      style={leftButtonStyle}
                  /> : null}
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
