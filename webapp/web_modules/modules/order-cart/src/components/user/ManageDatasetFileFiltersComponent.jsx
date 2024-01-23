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
import get from 'lodash/get'
import join from 'lodash/join'
import map from 'lodash/map'
import isEqual from 'lodash/isEqual'
import TextField from 'material-ui/TextField'
import WarningIcon from 'mdi-material-ui/AlertOutline'
import RemoveIcon from 'mdi-material-ui/Delete'
import FlatButton from 'material-ui/FlatButton'
import AddIcon from 'mdi-material-ui/Plus'
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'
import { OrderShapes } from '@regardsoss/shape'
import { themeContextType } from '@regardsoss/theme'
import { i18nContextType } from '@regardsoss/i18n'
import { OrderDomain } from '@regardsoss/domain'
import { PositionedDialog, withConfirmDialog } from '@regardsoss/components'

export const ButtonWithConfirmDialog = withConfirmDialog(FlatButton)

/**
 * @author Théo Lasserre
 */
class ManageDatasetFileFiltersComponent extends React.Component {
  static propTypes = {
    updateFileFilters: PropTypes.func.isRequired,
    handleConfirm: PropTypes.func.isRequired,
    // eslint-disable-next-line react/no-unused-prop-types
    process: OrderShapes.BasketDatasetProcessingSelection,
    // eslint-disable-next-line react/no-unused-prop-types
    fileSelectionDescription: OrderShapes.BasketDatasetFileSelectionDescription,
  }

  static contextTypes = {
    ...themeContextType,
    ...i18nContextType,
  }

  static DEFAULT_FILTERS_STATE = {
    [OrderDomain.FILTER_PARAMS.TYPE]: [],
    [OrderDomain.FILTER_PARAMS.NAME]: '',
  }

  static filtersExist(filters) {
    return !!(filters && !isEqual(filters, ManageDatasetFileFiltersComponent.DEFAULT_FILTERS_STATE))
  }

  static filterValueExist(filterKey, filters) {
    return !isEqual(filters[filterKey], ManageDatasetFileFiltersComponent.DEFAULT_FILTERS_STATE[filterKey])
  }

  state = {
    isDialogOpen: false,
    filters: ManageDatasetFileFiltersComponent.DEFAULT_FILTERS_STATE,
  }

  /**
   * Lifecycle method: component will mount. Used here to detect first properties change and update local state
   */
  UNSAFE_componentWillMount = () => this.onPropertiesUpdated({}, this.props)

  /**
   * Lifecycle method: component receive props. Used here to detect properties change and update local state
   * @param {*} nextProps next component properties
   */
  UNSAFE_componentWillReceiveProps = (nextProps) => this.onPropertiesUpdated(this.props, nextProps)

  /**
   * Properties change detected: update local state
   * @param oldProps previous component properties
   * @param newProps next component properties
   */
  onPropertiesUpdated = (oldProps, newProps) => {
    const { fileSelectionDescription } = newProps
    if (!isEqual(oldProps.fileSelectionDescription, fileSelectionDescription)) {
      this.setState({
        filters: {
          [OrderDomain.FILTER_PARAMS.TYPE]: get(fileSelectionDescription, OrderDomain.FILTER_PARAMS.TYPE, []),
          [OrderDomain.FILTER_PARAMS.NAME]: get(fileSelectionDescription, OrderDomain.FILTER_PARAMS.NAME, ''),
        },
      })
    }
  }

  toggleDialog = (resetFilters) => {
    const { fileSelectionDescription } = this.props
    this.setState({
      isDialogOpen: !this.state.isDialogOpen,
      filters: resetFilters ? {
        [OrderDomain.FILTER_PARAMS.TYPE]: get(fileSelectionDescription, OrderDomain.FILTER_PARAMS.TYPE, []),
        [OrderDomain.FILTER_PARAMS.NAME]: get(fileSelectionDescription, OrderDomain.FILTER_PARAMS.NAME, ''),
      } : this.state.filters,
    })
  }

  updateFilter = (newFilterValue, filterKey) => {
    this.setState({
      filters: {
        ...this.state.filters,
        [filterKey]: newFilterValue,
      },
    })
  }

  handleConfirm = () => {
    const { handleConfirm } = this.props
    const { filters } = this.state
    handleConfirm(!isEqual(filters, ManageDatasetFileFiltersComponent.DEFAULT_FILTERS_STATE) ? filters : null)
    this.toggleDialog()
  }

  handleRemoveFilters = () => {
    const { updateFileFilters } = this.props
    updateFileFilters(null)
    this.toggleDialog()
  }

  renderDialog = () => {
    const { fileSelectionDescription, process } = this.props
    const {
      intl: { formatMessage },
      moduleTheme: {
        user: {
          content: {
            table: {
              fileFiltersStyle: { dialogStyle, fieldsFiltersStyle, deleteButtonStyle },
              warningMessageStyle: { mainMessageDivStyle, messageTextStyle, warningIconStyle },
            },
          },
        },
      },
    } = this.context
    const { isDialogOpen, filters } = this.state
    if (isDialogOpen) {
      return (<PositionedDialog
        dialogHeightPercent={dialogStyle.dialogHeightPercent}
        maxHeight={dialogStyle.maxHeight}
        dialogWidthPercent={dialogStyle.dialogWidthPercent}
        title={formatMessage({ id: 'order-cart.module.basket.table.filters.dialog.title' })}
        open
        modal
        actions={<>
          <ButtonWithConfirmDialog
            key="delete"
            id="delete"
            dialogTitle={formatMessage({ id: 'order-cart.module.basket.table.filters.dialog.remove.confirmation.title' })}
            dialogMessage={formatMessage({ id: 'order-cart.module.basket.table.filters.dialog.remove.confirmation.message' })}
            title={formatMessage({ id: 'order-cart.module.basket.table.filters.dialog.remove.tooltip' })}
            label={formatMessage({ id: 'order-cart.module.basket.table.filters.dialog.remove' })}
            icon={<RemoveIcon />}
            onClick={this.handleRemoveFilters}
            disabled={!ManageDatasetFileFiltersComponent.filtersExist(fileSelectionDescription)}
            style={!ManageDatasetFileFiltersComponent.filtersExist(fileSelectionDescription) ? null : deleteButtonStyle}
          />
          <FlatButton
            key="cancel"
            id="cancel"
            label={formatMessage({ id: 'order-cart.module.basket.table.filters.dialog.cancel.button' })}
            onClick={() => this.toggleDialog(true)}
          />
          <FlatButton
            key="confirm"
            id="confirm"
            label={formatMessage({ id: 'order-cart.module.basket.table.filters.dialog.confirm.button' })}
            onClick={this.handleConfirm}
            disabled={isEqual(filters, ManageDatasetFileFiltersComponent.DEFAULT_FILTERS_STATE) || isEqual(filters, fileSelectionDescription)}
            primary
            keyboardFocused
          />
        </>}
      >
        <>
          {
            process ? <div style={mainMessageDivStyle}>
              <WarningIcon style={warningIconStyle} />
              <p style={messageTextStyle}>{formatMessage({ id: 'order-cart.module.basket.table.filters.dialog.warning.message' })}</p>
            </div> : null
          }
          <p>{formatMessage({ id: 'order-cart.module.basket.table.filters.dialog.message' })}</p>
          <div style={fieldsFiltersStyle}>
            <SelectField
              floatingLabelText={formatMessage({ id: 'order-cart.module.basket.table.filters.dialog.selectfield.hint' })}
              value={filters[OrderDomain.FILTER_PARAMS.TYPE]}
              fullWidth
              multiple
              onChange={(event, index, value) => this.updateFilter(value, OrderDomain.FILTER_PARAMS.TYPE)}
            >
              {
                map(OrderDomain.FILE_FILTERS_FILES_TYPES, (fileType) => (
                  <MenuItem
                    key={fileType}
                    value={fileType}
                    primaryText={formatMessage({ id: `order-cart.module.basket.table.filters.dialog.selectfield.fileTypes.${fileType}` })}
                  />
                ))
              }
            </SelectField>
            <TextField
              fullWidth
              floatingLabelText={formatMessage({ id: 'order-cart.module.basket.table.filters.dialog.textfield.hint' })}
              value={filters[OrderDomain.FILTER_PARAMS.NAME]}
              onChange={(event, value) => this.updateFilter(value, OrderDomain.FILTER_PARAMS.NAME)}
            />
          </div>
        </>
      </PositionedDialog>)
    }
    return null
  }

  getFilterValue = (filterKey, filters) => {
    const { intl: { formatMessage } } = this.context
    if (filterKey === OrderDomain.FILTER_PARAMS.TYPE) {
      return join(map(filters[OrderDomain.FILTER_PARAMS.TYPE], (fileType) => formatMessage({ id: `order-cart.module.basket.table.filters.dialog.selectfield.fileTypes.${fileType}` })), ', ')
    } if (filterKey === OrderDomain.FILTER_PARAMS.NAME) {
      return filters[OrderDomain.FILTER_PARAMS.NAME]
    }
    return null
  }

  computeLine = (filters, filterType) => {
    const {
      intl: { formatMessage }, moduleTheme: {
        user: {
          content: {
            table: {
              fileFiltersStyle: {
                lineStyle, pStyle, pValueStyle,
              },
            },
          },
        },
      },
    } = this.context
    return (
      ManageDatasetFileFiltersComponent.filterValueExist(filterType, filters)
        ? <div style={lineStyle}>
          <p style={pStyle}>{`\u25cf ${formatMessage({ id: `order-cart.module.basket.table.filters.button.filters.${filterType}.label` })}: `}</p>
          <p style={pValueStyle}>{this.getFilterValue(filterType, filters)}</p>
        </div> : null
    )
  }

  render() {
    const {
      intl: { formatMessage }, moduleTheme: {
        user: {
          content: {
            table: {
              fileFiltersStyle: {
                mainDivStyle, iconStyle, labelStyle, buttonStyle,
              },
            },
          },
        },
      },
    } = this.context
    const { fileSelectionDescription } = this.props
    const titleI18nKey = !ManageDatasetFileFiltersComponent.filtersExist(fileSelectionDescription) ? 'order-cart.module.basket.table.filters.button.add.title' : 'order-cart.module.basket.table.filters.button.edit.title'
    return (
      <>
        <FlatButton
          key="openFileFiltersDialog"
          id="openFileFiltersDialog"
          label={!ManageDatasetFileFiltersComponent.filtersExist(fileSelectionDescription) ? formatMessage({ id: 'order-cart.module.basket.table.filters.button.label' }) : null}
          icon={!ManageDatasetFileFiltersComponent.filtersExist(fileSelectionDescription) ? <AddIcon style={iconStyle} /> : null}
          onClick={this.toggleDialog}
          labelStyle={labelStyle}
          title={formatMessage({ id: titleI18nKey })}
          style={buttonStyle}
        >
          {ManageDatasetFileFiltersComponent.filtersExist(fileSelectionDescription)
            ? <div style={mainDivStyle}>
              {this.computeLine(fileSelectionDescription, OrderDomain.FILTER_PARAMS.TYPE)}
              {this.computeLine(fileSelectionDescription, OrderDomain.FILTER_PARAMS.NAME)}
            </div>
            : null}
        </FlatButton>
        {this.renderDialog()}
      </>

    )
  }
}
export default ManageDatasetFileFiltersComponent
